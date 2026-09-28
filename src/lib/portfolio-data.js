const projects = [
  {
    title: "Distributed ML Training Platform",
    github: "https://github.com/adi-swe/TensorFleet",
    stack: ["Python", "Go", "FastAPI", "TensorFlow", "Docker", "Kubernetes"],
    details: [
      "Co-architected and implemented a cloud-native distributed machine learning training platform using microservices, enabling scalable orchestration of ML workloads across multiple compute nodes.",
      "Led backend infrastructure development for API Gateway, orchestrator, and worker nodes using Go and gRPC to support horizontal scalability and fault tolerance.",
      "Designed and integrated ML worker services using Python and TensorFlow for coordinated model training, storage management with MinIO, and caching via Redis.",
      "Built a React dashboard for real-time system observability, including monitoring metrics (Prometheus) and visualizations (Grafana), improving operational insight and debugging efficiency.",
      "Containerized services with Docker and orchestrated deployments using Kubernetes, ensuring reproducible environments and automated scaling on Linux infrastructure."
    ],
    featured: true,
  },
  {
    title: "Fraud Detection System with Explainable AI",
    github: "https://github.com/adi-swe/Financial-Fraud-Detection-using-Explainable-AI",
    stack: ["Python", "XGBoost", "LightGBM", "CatBoost", "SHAP", "LIME", "Streamlit", "Docker"],
    details: [
      "Developed a comprehensive fraud detection system that integrates stacked ensemble models (XGBoost, LightGBM, CatBoost) with explainable-AI techniques (SHAP, LIME) to enhance prediction transparency and stakeholder trust.",
      "Engineered backend data processing pipelines and model training scripts using Python, Pandas, and Scikit-learn to achieve real-time transaction scoring with high accuracy and operational performance.",
      "Built an interactive Streamlit dashboard enabling risk managers and compliance officers to explore fraud metrics, real-time alerts, and model interpretability visualizations for actionable insights.",
      "Configured explainability components (global and local feature importance, permutation plots) to provide audit-ready explanations, aligning with regulatory compliance and reducing false positives.",
      "Packaged the system with Docker and designed end-to-end workflows for deployment, enabling scalable usage in financial environments handling thousands of transactions per second."
    ],
    featured: true,
  },
  {
    title: "P2P Lending Platform",
    github: "https://github.com/adi-swe/P2P-Lending-System",
    stack: ["Python", "Solidity", "SQL", "React", "Linux"],
    details: [
      "Architected and implemented a full-stack peer-to-peer lending platform enabling lenders to fund borrower loan requests and borrowers to request and manage loan repayments.",
      "Developed backend REST APIs in Python to handle core workflows including user registration, loan origination, balance tracking, repayment scheduling, and transaction settlements.",
      "Designed and deployed Solidity smart contracts to enforce lending terms, escrow collateral, and automate interest distribution, ensuring tamper-resistant financial operations.",
      "Integrated React frontend with backend APIs and on-chain contract interactions to provide real-time user experiences for both lender and borrower dashboards.",
      "Implemented robust data persistence and querying in SQL to track loan history, portfolio performance, and user activity with secure authentication and role-based access control.",
      "Applied structured logging, error handling, and validation checks to improve observability, operational stability, and debugging across services and smart contract events."
    ],
  },
  {
    title: "Prediction of Remaining Useful Life of Rolling Ball Bearings",
    github: "",
    stack: ["Python", "Scikit-learn"],
    details: [
      "Implemented machine learning models including Extreme Learning Machine (ELM) and neural networks to predict remaining useful life (RUL) of bearings, improving maintenance scheduling.",
      "Applied feature preprocessing and Relative RMS (RRMS) segmentation to identify operation stages, enhancing prediction signal clarity and model performance.",
      "Achieved improved short-term predictive accuracy and reduced training time through algorithm tuning and validation on limited data."
    ],
  }
];

