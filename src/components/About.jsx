import { motion } from "framer-motion";
import { Code2, Database, Cloud, Cpu, Braces, Server } from "lucide-react";

const skills = [
  { name: "Python", icon: Code2, category: "Languages" },
  { name: "Java", icon: Code2, category: "Languages" },
  { name: "C++", icon: Code2, category: "Languages" },
  { name: "JavaScript", icon: Braces, category: "Languages" },
  { name: "TypeScript", icon: Braces, category: "Languages" },
  { name: "Go", icon: Code2, category: "Languages" },
  { name: "PostgreSQL", icon: Database, category: "Databases" },
  { name: "MongoDB", icon: Database, category: "Databases" },
  { name: "Redis", icon: Database, category: "Databases" },
  { name: "AWS", icon: Cloud, category: "Cloud" },
  { name: "GCP", icon: Cloud, category: "Cloud" },
  { name: "Docker", icon: Server, category: "DevOps" },
  { name: "Kubernetes", icon: Server, category: "DevOps" },
  { name: "Kafka", icon: Cpu, category: "Data" },
  { name: "Spark", icon: Cpu, category: "Data" },
  { name: "Airflow", icon: Cpu, category: "Data" },
];

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-24 md:py-32">
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
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A passionate engineer focused on building robust and scalable systems
            </p>
          </div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                I'm a Software Engineer with over 3 years of experience specializing in
                backend development and data engineering. Currently based in Dublin, Ireland.
                I work on building high-performance distributed systems that process
                millions of events daily.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey in tech started with a curiosity about how large-scale systems
                work. That curiosity led me to work on exciting projects ranging from
                real-time data pipelines to machine learning infrastructure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge through
                technical blog posts and mentoring.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Exp.</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group relative p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{skill.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {skill.category}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
