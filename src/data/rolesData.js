export const TARGET_ROLES = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    description: 'Builds and deploys machine learning, deep learning, and LLM applications into production environments.',
    iconName: 'BrainCircuit',
    requiredSkills: [
      { name: 'Python', minRequired: 85, weight: 0.20 },
      { name: 'Machine Learning', minRequired: 80, weight: 0.25 },
      { name: 'Deep Learning', minRequired: 75, weight: 0.20 },
      { name: 'PyTorch/TensorFlow', minRequired: 75, weight: 0.15 },
      { name: 'SQL', minRequired: 65, weight: 0.10 },
      { name: 'Docker', minRequired: 60, weight: 0.10 }
    ],
    targetCgpa: 7.5,
    baseSalaryMin: 8,
    baseSalaryMax: 14,
    demandLevel: 'Explosive',
    freshersAllowed: true
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    category: 'Backend & Systems',
    description: 'Engineers robust backend microservices, REST APIs, and automated data scripts using Python ecosystems.',
    iconName: 'Code',
    requiredSkills: [
      { name: 'Python', minRequired: 90, weight: 0.30 },
      { name: 'SQL', minRequired: 75, weight: 0.20 },
      { name: 'REST API (FastAPI/Django)', minRequired: 75, weight: 0.20 },
      { name: 'Git', minRequired: 70, weight: 0.15 },
      { name: 'Docker', minRequired: 60, weight: 0.15 }
    ],
    targetCgpa: 7.0,
    baseSalaryMin: 6,
    baseSalaryMax: 10,
    demandLevel: 'High',
    freshersAllowed: true
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Extracts strategic insights from complex datasets using predictive statistical modeling and ML.',
    iconName: 'LineChart',
    requiredSkills: [
      { name: 'Python', minRequired: 85, weight: 0.25 },
      { name: 'SQL', minRequired: 80, weight: 0.25 },
      { name: 'Machine Learning', minRequired: 80, weight: 0.25 },
      { name: 'Statistics & Math', minRequired: 75, weight: 0.15 },
      { name: 'Data Visualization', minRequired: 70, weight: 0.10 }
    ],
    targetCgpa: 7.5,
    baseSalaryMin: 7,
    baseSalaryMax: 12,
    demandLevel: 'Very High',
    freshersAllowed: true
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Web & Software',
    description: 'Develops end-to-end modern client interfaces and scalable backend server applications.',
    iconName: 'Layers',
    requiredSkills: [
      { name: 'React', minRequired: 80, weight: 0.25 },
      { name: 'JavaScript/TypeScript', minRequired: 85, weight: 0.25 },
      { name: 'Node.js/Express', minRequired: 75, weight: 0.20 },
      { name: 'SQL/NoSQL', minRequired: 70, weight: 0.15 },
      { name: 'Git', minRequired: 75, weight: 0.15 }
    ],
    targetCgpa: 7.0,
    baseSalaryMin: 7,
    baseSalaryMax: 13,
    demandLevel: 'Explosive',
    freshersAllowed: true
  },
  {
    id: 'uiux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Product',
    description: 'Crafts intuitive user experiences, wireframes, interaction flows, and high-fidelity UI designs.',
    iconName: 'Palette',
    requiredSkills: [
      { name: 'Figma', minRequired: 85, weight: 0.35 },
      { name: 'User Research', minRequired: 75, weight: 0.25 },
      { name: 'Wireframing & Prototyping', minRequired: 80, weight: 0.25 },
      { name: 'Design Systems', minRequired: 70, weight: 0.15 }
    ],
    targetCgpa: 6.5,
    baseSalaryMin: 5.5,
    baseSalaryMax: 9.5,
    demandLevel: 'High',
    freshersAllowed: true
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    description: 'Transforms raw business metrics into actionable dashboards and SQL analytical insights.',
    iconName: 'PieChart',
    requiredSkills: [
      { name: 'SQL', minRequired: 85, weight: 0.35 },
      { name: 'Excel / Sheets', minRequired: 80, weight: 0.25 },
      { name: 'Power BI / Tableau', minRequired: 75, weight: 0.25 },
      { name: 'Python', minRequired: 60, weight: 0.15 }
    ],
    targetCgpa: 6.8,
    baseSalaryMin: 5,
    baseSalaryMax: 8.5,
    demandLevel: 'High',
    freshersAllowed: true
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    description: 'Architects and manages cloud infrastructure environments on AWS, Azure, or GCP.',
    iconName: 'Cloud',
    requiredSkills: [
      { name: 'AWS/Azure', minRequired: 80, weight: 0.30 },
      { name: 'Linux Administration', minRequired: 75, weight: 0.25 },
      { name: 'Docker', minRequired: 75, weight: 0.20 },
      { name: 'Terraform / IaC', minRequired: 65, weight: 0.15 },
      { name: 'Networking Fundamentals', minRequired: 70, weight: 0.10 }
    ],
    targetCgpa: 7.0,
    baseSalaryMin: 7,
    baseSalaryMax: 12,
    demandLevel: 'Very High',
    freshersAllowed: true
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Operations & Reliability',
    description: 'Automates CI/CD deployment pipelines, container orchestration, and server monitoring.',
    iconName: 'Cpu',
    requiredSkills: [
      { name: 'Docker', minRequired: 85, weight: 0.25 },
      { name: 'Kubernetes', minRequired: 75, weight: 0.25 },
      { name: 'CI/CD (GitHub Actions/Jenkins)', minRequired: 80, weight: 0.25 },
      { name: 'Linux', minRequired: 80, weight: 0.15 },
      { name: 'Python/Bash Scripting', minRequired: 70, weight: 0.10 }
    ],
    targetCgpa: 7.2,
    baseSalaryMin: 8,
    baseSalaryMax: 14,
    demandLevel: 'Explosive',
    freshersAllowed: true
  }
];

