import Head from "next/head";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  const journeySteps = [
    {
      year: "2015 - Present",
      role: "Lead Career Strategist",
      company: "CareerCoach Inc.",
      description: "Founded the consultancy, helping over 5,000 professionals land roles at FAANG and Fortune 500 companies."
    },
    {
      year: "2010 - 2015",
      role: "Head of Talent Acquisition",
      company: "TechGlobal Partners",
      description: "Oversaw global hiring strategies, scaled engineering teams by 300%, and developed core interview frameworks."
    },
    {
      year: "2006 - 2010",
      role: "Senior Recruiter",
      company: "Innovate Solutions",
      description: "Specialized in executive search and tech recruitment, fostering relationships with top-tier candidates."
    }
  ];

  const certifications = [
    { title: "Certified Executive Coach (ICF)", icon: <Award className="w-6 h-6 text-accent-500" /> },
    { title: "Advanced Resume Writing Certification", icon: <Briefcase className="w-6 h-6 text-accent-500" /> },
    { title: "M.S. in Organizational Psychology", icon: <GraduationCap className="w-6 h-6 text-accent-500" /> }
  ];

  return (
    <>
      <Head>
        <title>About Me | CareerCoach</title>
        <meta name="description" content="Learn about my career journey, philosophy, and how I can help you achieve your professional goals." />
      </Head>

      {/* Hero Section */}
      <section className="bg-primary-950 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-900 rounded-l-full blur-3xl opacity-20 transform translate-x-1/2" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              My Story
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              I believe that everyone deserves a career that is fulfilling, adequately compensated, and aligned with their core values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden shadow-xl relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  [Professional Portrait]
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-lg text-slate-600 leading-relaxed"
            >
              <h2 className="text-3xl font-bold text-primary-950 mb-6">More Than Just a Coach</h2>
              <p>
                Early in my career, I realized that the hiring system is fundamentally broken. Brilliant candidates were being rejected simply because they couldn't market themselves effectively, while average candidates who understood "the game" sailed through.
              </p>
              <p>
                As a former Head of Talent Acquisition, I've seen the other side of the table. I know exactly what recruiters look for, how hiring managers make decisions, and why certain resumes end up in the trash.
              </p>
              <p>
                I transitioned into coaching to level the playing field. My philosophy is simple: Your career strategy should be as well-engineered as the products you build or the services you provide. I don't just offer generic advice; I provide actionable, insider strategies to position you as the undeniable top choice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-primary-950 mb-16">My Career Journey</h2>
          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-5 items-start gap-8">
                  <div className="md:col-span-1 md:text-right mb-2 md:mb-0">
                    <span className="text-accent-500 font-bold">{step.year}</span>
                  </div>
                  <div className="md:col-span-4 relative border-l-2 border-primary-100 pl-8 md:pl-8 pb-8 md:pb-0">
                    <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-1 ring-4 ring-white" />
                    <h3 className="text-xl font-bold text-primary-950">{step.role}</h3>
                    <h4 className="text-md font-medium text-slate-500 mb-3">{step.company}</h4>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-primary-950 mb-12">Qualifications & Certifications</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center gap-4 border border-slate-100"
              >
                <div className="p-4 bg-white rounded-full shadow-sm">
                  {cert.icon}
                </div>
                <h3 className="font-semibold text-primary-900">{cert.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
