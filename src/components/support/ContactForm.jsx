import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FieldControl = ({ field, value, errors, onChange }) => {
  const f = field;
  const baseClasses =
    "w-full bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/60 text-sm sm:text-base";

  if (
    f.type === "select" &&
    Array.isArray(f.options) &&
    f.options.length <= 4
  ) {
    return (
      <div
        role="radiogroup"
        aria-label={f.label}
        className="flex flex-wrap gap-2"
      >
        {f.options.map((opt) => {
          const active = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer ui-text text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-all duration-200 active:scale-95 hover:scale-105 ${
                active
                  ? "border-orange-500 bg-orange-500/10 text-white"
                  : "border-white/20 bg-transparent text-gray-200 hover:border-orange-500/60"
              }`}
            >
              <input
                type="radio"
                name={f.name}
                value={opt}
                checked={active}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
    );
  }

  if (f.type === "select") {
    return (
      <select
        required={!!f.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseClasses} bg-black/20`}
        aria-invalid={!!errors[f.name]}
      >
        <option value="" disabled>
          Select an option
        </option>
        {f.options?.map((opt) => (
          <option key={opt} value={opt} className="text-black">
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (f.type === "textarea") {
    return (
      <textarea
        required={!!f.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={f.placeholder || f.label}
        className={`${baseClasses} bg-black/20`}
        aria-invalid={!!errors[f.name]}
      />
    );
  }

  return (
    <input
      type={f.type}
      required={!!f.required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={f.placeholder || f.label}
      className={`${baseClasses} bg-black/20`}
      aria-invalid={!!errors[f.name]}
    />
  );
};

const Field = ({ field, value, errors, onChange }) => {
  return (
    <div>
      <label className="block text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 mb-1">
        {field.label}
      </label>
      <FieldControl
        field={field}
        value={value}
        errors={errors}
        onChange={(val) => onChange(field.name, val)}
      />
      {errors[field.name] && (
        <div className="mt-1 text-[10px] sm:text-xs text-red-400">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

const ContactForm = ({ config, onSubmit }) => {
  const containerRef = useRef(null);
  const [form, setForm] = useState(() => {
    const initial = {};
    config.fields.forEach((f) => (initial[f.name] = ""));
    return initial;
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const supportTypeParam = params.get("supportType");
      const interestParam = params.get("interest");
      if (supportTypeParam || interestParam) {
        setForm((prev) => ({
          ...prev,
          ...(supportTypeParam ? { supportType: supportTypeParam } : {}),
          ...(interestParam
            ? {
                message: `${
                  prev.message ? prev.message + "\n" : ""
                }Interest: ${interestParam}`,
              }
            : {}),
        }));
      }
    } catch {}
  }, [config.fields]);

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate form container
      gsap.fromTo(
        ".contact-form-container",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-container",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError(null);
    if (honeypot) return;
    const next = {};
    config.fields.forEach((f) => {
      const value = (form[f.name] ?? "").toString().trim();
      if (f.required && !value) next[f.name] = `${f.label} is required`;
      if (f.type === "email" && value) {
        const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        if (!re.test(value)) next[f.name] = "Enter a valid email";
      }
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(form);
      }
      setSubmitted(true);
      setForm(() => {
        const initial = {};
        config.fields.forEach((f) => (initial[f.name] = ""));
        return initial;
      });
    } catch (err) {
      setSubmitError(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12"
    >
      <div className="contact-header opacity-0 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          {config.heading}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 px-4">
          {config.subheading}
        </p>
      </div>

      <div className="contact-form-container opacity-0 relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-1 rounded-l-2xl bg-gradient-to-b from-orange-500/60 via-orange-400/30 to-transparent" />

        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {config.fields
              .filter((f) =>
                ["name", "email", "organization", "supportType"].includes(
                  f.name
                )
              )
              .map((f) => (
                <Field
                  key={f.name}
                  field={f}
                  value={form[f.name]}
                  errors={errors}
                  onChange={handleChange}
                />
              ))}
          </div>

          <div className="mt-4 sm:mt-5">
            {config.fields
              .filter((f) => f.type === "textarea")
              .map((f) => (
                <Field
                  key={f.name}
                  field={f}
                  value={form[f.name]}
                  errors={errors}
                  onChange={handleChange}
                />
              ))}
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="ui-text inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm border border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20 active:scale-95 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : config.submitLabel}
            </button>
            {submitted && (
              <span className="text-xs sm:text-sm text-green-300 transition-all duration-500 opacity-100">
                Thanks! We will get back to you shortly.
              </span>
            )}
            {submitError && (
              <span className="text-xs sm:text-sm text-red-400 transition-all duration-500 opacity-100">
                {submitError}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
