import React from 'react'
import { motion, useInView } from 'framer-motion'
import GridMotion from './ui/GridMotion'
import { useRef } from 'react'

function Intro() {
     const ref = useRef(null);
      const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });
  return (

    <section
        id="intro"
        className="min-h-screen p-0 m-0 overflow-hidden bg-transparent text-black flex flex-col justify-center"
      >
        {/* <div className="absolute m-0 p-0 bg-black w-full z-[-1]  h-screen"> <GridMotion items={items} /></div> */}

       
<div/>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold mb-9 m-8 text-black"
        >
          Smart Campus Navigator
        </motion.h2>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-lg m-8 w-[70%] text-black"
        >
          Navigating campus life just got easier! GoGuide is your all-in-one
          smart assistant, designed to help students and faculty manage their
          daily tasks with ease. Whether you’re looking for your professor,
          tracking your assignments, or finding the best food spots on campus,
          GoGuide has got you covered!
        </motion.p>
  {/* Other content can go in here */}


      
      </section>
  )
}

export default Intro