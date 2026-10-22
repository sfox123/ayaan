import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsapp } from "../lib/site";
import { WhatsAppIcon } from "./Icons";

/**
 * Generic enquiry form. Posts { type, context, ...values } to /api/enquiry.
 * fields: [{ name, label, type?: "text"|"email"|"tel"|"date"|"number"|"select"|"textarea", options?, required?, half?, placeholder? }]
 */
export default function EnquiryForm({ type, context = "", fields, submitLabel = "Send enquiry", initial = {}, tone = "light" }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? (f.type === "select" ? f.options[0] : "")]))
  );
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [failMsg, setFailMsg] = useState("");

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    fields.forEach((f) => {
      const v = String(values[f.name] ?? "").trim();
      if (f.required && !v) er[f.name] = `Add ${f.label.toLowerCase()}.`;
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) er[f.name] = "Use an address like name@example.com.";
      else if (f.type === "tel" && v && !/^\+?[\d\s()-]{7,20}$/.test(v)) er[f.name] = "Use digits only, with your country code.";
    });
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context, ...values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The enquiry didn't go through.");
      setStatus("sent");
    } catch (err) {
      setFailMsg(err.message);
      setStatus("failed");
    }
  };

  const waText = [`Hello Ayaan Tours, I'd like to ask about: ${context || type}.`, ...fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${values[f.name]}`)].join("\n");
  const dark = tone === "dark";
  const fieldCls = dark ? "field border-mist/15 bg-mist/5 text-mist placeholder:text-mist/40 focus:border-coconut focus:bg-mist/10" : "field";
  const labelCls = dark ? "label text-mist/70" : "label";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl p-8 ${dark ? "bg-mist/10" : "bg-white"}`}
            role="status"
          >
            <svg viewBox="0 0 48 48" className="h-12 w-12 text-coconut" aria-hidden="true">
              <motion.path
                d="M10 25l9 9 19-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </svg>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.02em]">Enquiry sent</p>
            <p className={`mt-2 font-serif text-lg ${dark ? "text-mist/75" : "text-ink-600"}`}>
              We've emailed you a copy and will reply within a day, usually much sooner. For anything urgent, message us on WhatsApp.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className={`mt-6 text-sm font-semibold underline underline-offset-4 ${dark ? "text-mist" : "text-canopy"}`}>
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-x-4 gap-y-5">
            {fields.map((f) => {
              const id = `${type}-${f.name}`;
              const common = {
                id,
                name: f.name,
                value: values[f.name],
                onChange: set(f.name),
                "aria-invalid": !!errors[f.name],
                "aria-describedby": errors[f.name] ? `${id}-err` : undefined,
                className: fieldCls,
                placeholder: f.placeholder,
              };
              return (
                <div key={f.name} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
                  <label htmlFor={id} className={labelCls}>
                    {f.label}
                    {!f.required && f.type !== "select" && <span className="font-normal opacity-60"> (optional)</span>}
                  </label>
                  {f.type === "select" ? (
                    <select {...common}>
                      {f.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea {...common} rows={4} />
                  ) : (
                    <input {...common} type={f.type || "text"} min={f.type === "number" ? 1 : undefined} />
                  )}
                  {errors[f.name] && (
                    <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-earth">
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              );
            })}
            {status === "failed" && (
              <p className="col-span-2 rounded-2xl bg-earth/10 px-4 py-3 text-[0.95rem] text-earth" role="alert">
                {failMsg} Try again, or send the same details on WhatsApp below.
              </p>
            )}
            <div className="col-span-2 flex flex-wrap items-center gap-3 pt-1">
              <button type="submit" disabled={status === "sending"} className={dark ? "btn-primary" : "btn-dark"}>
                {status === "sending" ? "Sending…" : submitLabel}
              </button>
              <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className={dark ? "btn-ghost" : "btn-outline"}>
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Send on WhatsApp instead
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
