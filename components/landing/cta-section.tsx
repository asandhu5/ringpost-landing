"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Magnetic,
  Parallax,
  Reveal,
  SplitText,
} from "@/components/landing/motion/primitives";
import { BOOKING_URL } from "@/lib/site";

export function CtaSection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="contact" className="relative z-10 overflow-hidden py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal distance={40} duration={1100}>
          <div
            className="relative border border-foreground"
            onMouseMove={handleMouseMove}
          >
            {/* cursor spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(236,168,214,0.10), transparent 45%)`,
              }}
            />

            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
              <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                <div className="flex-1">
                  <h2 className="mb-8 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[72px]">
                    <SplitText text={["Stop losing", "customers"]} stagger={55} />
                    <SplitText
                      text="to a ringing phone."
                      delay={220}
                      stagger={55}
                      className="text-muted-foreground"
                    />
                  </h2>

                  <Reveal delay={280}>
                    <p className="mb-12 max-w-xl text-xl leading-relaxed text-muted-foreground">
                      We set RingPost up for one business at a time — connecting
                      your channels, loading your real services, prices and
                      hours, and hooking it up to your calendar. Book a call and
                      we&apos;ll walk you through it.
                    </p>
                  </Reveal>

                  <Reveal delay={380}>
                    <div className="flex flex-col items-start gap-4 sm:flex-row">
                      <Magnetic strength={0.3}>
                        <Button
                          asChild
                          size="lg"
                          className="group h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
                        >
                          <a href={BOOKING_URL}>
                            Book a call
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </Magnetic>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-14 rounded-full border-foreground/20 px-8 text-base hover:bg-foreground/5"
                      >
                        <a href="#how-it-works">See how it works</a>
                      </Button>
                    </div>
                  </Reveal>

                  <Reveal delay={460}>
                    <p className="mt-8 font-mono text-sm text-muted-foreground">
                      Set up for you — nothing to install, nothing to configure.
                    </p>
                  </Reveal>
                </div>

                {/* Right image */}
                <div className="-mr-16 hidden h-[650px] w-[600px] items-end justify-center lg:flex">
                  <Parallax speed={0.1} className="h-full w-full">
                    <img
                      src="/images/bridge.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain object-bottom"
                    />
                  </Parallax>
                </div>
              </div>
            </div>

            {/* corner rules */}
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 border-r border-t border-foreground/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
