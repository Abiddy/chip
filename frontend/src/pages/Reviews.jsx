import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BentoCard } from "@/components/ui/bento-grid";
import {
  FEATURES,
  FORM_STEPS,
  INITIAL_FORM,
  PUBLISH_DISCLAIMER,
  TOTAL_QUESTIONS,
  getFormSections,
  validateAllForm,
  validateStep,
} from "@/data/reviewFormSteps";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;
const INTRO_STEP = FORM_STEPS.find((s) => s.type === "intro");

async function submitReview(data) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Failed to submit feedback.");
  }

  return payload;
}

function QuestionLabel({ step }) {
  let questionLabel;
  if (step.questionStart && step.questionEnd) {
    questionLabel =
      step.questionStart === step.questionEnd
        ? `Question ${step.questionStart} of ${TOTAL_QUESTIONS}`
        : `Questions ${step.questionStart}–${step.questionEnd} of ${TOTAL_QUESTIONS}`;
  } else if (step.questionNum) {
    questionLabel = `Question ${step.questionNum} of ${TOTAL_QUESTIONS}`;
  }

  if (!questionLabel) return null;

  return (
    <p className="mb-2 text-sm text-muted-foreground">{questionLabel}</p>
  );
}

function OptionCard({ selected, onClick, children }) {
  return (
    <BentoCard
      as="button"
      type="button"
      onClick={onClick}
      hideFooter
      className={cn(
        "w-full cursor-pointer",
        selected
          ? "border-foreground/30 ring-1 ring-foreground shadow-[0_2px_12px_rgba(0,0,0,0.06)] -translate-y-0.5"
          : "hover:border-gray-200"
      )}
    >
      {children}
    </BentoCard>
  );
}

function MultiSelectOptions({ step, form, update, toggleMulti }) {
  const selected = form[step.field] || [];
  const showOther = step.otherField && selected.includes("Other");

  return (
    <div className="space-y-2">
      {step.options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <OptionCard
            key={option}
            selected={isSelected}
            onClick={() => toggleMulti(step.field, option)}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-muted-foreground/40"
                )}
              >
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
              <p className="font-medium">{option}</p>
            </div>
          </OptionCard>
        );
      })}
      {showOther && (
        <Input
          value={form[step.otherField]}
          onChange={(e) => update(step.otherField, e.target.value)}
          placeholder="Please specify..."
          className="mt-2 h-12 text-base"
        />
      )}
    </div>
  );
}

