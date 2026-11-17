"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { business, telHref } from "@/lib/config";
import { SELECT_SERVICE_EVENT } from "./service-link";

const quote = business.quote;
const serviceSlugs = business.services.map((s) => s.slug);

type FormValues = {
  name: string;
  phone: string;
  zip: string;
  service: string;
  time: string;
  details: string;
};

// Validation rules live beside the fields; react-hook-form's built-in rules
// cover this form without shipping a schema library to the browser.
const rules = {
  name: {
    validate: (v: string) => v.trim().length >= 2 || "Enter your name so the tech knows who to ask for.",
  },
  phone: {
    validate: (v: string) =>
      v.replace(/\D/g, "").replace(/^1/, "").length === 10 || "Enter a 10-digit phone number.",
  },
  zip: {
    validate: (v: string) => /^85\d{3}$/.test(v.trim()) || "Enter a Phoenix-area ZIP code (85xxx).",
  },
  service: { required: "Pick the closest match, or “Not sure”." },
  time: { required: "Pick a time of day." },
  details: { maxLength: { value: 600, message: "Keep it under 600 characters." } },
} as const;

const fieldClass =
  "mt-2 block w-full rounded-brand border border-ink bg-paper px-4 py-3 text-base aria-[invalid=true]:border-2 aria-[invalid=true]:border-[#B3261E]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-[#9C1F17]">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [sent, setSent] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", phone: "", zip: "", service: "", details: "" },
  });

  useEffect(() => {
    const onSelect = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (serviceSlugs.includes(slug)) setValue("service", slug, { shouldValidate: false });
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [setValue]);

  // No backend: the "submission" only confirms locally.
  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    setSent(values.phone);
    reset();
  };

  return (
    <section id="quote" aria-labelledby="quote-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 border-t border-seam pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="quote-title" className="text-4xl font-extrabold leading-tight md:text-5xl">
            {quote.title}
          </h2>
          <p className="mt-4 max-w-[34rem] text-lg text-muted">{quote.body}</p>
          <p className="mt-8 text-lg">
            In a hurry?{" "}
            <a href={telHref} className="tabular font-heading font-bold underline decoration-accent decoration-2 underline-offset-4">
              Call {business.phone}
            </a>
          </p>
          <p className="mt-8 border-l-2 border-accent pl-4 text-muted">{quote.demoNote}</p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div role="status" className="rounded-brand border border-ink p-6 md:p-12">
              <p className="font-heading text-3xl font-extrabold">{quote.success}</p>
              <p className="mt-4 text-lg text-muted">
                On a real site, a dispatcher would text {sent} with a two-hour arrival window.
              </p>
              <button
                type="button"
                onClick={() => setSent(null)}
                className="mt-8 font-medium underline decoration-accent decoration-2 underline-offset-4"
              >
                Fill it in again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="font-medium">Name</span>
                <input
                  {...register("name", rules.name)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby="err-name"
                  className={fieldClass}
                />
                <FieldError id="err-name" message={errors.name?.message} />
              </label>
              <label className="block">
                <span className="font-medium">Mobile number</span>
                <input
                  {...register("phone", rules.phone)}
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby="err-phone"
                  className={`${fieldClass} tabular`}
                />
                <FieldError id="err-phone" message={errors.phone?.message} />
              </label>
              <label className="block">
                <span className="font-medium">ZIP code</span>
                <input
                  {...register("zip", rules.zip)}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  aria-invalid={!!errors.zip}
                  aria-describedby="err-zip"
                  className={`${fieldClass} tabular`}
                />
                <FieldError id="err-zip" message={errors.zip?.message} />
              </label>
              <label className="block">
                <span className="font-medium">What needs work</span>
                <select
                  {...register("service", rules.service)}
                  aria-invalid={!!errors.service}
                  aria-describedby="err-service"
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {business.services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                  <option value="not-sure">Not sure</option>
                </select>
                <FieldError id="err-service" message={errors.service?.message} />
              </label>

              <fieldset className="sm:col-span-2" aria-describedby="err-time">
                <legend className="font-medium">Best time for the visit</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {quote.times.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input {...register("time", rules.time)} type="radio" value={t} className="peer sr-only" />
                      <span className="block rounded-brand border border-ink px-3 py-3 text-center font-medium peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError id="err-time" message={errors.time?.message} />
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="font-medium">
                  What’s it doing? <span className="text-muted">(optional)</span>
                </span>
                <textarea
                  {...register("details", rules.details)}
                  rows={4}
                  aria-invalid={!!errors.details}
                  aria-describedby="err-details"
                  className={fieldClass}
                />
                <FieldError id="err-details" message={errors.details?.message} />
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-brand bg-ink px-6 py-4 font-heading text-lg font-bold text-paper hover:bg-accent hover:text-accent-ink disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Request a written quote"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
