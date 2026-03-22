import Head from "next/head";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: "career-coaching",
      title: "1-on-1 Career Coaching",
      description: "A comprehensive, personalized approach to uncovering your potential, strategizing your next move, and navigating complex career transitions.",
      forWho: "Mid to senior-level professionals feeling stuck, aiming for a promotion, or considering a major career pivot.",
      outcomes: [
        "Crystal-clear clarity on your career goals and value proposition.",
        "A structured, actionable roadmap to achieve your next milestone.",
        "Strategies to handle office politics, negotiate salary, and build influence."
      ]
    },
    {
      id: "cv-review",
      title: "CV & LinkedIn Optimization",
      description: "Recruiters spend an average of 6 seconds on a resume. We make sure yours stands out, tells a compelling story, and gets through ATS filters.",
      forWho: "Anyone actively applying for jobs but not getting callbacks, or professionals looking to attract inbound recruiter messages.",
      outcomes: [
        "A powerful, customized resume that highlights impact and achievements.",
        "An optimized LinkedIn profile that ranks higher in recruiter searches.",
        "A compelling professional narrative that aligns with target roles."
      ]
    },
    {
      id: "interview-prep",
      title: "Targeted Interview Preparation",
      description: "Stop freezing up during behavioral questions or stumbling through case studies. Master the art of the interview through proven frameworks and mock sessions.",
      forWho: "Candidates who have upcoming interviews at top-tier or FAANG companies, or those who struggle with interview anxiety.",
      outcomes: [
        "Mastery of the STAR method and behavioral questioning.",
        "Personalized feedback to improve your delivery, tone, and confidence.",
        "Insider insights on what specific hiring managers are looking for."
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Services | CareerCoach</title>
        <meta name="description" content="Explore our career coaching, CV review, and interview preparation services." />
      </Head>

      <section className="bg-primary-50 py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-950 mb-6 font-sans">
              Designed for Your Success
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Invest in your future with targeted strategies tailored to where you are—and where you want to go.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-32"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <h2 className="text-3xl font-bold text-primary-950 mb-4">{service.title}</h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-primary-900 mb-2">Who this is for:</h4>
                      <p className="text-slate-600 italic">"{service.forWho}"</p>
                    </div>

                    <h4 className="font-bold text-primary-900 mb-4">Expected Outcomes:</h4>
                    <ul className="space-y-3 mb-8">
                      {service.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-accent-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact">
                      <Button size="lg" className="w-full sm:w-auto shadow-md group">
                        Book This Session
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className={`order-1 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="aspect-[4/3] bg-primary-100 rounded-3xl relative overflow-hidden flex items-center justify-center">
                      <div className="text-primary-300 font-medium tracking-widest uppercase">
                        [Image: {service.title}]
                      </div>
                      <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${index % 2 === 0 ? 'bg-accent-200' : 'bg-primary-200'} rounded-full blur-2xl opacity-50`} />
                      <div className={`absolute -top-10 -left-10 w-40 h-40 ${index % 2 !== 0 ? 'bg-accent-200' : 'bg-primary-200'} rounded-full blur-2xl opacity-50`} />
                    </div>
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
