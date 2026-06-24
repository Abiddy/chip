export const FEATURES = [
  { key: "pipelineSpeedup", label: "Pipeline speedup (e.g. 204× on large DSPF)" },
  { key: "accuracyPreservation", label: "Accuracy preservation post-reduction" },
  { key: "multiCorner", label: "Multi-corner generation without re-extraction" },
  { key: "zoneCoupling", label: "Zone-based / surgical coupling control" },
  { key: "circuitAbstraction", label: "Circuit abstraction to portable .SUBCKT" },
  { key: "scalability", label: "Scalability to 100 GB+ datasets" },
  { key: "uiUsability", label: "Intuitive, easy-to-use UI & workflow" },
  { key: "pdkAgnostic", label: "PDK-agnostic / node-agnostic deployment" },
  { key: "flowIntegration", label: "Integration into existing StarRC / Quantus flow" },
];

export const INITIAL_FORM = {
  name: "",
  title: "",
  company: "",
  team: "",
  email: "",
  datasetSize: "",
  techNodes: [],
  techNodesOther: "",
  tools: [],
  toolsOther: "",
  applications: [],
  applicationsOther: "",
  topApplication: "",
  featureRatings: {},
  topPriorityFeature: "",
  positiveFeedback: "",
  concerns: "",
  comparison: "",
  nextSteps: [],
  pilotDataset: "",
  followUpContact: "",
};

/** Demo Feedback fields that may be published on the landing page (admin-controlled). */
export const PUBLISHABLE_REVIEW_FIELDS = [
  {
    field: "positiveFeedback",
    label: "What stood out most positively in the demo?",
    shortLabel: "Positive feedback",
  },
  {
    field: "concerns",
    label: "What concerns, gaps, or missing capabilities did you notice?",
    shortLabel: "Concerns & gaps",
  },
  {
    field: "comparison",
    label: "How does ACE compare to how you handle this today?",
    shortLabel: "Comparison",
  },
];

export const PUBLISHABLE_FIELD_KEYS = new Set(
  PUBLISHABLE_REVIEW_FIELDS.map(({ field }) => field)
);

export const PUBLISH_DISCLAIMER =
  "Your response may be selected and featured on our website with attribution (name and company). Contact details are never published without your permission.";

