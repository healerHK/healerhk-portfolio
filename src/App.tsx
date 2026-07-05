import { ArrowLeft, ArrowRight, Bot, Boxes, BrainCircuit, Code2, DatabaseZap, ExternalLink, GitBranch, GraduationCap, Layers3, LockKeyhole, MapPinned, MousePointer2, PanelsTopLeft, Rocket, ShieldCheck, Sparkles, Trophy, WandSparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, WheelEvent } from 'react';

type Project = {
  id: string;
  title: string;
  status: 'Public repo' | 'Private project' | 'Private company project' | 'Private business project';
  category: string;
  impact: string;
  stack: string[];
  href?: string;
  tag: string;
};

type SkillGroup = {
  title: string;
  icon: ReactNode;
  items: string[];
};

const slides = ['Start', 'About', 'Projects', 'Toolbox', 'Proof', 'Connect'];

const projects: Project[] = [
  {
    id: 'researchai',
    title: 'ResearchAI',
    status: 'Public repo',
    category: 'Evidence-centered human-AI research environment',
    impact: 'A Chrome Extension + FastAPI research copilot for citation-grounded writing, paper retrieval, semantic search and Obsidian research-brain export.',
    stack: ['FastAPI', 'React', 'TypeScript', 'ChromaDB', 'RAG', 'Obsidian', 'Gemini/OpenAI'],
    href: 'https://github.com/healerHK/ResearchAI',
    tag: '/assets/project-tags/researchai.svg',
  },
  {
    id: 'eventapp',
    title: 'EventApp',
    status: 'Public repo',
    category: 'Event management web app',
    impact: 'A compact Laravel app showing authentication, roles, event CRUD, public discovery, booking workflows, category filtering and feature tests.',
    stack: ['Laravel', 'PHP', 'Blade', 'Vite', 'Tailwind', 'SQLite', 'PHPUnit'],
    href: 'https://github.com/healerHK/EventApp',
    tag: '/assets/project-tags/eventapp.svg',
  },
  {
    id: 'face-detect',
    title: 'Face Detect IoT',
    status: 'Public repo',
    category: 'Smart-home camera experiment',
    impact: 'A practical computer-vision experiment for camera-based face detection and Raspberry Pi 5 / IoT-style home automation workflows.',
    stack: ['Python', 'OpenCV', 'face_recognition', 'pyttsx3', 'IoT', 'Raspberry Pi'],
    href: 'https://github.com/healerHK/Face_detect',
    tag: '/assets/project-tags/face-detect.svg',
  },
  {
    id: 'teaching-sim',
    title: 'Teaching Agent Sim',
    status: 'Private project',
    category: 'Generative-agent research prototype',
    impact: 'Simulates teacher/student agents to evaluate teaching methods before real-world classroom trials, including engagement and learning outcomes.',
    stack: ['Python', 'Generative agents', 'Education AI', 'Simulation', 'Stats'],
    tag: '/assets/project-tags/teaching-sim.svg',
  },
  {
    id: 'coppercoreai',
    title: 'CopperCoreAI',
    status: 'Private company project',
    category: 'Geospatial AI / full-stack industry work',
    impact: 'Professional spatial-data system experience across Django/PostGIS, geospatial workflows, ML-assisted analysis and data-heavy engineering.',
    stack: ['Django', 'PostGIS', 'GeoPandas', 'Rasterio', 'Celery', 'TensorFlow'],
    tag: '/assets/project-tags/coppercoreai.svg',
  },
  {
    id: 'cow-system',
    title: 'Cattle Farm System',
    status: 'Private business project',
    category: 'Small cattle-farm operations platform',
    impact: 'A real business operations platform replacing spreadsheet-heavy workflows for inventory, cattle lots, finance, reporting and customer cota settlement.',
    stack: ['DRF', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'ReportLab'],
    tag: '/assets/project-tags/cow-system.svg',
  },
];

