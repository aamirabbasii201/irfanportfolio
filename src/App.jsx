import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BarChart3,
  Briefcase,
  Check,
  CheckCircle,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Flag,
  Layers3,
  Lightbulb,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MousePointer2,
  Quote,
  Rocket,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

/* ==========================================================================
   CONFIG: everything you normally edit lives in this section
   ========================================================================== */

const PROFILE = {
  name: "Irfan Asghar",
  initials: "IA",
  // Put your photo in  public/images/  and set the file name here.
  // Best: portrait, about 800 x 1000 px, .jpg or .webp
  photo: "/images/irfan.webp",
  role: "Senior Marketing Professional",
  headline: "I Build Brands That Move Businesses Forward.",
  email: "irfanasghar@marketing.com",
  phone: "+92 300 1234567",
  whatsapp: "923001234567",
  location: "Rawalpindi & Islamabad, Pakistan",
  availability: "Available For Q1 2027 Projects",
  linkedin: "https://www.linkedin.com/in/irfan-asghar-3a8722173/",
  instagram: "https://instagram.com/irfanasghar",
  facebook: "https://facebook.com/irfanasghar",
  twitter: "https://twitter.com/irfanasghar",
};

/**
 * Contact form delivery (Formspree). Messages are emailed to the address
 * connected to this form in your Formspree dashboard.
 * If this is ever left empty, the form falls back to the visitor's email app.
 */
const FORM_ENDPOINT = "https://formspree.io/f/mljgpvvw";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Focus Areas", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Approach", href: "#approach" },
];

/* ==========================================================================
   CONTENT
   NOTE: figures, awards, testimonials and the "trusted by" names below are
   placeholder copy. Replace them with real, verifiable information before
   this goes live.
   ========================================================================== */

const STATS = [
  { number: 150, suffix: "+", label: "Projects Delivered" },
  { number: 12, suffix: "+", label: "Years Experience" },
  { number: 98, suffix: "%", label: "Client Satisfaction" },
  { number: 3.8, suffix: "x", label: "Average ROAS" },
];

const ABOUT_HIGHLIGHTS = [
  { icon: Award, label: "Award-Winning Campaigns" },
  { icon: Users, label: "50+ Happy Clients" },
  { icon: BarChart3, label: "Data-Driven Results" },
];

const PRINCIPLES = [
  {
    icon: Target,
    title: "Think Strategically.",
    copy: "Every decision starts with the business goal, the audience, and the numbers behind them.",
    accent: "violet",
  },
  {
    icon: Sparkles,
    title: "Create Intentionally.",
    copy: "Ideas and creative are built to serve a clear purpose, never just to decorate.",
    accent: "cyan",
  },
  {
    icon: BarChart3,
    title: "Measure Meaningfully.",
    copy: "Track the metrics that show real impact, then use them to improve what comes next.",
    accent: "gold",
  },
];

const EXPERTISE = [
  {
    number: "01",
    title: "Performance Marketing",
    description:
      "Planning and optimizing acquisition strategies across paid digital channels with a focus on business outcomes, efficiency, and sustainable growth.",
    icon: Target,
    tags: ["Paid Media", "Acquisition", "Optimization"],
  },
  {
    number: "02",
    title: "Growth Strategy",
    description:
      "Connecting audience insights, positioning, and performance data to identify growth opportunities and create focused marketing roadmaps.",
    icon: TrendingUp,
    tags: ["Growth Planning", "Funnel Strategy", "Analytics"],
  },
  {
    number: "03",
    title: "Brand Development",
    description:
      "Building distinctive brand narratives and market positioning that create relevance, strengthen customer trust, and support long-term value.",
    icon: Megaphone,
    tags: ["Brand Strategy", "Positioning", "Communication"],
  },
  {
    number: "04",
    title: "Marketing Leadership",
    description:
      "Bringing creative, analytical, and commercial thinking together to guide teams, campaigns, and cross-functional marketing initiatives.",
    icon: Layers3,
    tags: ["Leadership", "Planning", "Execution"],
  },
];

