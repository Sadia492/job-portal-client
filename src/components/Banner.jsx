import React from "react";
import celebrate1 from "../assets/celebrate-1.jpg";
import celebrate2 from "../assets/celebrate-2.jpg";
import { motion } from "motion/react";
import { easeInOut } from "motion";

export default function Banner() {
  return (
    <div className="hero bg-blue-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            animate={{
              y: [0, 100, 0],
              transition: { duration: 5, ease: easeInOut, repeat: Infinity },
            }}
            src={celebrate1}
            className="max-w-sm border-l-8 border-b-8 border-blue-600 rounded-t-[54px] rounded-br-[54px] shadow-2xl"
          />
          <motion.img
            animate={{
              x: [150, 100, 150],
              transition: { duration: 5, ease: easeInOut, repeat: Infinity },
            }}
            src={celebrate2}
            className="max-w-sm border-l-8 border-b-8 border-blue-600 rounded-t-[54px] rounded-br-[54px] shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
