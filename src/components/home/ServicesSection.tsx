import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, FileText, Users } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      id: "career-coaching",
      title: "Career Coaching",
      description: "1-on-1 personalized strategy sessions to help you gain clarity, overcome roadblocks, and accelerate your career growth.",
      icon: <Target className="w-8 h-8 text-accent-500" />,
    },
    {
      id: "cv-review",
      title: "CV & Profile Review",
      description: "Transform your resume and LinkedIn profile into powerful marketing tools that catch the eye of top recruiters and hiring managers.",
      icon: <FileText className="w-8 h-8 text-accent-500" />,
    },
    {
      id: "interview-prep",
      title: "Interview Preparation",
      description: "Mock interviews, feedback, and proven frameworks to help you articulate your value and ace any interview confidently.",
      icon: <Users className="w-8 h-8 text-accent-500" />,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6">
            How I Can Help You
          </h2>
          <p className="text-lg text-slate-600">
            Tailored services designed to equip you with the tools, strategy, and confidence needed to land the job you deserve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-accent-50 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary-950 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                {service.description}
              </p>
              <Link href={`/services#${service.id}`} className="mt-auto">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="ghost" size="lg" className="text-primary-700 font-semibold">
              View All Services &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
