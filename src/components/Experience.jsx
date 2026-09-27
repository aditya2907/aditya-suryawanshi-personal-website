import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const experiences = [
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

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A timeline of my professional experience and education
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const Icon = exp.type === "work" ? Briefcase : GraduationCap;

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-start mb-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <motion.div
                      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors card-shadow"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-lg">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>

                      {/* Description as bullet points */}
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm mb-4">
                        {exp.bullets && exp.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