export const FORM_STEPS = [
  {
    id: "intro",
    type: "intro",
    title: "LENS Demo Feedback",
    description:
      "Thank you for evaluating ACE. Your input directly shapes our roadmap and deployment plan.",
    hint: "~5 minutes",
  },
  // 1. Your Details (questions 1–5)
  {
    id: "yourDetails",
    section: "1",
    sectionTitle: "Your Details",
    type: "group",
    questionStart: 1,
    questionEnd: 5,
    fields: [
      {
        type: "text",
        field: "name",
        label: "Name",
        placeholder: "Jane Smith",
        required: true,
      },
      {
        type: "text",
        field: "title",
        label: "Title / Role",
        placeholder: "Director of Verification",
      },
      {
        type: "text",
        field: "company",
        label: "Company",
        placeholder: "Acme Semiconductor",
        required: true,
      },
      {
        type: "text",
        field: "team",
        label: "Team / Group (optional)",
        placeholder: "Analog Sign-off",
      },
      {
        type: "email",
        field: "email",
        label: "Email",
        placeholder: "jane@company.com",
        required: true,
      },
    ],
  },
  // 2. Your Environment
  {
    id: "datasetSize",
    section: "2",
    sectionTitle: "Your Environment",
    questionNum: 6,
    type: "single",
    field: "datasetSize",
    label: "Largest parasitic dataset you regularly work with (DSPF / SPEF size)?",
    options: [
      "< 5 GB",
      "5 – 20 GB",
      "20 – 50 GB",
      "50 – 100 GB",
      "100 GB – 1 TB",
      "> 1 TB",
    ],
  },
  {
    id: "techNodes",
    section: "2",
    sectionTitle: "Your Environment",
    questionNum: 7,
    type: "multi",
    field: "techNodes",
    otherField: "techNodesOther",
    label: "Primary technology node(s)?",
    hint: "Check all that apply",
    options: [
      "180 nm / 130 nm",
      "65 nm / 40 nm",
      "28 nm / 22 nm",
      "16 nm / 12 nm FinFET",
      "7 nm / 5 nm",
      "Other",
    ],
  },
  {
    id: "tools",
    section: "2",
    sectionTitle: "Your Environment",
    questionNum: 8,
    type: "multi",
    field: "tools",
    otherField: "toolsOther",
    label: "Extraction & simulation tools in your flow?",
    hint: "Check all that apply",
    options: [
      "StarRC",
      "Quantus",
      "Calibre xACT / PEX",
      "Spectre / Spectre X",
      "PrimeSim",
      "HSPICE",
      "Other",
    ],
  },
  // 3. Most Likely Applications
  {
    id: "applications",
    section: "3",
    sectionTitle: "Most Likely Applications",
    questionNum: 9,
    type: "multi",
    field: "applications",
    otherField: "applicationsOther",
    label: "Where would you use ACE first?",
    hint: "Check all that apply",
    options: [
      "Post-layout verification corner generation (R/C scaling, trimming)",
      "Parasitic reduction without re-extraction",
      "Signal-path abstraction to simulation-ready .SUBCKT (ABS mode)",
      "Coupling-controlled what-if analysis",
      "Netlist size reduction / simulation runtime savings",
      "RF / mixed-signal block sign-off",
      "Regression / CI integration for verification",
      "Other",
    ],
  },
  {
    id: "topApplication",
    section: "3",
    sectionTitle: "Most Likely Applications",
    questionNum: 10,
    type: "textarea",
    field: "topApplication",
    label:
      "Which single application would deliver the most value to your team, and why?",
    placeholder: "Tell us about the highest-impact use case...",
  },
  // 4. Feature Importance
  {
    id: "featureImportance",
    section: "4",
    sectionTitle: "Feature Importance",
    questionNum: 11,
    type: "featureMatrix",
    label: "Rate how valuable each capability is to you",
    subheading: "1 = not relevant, 5 = critical",
  },
  {
    id: "topPriorityFeature",
    section: "4",
    sectionTitle: "Feature Importance",
    questionNum: 12,
    type: "textarea",
    field: "topPriorityFeature",
    label:
      "If we could deliver one capability first, which would create the most value for your team — and why?",
    placeholder:
      "e.g. Multi-corner generation without re-extraction would cut our sign-off cycle significantly...",
  },
  // 5. Demo Feedback
  {
    id: "positiveFeedback",
    section: "5",
    sectionTitle: "Demo Feedback",
    questionNum: 13,
    type: "textarea",
    field: "positiveFeedback",
    label: "What stood out most positively in the demo?",
    publishable: true,
  },
  {
    id: "concerns",
    section: "5",
    sectionTitle: "Demo Feedback",
    questionNum: 14,
    type: "textarea",
    field: "concerns",
    label: "What concerns, gaps, or missing capabilities did you notice?",
    publishable: true,
  },
  {
    id: "comparison",
    section: "5",
    sectionTitle: "Demo Feedback",
    questionNum: 15,
    type: "textarea",
    field: "comparison",
    label: "How does ACE compare to how you handle this today?",
    publishable: true,
  },
  // 6. Next Steps
  {
    id: "nextSteps",
    section: "6",
    sectionTitle: "Next Steps",
    questionNum: 16,
    type: "multi",
    field: "nextSteps",
    label: "What would you like to happen next?",
    hint: "Check all that apply",
    options: [
      "Technical deep-dive with our engineering team",
      "Evaluation / pilot on our own design data",
      "Pricing & licensing discussion",
      "Share with colleagues internally — send materials",
      "Not a fit right now",
    ],
  },
  // 6. Next Steps (questions 16–17)
  {
    id: "pilotAndFollowUp",
    section: "6",
    sectionTitle: "Next Steps",
    type: "group",
    questionStart: 17,
    questionEnd: 18,
    fields: [
      {
        type: "textarea",
        field: "pilotDataset",
        label:
          "If you would run a pilot, which design block / dataset would you use?",
      },
      {
        type: "textarea",
        field: "followUpContact",
        label: "Best contact and timeframe for follow-up",
        placeholder: "e.g. jane@company.com — available next week",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = 18;

export function getFormSections() {
  const sections = [];

  for (const step of FORM_STEPS) {
    if (step.type === "intro") continue;

    const last = sections[sections.length - 1];
    if (!last || last.section !== step.section) {
      sections.push({
        section: step.section,
        sectionTitle: step.sectionTitle,
        steps: [step],
      });
    } else {
      last.steps.push(step);
    }
  }

  return sections;
}

export function validateAllForm(form) {
  const invalidStepIds = [];

  for (const step of FORM_STEPS) {
    if (step.type === "intro") continue;
    if (!validateStep(step, form)) {
      invalidStepIds.push(step.id);
    }
  }

  return invalidStepIds;
}

function validateField(field, form) {
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

export function validateStep(step, form) {
  if (step.type === "intro") return true;

  if (step.type === "group") {
    return step.fields.every((field) => validateField(field, form));
  }

  if (step.type === "text" || step.type === "email") {
    return validateField(step, form);
  }

  if (step.type === "single") {
    return step.required ? Boolean(form[step.field]) : true;
  }

  if (step.type === "multi") {
    const selected = form[step.field] || [];
    if (!step.required) return true;
    if (selected.length === 0) return false;
    if (selected.includes("Other") && step.otherField) {
      return (form[step.otherField] || "").trim().length > 0;
    }
    return true;
  }

  if (step.type === "textarea") {
    const value = (form[step.field] || "").trim();
    if (!step.required) return true;
    return value.length >= (step.minLength || 1);
  }

  if (step.type === "featureMatrix") {
    return true;
  }

  return true;
}

function hasDisplayValue(value) {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "number") return true;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return false;
}

function formatDisplayValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "number") return String(value);
  return String(value).trim();
}

function formatMultiFieldValue(payload, field, otherField) {
  const selected = payload[field] || [];
  if (!Array.isArray(selected) || selected.length === 0) return null;

  return selected
    .map((option) => {
      if (option === "Other" && otherField) {
        const other = (payload[otherField] || "").trim();
        return other ? `Other: ${other}` : "Other";
      }
      return option;
    })
    .join(", ");
}

/**
 * Builds admin-facing sections from a stored submission payload,
 * mirroring every question in FORM_STEPS that has an answer.
 */
export function getAdminReviewDetailSections(payload = {}) {
  const sectionMap = new Map();

  const addRow = (sectionTitle, label, value) => {
    if (!hasDisplayValue(value)) return;

    if (!sectionMap.has(sectionTitle)) {
      sectionMap.set(sectionTitle, []);
    }

    sectionMap.get(sectionTitle).push({
      label,
      value: formatDisplayValue(value),
    });
  };

  for (const step of FORM_STEPS) {
    if (step.type === "intro") continue;

    const sectionTitle = step.sectionTitle || "Other";

    if (step.type === "group") {
      for (const field of step.fields) {
        addRow(sectionTitle, field.label, payload[field.field]);
      }
      continue;
    }

    if (step.type === "featureMatrix") {
      const ratings = payload.featureRatings || {};
      for (const feature of FEATURES) {
        const rating = ratings[feature.key];
        if (rating != null && rating !== "") {
          addRow(sectionTitle, feature.label, `${rating} / 5`);
        }
      }
      continue;
    }

    if (step.type === "multi") {
      addRow(
        sectionTitle,
        step.label,
        formatMultiFieldValue(payload, step.field, step.otherField)
      );
      continue;
    }

    if (step.field) {
      addRow(sectionTitle, step.label, payload[step.field]);
    }
  }

  return Array.from(sectionMap.entries())
    .map(([sectionTitle, rows]) => ({ sectionTitle, rows }))
    .filter(({ rows }) => rows.length > 0);
}