export const SAMPLE_JOB_OPENINGS = [
  {
    id: 'job-1',
    title: 'Junior AI / ML Engineer (Freshers 2026 Batch)',
    company: 'NeuralTech Systems',
    companyLogo: '⚡',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experienceLevel: 'Freshers',
    targetRole: 'AI Engineer',
    salaryRange: '₹8.5 – 11 LPA',
    matchScore: 0,
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch/TensorFlow', 'REST API (FastAPI/Django)', 'Docker'],
    missingSkillsForStudent: [],
    postedDate: '2 days ago',
    deadline: 'In 5 days',
    applyUrl: '#',
    isHot: true
  },
  {
    id: 'job-2',
    title: 'Graduate Software Engineer - Python Backend',
    company: 'CloudMatrix Global',
    companyLogo: '☁️',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    experienceLevel: 'Freshers',
    targetRole: 'Python Developer',
    salaryRange: '₹7.0 – 9.5 LPA',
    matchScore: 0,
    requiredSkills: ['Python', 'SQL', 'REST API (FastAPI/Django)', 'Git'],
    missingSkillsForStudent: [],
    postedDate: '1 day ago',
    deadline: 'In 8 days',
    applyUrl: '#',
    isHot: true
  },
  {
    id: 'job-3',
    title: 'Associate Data Scientist',
    company: 'DataPulse Analytics',
    companyLogo: '📊',
    location: 'Gurugram / Onsite',
    type: 'Full-time',
    experienceLevel: '0-1 Years',
    targetRole: 'Data Scientist',
    salaryRange: '₹9.0 – 13 LPA',
    matchScore: 0,
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics & Math'],
    missingSkillsForStudent: [],
    postedDate: '3 days ago',
    deadline: 'In 4 days',
    applyUrl: '#',
    isHot: false
  },
  {
    id: 'job-4',
    title: 'Trainee Full Stack Developer (React + Node)',
    company: 'Nexus Digital Labs',
    companyLogo: '🚀',
    location: 'Pune / Remote',
    type: 'Full-time',
    experienceLevel: 'Freshers',
    targetRole: 'Full Stack Developer',
    salaryRange: '₹6.5 – 9 LPA',
    matchScore: 0,
    requiredSkills: ['React', 'JavaScript/TypeScript', 'Node.js/Express', 'Git'],
    missingSkillsForStudent: [],
    postedDate: 'Just now',
    deadline: 'In 12 days',
    applyUrl: '#',
    isHot: true
  },
  {
    id: 'job-5',
    title: 'Junior Cloud & DevOps Trainee',
    company: 'Apex Infrastructure Solution',
    companyLogo: '🛡️',
    location: 'Chennai / Hybrid',
    type: 'Full-time',
    experienceLevel: 'Career Switcher',
    targetRole: 'Cloud Engineer',
    salaryRange: '₹8.0 – 12 LPA',
    matchScore: 0,
    requiredSkills: ['AWS/Azure', 'Linux Administration', 'Docker'],
    missingSkillsForStudent: [],
    postedDate: '4 days ago',
    deadline: 'In 6 days',
    applyUrl: '#',
    isHot: false
  }
];

