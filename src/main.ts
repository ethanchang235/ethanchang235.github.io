interface Project {
  title: string;
  year: string;
  bullets: string[];
  tags: string[];
  href: string;
}

const projects: Project[] = [
  {
    title: "Box Agentic Mesh",
    year: "2025",
    bullets: [
      "Python middleware on the Box API giving AI agents memory and logs for multi-step planning",
      "Staged file operations over MCP so reads and writes stay safe across sessions",
    ],
    tags: ["Python", "Box API", "MCP", "FastAPI"],
    href: "https://github.com/ethanchang235/box-agentic-mesh",
  },
  {
    title: "Spaced Rep Study Assistant",
    year: "2025",
    bullets: [
      "Built in the UW–Madison x OpenAI Summer AI Laboratory (SAIL)",
      "Lecture notes in, flashcards out: Node.js + Flask app using the OpenAI API",
    ],
    tags: ["Node.js", "JavaScript", "Flask", "OpenAI API"],
    href: "https://github.com/ethanchang235/spaced-rep-study-assistant",
  },
  {
    title: "LLM Entropy Visual",
    year: "2024",
    bullets: [
      "Type a sentence, watch GPT-2's next-token distribution shift in real time",
      "Built to make sampling and hallucination concrete instead of hand-wavy",
    ],
    tags: ["Python", "Flask", "HuggingFace", "Plotly.js"],
    href: "https://github.com/ethanchang235/llm-entropy-visual",
  },
];

const skills: Array<[string, string[]]> = [
  ["Languages", ["Java", "Python", "JavaScript", "C", "C#", "C++", "Swift", "Go", "HTML", "CSS", "SQL"]],
  ["Frameworks & DBs", ["React", "Node.js", "Angular", "MySQL", "MongoDB", "PostgreSQL"]],
  ["Infra & Tools", ["Git", "Linux", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Jenkins", "MCP", "Hadoop", "Spark", "Jira"]],
  ["ML", ["PyTorch", "TensorFlow", "CUDA", "OpenCV"]],
];

function renderProjects() {
  const root = document.getElementById("work-list");
  if (!root) return;
  for (const p of projects) {
    const li = document.createElement("li");
    li.className = "work-row";
    li.innerHTML = `
      <span class="work-year">${p.year}</span>
      <div>
        <h3 class="work-title">${p.title}</h3>
        <ul class="work-bullets">${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        <ul class="work-tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
      <span class="work-arrow" aria-hidden="true">↗</span>
      <a class="work-link" href="${p.href}" target="_blank" rel="noreferrer">
        <span class="visually-hidden">${p.title} on GitHub</span>
      </a>`;
    root.appendChild(li);
  }
}

function renderSkills() {
  const root = document.getElementById("skills-list");
  if (!root) return;
  for (const [label, items] of skills) {
    const row = document.createElement("div");
    row.className = "skills-row";
    row.innerHTML = `
      <dt class="skills-label">${label}</dt>
      <dd class="skills-items">${items.join(", ")}</dd>`;
    root.appendChild(row);
  }
}

function setupNav() {
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav a, .menubar-nav a"));
  if (!("IntersectionObserver" in window) || navLinks.length === 0) return;

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      }
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );
  document.querySelectorAll<HTMLElement>("section[id]").forEach((s) => spy.observe(s));
}

function setupClock() {
  const el = document.getElementById("sys-clock");
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  tick();
  window.setInterval(tick, 20000);
}

renderProjects();
renderSkills();
setupNav();
setupClock();