const skillGroups: SkillGroup[] = [
  { title: 'AI engineering', icon: <BrainCircuit />, items: ['LLMs', 'RAG', 'Agentic AI', 'Prompt Engineering', 'Vector DBs', 'Knowledge Graphs'] },
  { title: 'Full-stack', icon: <PanelsTopLeft />, items: ['FastAPI', 'Django', 'Laravel', 'React', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Data systems', icon: <DatabaseZap />, items: ['PostgreSQL', 'PostGIS', 'MySQL', 'ChromaDB', 'Redis', 'Celery'] },
  { title: 'Research tools', icon: <GraduationCap />, items: ['Literature Review', 'Citation Management', 'Obsidian', 'PyMuPDF', 'Google AI Studio'] },
];

const publicLinks = [
  { label: 'GitHub', href: 'https://github.com/healerHK', icon: <GitBranch /> },
  { label: 'ResearchAI', href: 'https://github.com/healerHK/ResearchAI', icon: <BrainCircuit /> },
  { label: 'EventApp', href: 'https://github.com/healerHK/EventApp', icon: <PanelsTopLeft /> },
  { label: 'Face Detect', href: 'https://github.com/healerHK/Face_detect', icon: <Bot /> },
];

function useHorizontalTour() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lastWheel = useRef(0);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    setActive(clamped);
    railRef.current?.scrollTo({ left: clamped * window.innerWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const syncActive = () => {
      const idx = Math.round(rail.scrollLeft / window.innerWidth);
      setActive(Math.max(0, Math.min(slides.length - 1, idx)));
    };

    rail.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', () => goTo(active));
    return () => rail.removeEventListener('scroll', syncActive);
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') goTo(active + 1);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') goTo(active - 1);
      if (event.key === 'Home') goTo(0);
      if (event.key === 'End') goTo(slides.length - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 12) return;
    event.preventDefault();
    if (now - lastWheel.current < 620) return;
    lastWheel.current = now;
    goTo(active + (delta > 0 ? 1 : -1));
  };

  return { railRef, active, goTo, onWheel };
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-tag-shell">
        <img src={project.tag} alt={`${project.title} pixel project tag`} />
      </div>
      <div className="project-card-copy">
        <div className="status-row">
          <span className="status-pill">{project.status}</span>
          <span className="category">{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.impact}</p>
        <div className="stack-row">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
        {project.href ? (
          <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
            View repository <ExternalLink size={16} />
          </a>
        ) : (
          <span className="text-link muted"><LockKeyhole size={16} /> Case-study summary only</span>
        )}
      </div>
    </article>
  );
}

