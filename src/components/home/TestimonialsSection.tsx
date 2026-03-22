import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Product Manager at TechFlow",
      content: "The coaching I received was truly transformative. I gained clarity on my career trajectory and successfully pivoted into PM within 3 months, increasing my salary by 40%.",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Senior Software Engineer",
      content: "The CV overhaul and interview prep were exactly what I needed. I felt so much more confident walking into interviews, and it resulted in multiple offers from top-tier companies.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Marketing Director",
      content: "Working together helped me overcome severe imposter syndrome. I finally learned how to articulate my value effectively to leadership and got the promotion I deserved.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6">
            Client Success Stories
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take my word for it. Here's what professionals like you have achieved through our partnership.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full"
            >
              <div className="flex text-accent-500 mb-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-8 flex-grow leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <p className="font-bold text-primary-950">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
