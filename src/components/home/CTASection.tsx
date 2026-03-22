import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-primary-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Career?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop guessing and start executing. Book a free 15-minute discovery call to discuss your goals and see how we can work together.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary-900 hover:bg-slate-100 hover:text-primary-950 font-semibold px-10 border-none shadow-xl hover:shadow-2xl transition-all">
              Book Your Free Call
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
