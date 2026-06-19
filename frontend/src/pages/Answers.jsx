import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Eye, EyeOff, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearAdminToken,
  fetchAdminReviews,
  getAdminToken,
  loginAdmin,
  setReviewPublished,
} from "@/lib/reviewsApi";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function ReviewCard({ review, onTogglePublish, updatingId }) {
  const [expanded, setExpanded] = useState(false);
  const quote =
    review.payload?.positiveFeedback ||
    review.payload?.topApplication ||
    review.payload?.topPriorityFeature ||
    "";

  return (
    <article className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">{review.name}</h2>
            {review.published && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-700">
                <Check size={12} />
                Published
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {[review.title, review.company].filter(Boolean).join(" · ")}
          </p>
          <p className="text-sm text-muted-foreground">{review.email}</p>
          <p className="text-xs text-muted-foreground">
            Submitted {formatDate(review.submittedAt)}
          </p>
          {quote && (
            <p className="pt-2 text-sm leading-relaxed text-foreground/90 line-clamp-3">
              &ldquo;{quote}&rdquo;
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? "Hide details" : "View details"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={review.published ? "outline" : "default"}
            disabled={updatingId === review.id}
            onClick={() => onTogglePublish(review.id, !review.published)}
          >
            {updatingId === review.id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : review.published ? (
              <>
                <EyeOff size={14} />
                Unpublish
              </>
            ) : (
              <>
                <Eye size={14} />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 space-y-4 border-t border-border pt-6">
          {[
            ["Dataset size", review.payload?.datasetSize],
            ["Tech nodes", (review.payload?.techNodes || []).join(", ")],
            ["Tools", (review.payload?.tools || []).join(", ")],
            ["Applications", (review.payload?.applications || []).join(", ")],
            ["Top application", review.payload?.topApplication],
            ["Priority feature", review.payload?.topPriorityFeature],
            ["Positive feedback", review.payload?.positiveFeedback],
            ["Concerns", review.payload?.concerns],
            ["Comparison", review.payload?.comparison],
            ["Next steps", (review.payload?.nextSteps || []).join(", ")],
          ].map(([label, value]) => {
            if (!value) return null;
            return (
              <div key={label}>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
              </div>
            );
          })}
        </div>
      )}
    </article>
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
  const [updatingId, setUpdatingId] = useState(null);

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

  const handleTogglePublish = async (id, published) => {
    setUpdatingId(id);
    try {
      const payload = await setReviewPublished(id, published);
      setReviews((current) =>
        current.map((review) =>
          review.id === id ? payload.review : review
        )
      );
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const publishedCount = reviews.filter((review) => review.published).length;

  return (
    <div className="min-h-screen bg-slate-50/50 text-foreground" data-testid="answers-page">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <img
              src={LOGO_SRC}
              alt="Lens"
              className="h-9 w-auto object-contain select-none"
              draggable={false}
            />
          </Link>
          {authed && (
            <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              Log out
            </Button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {!authed ? (
          <div className="mx-auto max-w-md">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Admin
            </p>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight">Review answers</h1>
            <p className="mb-8 text-muted-foreground">
              Enter the admin password to review demo feedback and choose what appears on the
              landing page.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Admin password"
                  className="h-11"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}
              <Button type="submit" disabled={loggingIn || !password.trim()} className="w-full">
                {loggingIn ? "Signing in..." : "Enter"}
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Admin
                </p>
                <h1 className="text-3xl font-semibold tracking-tight">Review answers</h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Publish responses to show them in the landing page reviews section. Only
                  published entries are visible publicly.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm">
                <span className="font-medium">{publishedCount}</span>
                <span className="text-muted-foreground"> published · </span>
                <span className="font-medium">{reviews.length}</span>
                <span className="text-muted-foreground"> total</span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 size={24} className="animate-spin" />
              </div>
            ) : loadError ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
                {loadError}
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center text-muted-foreground">
                No submissions yet.
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    updatingId={updatingId}
                    onTogglePublish={handleTogglePublish}
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