export function App() {
  const { railRef, active, goTo, onWheel } = useHorizontalTour();
  const featuredProjects = useMemo(() => projects.slice(0, 3), []);
  const privateProjects = useMemo(() => projects.slice(3), []);

  return (
    <main className="portfolio-shell" onWheel={onWheel}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={() => goTo(0)} aria-label="Go to hero slide">
          <span className="brand-mark">HK</span>
          <span>healerHK</span>
        </button>
        <nav aria-label="Portfolio slides">
          {slides.map((slide, index) => (
            <button key={slide} className={active === index ? 'active' : ''} onClick={() => goTo(index)}>
              {slide}
            </button>
          ))}
        </nav>
      </header>

      <div className="progress-rail" aria-hidden="true">
        <span style={{ width: `${((active + 1) / slides.length) * 100}%` }} />
      </div>

      <div className="slide-rail" ref={railRef}>
        <section className="slide hero-slide" aria-label="Hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={16} /> AI Engineering · Full-Stack · Intelligent Systems</span>
            <h1>Turning ambitious ideas into practical software.</h1>
            <p>
              A Gen Z developer building researcher-in-the-loop AI, full-stack products, smart IoT experiments and real business workflow systems.
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => goTo(2)}>Explore projects <ArrowRight size={18} /></button>
              <a className="secondary-action" href="https://github.com/healerHK" target="_blank" rel="noreferrer">GitHub profile <GitBranch size={18} /></a>
            </div>
            <div className="tour-hint"><MousePointer2 size={16} /> Scroll, swipe, or use arrow keys — this portfolio moves sideways.</div>
          </div>
          <div className="hero-stage edge-card">
            <div className="browser-chrome"><span /><span /><span /><strong>horizontal portfolio tour</strong></div>
            <img src="/assets/pixel-ai-lab-animated.gif" alt="Animated pixel F1 coding banner" />
            <div className="floating-metric left"><Trophy /> 6 portfolio stories</div>
            <div className="floating-metric right"><Rocket /> Edge-style motion</div>
          </div>
        </section>

        <section className="slide about-slide" aria-label="About">
          <div className="large-panel">
            <span className="eyebrow"><WandSparkles size={16} /> About me</span>
            <h2>Builder mindset, research-first discipline.</h2>
            <p className="lead">
              I'm a dev from the Gen Z generation who enjoys turning ambitious ideas into practical software. My work spans AI engineering, full-stack development, and intelligent systems, with a strong interest in open-source software and trustworthy AI.
            </p>
            <blockquote>
              “We are what we repeatedly do. Excellence, then, is not an act but a habit.”
              <small>Often attributed to Aristotle</small>
            </blockquote>
          </div>
          <div className="side-grid">
            <div className="mini-card"><BrainCircuit /><strong>Researcher-in-the-loop AI</strong><span>Evidence-first systems, RAG, citation verification and Obsidian workflows.</span></div>
            <div className="mini-card"><Code2 /><strong>Full-stack delivery</strong><span>FastAPI, Django, Laravel, React, TypeScript and product-focused UX.</span></div>
            <div className="mini-card"><ShieldCheck /><strong>Privacy-aware portfolio</strong><span>Private/client work shown as architecture and business value, not leaked source.</span></div>
          </div>
        </section>

        <section className="slide projects-slide" aria-label="Projects">
          <div className="section-header">
            <span className="eyebrow"><Layers3 size={16} /> Featured public work</span>
            <h2>Projects that show range — AI, web apps and IoT.</h2>
            <p>Public repos are clickable. Private work is summarized at product/architecture level only.</p>
          </div>
          <div className="project-strip">
            {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}
          </div>
        </section>

        <section className="slide toolbox-slide" aria-label="Toolbox">
          <div className="section-header compact">
            <span className="eyebrow"><Boxes size={16} /> Technical toolbox</span>
            <h2>Modern stack, practical output.</h2>
            <p>Kept focused: the skills that repeatedly appear across the strongest projects.</p>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <div className="skill-icon">{group.icon}</div>
                <h3>{group.title}</h3>
                <div className="skill-pills">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="slide proof-slide" aria-label="Private work and contribution proof">
          <div className="section-header compact">
            <span className="eyebrow"><LockKeyhole size={16} /> Case studies + proof</span>
            <h2>Private work still shows engineering strength.</h2>
            <p>Source stays private; product impact and architecture are safe to discuss.</p>
          </div>
          <div className="proof-layout">
            <div className="private-stack">
              {privateProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <div className="stats-panel edge-card">
              <div className="browser-chrome"><span /><span /><span /><strong>github signals</strong></div>
              <img src="https://streak-stats.demolab.com?user=healerHK&theme=radical&hide_border=true&background=0D1117&ring=F43F5E&fire=F97316&currStreakLabel=F472B6&sideLabels=22D3EE&dates=94A3B8" alt="GitHub streak stats" />
              <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=healerHK&theme=radical" alt="GitHub summary stats" />
            </div>
          </div>
        </section>

        <section className="slide connect-slide" aria-label="Connect">
          <div className="connect-panel">
            <span className="eyebrow"><MapPinned size={16} /> QLD, Australia · open-source minded</span>
            <h2>Want the deeper version?</h2>
            <p>
              Click into a repo, ask about a private case study, or use this portfolio as a recruiter-facing snapshot of AI engineering and full-stack product work.
            </p>
            <div className="link-grid">
              {publicLinks.map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                  {link.icon}
                  <span>{link.label}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
            <div className="final-note">
              <ShieldCheck /> Confidential source code, credentials, datasets and private business details stay private.
            </div>
          </div>
        </section>
      </div>

      <footer className="slide-controls" aria-label="Slide controls">
        <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide"><ArrowLeft /></button>
        <span>{active + 1} / {slides.length}</span>
        <button onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide"><ArrowRight /></button>
      </footer>
    </main>
  );
}
