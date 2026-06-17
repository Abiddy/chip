import React from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import LensLogo from "@/components/LensLogo";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const menuItems = [
  { name: "Product", href: "#product" },
  { name: "Company", href: "#company" },
  { name: "Customers", href: "#customers" },
  { name: "Resources", href: "#resources" },
];

const partners = [
  "TENSILE",
  "AXIOM-SI",
  "NORTHFIELD",
  "QUANTA LABS",
  "VERTEX MICRO",
  "CASCADE EDA",
  "ION FOUNDRY",
  "HELIX SEMI",
];

export function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header data-testid="site-nav">
      <nav
        data-state={menuState && "active"}
        className={cn(
          "group fixed z-20 w-full border-b border-border/60 transition-colors duration-150",
          scrolled && "bg-background/80 backdrop-blur-3xl"
        )}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="#" aria-label="home" className="flex items-center space-x-2">
                <LensLogo className="h-7" />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                data-testid="nav-mobile-toggle"
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        data-testid={`nav-link-${item.name.toLowerCase()}`}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap group-data-[state=active]:block lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:group-data-[state=active]:flex">
              <div className="lg:hidden" data-testid="nav-mobile-menu">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <a href="#cta" data-testid="nav-book-demo">
                    <span>Book a demo</span>
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="https://calendly.com/lenseda" target="_blank" rel="noreferrer">
                    <span>Launch workspace</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section data-testid="hero-section">
          <div className="relative pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
            <div className="mx-auto max-w-5xl px-6">
              <div className="sm:mx-auto lg:mr-auto">
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <h1
                    data-testid="hero-headline"
                    className="mt-8 max-w-2xl text-balance text-5xl font-medium tracking-tight md:text-6xl lg:mt-16"
                  >
                    Verification, at silicon speed.
                  </h1>
                  <p
                    data-testid="hero-subline"
                    className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground"
                  >
                    Lens eliminates analog verification bottlenecks at 12&nbsp;nm and
                    beyond. 100% accurate. 150&times; faster. Built from the silicon up
                    for the way modern teams tape out.
                  </p>
                  <div className="mt-12 flex items-center gap-2">
                    <div className="rounded-[14px] border border-border/60 bg-foreground/5 p-0.5">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-5 text-base"
                      >
                        <a href="#cta" data-testid="hero-book-demo">
                          <span className="text-nowrap">Book a demo</span>
                        </a>
                      </Button>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      variant="ghost"
                      className="h-[42px] rounded-xl px-5 text-base"
                    >
                      <a href="#product" data-testid="hero-secondary-cta">
                        <span className="text-nowrap">See ACE in action</span>
                      </a>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-background"
                />
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background p-4 shadow-lg shadow-zinc-950/10 ring-1 ring-border/50">
                  <img
                    className="relative aspect-[15/8] w-full rounded-2xl border border-border/25 object-cover object-top"
                    src={`${process.env.PUBLIC_URL}/ace-mock.png`}
                    alt="ACE electronic design automation workspace"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section
          id="customers"
          data-testid="trusted-by"
          className="bg-background pb-16 pt-16 md:pb-32"
        >
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <a
                href="#customers"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span>Meet our customers</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </a>
            </div>
            <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Trusted by silicon teams shipping at advanced nodes
            </p>
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:grid-cols-4 sm:gap-x-16 sm:gap-y-14 group-hover:blur-[2px]">
              {partners.map((partner) => (
                <div key={partner} className="flex">
                  <span className="mx-auto text-sm font-semibold tracking-wide text-muted-foreground/70">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
