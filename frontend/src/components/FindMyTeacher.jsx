import React from 'react'
import ChatBot from './ChatBot'
function FindMyTeacher() {
  return (
    <div className='py-10 flex'>
      <div className='w-1/3 '><img src='https://static.vecteezy.com/system/resources/previews/047/130/314/original/3d-cartoon-call-center-character-png.png' alt='chatbot' className='mx-auto w-full'/></div>
      <div className=''>
        <ChatBot/>
      </div>
      <div className='w-1/3'><img src='https://cdn3d.iconscout.com/3d/premium/thumb/student-5266576-4403850.png' alt='chatbot' className='w-full mx-auto'/></div>
    </div>
  )
}

export default FindMyTeacher