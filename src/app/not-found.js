import Image from 'next/image';
import React from 'react'

const notFound = () => {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
        <Image 
        width={300}
        height={300}
        src={'/svgs/screen_404.svg'}
        alt='empty-state-fish'
        />
        <div className='text-center mt-10'>
        <h2 className='text-[18px] text-[#454545] font-medium'>
        Ops! Something went wrong
        </h2>
        <p className='text-[16px] text-[#737473] font-normal'>Please try again</p>
        </div>
    </section>
  )
}

export default notFound;