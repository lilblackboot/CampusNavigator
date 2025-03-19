import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Binoculars, Soup, Star, Ticket, UserRoundSearch } from 'lucide-react';

function Intro() {
  const floatingVariants = (delay = 0) => ({
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0], // Adjust the values to control the floating effect
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay
      }
    }
  });

  const ref = useRef(null);
      const isInView1 = useInView(ref, { triggerOnce: true, margin: "-100px" });

  const blackbarRef = useRef(null);
  const isInView = useInView(blackbarRef, { once: true });

  const blackbarVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section
      id="intro"
      className="min-h-screen m-0 overflow-hidden grid grid-rows-6 bg-transparent text-black justify-center"
    >
      <div></div>
      <motion.div
        ref={blackbarRef}
        initial="hidden"
        animate={isInView1 ? 'visible' : 'hidden'}
        variants={blackbarVariants}
        id='blackbar'
        className='grid mb-15 lg:mb-20 grid-cols-4'
      >
        <div className='bg-black rounded-r-2xl h-full col-span-2 text-white flex justify-center items-center'></div>
        <div className='px-8'>
          <span className='text-transparent bg-clip-text bg-gradient-to-l from-pink-400 via-purple-400 to-blue-500 font-bold text-5xl sm:text-4xl'>
            Smart Campus Navigator
          </span>
        </div>
        <div className='bg-black h-full w-700 overflow-hidden rounded-l-2xl'></div>
      </motion.div>

      <div className='flex row-span-3'>
        
        <motion.div
         ref={ref}
         initial={{ opacity: 0, x: -50 }}
         animate={isInView1 ? { opacity: 1, x: 0 } : {}}
         transition={{ duration: 1, ease: "easeOut" }}
        className='w-1/2 lg:p-30 text-gray-800 pl-15'>
          Navigating campus life just got easier! GoGuide is your all-in-one
          smart assistant, designed to help students and faculty manage their
          daily tasks with ease. Whether you’re looking for your professor,
          tracking your assignments, or finding the best food spots on campus,
          GoGuide has got you covered!
        </motion.div>
        <motion.div 
         ref={ref}
         initial={{ opacity: 0, x: 50 }}
         animate={isInView1 ? { opacity: 1, x: 0 } : {}}
         transition={{ duration: 1, ease: "easeOut" }}
        className='flex lg:mt-30 lg:ml-45'>
          <motion.div
            variants={floatingVariants(0)}
            initial="initial"
            animate="animate"
            className='w-1/6 h-1/6'
          >
            <UserRoundSearch size={50} />
          </motion.div>
          <motion.div
            variants={floatingVariants(0.5)}
            initial="initial"
            animate="animate"
            className='w-1/6 relative top-30 left-30 h-1/6'
          >
            <Soup size={50} />
          </motion.div>
          <motion.div
            variants={floatingVariants(1)}
            initial="initial"
            animate="animate"
            className='w-1/6 relative top-80 h-1/6'
          >
            <Star size={45} />
          </motion.div>
          <motion.div
            variants={floatingVariants(1.5)}
            initial="initial"
            animate="animate"
            className='w-1/6 relative left-55 top-4 h-1/6'
          >
            <Ticket size={45} />
          </motion.div>
        </motion.div>
      </div>
      <div></div>
    </section>
  );
}

export default Intro;