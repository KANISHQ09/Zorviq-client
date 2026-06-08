"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const testimonials = [
  {
    id: 1,
    quote: "Zorviq helped us launch a polished AI-generated landing page before our sprint review.",
    author: "Sarah Chen",
    role: "Designer at Figma",
    avatar:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "The no-code website workflow feels fast enough for experiments and polished enough for production.",
    author: "Marcus Johnson",
    role: "Engineer at Vercel",
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "We moved from blank-page planning to a working website preview in minutes.",
    author: "Elena Rodriguez",
    role: "Founder at Craft",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);

  const handleSelect = useCallback((index: number) => {
    if (index === activeIndex || isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote);
      setDisplayedRole(testimonials[index].role);
      setActiveIndex(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 200);
  }, [activeIndex, isAnimating]);

  return (
    <section
      id="community"
      aria-labelledby="testimonials-heading"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center w-full">

        {/* Badge */}
        <span
          className="badge"
          style={{
            marginBottom: 12,
            display: "inline-flex",
          }}
        >
          <span className="badge-dot" />
          Testimonials
        </span>

        {/* Heading */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2
            id="testimonials-heading"
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#F2F2F2",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              margin: "0 0 10px",
              textAlign: "center",
            }}
          >
            What our{" "}
            <span
              style={{
                background:
                  "linear-gradient(128deg,#EDE9FE 0%,#C4B5FD 22%,#A78BFA 48%,#8B5CF6 74%,#7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              users say
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-400 text-center">
            See how founders, designers, and marketers use Zorviq to create AI-generated websites faster.
          </p>
        </div>

        {/* Testimonial Area */}
        <div className="w-full max-w-6xl flex flex-col items-center justify-center text-center gap-14 mt-24">

          {/* Quote */}
          <div className="relative flex items-center justify-center w-full min-h-[220px]">

            {/* Opening Quote */}
            <span
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-[140px] text-white/25 leading-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="max-w-4xl px-6 md:px-10">
              <p
                className={cn(
                  "text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight text-center transition-all duration-300",
                  isAnimating
                    ? "opacity-0 blur-sm scale-95"
                    : "opacity-100 blur-0 scale-100"
                )}
                style={{
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {displayedQuote}
              </p>
            </div>

            {/* Closing Quote */}
            <span
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-[140px] text-white/25 leading-none select-none"
              aria-hidden="true"
            >
              &rdquo;
            </span>
          </div>

          {/* Role */}
          <div className="min-h-[24px] flex items-center justify-center">
            <p
              className={cn(
                "uppercase tracking-[0.35em] text-xs text-neutral-500 text-center transition-all duration-300",
                isAnimating
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              )}
            >
              {displayedRole}
            </p>
          </div>

          {/* Avatars */}
          <div className="flex flex-col items-center gap-8">

            {/* Avatar Row */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {testimonials.map((testimonial, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={testimonial.id}
                    onClick={() => handleSelect(index)}
                    className={cn(
                      "relative transition-all duration-300",
                      isActive ? "scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.author}, Zorviq AI website builder customer`}
                      width={64}
                      height={64}
                      sizes="64px"
                      className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-full object-cover transition-all duration-300",
                        isActive
                          ? "ring-4 ring-white shadow-2xl"
                          : "ring-1 ring-white/10"
                      )}
                    />

                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active User Card */}
            <div
              className={cn(
                "transition-all duration-300",
                isAnimating
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              )}
            >
              <h4
                className="
      text-white
      text-xl
      md:text-2xl
      font-semibold
      tracking-tight
    "
              >
                {testimonials[activeIndex].author}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