function FeatureMatrix({ form, updateFeatureRating }) {
  return (
    <div className="space-y-4">
      {FEATURES.map((feature) => (
        <div
          key={feature.key}
          className="rounded-xl border border-border p-4"
        >
          <p className="mb-3 text-sm font-medium leading-snug md:text-base">
            {feature.label}
          </p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateFeatureRating(feature.key, n)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                  form.featureRatings[feature.key] === n
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupFields({ fields, form, update, invalidFields }) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.field}>
          <label className="mb-2 block text-sm font-medium">
            {field.label}
            {field.required && (
              <span className="ml-1 text-muted-foreground">*</span>
            )}
          </label>
          {(field.type === "text" || field.type === "email") && (
            <Input
              type={field.type === "email" ? "email" : "text"}
              value={form[field.field]}
              onChange={(e) => update(field.field, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "h-12 text-base",
                invalidFields.has(field.field) && "border-destructive"
              )}
            />
          )}
          {field.type === "textarea" && (
            <Textarea
              value={form[field.field]}
              onChange={(e) => update(field.field, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "min-h-[100px] resize-none text-base",
                invalidFields.has(field.field) && "border-destructive"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FormStepBlock({
  step,
  form,
  update,
  toggleMulti,
  updateFeatureRating,
  hasError,
  invalidFields,
}) {
  if (step.type === "group") {
    return (
      <div
        id={`step-${step.id}`}
        className={cn(
          "scroll-mt-24 rounded-xl transition-colors",
          hasError && "ring-2 ring-destructive/30 ring-offset-2"
        )}
      >
        <QuestionLabel step={step} />
        <GroupFields
          fields={step.fields}
          form={form}
          update={update}
          invalidFields={invalidFields}
        />
        {hasError && (
          <p className="mt-3 text-sm text-destructive">
            Please fill in name, company, and email.
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      id={`step-${step.id}`}
      className={cn(
        "scroll-mt-24 rounded-xl transition-colors",
        hasError && "ring-2 ring-destructive/30 ring-offset-2"
      )}
    >
      <QuestionLabel step={step} />
      <h3
        className={cn(
          "text-xl font-semibold tracking-tight md:text-2xl",
          step.subheading ? "mb-2" : "mb-5"
        )}
      >
        {step.label}
      </h3>

      {step.subheading && (
        <p className="mb-6 text-sm text-muted-foreground">{step.subheading}</p>
      )}

      {step.publishable && (
        <p className="mb-5 flex items-start gap-2.5 rounded-lg border border-border/70 bg-muted/35 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          <Globe size={15} className="mt-0.5 shrink-0 text-teal-700" aria-hidden />
          <span>{PUBLISH_DISCLAIMER}</span>
        </p>
      )}

      {step.hint && (
        <p className={cn("-mt-3 mb-4 text-sm text-muted-foreground", step.subheading && "mt-0")}>
          {step.hint}
        </p>
      )}

      {(step.type === "text" || step.type === "email") && (
        <Input
          type={step.type === "email" ? "email" : "text"}
          value={form[step.field]}
          onChange={(e) => update(step.field, e.target.value)}
          placeholder={step.placeholder}
          className={cn(
            "h-12 text-base",
            hasError && "border-destructive"
          )}
        />
      )}

      {step.type === "textarea" && (
        <>
          <Textarea
            value={form[step.field]}
            onChange={(e) => update(step.field, e.target.value)}
            placeholder={step.placeholder}
            className={cn(
              "min-h-[120px] resize-none text-base",
              hasError && "border-destructive"
            )}
          />
          {step.minLength && step.required && (
            <p className="mt-2 text-xs text-muted-foreground">
              At least {step.minLength} characters
            </p>
          )}
        </>
      )}

      {step.type === "single" && (
        <div className="space-y-2">
          {step.options.map((option) => (
            <OptionCard
              key={option}
              selected={form[step.field] === option}
              onClick={() => update(step.field, option)}
            >
              <p className="font-medium">{option}</p>
            </OptionCard>
          ))}
        </div>
      )}

      {step.type === "multi" && (
        <MultiSelectOptions
          step={step}
          form={form}
          update={update}
          toggleMulti={toggleMulti}
        />
      )}

      {step.type === "featureMatrix" && (
        <FeatureMatrix
          form={form}
          updateFeatureRating={updateFeatureRating}
        />
      )}

      {hasError && (
        <p className="mt-3 text-sm text-destructive">
          {step.id === "yourDetails"
            ? "Please fill in name, company, and email."
            : "Please complete this question before submitting."}
        </p>
      )}
    </div>
  );
}

export default function Reviews() {
  const formStartRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [invalidStepIds, setInvalidStepIds] = useState([]);
  const sections = useMemo(() => getFormSections(), []);

  const invalidFields = useMemo(() => {
    const fields = new Set();
    for (const step of FORM_STEPS) {
      if (step.type === "group") {
        for (const field of step.fields) {
          if (!validateFieldForForm(field, form)) {
            fields.add(field.field);
          }
        }
      }
    }
    return fields;
  }, [form]);

  const update = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      setInvalidStepIds((ids) =>
        ids.filter((id) => {
          const step = FORM_STEPS.find((s) => s.id === id);
          return step ? !validateStep(step, next) : false;
        })
      );
      return next;
    });
  };

  const toggleMulti = (field, option) => {
    setForm((prev) => {
      const current = prev[field] || [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [field]: next };
    });
  };

  const updateFeatureRating = (key, value) => {
    setForm((prev) => ({
      ...prev,
      featureRatings: { ...prev.featureRatings, [key]: value },
    }));
  };

  const scrollToForm = () => {
    formStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    const failures = validateAllForm(form);
    if (failures.length > 0) {
      setInvalidStepIds(failures);
      document
        .getElementById(`step-${failures[0]}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitReview(form);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-testid="reviews-page"
    >
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
        <Link to="/" aria-label="Home" className="inline-flex items-center">
          <img
            src={LOGO_SRC}
            alt="Lens"
            className="h-9 w-auto object-contain select-none"
            draggable="false"
          />
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to site
        </Link>
      </header>

      {submitted ? (
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check size={32} />
          </div>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight">
            Thank you!
          </h1>
          <p className="mb-8 max-w-md text-muted-foreground">
            Your feedback has been saved. We really appreciate you taking the
            time after the demo — it directly shapes our roadmap.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Return to homepage</Link>
          </Button>
        </main>
      ) : (
        <>
          {/* Intro */}
          <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-20 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              LENS ACE Demo
            </p>
            <h1 className="mb-4 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">
              {INTRO_STEP.title}
            </h1>
            <p className="mx-auto mb-4 max-w-md text-lg text-muted-foreground">
              {INTRO_STEP.description}
            </p>
            {INTRO_STEP.hint && (
              <p className="mb-10 text-sm text-muted-foreground">
                {INTRO_STEP.hint}
              </p>
            )}
            <Button
              type="button"
              onClick={scrollToForm}
              size="lg"
              className="rounded-xl px-10"
            >
              Start
              <ArrowRight size={16} />
            </Button>
          </section>

          {/* Grouped form sections */}
          <div ref={formStartRef} className="border-t border-border">
            {sections.map((group, groupIndex) => (
              <section
                key={group.section}
                id={`section-${group.section}`}
                className={cn(
                  "scroll-mt-20 border-b border-border px-6 py-16 md:py-20",
                  groupIndex % 2 === 1 && "bg-muted/30"
                )}
              >
                <div className="mx-auto max-w-2xl">
                  <div className="mb-10">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {group.section}. {group.sectionTitle}
                    </p>
                  </div>

                  <div className="space-y-14">
                    {group.steps.map((step) => (
                      <FormStepBlock
                        key={step.id}
                        step={step}
                        form={form}
                        update={update}
                        toggleMulti={toggleMulti}
                        updateFeatureRating={updateFeatureRating}
                        hasError={invalidStepIds.includes(step.id)}
                        invalidFields={invalidFields}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Submit */}
            <section className="px-6 py-16 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  Ready to submit?
                </h2>
                <p className="mb-8 text-muted-foreground">
                  Name, company, and email required · all other fields optional
                </p>
                {submitError && (
                  <p className="mb-4 text-sm text-destructive">{submitError}</p>
                )}
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  size="lg"
                  className="rounded-xl px-10"
                >
                  {submitting ? "Submitting..." : "Submit feedback"}
                  {!submitting && <ArrowRight size={16} />}
                </Button>
              </div>
            </section>
          </div>
        </>
      )}

      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        {submitted ? "Submission complete" : "LENS ACE Demo Feedback"}
      </footer>
    </div>
  );
}

function validateFieldForForm(field, form) {
  if (field.type === "text" || field.type === "email") {
    const value = (form[field.field] || "").trim();
    if (!field.required) return true;
    if (field.type === "email") {
      return value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    return value.length > 0;
  }

  if (field.type === "textarea") {
    const value = (form[field.field] || "").trim();
    if (!field.required) return true;
    return value.length >= (field.minLength || 1);
  }

  return true;
}
