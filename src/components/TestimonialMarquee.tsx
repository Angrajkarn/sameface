"use client";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  badge?: string;
}

interface Props {
  testimonials: readonly Testimonial[];
  isIndic?: boolean;
}

export default function TestimonialMarquee({ testimonials, isIndic }: Props) {
  // Double the list so it scrolls seamlessly in an infinite loop
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-black relative overflow-hidden border-t border-b border-zinc-900">
      <div className="text-center max-w-xl mx-auto mb-8 px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
          {isIndic ? "क्रिएटर्स की प्रतिक्रिया (Early Alpha Feedback)" : "Early Alpha Feedback"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          {isIndic ? "क्रिएटर्स सेमफेस को क्यों चुन रहे हैं" : "Why Creators Are Reserving Founder Passes"}
        </h3>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Marquee Track */}
        <div className="home-marquee-track flex gap-4 px-4 py-2">
          {duplicated.map((item, idx) => (
            <figure
              key={idx}
              className="relative w-72 sm:w-80 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 backdrop-blur-sm hover:border-blue-500/40 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center text-lg">
                  {item.avatar}
                </div>
                <div>
                  <figcaption className="text-sm font-bold text-white">
                    {item.name}
                  </figcaption>
                  <p className="text-xs text-blue-400 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
              <blockquote className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
