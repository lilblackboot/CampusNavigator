import React from 'react'
import TiltedCard from './ui/TiltedCard'
import { motion,useInView } from 'framer-motion'
import { useRef } from 'react'

function Makers() {
  const ref = useRef(null);
      const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });
  return (
    <section
        id="makers"
        className="min-h-screen  p-8 bg-black text-white flex flex-col items-center justify-center"
      >

<motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold mb-6 m-8 "
        >
          Meet the Makers
        </motion.h2>

        <motion.p 
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-lg text-center mb-8">
          GoGuide is brought to you by a passionate team of tech enthusiasts
          from Parul Institute of Technology, Parul University.
        </motion.p>
        <div className="flex gap-7 gap-y-10 flex-wrap justify-center">
          <TiltedCard
            imageSrc="./yash.jpg"
            altText="Yash"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Yash Chauhan
              </p>
            }
          />
          <TiltedCard
            imageSrc="./suzan.jpg"
            altText="Suzan"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Suzan Mansuri
              </p>
            }
          />
          <TiltedCard
            imageSrc="./swapnendu.png"
            altText="Swepnendu"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Swapnendu Karmakar
              </p>
            }
          />
          <TiltedCard
            imageSrc="./isha.jpg"
            altText="Isha Rathode"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Isha Rathode
              </p>
            }
          />
          <TiltedCard
            imageSrc="./shweta.jpg"
            altText="Swepnendu"
            captionText="Mentor"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text justify text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Ms. Shweta Gupta
              </p>
            }
          />{" "}
        </div>
      </section>
  )
}

export default Makers