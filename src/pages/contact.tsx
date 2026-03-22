import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Contact & Book a Session | CareerCoach</title>
        <meta name="description" content="Get in touch to book your career counseling session or ask any questions about our services." />
      </Head>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary-950 mb-6">
                Let's Get to Work
              </h1>
              <p className="text-xl text-slate-600">
                Whether you're ready to book a session right away or just want to ask a question, you're in the right place.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 item-start">
            {/* Calendly & Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-950 mb-6">Book Your Strategy Call</h2>
                <p className="text-slate-600 mb-8">
                  Choose a time that works for you using the calendar below. This free 15-minute discovery call will help us understand if we're a good fit.
                </p>
                <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                  {/* Calendly Inline Widget */}
                  <iframe 
                    src="https://calendly.com/your-link?hide_gdpr_banner=1&background_color=ffffff&text_color=0f172a&primary_color=f97316" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Calendly Scheduling"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-950">Email Me</h4>
                    <p className="text-slate-500">hello@careercoach.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-950">Location</h4>
                    <p className="text-slate-500">Remote / Global</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-primary-950 mb-2">Send a Message</h2>
              <p className="text-slate-600 mb-8">Have a specific question before booking? Drop me a line.</p>
              
              {formStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 mb-6">Thanks for reaching out. I'll get back to you within 24-48 hours.</p>
                  <Button variant="outline" onClick={() => setFormStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary-950 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-white"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary-950 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-white"
                      placeholder="jane@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-primary-950 mb-2">Interested Service</label>
                    <select 
                      id="service" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-white appearance-none"
                    >
                      <option>1-on-1 Career Coaching</option>
                      <option>CV & LinkedIn Optimization</option>
                      <option>Interview Preparation</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-primary-950 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-white resize-none"
                      placeholder="Tell me a bit about your current situation and goals..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full shadow-md"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