export const FRESHERS_ROADMAP_DATA = {
  'ai-engineer': [
    {
      phaseNumber: 1,
      title: 'Foundations of CS & Python Mastery',
      timeframe: 'Months 1 - 2',
      goal: 'Master Python 3.x, Data Structures (DSA), NumPy, Pandas, and Git basics.',
      milestones: [
        'Solve 50+ Easy/Medium Array & Hashmap questions on LeetCode.',
        'Master NumPy vectorization & Pandas data cleaning operations.',
        'Version control all code on GitHub.'
      ],
      recommendedCourses: ['Python 3 Bootcamp (Deep Dive)', 'Data Structures in Python - freeCodeCamp'],
      keyProjects: ['Automated CSV Data Analysis Tool', 'Scraped Web Intelligence Aggregator']
    },
    {
      phaseNumber: 2,
      title: 'Core Machine Learning & Scikit-Learn',
      timeframe: 'Months 3 - 4',
      goal: 'Understand regression, classification, Random Forests, XGBoost, and model evaluation metrics.',
      milestones: [
        'Implement Linear Regression & Decision Trees from scratch.',
        'Understand Precision, Recall, F1-Score, and ROC-AUC curves.',
        'Perform Cross-Validation & Hyperparameter Tuning.'
      ],
      recommendedCourses: ['Andrew Ng Machine Learning Specialization (Coursera)', 'Kaggle Learn ML'],
      keyProjects: ['Student Placement & Readiness Predictor', 'Customer Churn Classification Pipeline']
    },
    {
      phaseNumber: 3,
      title: 'Deep Learning, PyTorch & LLMs',
      timeframe: 'Months 5 - 6',
      goal: 'Build Neural Networks, CNNs, Transformers, and LLM API integrations.',
      milestones: [
        'Build custom PyTorch Dataset & DataLoader pipelines.',
        'Fine-tune HuggingFace Transformer models for sentiment analysis.',
        'Implement LangChain / RAG workflow.'
      ],
      recommendedCourses: ['Fast.ai Practical Deep Learning for Coders', 'DeepLearning.AI LangChain Short Courses'],
      keyProjects: ['Medical Image Disease Classifier', 'Document QA Assistant using RAG & Ollama']
    },
    {
      phaseNumber: 4,
      title: 'Deployment (MLOps) & Off-Campus Hiring Drive',
      timeframe: 'Months 7 - 8',
      goal: 'Wrap ML models in FastAPI, containerize with Docker, deploy on AWS/GCP, and start applying.',
      milestones: [
        'Package ML model into FastAPI endpoint with Swagger docs.',
        'Dockerize application and host on HuggingFace Spaces / AWS EC2.',
        'Apply to 20+ fresher AI openings weekly with custom cold emails.'
      ],
      recommendedCourses: ['Full Stack Fast API & React', 'Docker & Kubernetes for ML Engineers'],
      keyProjects: ['Live AI Career Guidance Platform (Deployed API + Frontend)']
    }
  ]
};
