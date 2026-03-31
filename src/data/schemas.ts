import { z } from "astro/zod";

// ─── Per-step client schemas ───────────────────────────────────
// Used by the wizard's "Next" button. These validate raw FormData
// values which are always strings (empty string for untouched inputs).

export const step1Schema = z.object({
  business_name: z.string().min(2, "Firm name is required"),
  contact_name: z.string().min(2, "Your name is required"),
  email: z.string().email("Please provide a valid email"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export const step2Schema = z.object({
  sector: z.string().min(2, "Industry is required"),
  client_location: z.enum(["kenya", "abroad"], { message: "Please specify your location" }),
  website_url: z.string().refine(
    val => val === "" || /^https?:\/\/.+/.test(val),
    { message: "Must be a valid URL (e.g. https://...)" }
  ),
});

export const step3Schema = z.object({
  estimated_value: z.coerce.number({ message: "Please select a budget" }).min(1, "Please select a budget"),
  notes: z.string().min(10, "Please describe your digital gap (min 10 chars)"),
});

// ─── Server schema ─────────────────────────────────────────────
// Used by the Astro Action (accept: 'form'). Astro converts empty
// form fields to null, so optional fields must handle null → "".
// See: https://docs.astro.build/en/guides/actions/#using-validators-with-form-inputs

export const consultationSchema = z.object({
  business_name: z.string().min(2, "Firm name is required"),
  contact_name: z.string().min(2, "Your name is required"),
  email: z.string().email("Please provide a valid email"),
  phone: z.string().min(10, "Valid phone number is required"),
  sector: z.string().min(2, "Industry is required"),
  // Astro sends null for empty text inputs — transform to ""
  website_url: z.string().nullish().transform(val => val ?? ""),
  client_location: z.enum(["kenya", "abroad"]).default("kenya"),
  // Astro handles arrays specially — unchecked = no entries
  critical_services_needed: z.array(z.string()).optional().default([]),
  notes: z.string().min(10, "Please describe your digital gap briefly"),
  estimated_value: z.coerce.number().min(1, "Please select a budget"),
});
