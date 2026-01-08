interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "spaced-rep-study-assistant",
    description: "AI study assistant generating flashcards from notes via OpenAI.",
    tags: ["JS", "OpenAI"],
    link: "https://github.com/ethanchang235/spaced-rep-study-assistant"
  },
  {
    title: "llm-entropy-visual",
    description: "Visualization of GPT-2 next-token prediction entropy.",
    tags: ["Interpretability", "Web"],
    link: "https://github.com/ethanchang235/llm-entropy-visual"
  },
  {
    title: "goose",
    description: "Extensible AI agent for code automation (Rust).",
    tags: ["Rust", "AI Agent"],
    link: "https://github.com/ethanchang235/goose"
  },
  {
    title: "mnist-cnn-m1",
    description: "PyTorch CNN optimized for Apple Silicon.",
    tags: ["PyTorch", "ML"],
    link: "https://github.com/ethanchang235/mnist-cnn-macbook-air-m1"
  }
];

const skills = {
  languages: ["Java", "Python", "JavaScript", "C", "C#", "C++", "R", "MATLAB", "Kotlin", "TypeScript", "Swift", "SQL"],
  frameworks: ["React", "Node.js", "Django", "Flutter", "Flask", "Spring Boot", "REST APIs"],
  technologies: ["Bash", "Linux", "Docker", "Kubernetes", "Git", "Jenkins", "AWS", "GCP", "Azure", "Arduino"],
  libraries: ["PyTorch", "TensorFlow", "CUDA", "OpenCV", "NumPy", "Pandas", "Scikit-learn"]
};

const activities = ["Wisconsin Autonomous", "dotData", "Sports Analytics Club"];
const interests = ["AI/ML", "RL", "Robotics", "Poker", "Financial Markets", "Epidemiology", "Open-source"];

function setupTerminal() {
  const el = document.getElementById('terminal-text');
  if (!el) return;
  const command = "ethan.getProfile() --detailed";
  let i = 0;

  function type() {
    if (!el) return;
    if (i < command.length) {
      el.textContent += command.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  type();
}

function setupBento() {
  const projectContainer = document.getElementById('projects-list');
  if (projectContainer) {
    projects.forEach(p => {
      const div = document.createElement('div');
      div.className = 'project-mini';
      div.innerHTML = `
        <h4 style="font-weight: 700;">${p.title}</h4>
        <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">${p.description}</p>
        <div class="pill-container">
          ${p.tags.map(t => `<span class="pill" style="font-size: 0.7rem;">${t}</span>`).join('')}
        </div>
      `;
      div.onclick = () => window.open(p.link, '_blank');
      projectContainer.appendChild(div);
    });
  }

  const skillContainer = document.getElementById('skills-grid');
  if (skillContainer) {
    Object.values(skills).flat().forEach(s => {
      const span = document.createElement('span');
      span.className = 'pill';
      span.textContent = s;
      skillContainer.appendChild(span);
    });
  }

  const activityContainer = document.getElementById('activities-list');
  if (activityContainer) {
    activities.forEach(a => {
      const span = document.createElement('span');
      span.className = 'pill';
      span.textContent = a;
      activityContainer.appendChild(span);
    });
  }

  const interestContainer = document.getElementById('interests-list');
  if (interestContainer) {
    const colors = ['var(--accent-blue)', 'var(--accent-violet)', 'var(--accent-emerald)', 'var(--accent-amber)'];
    interests.forEach((item, index) => {
      const span = document.createElement('span');
      span.className = 'interest-tag';
      span.style.background = `rgba(255, 255, 255, 0.03)`;
      span.style.border = `1px solid ${colors[index % colors.length]}`;
      span.style.color = 'var(--text-primary)';
      span.textContent = item;
      interestContainer.appendChild(span);
    });
  }
}

function setupCanvas() {
  const canvas = document.getElementById('entropy-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  const particles: Array<{ x: number, y: number, size: number, vx: number, vy: number, c: string }> = [];
  const palette = ['#3b82f6', '#8b5cf6', '#10b981', '#f43f5e'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      c: palette[Math.floor(Math.random() * palette.length)]
    });
  }

  function frame() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (d < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - d / 180)})`;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.3;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
  frame();
}

function setupInteractions() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

  document.querySelectorAll('.bento-item').forEach(item => {
    const el = item as HTMLElement;
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupTerminal();
  setupBento();
  setupCanvas();
  setupInteractions();
});
