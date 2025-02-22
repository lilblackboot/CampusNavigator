import React from 'react'
import TiltedCard from './ui/TiltedCard'

function Makers() {
  return (
    <section
        id="makers"
        className="min-h-screen  p-8 bg-black text-white flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">Meet the Makers</h2>
        <p className="text-lg mb-8">
          GoGuide is brought to you by a passionate team of tech enthusiasts
          from Parul Institute of Technology, Parul University. Our team
          members:
        </p>
        <div className="flex gap-7 gap-y-10 flex-wrap justify-around">
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