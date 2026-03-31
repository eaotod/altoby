import { useState, useRef } from 'preact/hooks';
import { actions, isInputError } from "astro:actions";
import { INDUSTRIES, BUDGET_RANGES, CRITICAL_GAPS, CLIENT_LOCATIONS } from "../../data/constants";
import { step1Schema, step2Schema, step3Schema } from "../../data/schemas";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

  // Get raw form data as a plain object
  const getFormData = () => {
    if (!formRef.current) return {};
    const fd = new FormData(formRef.current);
    return Object.fromEntries(fd);
  };

  const scrollToForm = () => {
    window.scrollTo({
      top: formRef.current?.offsetTop ? formRef.current.offsetTop - 120 : 0,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    setErrors({});
    setMessage("");

    const data = getFormData();
    const schema = step === 1 ? step1Schema : step2Schema;
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[]>;
      setErrors(fieldErrors);
      scrollToForm();
      return;
    }

    setStep(s => s + 1);
    scrollToForm();
  };

  const handleBack = () => {
    setErrors({});
    setMessage("");
    setStep(s => Math.max(1, s - 1));
    scrollToForm();
  };

  // Clear individual field errors as the user types
  const handleInteraction = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (target.name && errors[target.name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (step !== 3 || isSubmitting) return;

    // Validate step 3 client-side before hitting the server
    const data = getFormData();
    const localResult = step3Schema.safeParse(data);
    if (!localResult.success) {
      const fieldErrors = localResult.error.flatten().fieldErrors as Record<string, string[]>;
      setErrors(fieldErrors);
      scrollToForm();
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    try {
      const formData = new FormData(formRef.current!);
      const { data: responseData, error } = await actions.bookConsultation(formData);

      if (error) {
        if (isInputError(error)) {
          const serverErrors = error.fields as Record<string, string[]>;
          setErrors(serverErrors);

          // Navigate back to the step that has the error
          const errKeys = Object.keys(serverErrors);
          if (errKeys.some(k => ['business_name', 'contact_name', 'email', 'phone'].includes(k))) {
            setStep(1);
          } else if (errKeys.some(k => ['sector', 'client_location', 'website_url'].includes(k))) {
            setStep(2);
          }
          setMessage("Please fix the validation errors.");
        } else {
          setMessage(error.message || "An unexpected error occurred.");
        }
      } else if (responseData && !responseData.success) {
        setMessage(responseData.message);
      } else if (responseData && responseData.success) {
        setSuccess(true);
        setMessage(responseData.message);
        if (responseData.score) setScore(responseData.score as number);
      }
    } catch (err) {
      setMessage("Critical execution error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="form-message" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", textAlign: "center", backgroundColor: "white", borderRadius: "var(--radius-lg)", minHeight: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", background: "rgba(255, 69, 0, 0.05)", border: "1px solid rgba(255, 69, 0, 0.1)", borderRadius: "50%", marginBottom: "24px" }}>
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Audit Received.</h2>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
          {message}
        </p>
        <div style={{ padding: "16px 24px", background: "#f9f9fa", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-text)" }}>
          Our technical lead will review your {score > 50 ? 'priority ' : ''}request and follow up.
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="booking-form wizard-form" onSubmit={handleSubmit} onInput={handleInteraction} onChange={handleInteraction} noValidate>
      {message && (
        <div className="form-message error animated-fade" style={{ display: "block", gridColumn: "span 2" }}>
          {message}
        </div>
      )}

      <div className="wizard-progress">
        <div className="wizard-progress-text">
          <span className="step-label">Step {step} of 3</span>
          <span className="step-title">
            {step === 1 && "The Basics"}
            {step === 2 && "Business Context"}
            {step === 3 && "Project & Goals"}
          </span>
        </div>
        <div className="wizard-progress-bar">
          <div className="wizard-progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <div className="wizard-steps-container">
        {/* STEP 1: The Basics */}
        <div className={`wizard-step wizard-step-1 ${step === 1 ? 'active' : 'inactive'}`}>
          <div className="form-group">
            <label htmlFor="business_name">Firm / Business Name <span className="required">*</span></label>
            <input type="text" id="business_name" name="business_name" placeholder="e.g. Kamau & Associates" />
            {errors.business_name && <span className="field-error">{errors.business_name[0]}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contact_name">Your Name <span className="required">*</span></label>
            <input type="text" id="contact_name" name="contact_name" placeholder="Full Name" />
            {errors.contact_name && <span className="field-error">{errors.contact_name[0]}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Work Email <span className="required">*</span></label>
            <input type="email" id="email" name="email" placeholder="name@firm.com" />
            {errors.email && <span className="field-error">{errors.email[0]}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone / WhatsApp <span className="required">*</span></label>
            <input type="tel" id="phone" name="phone" placeholder="+254 717 342 473" />
            {errors.phone && <span className="field-error">{errors.phone[0]}</span>}
          </div>
        </div>

        {/* STEP 2: Business Context */}
        <div className={`wizard-step wizard-step-2 ${step === 2 ? 'active' : 'inactive'}`}>
          <div className="form-group full">
            <label htmlFor="sector">Industry <span className="required">*</span></label>
            <select id="sector" name="sector" defaultValue="">
              <option value="" disabled>Select Industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>{ind.label}</option>
              ))}
            </select>
            {errors.sector && <span className="field-error">{errors.sector[0]}</span>}
          </div>

          <div className="form-group full">
            <label htmlFor="client_location">Where are you based? <span className="required">*</span></label>
            <select id="client_location" name="client_location" defaultValue="">
              <option value="" disabled>Select Location</option>
              {CLIENT_LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
            {errors.client_location && <span className="field-error">{errors.client_location[0]}</span>}
          </div>

          <div className="form-group full">
            <label htmlFor="website_url">Current Website <span className="optional">(optional)</span></label>
            <input type="text" id="website_url" name="website_url" placeholder="https://..." />
            {errors.website_url && <span className="field-error">{errors.website_url[0]}</span>}
          </div>
        </div>

        {/* STEP 3: Goals */}
        <div className={`wizard-step wizard-step-3 ${step === 3 ? 'active' : 'inactive'}`}>
          <div className="form-group full">
            <label htmlFor="estimated_value">Estimated Project Budget <span className="required">*</span></label>
            <select id="estimated_value" name="estimated_value" defaultValue="">
              <option value="" disabled>Select Budget Range</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range.value} value={String(range.value)}>{range.label}</option>
              ))}
            </select>
            {errors.estimated_value && <span className="field-error">{errors.estimated_value[0]}</span>}
          </div>

          <div className="form-group full">
            <label>What do you need? <span className="optional">(select all that apply)</span></label>
            <div className="form-checkbox-group">
              {CRITICAL_GAPS.map((gap) => (
                <label key={gap} className="checkbox-item">
                  <input type="checkbox" name="critical_services_needed" value={gap} />
                  {gap}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full">
            <label htmlFor="notes">Describe your digital bottleneck <span className="required">*</span> <span className="optional">(min 10 chars)</span></label>
            <textarea id="notes" name="notes" rows={4} placeholder="What's the #1 thing holding your digital growth back?"></textarea>
            {errors.notes && <span className="field-error">{errors.notes[0]}</span>}
          </div>
        </div>
      </div>

      <div className="wizard-footer">
        {step > 1 && (
          <button type="button" className="btn-wizard btn-back" onClick={handleBack} disabled={isSubmitting}>
            Back
          </button>
        )}
        
        {step < 3 ? (
          <button type="button" className="btn-wizard btn-next" onClick={handleNext}>
            Next Step
          </button>
        ) : (
          <button type="submit" className="btn-wizard btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Analyzing Strategy..." : "Request Free Audit"}
          </button>
        )}
      </div>
    </form>
  );
}