const FOCUS_AREAS = [
  {
    number: "01",
    category: "PERFORMANCE & ACQUISITION",
    title: "Building stronger acquisition engines.",
    description:
      "A structured approach to campaign architecture, audience strategy, creative testing, and performance optimization.",
    tags: ["Digital Advertising", "Conversion", "Measurement"],
    metrics: [
      { value: "+312%", label: "Conversion Lift" },
      { value: "-42%", label: "Cost per Lead" },
    ],
    theme: "lime",
  },
  {
    number: "02",
    category: "BRAND & MARKET POSITIONING",
    title: "Making brands impossible to overlook.",
    description:
      "Developing clear positioning, consistent communication, and audience-first marketing strategies that help brands stand apart.",
    tags: ["Brand Strategy", "Creative Direction", "Go-to-Market"],
    metrics: [
      { value: "4.2x", label: "Brand Recall" },
      { value: "+185%", label: "Engagement" },
    ],
    theme: "violet",
  },
  {
    number: "03",
    category: "RETENTION & LIFECYCLE",
    title: "Turning attention into lasting relationships.",
    description:
      "Connecting acquisition, engagement, and retention into a cohesive customer journey built for long-term value.",
    tags: ["Lifecycle", "Engagement", "Customer Growth"],
    metrics: [
      { value: "+67%", label: "Retention Rate" },
      { value: "2.1x", label: "LTV Increase" },
    ],
    theme: "orange",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    duration: "Week 1",
    icon: Search,
    description: "Understand the business, audience, competitors, and the real opportunity.",
    outputs: ["Business & goal audit", "Audience insight", "Competitor scan"],
  },
  {
    number: "02",
    title: "Strategize",
    duration: "Weeks 2–3",
    icon: Lightbulb,
    description: "Create a focused plan with clear positioning, priorities, and measurable objectives.",
    outputs: ["Positioning", "Channel plan", "KPI framework"],
  },
  {
    number: "03",
    title: "Execute",
    duration: "Weeks 4–8",
    icon: Rocket,
    description: "Bring strategy to life through coordinated campaigns, creative ideas, and disciplined delivery.",
    outputs: ["Campaign build & launch", "Creative rollout", "Cross-team coordination"],
  },
  {
    number: "04",
    title: "Optimize",
    duration: "Ongoing",
    icon: SlidersHorizontal,
    description: "Use meaningful performance insights to improve decisions and strengthen results.",
    outputs: ["Performance review", "Budget reallocation", "Scale what works"],
  },
];

const PROMISES = ["One point of contact", "Weekly progress updates", "Transparent reporting"];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVentures Inc.",
    rating: 5,
    text: "Irfan transformed our digital presence completely. His strategic approach to performance marketing delivered a 4x return on our ad spend within just three months.",
  },
  {
    name: "Ahmed Hassan",
    role: "Founder, GrowthLab",
    rating: 5,
    text: "Working with Irfan was a game-changer for our startup. His data-driven growth strategy helped us scale from 100 to 10,000 users in under six months.",
  },
  {
    name: "Maria Rodriguez",
    role: "CMO, GlobalBrands Co.",
    rating: 5,
    text: "His brand development work was brilliant. He understood our vision and turned it into a story that truly resonated with our audience.",
  },
  {
    name: "James Mitchell",
    role: "Director, Digital Solutions Ltd.",
    rating: 5,
    text: "The strategic thinking Irfan brings to every project is remarkable. His campaigns consistently outperform industry benchmarks.",
  },
  {
    name: "Ayesha Khan",
    role: "Marketing Head, Bloom Retail",
    rating: 5,
    text: "He rebuilt our funnel from the ground up. Cost per lead dropped sharply while lead quality went up, and the reporting was always crystal clear.",
  },
  {
    name: "Daniel Foster",
    role: "VP Growth, ScaleStack",
    rating: 5,
    text: "Rare mix of creative instinct and analytical discipline. Irfan never presents an idea without the numbers to back it up.",
  },
  {
    name: "Fatima Noor",
    role: "Founder, Kaarigar Studio",
    rating: 5,
    text: "Our brand finally feels like us. The positioning workshop alone changed how we talk about our products and how customers respond.",
  },
  {
    name: "Omar Siddiqui",
    role: "COO, NextWave Logistics",
    rating: 5,
    text: "Clear communication, honest advice, and zero fluff. He told us what to stop doing, which saved us more budget than any new channel.",
  },
  {
    name: "Emily Watson",
    role: "Head of Marketing, Brightpath",
    rating: 5,
    text: "Irfan led our cross-team campaign launch smoothly. Design, sales, and media were finally pulling in the same direction.",
  },
  {
    name: "Bilal Ahmed",
    role: "CEO, Zaiqa Foods",
    rating: 5,
    text: "Retention was our weak spot. His lifecycle plan brought repeat customers back and noticeably lifted our lifetime value.",
  },
  {
    name: "Laura Bennett",
    role: "Product Lead, Finlytics",
    rating: 4,
    text: "Structured and easy to work with. The first month ran a little behind schedule, but communication stayed honest and the results made up for it.",
  },
  {
    name: "Hamza Raza",
    role: "Director, Urban Nest Properties",
    rating: 5,
    text: "He took our scattered campaigns and turned them into one coherent system. Enquiries doubled and the sales team noticed the difference.",
  },
];

const TRUSTED_BRANDS = ["Google", "Meta", "HubSpot", "Shopify", "Salesforce", "Mailchimp", "Semrush", "Adobe"];

/* ==========================================================================
   BRAND ICONS (lucide dropped these, so they live here)
   ========================================================================== */

