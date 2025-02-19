import React from 'react';
import { useNavigate } from 'react-router-dom';
import FuzzyText from '../components/ui/FuzzyText';

function PageNotFound() {
const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-center">
      <FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={0.5} 
  enableHover={true}
  fontSize='clamp(5rem, 20vw, 20rem)'
>
  404
</FuzzyText>
<div className='mt-10'>
<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={0.5} 
  enableHover={true}
  fontSize='clamp(2rem, 2vw, 2rem)'
>
  Page Not Found
</FuzzyText>
</div>
      <button
        className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
</div>
  );
}

export default PageNotFound;