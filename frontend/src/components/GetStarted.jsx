import React from 'react'

function GetStarted() {
  return (
    <section
    id="get-started"
    className="min-h-screen p-8 bg-white text-black flex flex-col justify-center"
  >
    <h2 className="text-4xl font-bold mb-4">Get Started</h2>
    <p className="text-lg">
      Sign up today and start navigating the campus like a pro!
    </p>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4  rounded-full transition duration-300 mt-4"
      onClick={() => navigate("/signup")}
    >
      Register Now
    </button>
  </section>
  )
}

export default GetStarted