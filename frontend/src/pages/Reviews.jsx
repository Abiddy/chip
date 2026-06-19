import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BentoCard } from "@/components/ui/bento-grid";
import {
  FEATURES,
  FORM_STEPS,
  INITIAL_FORM,
  TOTAL_QUESTIONS,
  validateStep,
} from "@/data/reviewFormSteps";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.svg`;

const STORAGE_KEY = "lens-review-submissions";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

function saveMockSubmission(data) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const submission = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status: "pending",
    formType: "ace-demo-feedback",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));
  return submission;
}

function SectionLabel({ step }) {
  if (step.type === "intro") return null;

  let questionLabel;
  if (step.questionStart && step.questionEnd) {
    questionLabel =
      step.questionStart === step.questionEnd
        ? `Question ${step.questionStart} of ${TOTAL_QUESTIONS}`
        : `Questions ${step.questionStart}–${step.questionEnd} of ${TOTAL_QUESTIONS}`;
  } else if (step.questionNum) {
    questionLabel = `Question ${step.questionNum} of ${TOTAL_QUESTIONS}`;
  }

  return (
    <div className="mb-3">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {step.section}. {step.sectionTitle}
      </p>
      {questionLabel && (
        <p className="mt-1 text-sm text-muted-foreground">{questionLabel}</p>
      )}
    </div>
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
          autoFocus
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
      <p className="text-xs text-muted-foreground">
        1 = not relevant · 5 = critical
      </p>
    </div>
  );
}

function GroupFields({ fields, form, update }) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.field}>
          <label className="mb-2 block text-sm font-medium">{field.label}</label>
          {(field.type === "text" || field.type === "email") && (
            <Input
              type={field.type === "email" ? "email" : "text"}
              value={form[field.field]}
              onChange={(e) => update(field.field, e.target.value)}
              placeholder={field.placeholder}
              className="h-12 text-base"
            />
          )}
          {field.type === "textarea" && (
            <Textarea
              value={form[field.field]}
              onChange={(e) => update(field.field, e.target.value)}
              placeholder={field.placeholder}
              className="min-h-[100px] resize-none text-base"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepContent({ step, form, update, toggleMulti, updateFeatureRating }) {
  if (step.type === "intro") {
    return (
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          LENS ACE Demo
        </p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {step.title}
        </h1>
        <p className="mx-auto mb-4 max-w-md text-lg text-muted-foreground">
          {step.description}
        </p>
        {step.hint && (
          <p className="text-sm text-muted-foreground">{step.hint}</p>
        )}
      </div>
    );
  }

  if (step.type === "group") {
    return (
      <div>
        <SectionLabel step={step} />
        <GroupFields fields={step.fields} form={form} update={update} />
      </div>
    );
  }

  return (
    <div>
      <SectionLabel step={step} />
      <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
        {step.label}
      </h2>

      {step.hint && (
        <p className="-mt-4 mb-4 text-sm text-muted-foreground">{step.hint}</p>
      )}

      {(step.type === "text" || step.type === "email") && (
        <Input
          autoFocus
          type={step.type === "email" ? "email" : "text"}
          value={form[step.field]}
          onChange={(e) => update(step.field, e.target.value)}
          placeholder={step.placeholder}
          className="h-12 text-base"
        />
      )}

      {step.type === "textarea" && (
        <>
          <Textarea
            autoFocus
            value={form[step.field]}
            onChange={(e) => update(step.field, e.target.value)}
            placeholder={step.placeholder}
            className="min-h-[140px] resize-none text-base md:text-lg"
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
    </div>
  );
}

export default function Reviews() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const step = FORM_STEPS[stepIndex];
  const totalSteps = FORM_STEPS.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const progress = submitted ? 100 : ((stepIndex + 1) / totalSteps) * 100;
  const isTextareaStep = step?.type === "textarea";
  const isFeatureStep = step?.type === "featureMatrix";
  const isGroupStep = step?.type === "group";
  const isScrollableStep = isFeatureStep || isGroupStep;
  const allowEnterContinue =
    !isTextareaStep &&
    !isFeatureStep &&
    step?.type !== "multi" &&
    !(isGroupStep && step.id === "pilotAndFollowUp");

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

  const canContinue = () => validateStep(step, form);

  const goNext = () => {
    if (isLastStep) {
      saveMockSubmission(form);
      setSubmitted(true);
      return;
    }
    setDirection(1);
    setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && allowEnterContinue && canContinue()) {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground"
      data-testid="reviews-page"
      onKeyDown={handleKeyDown}
    >
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link to="/" className="flex items-center">
          <img
            src={LOGO_SRC}
            alt="Lens"
            className="h-7 w-auto select-none"
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

      <div className="h-1 w-full bg-muted">
        <motion.div
          className="h-full bg-foreground"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <main
        className={cn(
          "relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12",
          isScrollableStep ? "justify-start overflow-y-auto" : "justify-center"
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={32} />
              </div>
              <h1 className="mb-3 text-3xl font-semibold tracking-tight">
                Thank you!
              </h1>
              <p className="mb-8 text-muted-foreground">
                Your feedback has been saved. We really appreciate you taking
                the time after the demo — it directly shapes our roadmap.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Return to homepage</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={step.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <StepContent
                step={step}
                form={form}
                update={update}
                toggleMulti={toggleMulti}
                updateFeatureRating={updateFeatureRating}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!submitted && (
          <div className="mt-12 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={stepIndex === 0}
              className={cn(stepIndex === 0 && "invisible")}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              type="button"
              onClick={goNext}
              disabled={!canContinue()}
              size="lg"
              className="rounded-xl px-8"
            >
              {isLastStep ? "Submit" : stepIndex === 0 ? "Start" : "Continue"}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </main>

      <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
        {submitted ? (
          "Submission complete"
        ) : (
          <>
            Step {stepIndex + 1} of {totalSteps}
            {allowEnterContinue && " · Press Enter to continue"}
          </>
        )}
      </footer>
    </div>
  );
}
