import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl bg-slate-200 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-lg">
                 [Professional Image]
               </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-100 rounded-full z-[-1]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6">
              Hi, I'm James Agbalumo.<br />Your Career Strategist.
            </h2>
            <div className="space-y-4 text-slate-600 mb-8 text-lg">
              <p>
                With over a decade of experience in talent acquisition and career development, I have helped thousands of professionals navigate complex career transitions and secure roles at top-tier companies.
              </p>
              <p>
                My approach is data-driven, authentic, and tailored specifically to your unique strengths. Whether you're feeling stuck, looking to pivot, or aiming for the executive suite, we'll build a roadmap to get you there.
              </p>
            </div>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Read My Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
