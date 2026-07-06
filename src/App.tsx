import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  DatabaseZap,
  Download,
  ExternalLink,
  FileText,
  Gamepad2,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPinned,
  MousePointer2,
  Network,
  PanelsTopLeft,
  Rocket,
  Send,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode, WheelEvent } from 'react';

type Project = {
  id: string;
  title: string;
  status: 'Public repo' | 'Private project' | 'Private company' | 'Private business';
  category: string;
  impact: string;
  stack: string[];
  href?: string;
  tag: string;
};

type TimelineItem = {
  title: string;
  subtitle: string;
  detail: string;
  icon: ReactNode;
};

type LogoItem = {
  name: string;
  slug: string;
  color: string;
};

type LogoGroup = {
  title: string;
  icon: ReactNode;
  items: LogoItem[];
};

type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  group: 'ai' | 'web' | 'data' | 'product';
};

const slides = ['Start', 'About', 'Projects', 'Toolbox', 'Connect'];
const email = 'ynguyenhk@gmail.com';
const linkedIn = 'https://www.linkedin.com/in/thanh-y-nguyen-803a6726a/';
const github = 'https://github.com/healerHK';

const graphNodes: GraphNode[] = [
  { id: 'ai', label: 'AI', x: 18, y: 28, group: 'ai' },
  { id: 'rag', label: 'RAG', x: 36, y: 18, group: 'ai' },
  { id: 'agents', label: 'Agents', x: 54, y: 30, group: 'ai' },
  { id: 'researchai', label: 'ResearchAI', x: 74, y: 20, group: 'product' },
  { id: 'web', label: 'Web Apps', x: 26, y: 55, group: 'web' },
  { id: 'django', label: 'Django', x: 47, y: 58, group: 'web' },
  { id: 'react', label: 'React', x: 68, y: 53, group: 'web' },
  { id: 'data', label: 'Data', x: 16, y: 78, group: 'data' },
  { id: 'postgis', label: 'PostGIS', x: 39, y: 82, group: 'data' },
  { id: 'iot', label: 'IoT', x: 63, y: 76, group: 'product' },
  { id: 'cattle', label: 'Cota Flow', x: 82, y: 70, group: 'product' },
];

const staticEdges = [
  ['ai', 'rag'], ['rag', 'agents'], ['agents', 'researchai'],
  ['web', 'django'], ['django', 'react'], ['react', 'researchai'],
  ['data', 'postgis'], ['postgis', 'cattle'], ['iot', 'cattle'],
  ['ai', 'web'], ['web', 'data'], ['agents', 'iot'],
];

