import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const body = new URLSearchParams(new FormData(form));
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      toast.success("Thanks! Your message has been sent.");
    } catch {
      toast.error("I couldn't send your message. Please email me directly instead.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Have a project in mind? Let's talk!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="font-display text-xl font-semibold">Let's Connect</h3>
              <p className="text-muted-foreground">Let's build something meaningful together! Feel free to reach out for collaborations, opportunities, or just to say hi.</p>
              <div className="space-y-4">
                <a href="mailto:aditya.suryawanshi@ucdconnect.ie" className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>aditya.suryawanshi@ucdconnect.ie</span>
                </a>
                <a href="https://linkedin.com/in/suryawanshiaditya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/aditya2907" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <Github className="h-5 w-5 text-primary" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-4" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>
              <Input name="name" autoComplete="name" placeholder="Your Name" aria-label="Your name" className="bg-card" required />
              <Input name="email" type="email" autoComplete="email" placeholder="Your Email" aria-label="Your email" className="bg-card" required />
              <Textarea name="message" placeholder="Your Message" aria-label="Your message" rows={5} className="bg-card resize-none" required />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 glow">
                <Send className="h-4 w-4 mr-2" />{isSubmitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
      <footer className="mt-24 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Aditya Suryawanshi. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
