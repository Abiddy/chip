import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { fetchPublishedReviews } from "@/lib/reviewsApi";

const LENS_WATERMARK = `${process.env.PUBLIC_URL}/lens-logo.png`;

export default function PublishedReviews() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchPublishedReviews()
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || reviews.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      data-testid="published-reviews-section"
      className="relative overflow-hidden border-y border-border bg-slate-50/50 py-24 md:py-32"
    >
      <SectionWatermark
        src={LENS_WATERMARK}
        position="top-right"
        size="sm"
        imageClassName="opacity-[0.03] md:opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          label="07 — Customer Voices"
          title={
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              What teams are saying after the demo
            </h2>
          }
          description="Selected feedback from ACE evaluation sessions — published with permission."
        />

        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((review) => (
            <BentoCard key={review.id} hideFooter className="h-full">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Quote size={16} className="mt-1 shrink-0 text-teal-600" />
                  <p className="line-clamp-6 text-base font-medium leading-relaxed text-gray-900">
                    {review.quote}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">
                    {[review.title, review.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
