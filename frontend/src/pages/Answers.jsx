import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Inbox,
  Loader2,
  Lock,
  LogOut,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  clearAdminToken,
  fetchAdminReviews,
  getAdminToken,
  loginAdmin,
  setReviewFieldPublished,
} from "@/lib/reviewsApi";
import { PUBLISHABLE_REVIEW_FIELDS } from "@/data/reviewFormSteps";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function StatCard({ label, value, hint, accent = "default" }) {
  const accents = {
    default: "border-border bg-white",
    published: "border-emerald-200/80 bg-emerald-50/50",
    draft: "border-slate-200 bg-slate-50/80",
  };

  return (
    <Card className={cn("shadow-sm", accents[accent])}>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function ReviewCard({ review, onToggleFieldPublish, updatingKey }) {
  const [expanded, setExpanded] = useState(false);
  const publishedFields = review.publishedFields || {};

  const previewQuote = PUBLISHABLE_REVIEW_FIELDS.map(({ field }) => {
    if (!publishedFields[field]) return null;
    return (review.payload?.[field] || "").trim();
  }).find(Boolean);

  const privateDetailFields = [
    ["Title", review.title],
    ["Team", review.payload?.team],
    ["Dataset size", review.payload?.datasetSize],
    ["Tech nodes", (review.payload?.techNodes || []).join(", ")],
    ["Tools", (review.payload?.tools || []).join(", ")],
    ["Applications", (review.payload?.applications || []).join(", ")],
    ["Top application", review.payload?.topApplication],
    ["Priority feature", review.payload?.topPriorityFeature],
    ["Next steps", (review.payload?.nextSteps || []).join(", ")],
    ["Pilot dataset", review.payload?.pilotDataset],
    ["Follow-up contact", review.payload?.followUpContact],
  ].filter(([, value]) => value);

  const liveCount = PUBLISHABLE_REVIEW_FIELDS.filter(
    ({ field }) => publishedFields[field] && (review.payload?.[field] || "").trim()
  ).length;

  return (
    <Card
      className={cn(
        "overflow-hidden shadow-sm transition-shadow hover:shadow-md",
        review.published && "border-emerald-200/70"
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 gap-4">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                review.published
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-700"
              )}
            >
              {getInitials(review.name) || "?"}
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight">{review.name}</h2>
                {review.published && (
                  <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
                    <Check size={12} className="mr-1" />
                    {liveCount} live on site
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {review.company && (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 size={14} />
                    {review.company}
                  </span>
                )}
                {review.title && (
                  <span className="inline-flex items-center gap-1.5">
                    <FileText size={14} />
                    {review.title}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={14} />
                  {review.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(review.submittedAt)}
                </span>
              </div>

              {previewQuote && (
                <blockquote className="border-l-2 border-teal-500/40 pl-4 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{previewQuote}&rdquo;
                </blockquote>
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col lg:items-stretch">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setExpanded((open) => !open)}
              className="justify-between"
            >
              {expanded ? "Hide full response" : "View full response"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
        </div>

        <div className="border-t border-border bg-slate-50/60 px-6 py-6">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Publish to website
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Only Demo Feedback responses (questions 13–15) can appear on the landing page.
            </p>
          </div>

          <div className="space-y-4">
            {PUBLISHABLE_REVIEW_FIELDS.map(({ field, label, shortLabel }) => {
              const answer = (review.payload?.[field] || "").trim();
              const isLive = Boolean(publishedFields[field]);
              const updateKey = `${review.id}:${field}`;

              return (
                <div
                  key={field}
                  className={cn(
                    "rounded-lg border bg-white p-4",
                    isLive ? "border-emerald-200/80" : "border-border/60"
                  )}
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {shortLabel}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground/90">{label}</p>
                    </div>
                    {isLive && (
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                        Live
                      </Badge>
                    )}
                  </div>

                  {answer ? (
                    <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                      {answer}
                    </p>
                  ) : (
                    <p className="mb-4 text-sm italic text-muted-foreground">No response provided.</p>
                  )}

                  <Button
                    type="button"
                    size="sm"
                    variant={isLive ? "outline" : "default"}
                    disabled={!answer || updatingKey === updateKey}
                    onClick={() => onToggleFieldPublish(review.id, field, !isLive)}
                  >
                    {updatingKey === updateKey ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : isLive ? (
                      <>
                        <EyeOff size={14} />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        Publish to site
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {expanded && privateDetailFields.length > 0 && (
          <div className="border-t border-border bg-white px-6 py-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Full response (private)
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {privateDetailFields.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border/60 bg-slate-50/60 p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Answers() {
  const [authed, setAuthed] = useState(Boolean(getAdminToken()));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [updatingKey, setUpdatingKey] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const payload = await fetchAdminReviews();
      setReviews(payload.reviews || []);
      setAuthed(true);
    } catch (error) {
      if (getAdminToken()) {
        setLoadError(error.message);
      } else {
        setAuthed(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (getAdminToken()) {
      loadReviews();
    }
  }, [loadReviews]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      await loginAdmin(password);
      setPassword("");
      await loadReviews();
    } catch (error) {
      setLoginError(error.message);
      setAuthed(false);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setAuthed(false);
    setReviews([]);
  };

  const handleToggleFieldPublish = async (id, field, published) => {
    setUpdatingKey(`${id}:${field}`);
    try {
      const payload = await setReviewFieldPublished(id, field, published);
      setReviews((current) =>
        current.map((review) => (review.id === id ? payload.review : review))
      );
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setUpdatingKey(null);
    }
  };

  const publishedCount = reviews.filter((review) => review.published).length;
  const draftCount = reviews.length - publishedCount;

  const filteredReviews = useMemo(() => {
    if (filter === "published") {
      return reviews.filter((review) => review.published);
    }
    if (filter === "draft") {
      return reviews.filter((review) => !review.published);
    }
    return reviews;
  }, [filter, reviews]);

  return (
    <div
      className="min-h-screen bg-[#f4f7fb] text-foreground"
      data-testid="answers-page"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.08),_transparent_60%)]" />

      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Home" className="inline-flex items-center">
              <img
                src={LOGO_SRC}
                alt="Lens"
                className="h-9 w-auto object-contain select-none"
                draggable={false}
              />
            </Link>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <Badge variant="outline" className="hidden sm:inline-flex">
              Admin portal
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <Globe size={16} />
                View site
              </Link>
            </Button>
            {authed && (
              <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                Log out
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        {!authed ? (
          <div className="mx-auto max-w-md pt-8 md:pt-16">
            <Card className="border-border/80 shadow-lg shadow-slate-200/50">
              <CardHeader className="space-y-4 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Lock size={24} />
                </div>
                <div>
                  <CardTitle className="text-2xl">Review answers</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed">
                    Sign in to review demo feedback and choose what appears on the
                    landing page.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="admin-password"
                      className="mb-2 block text-sm font-medium"
                    >
                      Admin password
                    </label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                      className="h-11"
                      autoFocus
                    />
                  </div>
                  {loginError && (
                    <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {loginError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={loggingIn || !password.trim()}
                    className="h-11 w-full"
                  >
                    {loggingIn ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                Demo feedback
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Review answers
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                Review full submissions privately. Publish individual Demo Feedback
                responses (questions 13–15) to the Customer Voices section on the homepage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total submissions" value={reviews.length} hint="All time" />
              <StatCard
                label="Published"
                value={publishedCount}
                hint="Submissions with at least one live quote"
                accent="published"
              />
              <StatCard
                label="Draft"
                value={draftCount}
                hint="Not yet public"
                accent="draft"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex rounded-lg border border-border bg-white p-1 shadow-sm">
                {[
                  ["all", "All"],
                  ["published", "Published"],
                  ["draft", "Draft"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={cn(
                      "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      filter === key
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={loadReviews}
                disabled={loading}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : "Refresh"}
              </Button>
            </div>

            {loading ? (
              <Card className="shadow-sm">
                <CardContent className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
                  <Loader2 size={22} className="animate-spin" />
                  Loading submissions...
                </CardContent>
              </Card>
            ) : loadError ? (
              <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
                <CardContent className="py-6 text-sm text-destructive">{loadError}</CardContent>
              </Card>
            ) : filteredReviews.length === 0 ? (
              <Card className="border-dashed shadow-sm">
                <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <Inbox size={24} />
                  </div>
                  <h2 className="text-lg font-semibold">
                    {reviews.length === 0 ? "No submissions yet" : "No matching submissions"}
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {reviews.length === 0
                      ? "When users submit the demo feedback form, their responses will appear here."
                      : "Try switching filters to see other submissions."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    updatingKey={updatingKey}
                    onToggleFieldPublish={handleToggleFieldPublish}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
