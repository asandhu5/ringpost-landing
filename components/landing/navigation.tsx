"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/landing/motion/primitives";
import { BOOKING_URL, LOGIN_URL, NAV_LINKS } from "@/lib/site";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll-spy: highlights whichever section is currently centred. */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the full-screen mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed z-[69] transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/70 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Wordmark */}
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <span
              className={`font-display tracking-tight transition-all duration-500 ${
                isScrolled ? "text-xl text-foreground" : "text-2xl text-white"
              }`}
            >
              RingPost
            </span>
            <span
              className={`font-mono transition-all duration-500 ${
                isScrolled
                  ? "text-[10px] mt-0.5 text-muted-foreground"
                  : "text-xs mt-1 text-white/60"
              }`}
            >
              &trade;
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm transition-colors duration-300 relative group whitespace-nowrap ${
                    isScrolled
                      ? isActive
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                      : isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px transition-all duration-500 ${
                      isActive
                        ? "w-full bg-[var(--brand-pink)]"
                        : `w-0 group-hover:w-full ${
                            isScrolled ? "bg-foreground" : "bg-white"
                          }`
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA — "Sign in" stays a quiet text link so it serves
              existing customers without competing with the primary action
              for a first-time visitor's attention. */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <a
              href={LOGIN_URL}
              className={`text-sm transition-colors duration-300 whitespace-nowrap ${
                isScrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Sign in
            </a>

            <Magnetic strength={0.28}>
              <Button
                asChild
                size="sm"
                className={`rounded-full transition-all duration-500 ${
                  isScrolled
                    ? "bg-foreground hover:bg-foreground/90 text-background px-5 h-8 text-xs"
                    : "bg-white hover:bg-white/90 text-black px-6"
                }`}
              >
                <a href={BOOKING_URL}>Book a call</a>
              </Button>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-[69] transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[12vw] leading-[1.05] font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-4 blur-sm"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 70}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              variant="outline"
              className="flex-1 border-foreground/20 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href={LOGIN_URL}>Sign in</a>
            </Button>

            <Button
              asChild
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href={BOOKING_URL}>Book a call</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
