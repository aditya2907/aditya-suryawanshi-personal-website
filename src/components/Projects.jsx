import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Distributed ML Training Platform",
    github: "https://github.com/aditya2907/TensorFleet",
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
    github: "https://github.com/aditya2907/Financial-Fraud-Detection-using-Explainable-AI",
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
    github: "https://github.com/aditya2907/P2P-Lending-System",
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

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Some of my recent work and side projects</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-xl">{project.title}</h3>
                  {project.featured && <Star className="h-5 w-5 text-primary fill-primary" />}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">{tech}</span>
                  ))}
                </div>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm mb-4">
                  {project.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />Code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
