import React from 'react';

const Test = () => {
  return (
    <div className='w-screen h-screen bg-green-500'>
      <span className='text-3xl font-extrabold'>TEST!!!</span>
    </div>
  )
}

export default React.memo(Test);