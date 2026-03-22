import Head from "next/head";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Product Manager at TechFlow",
      imagePlaceholder: "SJ",
      content: "The coaching I received was truly transformative. I gained clarity on my career trajectory and successfully pivoted into PM within 3 months, increasing my salary by 40%.",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Senior Software Engineer",
      imagePlaceholder: "DC",
      content: "The CV overhaul and interview prep were exactly what I needed. I felt so much more confident walking into interviews, and it resulted in multiple offers from top-tier companies.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Marketing Director",
      imagePlaceholder: "ER",
      content: "Working together helped me overcome severe imposter syndrome. I finally learned how to articulate my value effectively to leadership and got the promotion I deserved.",
    },
    {
      id: 4,
      name: "Michael Thompson",
      role: "VP of Engineering",
      imagePlaceholder: "MT",
      content: "As a senior leader, finding someone who understands executive-level positioning is tough. This coaching provided exactly the strategic sparring partner I needed for my next big move.",
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "UX/UI Designer",
      imagePlaceholder: "AP",
      content: "The portfolio review and interview coaching completely changed how I present my work. I went from getting zero callbacks to having to choose between three amazing offers.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Sales Director",
      imagePlaceholder: "JW",
      content: "I thought I knew how to sell myself until we worked together. The frameworks provided for behavioral interviews are gold. Highly recommend to anyone serious about their career.",
    }
  ];

  return (
    <>
      <Head>
        <title>Client Success Stories | CareerCoach</title>
        <meta name="description" content="Read testimonials and success stories from professionals who have transformed their careers through our coaching." />
      </Head>

      <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent-500/20 via-primary-900/0 to-primary-900/0" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Results.</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Behind every successful career pivot, promotion, and offer negotiation is a story of hard work, strategy, and partnership.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100 flex flex-col h-full"
              >
                <div className="flex text-accent-500 mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-8 flex-grow leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-lg">
                    {t.imagePlaceholder}
                  </div>
                  <div>
                    <p className="font-bold text-primary-950">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
