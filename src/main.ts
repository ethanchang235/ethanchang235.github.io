interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "Box Agentic Mesh",
    description: "Middleware for AI agents with persistent memory and safe file staging via Box API.",
    tags: ["Python", "Box API", "FastAPI", "MCP"],
    link: "https://github.com/ethanchang235/box-agentic-mesh",
    year: "2024"
  },
  {
    title: "AlphaGenome Sandbox",
    description: "Exploring DNA variant effects on gene regulation using AlphaGenome API.",
    tags: ["Python", "TypeScript", "React", "FastAPI", "D3.js"],
    link: "https://github.com/ethanchang235/alphagenome-sandbox",
    year: "2024"
  },
  {
    title: "Spaced Rep Study Assistant",
    description: "AI study assistant generating flashcards from notes via OpenAI API.",
    tags: ["Python", "Flask", "OpenAI API"],
    link: "https://github.com/ethanchang235/spaced-rep-study-assistant",
    year: "2024"
  },
  {
    title: "LLM Entropy Visual",
    description: "Visualization of GPT-2 next-token prediction entropy.",
    tags: ["Python", "Flask", "HuggingFace", "Plotly.js"],
    link: "https://github.com/ethanchang235/llm-entropy-visual",
    year: "2024"
  }
];

const skills = {
  languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Kotlin", "Swift", "R", "SQL"],
  frameworks: ["React", "Node.js", "Django", "Flask", "Spring Boot", "Flutter"],
  ml: ["PyTorch", "TensorFlow", "CUDA", "OpenCV", "NumPy", "Pandas", "Scikit-learn"],
  devops: ["Docker", "Kubernetes", "Git", "Jenkins", "AWS", "GCP", "Linux"]
};

const activities = ["Wisconsin Autonomous", "dotData", "Sports Analytics Club"];
const interests = ["AI/ML", "Reinforcement Learning", "Robotics", "Poker", "Financial Markets", "Epidemiology", "Open-source"];

// Render Projects
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  projects.forEach((p, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-header">
        <span class="project-num">0${index + 1}</span>
        <span class="project-year">${p.year}</span>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-meta">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
    `;
    card.onclick = () => window.open(p.link, '_blank');
    container.appendChild(card);
  });
}

// Render Skills
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  
  const categories = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frameworks', items: skills.frameworks },
    { title: 'ML & Data', items: skills.ml },
    { title: 'DevOps', items: skills.devops }
  ];
  
  categories.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'skill-category';
    div.innerHTML = `
      <div class="skill-title">${cat.title}</div>
      <ul class="skill-list">
        ${cat.items.map(item => `<li class="skill-item">${item}</li>`).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
}

// Render Info
function renderInfo() {
  const container = document.getElementById('info-container');
  if (!container) return;
  
  // Activities
  const activitiesBlock = document.createElement('div');
  activitiesBlock.className = 'info-block';
  activitiesBlock.innerHTML = `
    <div class="info-title">Current Activities</div>
    <ul class="info-list">
      ${activities.map(a => `<li class="info-item">${a}</li>`).join('')}
    </ul>
  `;
  container.appendChild(activitiesBlock);
  
  // Interests
  const interestsBlock = document.createElement('div');
  interestsBlock.className = 'info-block';
  interestsBlock.innerHTML = `
    <div class="info-title">Areas of Interest</div>
    <ul class="info-list">
      ${interests.map(i => `<li class="info-item">${i}</li>`).join('')}
    </ul>
  `;
  container.appendChild(interestsBlock);
  
  // Location/Status
  const statusBlock = document.createElement('div');
  statusBlock.className = 'info-block';
  statusBlock.innerHTML = `
    <div class="info-title">Status</div>
    <ul class="info-list">
      <li class="info-item">Open to collaborations</li>
      <li class="info-item">Building agent systems</li>
      <li class="info-item">Exploring LLM interpretability</li>
    </ul>
  `;
  container.appendChild(statusBlock);
}

// Smooth scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  renderInfo();
  setupSmoothScroll();
});
