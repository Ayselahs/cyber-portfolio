"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { CaptchWidget } from "./captchaWidget";
import SecureBadge from "./secureBadge";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
}

function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  required?: boolean;
}

function TextArea({
  id,
  label,
  value,
  onChange,
  rows = 4,
  required = false,
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  value: string;
  label: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  required?: boolean;
}

function SelectInput({
  id,
  label,
  value,
  onChange,
  options = [],
  required = false,
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        required={required}
        className="mt-1 block w-full rounded-md border border-slate-300
          bg-white px-3 py-2 shadow-sm focus:outline-none
          focus:ring-teal-500 focus:border-teal-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a topic</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ children, type = "button", disabled = false }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent
        bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm
        hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const topicOptions: SelectOption[] = [
    { value: "inquiry", label: "General Inquiry" },
    { value: "feedback", label: "Feedback" },
    { value: "bug", label: "Report a Bug" },
    { value: "other", label: "Other" },
  ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    if (!name || !email || !topic || !message) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      alert("Please wait for Captcha validation");
    }

    if (!window.grecaptcha) {
      setErrorMsg("CAPTCHA has not loaded.");
      setStatus("error");
      return;
    }

    let token: string;
    try {
      token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "contact_form" }
      );
    } catch (err) {
      console.error("reCaptcha error:", err);
      setErrorMsg("reCaptcha failed. Please try again.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          captchaToken: token,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setTopic("");
      setMessage("");
      //setCaptchaToken("");
    } catch (err: unknown) {
      console.error(err);

      let message = "An unexpected error occured";
      if (err instanceof Error) {
        message = err.message;
      }

      setErrorMsg(message);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-heading text-slate-800">Contact Us</h1>
        <p className="mt-2 text-slate-600">Get in touch!</p>
      </header>

      {status === "success" ? (
        <p className="text-green-600">
          {" "}
          Thank you! Your message has been sent.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              id="name"
              label="Name"
              value={name}
              onChange={setName}
              required
            />
            <TextInput
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
          </div>

          {/* Topic Dropdown */}
          <SelectInput
            id="topic"
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={topicOptions}
          />

          {/* Message Area */}
          <TextArea
            id="message"
            label="Your Message"
            value={message}
            onChange={setMessage}
            rows={5}
          />

          {/* CAPTCHA Widget */}
          <CaptchWidget onVerify={setCaptchaToken} />

          {/* Secure Badge */}
          <div className="flex items-center justify-between">
            <SecureBadge />
          </div>

          {/* Error Text */}
          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          {/* Submit Btn */}
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting...." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  );
}
