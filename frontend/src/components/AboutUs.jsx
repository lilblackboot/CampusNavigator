import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AboutUs() {
const ref = useRef(null);
      const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  return (
    <section
        id="about-us"
        className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center"
      >
        

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold mb-9 m-8 text-black"
        >
          About Us
        </motion.h2>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-lg m-8 w-[70%] text-black"
        >
         At GoGuide, we believe that campus life should be smooth and
          stress-free. Our mission is to empower students and faculty with a
          smart, efficient, and user-friendly solution to simplify navigation
          and daily academic tasks. Whether you’re a newcomer or a seasoned
          student, GoGuide is here to enhance your campus experience.
        </motion.p>

      </section>
  )
}

export default AboutUs