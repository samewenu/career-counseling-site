import { motion } from "framer-motion";

export function CompaniesSection() {
  const placeholders = Array.from({ length: 6 }).map((_, i) => i);

  return (
    <section className="py-16 border-y border-slate-100 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Trusted by professionals from top companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {placeholders.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-8 md:h-12 flex items-center justify-center px-4 bg-slate-100 rounded text-slate-400 font-medium"
            >
              Company {i + 1}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