export const experiences = [
  {
    type: "work",
    title: "Software Engineer",
    company: "Bank of America - Enterprise Risk & Finance Technology",
    location: "Mumbai, India",
    period: "July 2023 – August 2025",
    bullets: [
      "Led development and provided technical mentorship to a team of 3 engineers, ensuring reliable delivery of production systems in a regulated enterprise environment.",
      "Modernized a legacy .NET application by migrating to a Python (Flask) backend and Angular frontend, utilizing microservices patterns  and ensuring an event-driven architecture for upstream data communication, improving maintainability and scalability.",
      "Built secure RESTful APIs on Bank of America’s internal Python platform (Quartz), complete with comprehensive API documentation, enabling real-time data access for 50+ analysts across multiple teams.",
      "Collaborated with engineers, analysts, and multiple upstream data producers and cross-functional stakeholders to analyse data workflows, identify functional gaps and proactively resolve data quality issues, enhancing overall data reliability and usability."
    ],
    technologies: ["Python", "Flask", "Angular", "SQL", "Microservices", "REST APIs"],
  },
  {
    type: "work",
    title: "Senior Technology Associate",
    company: "Bank of America - Enterprise Risk & Finance Technology",
    location: "Mumbai, India",
    period: "June 2022 – July 2023",
    bullets: [
      "Crafted a templated reconciliation service that can handle every type of records based on the unique key and measure attributes for the source. The service processed up to 2M records daily and reported all types of breaks observed.",
      "Reduced the report generation time by ~65%, breaking down the high-volume SQL workloads through query refactoring and indexing, reducing execution latency and reconciliation errors.",
      "Pioneered the design and development of python based sanity check algorithm used by business analysts, reducing daily manual intervention."
    ],
    technologies: ["Python", "SQL", "Automation"],
  },
  {
    type: "work",
    title: "Machine Learning Intern",
    company: "Techrupt Innovations Pvt. Ltd.",
    location: "Delhi, India",
    period: "June 2021 – July 2021",
    bullets: [
      "Developed backend components for a recommendation system that increased user engagement by 25% and retention by 20%.",
      "Translated analytical insights into production improvements through close collaboration with engineering teams."
    ],
    technologies: ["Python", "Machine Learning"],
  },
  {
    type: "education",
    title: "Master of Science in Computer Science (Negotiated Learning)",
    company: "University College Dublin",
    location: "Dublin, Ireland",
    period: "Aug. 2025 – May 2026 (Expected)",
    bullets: [
      "Relevant Coursework: Advanced Machine Learning, Generative-AI, Distributed Systems, Cloud Computing, Relational Databases and SQL Programming, Text Analytics, Information Visualisation."
    ],
    technologies: ["Machine Learning", "Distributed Systems", "Cloud Computing", "SQL"],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Information Technology",
    company: "Veermata Jijabai Technological Institute",
    location: "Mumbai, India",
    period: "Aug. 2018 – May 2022",
    bullets: [
      "Relevant Coursework: Software Engineering, Artificial Intelligence, Machine Learning, Operating Systems, DBMS, Blockchain Technology.",
      "Minors: Financial Technologies."
    ],
    technologies: ["Software Engineering", "AI", "Machine Learning", "Blockchain"],
  },
];

const presentation = [
  { name: "TensorFleet", category: "Systems", discipline: "DISTRIBUTED MACHINE LEARNING", visual: "fleet", description: "Many machines. One intelligent system. A cloud-native platform for orchestrating distributed ML workloads.", accent: "lime" },
  { name: "Fraud Detective", category: "AI & data", discipline: "EXPLAINABLE ARTIFICIAL INTELLIGENCE", visual: "fraud", description: "Finding the signal in financial noise. Real-time fraud detection with predictions you can actually explain.", accent: "violet" },
  { name: "P2P Lending", category: "Web3", discipline: "BLOCKCHAIN & FULL-STACK ENGINEERING", visual: "lending", description: "A more direct connection between lenders and borrowers, powered by transparent smart contracts.", accent: "blue" },
  { name: "Predictive Maintenance", category: "AI & data", discipline: "MACHINE LEARNING RESEARCH", visual: "bearing", description: "Turning vibration data into foresight. Predicting the remaining useful life of rolling ball bearings.", accent: "orange" },
];
export const portfolioProjects = projects.map((project, index) => ({ ...project, ...presentation[index], number: String(index + 1).padStart(2, "0") }));