const projects: Project[] = [
  {
    id: 'researchai',
    title: 'ResearchAI',
    status: 'Public repo',
    category: 'Evidence-centered human-AI research environment',
    impact: 'Research copilot for citation-grounded writing, paper retrieval, semantic search and Obsidian research-brain export.',
    stack: ['FastAPI', 'React', 'TypeScript', 'ChromaDB', 'RAG'],
    href: 'https://github.com/healerHK/ResearchAI',
    tag: '/assets/project-tags/researchai.svg',
  },
  {
    id: 'eventapp',
    title: 'EventApp',
    status: 'Public repo',
    category: 'Event management web app',
    impact: 'Laravel web app with authentication, roles, event CRUD, public browsing, bookings, filtering and feature tests.',
    stack: ['Laravel', 'PHP', 'Blade', 'Vite', 'Tailwind'],
    href: 'https://github.com/healerHK/EventApp',
    tag: '/assets/project-tags/eventapp.svg',
  },
  {
    id: 'face-detect',
    title: 'Face Detect IoT',
    status: 'Public repo',
    category: 'Smart-home camera experiment',
    impact: 'Computer-vision experiment for face detection and Raspberry Pi / IoT-style home automation workflows.',
    stack: ['Python', 'OpenCV', 'face_recognition', 'IoT'],
    href: 'https://github.com/healerHK/Face_detect',
    tag: '/assets/project-tags/face-detect.svg',
  },
  {
    id: 'teaching-sim',
    title: 'Teaching Agent Sim',
    status: 'Private project',
    category: 'Generative-agent research prototype',
    impact: 'Virtual teacher/student agents for exploring teaching methods, engagement, retention and classroom scenarios.',
    stack: ['Python', 'Generative agents', 'Education AI', 'Simulation'],
    tag: '/assets/project-tags/teaching-sim.svg',
  },
  {
    id: 'coppercoreai',
    title: 'CopperCoreAI',
    status: 'Private company',
    category: 'Geospatial AI / full-stack industry work',
    impact: 'Spatial-data system experience across Django/PostGIS, geospatial workflows, ML-assisted analysis and production-style engineering.',
    stack: ['Django', 'PostGIS', 'GeoPandas', 'Rasterio', 'Celery'],
    tag: '/assets/project-tags/coppercoreai.svg',
  },
  {
    id: 'cow-system',
    title: 'Cattle Farm System',
    status: 'Private business',
    category: 'Small cattle-farm operations platform',
    impact: 'Business workflow platform for inventory, cattle lots, finance, reports and customer cota settlement.',
    stack: ['DRF', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    tag: '/assets/project-tags/cow-system.svg',
  },
];

const aboutItems: TimelineItem[] = [
  {
    title: 'Bachelor of Computer Science (Honours)',
    subtitle: 'Griffith University · Mar 2026 – Present',
    detail: 'Research interests: LLMs, Agentic AI, RAG, knowledge graphs and AI-assisted research environments.',
    icon: <GraduationCap />,
  },
  {
    title: 'Bachelor of Computer Science',
    subtitle: 'Griffith University · Jul 2023 – Dec 2025 · GPA 6/7',
    detail: 'Strong foundation across algorithms, software engineering, AI systems and full-stack application development.',
    icon: <BookOpen />,
  },
  {
    title: 'Griffith Award for Academic Excellence',
    subtitle: 'Bachelor of Computer Science · 2024 & 2025',
    detail: 'Academic recognition across consecutive years while building applied AI and software projects.',
    icon: <Award />,
  },
  {
    title: 'Hackathons & pitching',
    subtitle: 'ABN Hackathon 2025 · NextGen AI Startup Hackathon · Griffith 3MT/Pitching',
    detail: 'Comfortable turning rough ideas into demos, product stories and team-based prototypes under time pressure.',
    icon: <Trophy />,
  },
  {
    title: 'Volunteer & community mindset',
    subtitle: 'Team projects, university activities and practical support roles',
    detail: 'I enjoy helping people understand technical ideas and contributing where software can make work easier.',
    icon: <HeartHandshake />,
  },
  {
    title: 'Outside the editor',
    subtitle: 'F1, creative coding, AI experiments, research reading and tech exploration',
    detail: 'A mix of speed, systems thinking and curiosity — the same energy I bring into building software.',
    icon: <Gamepad2 />,
  },
];

const logoGroups: LogoGroup[] = [
  {
    title: 'Programming languages',
    icon: <Code2 />,
    items: [
      { name: 'Python', slug: 'python', color: '3776AB' },
      { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
      { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
      { name: 'PHP', slug: 'php', color: '777BB4' },
      { name: 'HTML5', slug: 'html5', color: 'E34F26' },
      { name: 'CSS3', slug: 'css3', color: '1572B6' },
    ],
  },
  {
    title: 'AI / ML',
    icon: <BrainCircuit />,
    items: [
      { name: 'OpenAI', slug: 'openai', color: 'FFFFFF' },
      { name: 'Gemini', slug: 'googlegemini', color: '8E75B2' },
      { name: 'TensorFlow', slug: 'tensorflow', color: 'FF6F00' },
      { name: 'scikit-learn', slug: 'scikitlearn', color: 'F7931E' },
      { name: 'Obsidian', slug: 'obsidian', color: '7C3AED' },
    ],
  },
  {
    title: 'Frameworks',
    icon: <PanelsTopLeft />,
    items: [
      { name: 'React', slug: 'react', color: '61DAFB' },
      { name: 'FastAPI', slug: 'fastapi', color: '009688' },
      { name: 'Django', slug: 'django', color: '44B78B' },
      { name: 'Laravel', slug: 'laravel', color: 'FF2D20' },
      { name: 'Tailwind CSS', slug: 'tailwindcss', color: '38BDF8' },
      { name: 'Vite', slug: 'vite', color: '646CFF' },
    ],
  },
  {
    title: 'Data, DevOps & tools',
    icon: <DatabaseZap />,
    items: [
      { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
      { name: 'MySQL', slug: 'mysql', color: '4479A1' },
      { name: 'Docker', slug: 'docker', color: '2496ED' },
      { name: 'Git', slug: 'git', color: 'F05032' },
      { name: 'GitHub', slug: 'github', color: 'FFFFFF' },
      { name: 'Redis', slug: 'redis', color: 'DC382D' },
      { name: 'Postman', slug: 'postman', color: 'FF6C37' },
      { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC' },
    ],
  },
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

    const syncOnResize = () => goTo(active);
    rail.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncOnResize);
    return () => {
      rail.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', syncOnResize);
    };
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

function PixelGraphStage() {
  const [cursor, setCursor] = useState({ x: 56, y: 48 });

  const activeNodes = useMemo(() => {
    return graphNodes
      .map((node) => ({ node, distance: Math.hypot(node.x - cursor.x, node.y - cursor.y) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5)
      .map((entry) => entry.node);
  }, [cursor]);

  const activeIds = new Set(activeNodes.map((node) => node.id));

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="graph-stage edge-card" onMouseMove={onMove}>
      <div className="graph-chrome">
        <span /><span /><span />
        <strong>living knowledge graph</strong>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="graph-svg" aria-label="Interactive linking graph">
        <defs>
          <filter id="pixelGlow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {staticEdges.map(([a, b]) => {
          const from = graphNodes.find((node) => node.id === a)!;
          const to = graphNodes.find((node) => node.id === b)!;
          const active = activeIds.has(a) || activeIds.has(b);
          return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={active ? 'edge active' : 'edge'} />;
        })}

        {activeNodes.map((node, index) => (
          <line key={`cursor-${node.id}`} x1={cursor.x} y1={cursor.y} x2={node.x} y2={node.y} className={`cursor-edge depth-${index}`} />
        ))}

        <g className="cursor-node" filter="url(#pixelGlow)">
          <rect x={cursor.x - 2.2} y={cursor.y - 2.2} width="4.4" height="4.4" />
          <line x1={cursor.x - 7} y1={cursor.y} x2={cursor.x + 7} y2={cursor.y} />
          <line x1={cursor.x} y1={cursor.y - 7} x2={cursor.x} y2={cursor.y + 7} />
        </g>

        {graphNodes.map((node) => (
          <g key={node.id} className={`graph-node ${node.group} ${activeIds.has(node.id) ? 'active' : ''}`}>
            <rect x={node.x - 3.2} y={node.y - 3.2} width="6.4" height="6.4" rx="0.8" />
          </g>
        ))}
      </svg>
      <div className="graph-labels">
        {graphNodes.map((node) => (
          <span key={node.id} className={`graph-label ${activeIds.has(node.id) ? 'active' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
            {node.label}
          </span>
        ))}
      </div>
      <div className="graph-note"><MousePointer2 size={15} /> Hover anywhere — the graph grows links around your cursor.</div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card compact-project">
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
            View repo <ExternalLink size={15} />
          </a>
        ) : (
          <span className="text-link muted">Case-study summary</span>
        )}
      </div>
    </article>
  );
}

function LogoChip({ item }: { item: LogoItem }) {
  const [iconBroken, setIconBroken] = useState(false);
  const initials = item.name
    .split(/\s|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <span className="logo-chip">
      {iconBroken ? (
        <span className="logo-fallback" aria-hidden="true">{initials}</span>
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
          alt={`${item.name} logo`}
          onError={() => setIconBroken(true)}
        />
      )}
      {item.name}
    </span>
  );
}

export function App() {
  const { railRef, active, goTo, onWheel } = useHorizontalTour();

  return (
    <main className="portfolio-shell" onWheel={onWheel}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={() => goTo(0)} aria-label="Go to hero slide">
          <span className="brand-mark">TY</span>
          <span>Thanh Y Nguyen</span>
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
        <section className="slide hero-slide" aria-label="Start">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={16} /> Thanh Y Nguyen · HealerHK</span>
            <h1>AI engineer in the making, building useful systems from connected ideas.</h1>
            <p>
              Honours Computer Science student at Griffith University, focused on AI engineering, full-stack products, knowledge graphs and practical software that helps people work better.
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => goTo(2)}>Explore projects <ArrowRight size={18} /></button>
              <a className="secondary-action" href="/cv/Thanh-Y-Nguyen-CV-2026.pdf" download>Download CV <Download size={18} /></a>
            </div>
            <div className="tour-hint"><MousePointer2 size={16} /> Move your mouse through the graph — links appear around your path.</div>
          </div>
          <PixelGraphStage />
        </section>

        <section className="slide about-slide" aria-label="About">
          <div className="about-intro large-panel">
            <span className="eyebrow"><BadgeCheck size={16} /> About</span>
            <h2>Education, awards, hackathons and interests.</h2>
            <p className="lead">
              I like building at the intersection of AI, product thinking and real-world workflows — from academic research tools to business platforms and IoT experiments.
            </p>
            <div className="identity-card">
              <strong>Thanh Y Nguyen</strong>
              <span>Nickname: HealerHK</span>
              <span>Robertson, QLD · Open to internship, research assistant, AI engineering and full-stack roles</span>
            </div>
          </div>
          <div className="about-grid">
            {aboutItems.map((item) => (
              <article className="about-card" key={item.title}>
                <div className="about-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.subtitle}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="slide projects-slide" aria-label="Projects">
          <div className="section-header compact-header">
            <span className="eyebrow"><Rocket size={16} /> Projects</span>
            <h2>Selected work across AI, web apps, geospatial systems and IoT.</h2>
            <p>Cards are compact so everything stays visible in the slide instead of falling out of the page.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        <section className="slide toolbox-slide" aria-label="Toolbox">
          <div className="section-header compact-header">
            <span className="eyebrow"><Cpu size={16} /> Toolbox</span>
            <h2>Tools and languages I actually build with.</h2>
            <p>Research-tool category removed. This section focuses on programming languages, AI/ML, frameworks, databases and dev tools.</p>
          </div>
          <div className="logo-toolbox-grid">
            {logoGroups.map((group) => (
              <article className="logo-toolbox-card" key={group.title}>
                <div className="toolbox-title">
                  <span className="skill-icon">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="logo-chip-grid">
                  {group.items.map((item) => <LogoChip key={item.name} item={item} />)}
                </div>
              </article>
            ))}
            <article className="logo-toolbox-card special-card">
              <div className="toolbox-title">
                <span className="skill-icon"><Network /></span>
                <h3>Concepts</h3>
              </div>
              <div className="concept-list">
                <span>RAG</span><span>Agentic AI</span><span>Knowledge Graphs</span><span>REST APIs</span><span>Geospatial AI</span><span>IoT workflows</span>
              </div>
            </article>
          </div>
        </section>

        <section className="slide connect-slide" aria-label="Connect">
          <div className="connect-panel redesigned-contact">
            <span className="eyebrow"><Mail size={16} /> Contact</span>
            <h2>Let’s talk about internships, AI projects or full-stack work.</h2>
            <div className="contact-layout">
              <form className="contact-form" action={`https://formsubmit.co/${email}`} method="POST" target="_blank">
                <input type="hidden" name="_subject" value="Portfolio message for Thanh Y Nguyen" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <label>
                  Your name
                  <input name="name" placeholder="Recruiter / company name" required />
                </label>
                <label>
                  Your email
                  <input name="email" type="email" placeholder="name@company.com" required />
                </label>
                <label>
                  Message
                  <textarea name="message" placeholder="Tell me about the role, project or opportunity..." rows={5} required />
                </label>
                <button className="primary-action" type="submit">Send message <Send size={18} /></button>
              </form>

              <div className="contact-links">
                <a href={`mailto:${email}`}><Mail /> <span>{email}</span></a>
                <a href={linkedIn} target="_blank" rel="noreferrer"><ExternalLink /> <span>LinkedIn</span></a>
                <a href={github} target="_blank" rel="noreferrer"><GitBranch /> <span>GitHub / HealerHK</span></a>
                <a href="/cv/Thanh-Y-Nguyen-CV-2026.pdf" download><FileText /> <span>Download CV PDF</span></a>
                <a href="/cv/Thanh-Y-Nguyen-CV-2026.docx" download><Download /> <span>Download CV DOCX</span></a>
              </div>
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
