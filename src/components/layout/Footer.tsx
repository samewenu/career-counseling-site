import Link from "next/link";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-950 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-white tracking-tight">
              Career<span className="text-accent-500">Coach</span>
            </span>
          </Link>
          <p className="text-slate-400 max-w-sm mb-6">
            Helping professionals build meaningful careers through expert guidance, CV optimization, and interview preparation.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-white transition-colors">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Book a Session
              </Link>
            </li>
            <li className="text-slate-400">
              hello@careercoach.com
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12 pt-8 border-t border-primary-900 border-opacity-50 text-sm text-center text-slate-500">
        &copy; {new Date().getFullYear()} CareerCoach. All rights reserved.
      </div>
    </footer>
  );
}
