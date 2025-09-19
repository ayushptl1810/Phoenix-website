import React, { useState } from "react";
import { motion } from "framer-motion";

const FieldControl = ({ field, value, errors, onChange }) => {
  const f = field;
  const baseClasses =
    "w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/60";

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
            <motion.label
              key={opt}
              className={`cursor-pointer ui-text text-sm px-3 py-2 rounded-full border transition-colors ${
                active
                  ? "border-orange-500 bg-orange-500/10 text-white"
                  : "border-white/20 bg-transparent text-gray-200 hover:border-orange-500/60"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.label>
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
      <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
        {field.label}
      </label>
      <FieldControl
        field={field}
        value={value}
        errors={errors}
        onChange={(val) => onChange(field.name, val)}
      />
      {errors[field.name] && (
        <div className="mt-1 text-xs text-red-400">{errors[field.name]}</div>
      )}
    </div>
  );
};

const ContactForm = ({ config, onSubmit }) => {
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

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
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
      if (onSubmit) onSubmit(form);
      setSubmitted(true);
      setForm(() => {
        const initial = {};
        config.fields.forEach((f) => (initial[f.name] = ""));
        return initial;
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Standardized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.section
      id="contact"
      className="container mx-auto px-6 max-w-5xl py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="text-center" variants={itemVariants}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          {config.heading}
        </h2>
        <p className="text-gray-300 mb-6">{config.subheading}</p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6"
        variants={formVariants}
      >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div className="mt-5">
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

          <div className="mt-6 flex items-center gap-3">
            <motion.button
              type="submit"
              disabled={submitting}
              className="ui-text inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-all border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submitting ? "Sending..." : config.submitLabel}
            </motion.button>
            {submitted && (
              <motion.span
                className="text-sm text-green-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Thanks! We will get back to you shortly.
              </motion.span>
            )}
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default ContactForm;
