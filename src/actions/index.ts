import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { HIGH_VALUE_SECTORS, CONTACT } from '../data/constants';

import { consultationSchema } from '../data/schemas';

// Initialize Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Initialize Supabase
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_KEY
);

export const server = {
  bookConsultation: defineAction({
    accept: 'form',
    input: consultationSchema,
    handler: async (input) => {
      // 0. Duplicate Check
      try {
        const { data: existingLead, error: checkError } = await supabase
          .from('leads')
          .select('id, email, phone')
          .or(`email.eq.${input.email},phone.eq.${input.phone}`)
          .maybeSingle();

        if (checkError) console.error("Duplicate Check Error:", checkError);
        
        if (existingLead) {
          return {
            success: false,
            message: "We already received an audit request for your firm! Our technical team is reviewing it and will reach out shortly."
          };
        }
      } catch (checkErr) {
        console.warn("Duplicate guard fallback:", checkErr);
      }

      // 1. Calculate Lead Score (Lead Scoring Logic)
      let score = 0;
      
      // Industry Weighting — sourced from central constants
      if (HIGH_VALUE_SECTORS.some(s => input.sector.includes(s))) score += 30;
      
      // Intent Weighting (Note length & detail)
      if (input.notes.length > 100) score += 20;
      
      // Digital Presence Weighting
      if (input.website_url && input.website_url.length > 5) score += 10;
      
      // Service Volume Weighting
      if (input.critical_services_needed.length >= 2) score += 20;

      // Budget Weighting (Higher budget = higher score)
      if (input.estimated_value >= 10000) score += 20;
      else if (input.estimated_value >= 3000) score += 10;

      // 2. Prepare Supabase Payload (Aligning with leads table schema)
      const leadPayload = {
        business_name: input.business_name,
        contact_name: input.contact_name,
        sector: input.sector,
        phone: input.phone,
        email: input.email,
        website_url: input.website_url || null,
        gap_found: input.critical_services_needed.join(', '), // Mapped from form checkboxes
        notes: input.notes,
        lead_score: Math.min(score, 100),
        estimated_value: input.estimated_value,
        source: 'other', // Matches lead_source enum in SQL
        status: 'new',   // Matches lead_status enum (default)
        pipeline_stage: 'prospect', // Matches pipeline_stage enum
        priority: score >= 60 ? 'high' : (score >= 30 ? 'medium' : 'low'),
        city: input.client_location === 'kenya' ? 'Nairobi' : 'Abroad',
        tags: [...input.critical_services_needed, input.sector, input.client_location === 'abroad' ? 'diaspora' : 'local', 'website_inbound'],
      };

      try {
        // 3. Insert into Supabase (Public.Leads)
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('leads')
          .insert([leadPayload])
          .select();

        if (supabaseError) {
          console.error("Supabase Error State:", supabaseError);
          throw new Error(`CRM Sync Failed: ${supabaseError.message}`);
        }

        // 4. Trigger Resend Notification
        const { data: resendData, error: resendError } = await resend.emails.send({
          from: 'Altoby Growth <leads@altoby.com>',
          to: CONTACT.notificationEmail,
          subject: `🚀 [Score: ${score}] New Lead: ${input.business_name}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 12px;">
              <h2 style="color: #FF4500; font-size: 24px; margin-bottom: 20px;">New Growth Consultation Request</h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <p><strong>Firm:</strong> ${input.business_name}</p>
                <p><strong>Contact:</strong> ${input.contact_name}</p>
                <p><strong>Email:</strong> ${input.email}</p>
                <p><strong>Phone:</strong> ${input.phone}</p>
                <p><strong>Location:</strong> ${input.client_location === 'kenya' ? '🇰🇪 Kenya (Local)' : '🌍 Abroad (Diaspora)'}</p>
                <p><strong>Budget:</strong> KES ${input.estimated_value.toLocaleString()}</p>
                <p><strong>Score:</strong> <span style="color: ${score >= 60 ? '#16a34a' : '#111'}; font-weight: bold;">${score}/100</span></p>
              </div>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />
              <p><strong>Industry:</strong> ${input.sector}</p>
              <p><strong>Services Needed:</strong> ${input.critical_services_needed.join(', ')}</p>
              <p><strong>Gap Analysis:</strong> ${input.notes}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="text-align: center;"><a href="${CONTACT.crmUrl}" style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 600; display: inline-block;">View in CRM Dashboard</a></p>
            </div>
          `
        });

        if (resendError) {
          console.error("Resend Notification Warning:", resendError);
        }

        return { 
          success: true, 
          message: "Request processed. Our technical team is analyzing your digital gaps and will reach out within 24 hours.",
          score 
        };

      } catch (error: any) {
        return { 
          success: false, 
          message: error.message || "A technical synchronization error occurred. Please try again." 
        };
      }
    },
  }),
};
