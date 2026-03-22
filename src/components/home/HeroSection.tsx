import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold tracking-wide mb-6">
              Expert Career Counseling
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-950 leading-tight mb-6">
              Helping You Build a Career That Works
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Unlock your full potential with personalized coaching, expert CV reviews, and strategic interview preparation to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Session
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square bg-primary-200 rounded-full absolute -top-10 -right-10 w-[120%] h-[120%] opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/hero.png" 
                alt="Two women talking across a table during a career counseling session" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
