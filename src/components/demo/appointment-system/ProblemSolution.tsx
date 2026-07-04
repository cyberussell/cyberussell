"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { PROBLEMS, SOLUTIONS } from "./data";
import { fadeUp } from "./motion";

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="px-6 md:px-10 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[600px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            The Case
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Traditional booking systems weren&apos;t built for how professionals actually work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#FBEEEE] border border-[#0B1220]/[0.06] rounded-3xl p-8"
          >
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0B1220]/40 uppercase tracking-[2px] mb-5">
              The Problem
            </p>
            <ul className="flex flex-col gap-4">
              {PROBLEMS.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-[#DC4C4C]" />
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[14.5px] text-[#0B1220]/70 leading-[1.6]">
                    {problem}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="bg-[#EEF6F4] border border-[#0B1220]/[0.06] rounded-3xl p-8"
          >
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0B1220]/40 uppercase tracking-[2px] mb-5">
              The Solution
            </p>
            <ul className="flex flex-col gap-4">
              {SOLUTIONS.map((solution) => (
                <li key={solution.title} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#14B8A6]" />
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[14.5px] text-[#0B1220]/70 leading-[1.6]">
                    <span className="font-bold text-[#0B1220]">{solution.title}.</span> {solution.desc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