function createBrandIcon(displayName, paths) {
  const Icon = ({ size = 24, ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
}

const LinkedinIcon = createBrandIcon(
  "LinkedinIcon",
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>
);

const InstagramIcon = createBrandIcon(
  "InstagramIcon",
  <>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </>
);

const FacebookIcon = createBrandIcon(
  "FacebookIcon",
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
);

const TwitterIcon = createBrandIcon(
  "TwitterIcon",
  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
);

/* ==========================================================================
   HELPERS
   ========================================================================== */

const DEFAULT_WHATSAPP_MESSAGE = "Hi Irfan, I'd like to discuss a project";

const whatsappLink = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(message)}`;

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const pad = (n) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SOCIALS = [
  { id: "whatsapp", label: "WhatsApp", href: whatsappLink(), Icon: MessageCircle },
  { id: "linkedin", label: "LinkedIn", href: PROFILE.linkedin, Icon: LinkedinIcon },
  { id: "instagram", label: "Instagram", href: PROFILE.instagram, Icon: InstagramIcon },
  { id: "facebook", label: "Facebook", href: PROFILE.facebook, Icon: FacebookIcon },
  { id: "twitter", label: "Twitter / X", href: PROFILE.twitter, Icon: TwitterIcon },
];

/* ==========================================================================
   HOOKS
   ========================================================================== */

/** Fires once when the element first scrolls into view. */
function useInViewOnce({ threshold = 0.08, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined" || prefersReducedMotion()
  );

  useEffect(() => {
    const element = ref.current;
    if (inView || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}

function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfterMs);
      } catch {
        setCopied(false);
      }
    },
    [resetAfterMs]
  );

  return [copied, copy];
}

/* ==========================================================================
   SHARED UI
   ========================================================================== */

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInViewOnce({ rootMargin: "0px 0px -35px 0px" });

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`.trim()}>
      <span className="section-label-number">{number}</span>
      <span className="section-label-line" />
      <span>{children}</span>
    </div>
  );
}

function SocialLinks({ iconSize, linkClassName }) {
  return SOCIALS.map(({ id, label, href, Icon }) => (
    <a
      key={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClassName ?? ""} ${id === "whatsapp" ? "whatsapp-link" : ""}`.trim()}
      title={label}
      aria-label={label}
    >
      <Icon size={iconSize} />
    </a>
  ));
}

/** Profile photo that falls back to the initials if the file is missing. */
function ProfileImage({ className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`profile-fallback ${className}`.trim()} role="img" aria-label={PROFILE.name}>
        {PROFILE.initials}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={PROFILE.photo}
      alt={PROFILE.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setCount(end);
      return;
    }

    const isFloat = !Number.isInteger(end);
    const startTime = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      const value = eased * end;

      setCount(isFloat ? Number(value.toFixed(1)) : Math.floor(value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ==========================================================================
   HEADER
   ========================================================================== */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "header-scrolled" : ""}`.trim()}>
      <nav className="nav-container container-wide" aria-label="Primary">
        <a href="#home" className="brand" onClick={close}>
          <span className="brand-avatar">
            <ProfileImage />
          </span>
          <span className="brand-name">
            {PROFILE.name.split(" ")[0].toUpperCase()}
            <br />
            {PROFILE.name.split(" ")[1].toUpperCase()}
          </span>
        </a>

        <div id="site-menu" className={`nav-links ${open ? "nav-open" : ""}`.trim()}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="nav-mobile-contact">
            Get in touch <ArrowUpRight size={17} />
          </a>
        </div>

        <a href="#contact" className="nav-contact">
          Let's Talk <ArrowUpRight size={17} />
        </a>

        <button
          className="mobile-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>
  );
}

/* ==========================================================================
   HERO
   ========================================================================== */

const VISUAL_TAGS = [
  { className: "floating-one", icon: Target, label: "Strategy" },
  { className: "floating-two", icon: Zap, label: "Performance" },
  { className: "floating-three", icon: Sparkles, label: "Creativity" },
];

function GrowthVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-grid" />

      <div className="visual-topline">
        <span className="visual-topline-dot" />
        <span>STRATEGY IN MOTION</span>
        <span className="visual-topline-right">{PROFILE.initials} / 001</span>
      </div>

      <div className="visual-main">
        <span className="visual-eyebrow">THE GROWTH MINDSET</span>

        <div className="visual-orbit">
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-middle" />
          <div className="orbit-ring orbit-ring-inner" />
          <div className="orbit-center">
            <TrendingUp size={43} strokeWidth={1.4} />
          </div>
          <span className="orbit-point point-one" />
          <span className="orbit-point point-two" />
          <span className="orbit-point point-three" />
        </div>

        {VISUAL_TAGS.map(({ className, icon: Icon, label }) => (
          <div key={label} className={`visual-floating-tag ${className}`}>
            <span className="floating-icon">
              <Icon size={15} />
            </span>
            {label}
          </div>
        ))}
      </div>

      <div className="visual-bottom">
        <div className="visual-bottom-copy">
          <span>THINK BIGGER.</span>
          <strong>GROW SMARTER.</strong>
        </div>
        <div className="visual-bottom-arrow">
          <ArrowUpRight size={23} />
        </div>
      </div>

      <div className="visual-corner-label">MARKETING / STRATEGY / GROWTH</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container-wide hero-container">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="status-indicator">
              <span />
            </span>
            {PROFILE.availability.toUpperCase()}
          </div>

          <h1>
            Marketing
            <br />
            with <span className="hero-serif">purpose.</span>
            <br />
            Growth with
            <br />
            <span className="hero-highlight">
              impact<span className="period">.</span>
            </span>
          </h1>

          <p className="hero-description">
            I'm <strong>{PROFILE.name}</strong> — bringing strategic thinking, creative execution, and a
            performance-first mindset together to help businesses grow with clarity and confidence.
          </p>

          <div className="hero-buttons">
            <a className="button-dark" href="#work">
              Explore My Expertise
              <span className="button-icon">
                <ArrowUpRight size={19} />
              </span>
            </a>
            <a className="button-text" href="#about">
              More about me <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-bottom-note">
            <ArrowDown size={17} />
            SCROLL TO EXPLORE
          </div>
        </div>

        <GrowthVisual />
      </div>

      <div className="stats-strip container-wide">
        {STATS.map(({ number, suffix, label }) => (
          <div className="stat-item" key={label}>
            <span className="stat-number">
              <AnimatedCounter end={number} suffix={suffix} />
            </span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="hero-bottom-border container-wide">
        <span>STRATEGIC THINKING</span>
        <span>CREATIVE EXECUTION</span>
        <span>MEASURABLE IMPACT</span>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const brands = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS, ...TRUSTED_BRANDS];

  return (
    <section className="marquee-section" aria-label="Brands and teams worked with">
      <div className="container-wide">
        <Reveal>
          <p className="marquee-label">TRUSTED BY LEADING BRANDS & TEAMS</p>
        </Reveal>
      </div>
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-inner">
          {brands.map((brand, index) => (
            <span className="marquee-brand" key={`${brand}-${index}`}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ABOUT & EXPERTISE
   ========================================================================== */

function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="01">THE PERSON BEHIND THE STRATEGY</SectionLabel>
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-heading">
            <h2 className="display-heading">
              A strategic
              <br />
              mind with a
              <br />
              <span className="serif-accent">creative edge.</span>
            </h2>

            <figure className="about-photo">
              <ProfileImage className="about-photo-img" />
              <figcaption className="about-photo-caption">
                <strong>{PROFILE.name}</strong>
                <span>
                  {PROFILE.role} · {PROFILE.location}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="about-content" delay={120}>
            <span className="eyebrow">A LITTLE ABOUT ME</span>

            <p className="about-lead">
              Great marketing isn't just about being seen. It's about making a meaningful difference to the
              business.
            </p>
            <p>
              I'm {PROFILE.name}, a marketing professional focused on aligning brand strategy, audience
              understanding, and performance-led execution.
            </p>
            <p>
              My approach combines commercial awareness with creative thinking — connecting the big picture to
              the details that make campaigns effective.
            </p>

            <div className="about-highlights">
              {ABOUT_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <div className="highlight-item" key={label}>
                  <Icon size={20} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-link">
              Let's work together <ArrowUpRight size={19} />
            </a>

            {/* Fills the open space next to the portrait, without changing the About copy. */}
            <div className="about-value-panel">
              <div className="about-value-topline">
                <span><Sparkles size={15} /> WHAT I BRING TO THE TABLE</span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </div>
              <h3>Ideas are only the start. <em>Impact is the goal.</em></h3>
              <div className="about-value-grid">
                <div className="about-value-item">
                  <span className="about-value-icon"><Target size={19} strokeWidth={1.7} /></span>
                  <div>
                    <strong>Clarity in strategy</strong>
                    <span>Priorities connected to real business objectives.</span>
                  </div>
                </div>
                <div className="about-value-item">
                  <span className="about-value-icon"><TrendingUp size={19} strokeWidth={1.7} /></span>
                  <div>
                    <strong>Momentum in execution</strong>
                    <span>Creative decisions guided by measurable insight.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="principles-strip">
          {PRINCIPLES.map(({ icon: Icon, title, copy, accent }, index) => (
            <article className={`principle-card principle-${accent}`} key={title}>
              <span className="principle-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="principle-icon">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <strong>{title}</strong>
              <p>{copy}</p>
              <span className="principle-bar" aria-hidden="true" />
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="expertise-section section-padding" id="expertise">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="02" light>
            AREAS OF EXPERTISE
          </SectionLabel>
        </Reveal>

        <div className="section-heading-row">
          <Reveal>
            <h2 className="display-heading light-heading">
              What I bring
              <br />
              <span className="serif-accent lime-text">to the table.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-intro intro-light">
              An integrated view of marketing — from the first strategic question to the final performance
              insight.
            </p>
          </Reveal>
        </div>

        <div className="expertise-grid">
          {EXPERTISE.map(({ number, title, description, icon: Icon, tags }, index) => (
            <Reveal key={number} delay={index * 90}>
              <div className="expertise-card">
                <div className="expertise-card-top">
                  <span className="expertise-number">{number} / {String(EXPERTISE.length).padStart(2, "0")}</span>
                  <Icon size={28} strokeWidth={1.4} />
                </div>

                <div className="expertise-card-bottom">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="expertise-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FOCUS AREAS
   ========================================================================== */

function PerformanceGraphic() {
  return (
    <div className="work-graphic graphic-lime">
      <div className="graphic-small-label">PERFORMANCE THINKING / 001</div>

      <div className="chart-box">
        <div className="chart-heading">
          <span>Growth architecture</span>
          <TrendingUp size={20} />
        </div>

        <svg viewBox="0 0 340 170" className="chart-svg" aria-hidden="true">
          <path
            d="M0 140 H340 M0 100 H340 M0 60 H340 M0 20 H340"
            stroke="rgba(42,22,89,.14)"
            strokeDasharray="4 6"
          />
          <path
            d="M5 145 C45 150 55 117 90 122 S140 95 175 104 S222 75 250 68 S305 29 337 15"
            fill="none"
            stroke="#2a1659"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="250" cy="68" r="7" fill="#2a1659" stroke="#e8c872" strokeWidth="4" />
          <circle cx="337" cy="15" r="8" fill="#2a1659" />
        </svg>

        <div className="chart-footer">
          <span>INSIGHT</span>
          <strong>Progress through precision</strong>
        </div>
      </div>
    </div>
  );
}

function BrandGraphic() {
  return (
    <div className="work-graphic graphic-violet">
      <div className="graphic-small-label">BRAND THINKING / 002</div>

      <div className="brand-art">
        <span className="brand-ring ring-one" />
        <span className="brand-ring ring-two" />
        <span className="brand-ring ring-three" />
        <div className="brand-art-word">
          MAKE
          <br />
          <em>IT</em> MATTER.
        </div>
        <Sparkles className="brand-sparkle" size={35} strokeWidth={1.2} />
      </div>
    </div>
  );
}

const LIFECYCLE_STEPS = [
  { className: "step-top", icon: MousePointer2, label: "ATTRACT" },
  { className: "step-right", icon: Zap, label: "ENGAGE" },
  { className: "step-bottom", icon: ArrowUpRight, label: "GROW" },
];

function LifecycleGraphic() {
  return (
    <div className="work-graphic graphic-orange">
      <div className="graphic-small-label">LIFECYCLE THINKING / 003</div>

      <div className="lifecycle-art">
        <div className="lifecycle-center">
          <span>CUSTOMER</span>
          <strong>FIRST.</strong>
        </div>

        {LIFECYCLE_STEPS.map(({ className, icon: Icon, label }) => (
          <div key={label} className={`lifecycle-step ${className}`}>
            <Icon size={16} /> {label}
          </div>
        ))}

        <div className="lifecycle-line" />
      </div>
    </div>
  );
}

const WORK_GRAPHICS = {
  lime: PerformanceGraphic,
  violet: BrandGraphic,
  orange: LifecycleGraphic,
};

function Work() {
  return (
    <section className="work-section section-padding" id="work">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="03">WHERE STRATEGY MEETS ACTION</SectionLabel>
        </Reveal>

        <div className="section-heading-row work-heading">
          <Reveal>
            <h2 className="display-heading">
              Ideas made
              <br />
              <span className="serif-accent">for impact.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-intro">
              A closer look at the marketing disciplines and strategic challenges I focus on. Real client case
              studies can be featured here as the portfolio grows.
            </p>
          </Reveal>
        </div>

        <div className="work-list">
          {FOCUS_AREAS.map(({ number, category, title, description, tags, metrics, theme }, index) => {
            const Graphic = WORK_GRAPHICS[theme];

            return (
              <Reveal key={number} delay={index * 80}>
                <article className="work-card">
                  <div className="work-card-content">
                    <div className="work-card-top">
                      <span>/{number}</span>
                      <span>{category}</span>
                    </div>

                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>

                      <div className="work-metrics">
                        {metrics.map(({ value, label }) => (
                          <div className="metric-badge" key={label}>
                            <span className="metric-value">{value}</span>
                            <span className="metric-label">{label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="work-tags">
                        {tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <a href="#contact" className="work-link">
                      Discuss a project <ArrowUpRight size={21} />
                    </a>
                  </div>

                  <Graphic />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   TESTIMONIALS
   ========================================================================== */

function TestimonialCard({ name, role, text, rating, tone }) {
  return (
    <article className={`tm-card tm-tone-${tone % 4}`}>
      <Quote className="tm-quote" size={30} />
      <div className="tm-stars" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "currentColor" : "none"}
            className={i < rating ? "" : "tm-star-empty"}
          />
        ))}
      </div>
      <p className="tm-text">{text}</p>
      <div className="tm-author">
        <span className="tm-avatar">{getInitials(name)}</span>
        <div>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </article>
  );
}

function TestimonialRow({ items, speed = 110 }) {
  return (
    <div
      className="tm-row tm-row-single"
      style={{ "--tm-speed": `${speed}s` }}
      tabIndex={0}
      aria-label="Client testimonials. Hover or focus to pause the scrolling row."
    >
      <div className="tm-track">
        {/* Two identical groups produce a smooth, gap-free marquee loop. */}
        {[0, 1].map((copy) => (
          <div className="tm-group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {items.map((item, index) => (
              <div className="tm-slide" key={`${copy}-${item.name}`}>
                <TestimonialCard {...item} tone={index} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const average = (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

  return (
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="04" light>
            WHAT CLIENTS SAY
          </SectionLabel>
        </Reveal>

        <div className="section-heading-row">
          <Reveal>
            <h2 className="display-heading light-heading">
              Client
              <br />
              <span className="serif-accent lime-text">success stories.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="tm-summary">
              <span className="tm-summary-score">{average}</span>
              <div>
                <div className="tm-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <small>Average from {TESTIMONIALS.length} client reviews</small>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={120}>
        <div className="tm-wall">
          <TestimonialRow items={TESTIMONIALS} speed={115} />
        </div>
      </Reveal>
    </section>
  );
}

/* ==========================================================================
   APPROACH & STATEMENT
   ========================================================================== */

function PhaseTracker({ activeIndex }) {
  const step = PROCESS_STEPS[activeIndex];
  const Icon = step.icon;

  return (
    <div className="phase-tracker" aria-live="polite">
      <div className="phase-tracker-top">
        <span>LIVE PROJECT TRACKER</span>
        <span>
          {pad(activeIndex + 1)} / {pad(PROCESS_STEPS.length)}
        </span>
      </div>

      <div className="phase-tracker-bars" aria-hidden="true">
        {PROCESS_STEPS.map((s, i) => (
          <span key={s.number} className={i <= activeIndex ? "is-done" : ""} />
        ))}
      </div>

      <div className="phase-tracker-body" key={step.number}>
        <span className="phase-tracker-icon">
          <Icon size={26} strokeWidth={1.5} />
        </span>
        <div>
          <small>NOW VIEWING</small>
          <strong>{step.title}</strong>
        </div>
      </div>

      <div className="phase-tracker-meta">
        <div>
          <small>TYPICAL TIMEFRAME</small>
          <span>{step.duration}</span>
        </div>
        <div>
          <small>YOU RECEIVE</small>
          <span>{step.outputs[0]}</span>
        </div>
      </div>

      <ul className="phase-promises">
        {PROMISES.map((promise) => (
          <li key={promise}>
            <Check size={14} strokeWidth={2.4} />
            {promise}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({ step, index, isLast, onActivate }) {
  const [ref, active] = useInViewOnce({ threshold: 0.4, rootMargin: "0px 0px -8% 0px" });
  const { number, title, description, outputs, icon: Icon } = step;

  useEffect(() => {
    if (active) onActivate(index);
  }, [active, index, onActivate]);

  return (
    <li ref={ref} className={`approach-step ${active ? "is-active" : ""}`.trim()}>
      <div className="approach-rail" aria-hidden="true">
        <span className="approach-node">
          <Icon size={22} strokeWidth={1.6} />
        </span>
        {!isLast && (
          <span className="approach-line">
            <span className="approach-line-fill" />
          </span>
        )}
      </div>

      <article className="approach-card">
        <span className="approach-ghost" aria-hidden="true">
          {number}
        </span>
        <span className="approach-phase">PHASE {number}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="approach-outputs">
          {outputs.map((output) => (
            <li key={output}>
              <Check size={13} strokeWidth={2.4} />
              {output}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

const FINALE_RESULTS = [
  { value: "Clear KPIs", label: "agreed before launch" },
  { value: "Steady growth", label: "built on what works" },
  { value: "Aligned team", label: "everyone on one plan" },
];

function FinaleStep() {
  const [ref, active] = useInViewOnce({ threshold: 0.4, rootMargin: "0px 0px -8% 0px" });

  return (
    <li ref={ref} className={`approach-step approach-finale ${active ? "is-active" : ""}`.trim()}>
      <div className="approach-rail" aria-hidden="true">
        <span className="approach-node">
          <Flag size={22} strokeWidth={1.6} />
        </span>
      </div>

      <article className="approach-card finale-card">
        <span className="approach-phase">THE RESULT</span>
        <h3>Growth you can measure.</h3>
        <p>
          By the end, you have a working marketing system: a clear plan, a team that knows it, and numbers that
          show what is working.
        </p>

        <div className="finale-results">
          {FINALE_RESULTS.map(({ value, label }) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="finale-link">
          Start a project <ArrowUpRight size={19} />
        </a>
      </article>
    </li>
  );
}

function Approach() {
  const [activeStep, setActiveStep] = useState(0);
  const handleActivate = useCallback(
    (index) => setActiveStep((current) => Math.max(current, index)),
    []
  );

  return (
    <section className="approach-section section-padding" id="approach">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="05">THE WAY I WORK</SectionLabel>
        </Reveal>

        {/* One aligned two-column layout: context on the left, the first
            three phases on the right. Neither column is sticky. */}
        <div className="approach-layout">
          <Reveal className="approach-aside">
            <div className="approach-heading">
              <h2 className="display-heading">
                Less noise.
                <br />
                More <span className="serif-accent">direction.</span>
              </h2>

              <p>
                Great marketing needs more than good ideas. It needs a clear
                process, deliberate decisions, and the flexibility to keep improving.
              </p>

              <div className="approach-stamp">
                <Compass size={28} strokeWidth={1.4} />
                <span>ALWAYS MOVING FORWARD</span>
              </div>

              <a href="#contact" className="approach-cta">
                <span className="approach-cta-copy">
                  <small>HAVE A BRIEF?</small>
                  Let's map your next move
                </span>
                <span className="approach-cta-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </div>

            <PhaseTracker activeIndex={activeStep} />

            {/* Useful content fills the bottom of the left column. */}
            <div className="approach-partnership">
              <div className="approach-partnership-heading">
                <span>THE WORKING RELATIONSHIP</span>
                <Sparkles size={19} aria-hidden="true" />
              </div>
              <h3>Built around clarity, not guesswork.</h3>
              <p>
                Clear priorities, honest progress updates, and meaningful
                measurements at every stage.
              </p>
              <div className="approach-partnership-points">
                <div><Target size={17} /><span>Shared goals and priorities</span></div>
                <div><Clock size={17} /><span>Consistent progress check-ins</span></div>
                <div><BarChart3 size={17} /><span>Decisions supported by data</span></div>
              </div>
            </div>
          </Reveal>

          <ol className="approach-timeline" aria-label="Project phases one through three">
            {PROCESS_STEPS.slice(0, 3).map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
                isLast={index === 2}
                onActivate={handleActivate}
              />
            ))}
          </ol>
        </div>

        {/* Equal-width, aligned closing cards on desktop; stacked on mobile. */}
        <div className="approach-finish">
          <div className="approach-finish-heading">
            <div>
              <span className="approach-finish-eyebrow">FINAL PHASE / LASTING OUTCOME</span>
              <h3>From action to measurable impact.</h3>
            </div>
            <p>Make what works stronger, and turn the learning into long-term growth.</p>
          </div>

          <ol className="approach-finish-grid" aria-label="Optimization and results">
            <ProcessStep
              step={PROCESS_STEPS[3]}
              index={3}
              isLast={true}
              onActivate={handleActivate}
            />
            <FinaleStep />
          </ol>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="statement-section" aria-label="My marketing philosophy">
      <div className="container-wide">
        <Reveal>
          <div className="statement-inner statement-editorial">
            {/* Portrait — separate image so the quote stays editable and responsive */}
            <div className="statement-photo-column">
              <div className="statement-photo-orbit" aria-hidden="true" />
              <figure className="statement-photo-frame">
                <img
                  src="/images/irfan-quote-standing.webp"
                  alt="Irfan Asghar, senior marketing professional, standing in an executive office"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="statement-photo-badge">
                <span className="statement-badge-dot" aria-hidden="true" />
                <div>
                  <strong>IRFAN ASGHAR</strong>
                  <span>SENIOR MARKETING PROFESSIONAL</span>
                </div>
                <ArrowUpRight size={19} aria-hidden="true" />
              </div>
              <span className="statement-vertical-type" aria-hidden="true">
                STRATEGY / BRAND / GROWTH
              </span>
            </div>

            {/* Original quote, now styled like an editorial feature */}
            <div className="statement-editorial-copy">
              <div className="statement-editorial-label">
                <span className="statement-label-line" />
                THE THINKING BEHIND THE WORK
              </div>
              <span className="statement-quote" aria-hidden="true">“</span>
              <h2>
                The best marketing
                <br />
                doesn't just get
                <br />
                <span>attention.</span>
                <br />
                It earns trust.
              </h2>
              <p className="statement-editorial-note">
                The strongest brands are built where smart strategy, memorable creativity,
                and measurable results meet.
              </p>
              <div className="statement-footer">
                <span>{PROFILE.name.toUpperCase()}</span>
                <span>MY MARKETING PHILOSOPHY</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   CONTACT & FOOTER
   ========================================================================== */

const EMPTY_FORM = { name: "", email: "", message: "" };

/**
 * status: "idle" | "sending" | "sent" | "mailto" | "error"
 */
function useContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const setField = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const finish = (nextStatus) => {
    setStatus(nextStatus);
    setValues(EMPTY_FORM);
    resetTimer.current = setTimeout(() => setStatus("idle"), 6000);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Project enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      finish("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      finish("sent");
    } catch {
      setStatus("error");
    }
  };

  return { values, status, setField, submit };
}

function ContactForm() {
  const { values, status, setField, submit } = useContactForm();
  const sending = status === "sending";

  if (status === "sent" || status === "mailto") {
    return (
      <div className="form-success" role="status">
        <CheckCircle size={48} />
        <h3>{status === "sent" ? "Message Sent!" : "Almost there!"}</h3>
        <p>
          {status === "sent"
            ? "Thank you for reaching out. I'll get back to you within 24 hours."
            : "Your email app has opened with your brief. Just press send and I'll reply within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="contact-form">
      {/* Spam trap: real visitors never see or fill this. */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_subject" value={`New project brief from ${values.name || "your portfolio"}`} />

      <div className="form-group">
        <label htmlFor="contact-name">Full Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="John Smith"
          required
          value={values.name}
          onChange={setField("name")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@company.com"
          required
          value={values.email}
          onChange={setField("email")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Project Brief</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, goals, and timeline..."
          required
          value={values.message}
          onChange={setField("message")}
        />
      </div>

      {status === "error" && (
        <p role="alert" style={{ color: "#fca5a5", fontSize: 14, margin: 0 }}>
          Something went wrong. Please try again, or email {PROFILE.email} directly.
        </p>
      )}

      <button type="submit" className="form-submit" disabled={sending}>
        <span>{sending ? "Sending…" : "Send Message"}</span>
        <Send size={18} />
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="footer-brand">
        {PROFILE.initials}
        <span>.</span>
      </a>

      <div className="footer-social-links">
        <SocialLinks iconSize={18} />
        <a href={`mailto:${PROFILE.email}`} title="Email" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>

      <span>
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </span>

      <a href="#home" className="back-to-top">
        BACK TO TOP <ArrowUp size={17} />
      </a>
    </footer>
  );
}

function Contact() {
  const [copied, copyEmail] = useCopyToClipboard();
  const projectWhatsapp = whatsappLink("Hi Irfan, I'd like to discuss a marketing opportunity");

  return (
    <section className="contact-section" id="contact">
      <div className="container-wide">
        <Reveal>
          <SectionLabel number="06" light>
            LET'S CONNECT
          </SectionLabel>
        </Reveal>

        <div className="contact-main">
          <Reveal>
            <div className="contact-left-col">
              <span className="contact-pretitle">HAVE SOMETHING INTERESTING IN MIND?</span>

              <h2>
                Let's make
                <br />
                <span>something</span>
                <br />
                happen.
              </h2>

              <div className="direct-channels">
                <a
                  href={projectWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card whatsapp-channel"
                >
                  <div className="channel-icon-wrap whatsapp-icon">
                    <MessageCircle size={22} />
                  </div>
                  <div className="channel-info">
                    <strong>WhatsApp</strong>
                    <span>Quick Response • Usually within 1 hour</span>
                  </div>
                  <ExternalLink size={16} className="channel-arrow" />
                </a>

                {/* A <div> card so the copy <button> is not nested inside an <a>. */}
                <div className="channel-card email-channel">
                  <a href={`mailto:${PROFILE.email}`} className="channel-main">
                    <div className="channel-icon-wrap email-icon">
                      <Mail size={22} />
                    </div>
                    <div className="channel-info">
                      <strong>{PROFILE.email}</strong>
                      <span>For detailed project inquiries</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => copyEmail(PROFILE.email)}
                    title="Copy email"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card linkedin-channel"
                >
                  <div className="channel-icon-wrap linkedin-icon">
                    <LinkedinIcon size={22} />
                  </div>
                  <div className="channel-info">
                    <strong>Connect on LinkedIn</strong>
                    <span>Professional network & recommendations</span>
                  </div>
                  <ExternalLink size={16} className="channel-arrow" />
                </a>

                <div className="channel-card availability-card">
                  <div className="channel-icon-wrap availability-icon">
                    <Clock size={22} />
                  </div>
                  <div className="channel-info">
                    <strong>{PROFILE.availability}</strong>
                    <span>Pakistan Standard Time (PKT, GMT+5)</span>
                  </div>
                  <span className="availability-pulse" aria-hidden="true">
                    <span />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="contact-form-wrap">
              <div className="form-header">
                <Briefcase size={20} />
                <span>Send a Project Brief</span>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Footer />
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

/* ==========================================================================
   APP
   ========================================================================== */

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Expertise />
        <Work />
        <Testimonials />
        <Approach />
        <Statement />
        <Contact />
      </main>

      <FloatingWhatsApp />
    </>
  );
}