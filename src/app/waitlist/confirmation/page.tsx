'use client'

import { Button } from '@/components/shared/forms/atoms/buttons/Button';
import { ArrowBack, Close } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react'
//import ConfettiExplosion from 'react-confetti-explosion';

const WaitListConfirmation = () => {
    const isResponsive = useMediaQuery("(max-width: 1024px)");
    const router = useRouter();

    // const [expolosionCount, setExplosionCount] = useState<number>(0);
    // const [showExplosions, setShowExplosions] = useState<boolean>(true);
    // const [showExplosionsVal, setShowExplosionVal] = useState<number>(0);
    // let intervalRef = useRef<any>(null)

    // const startExplosions = () => {
    //         intervalRef.current = setInterval(() => {
    //             setExplosionCount(prevState => prevState + 1);
    //             setShowExplosionVal(prevstate => prevstate + 1)
    //         }, 2000)
    // }

    // useEffect(() => {
    //     if(expolosionCount === 0 && showExplosions) {
    //         setShowExplosions(true);
    //         startExplosions();
    //     }

    //     if(expolosionCount >= 4){
    //         clearInterval(intervalRef.current)
    //         setExplosionCount(0);
    //     }

    //     if(showExplosionsVal > 16) {
    //         setShowExplosions(false);
    //         setExplosionCount(0);
    //         clearInterval(intervalRef.current)
    //     }
    // }, [expolosionCount, showExplosionsVal])

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
        <button
        onClick={() => {
          router.replace("/");
        }}
        className="z-10 absolute text-[18px] top-5 left-5 flex items-center gap-[5px] cursor-pointer"
        title="Close"
      >
        <ArrowBack sx={{ fontSize: 24, marginTop: 0.25 }}/>
        <p className="pt-[4px]">Go back</p>
      </button>
      <Image
        src="/imgs/ocean.png"
        fill
        alt="ocean"
        priority
        className="absolute z-0"
        style={{ opacity: 0.7 }}
      />
      <div className="z-10">
      {/* {showExplosions && expolosionCount === 1 && <ConfettiExplosion particleCount={200} duration={2000} width={isResponsive ? 360 : 1600} force={0.8}/>} */}
      <section className={`bg-[#FFF] rounded-[20px] p-[50px] ${
            isResponsive ? "w-[350px]" : "w-[546px]"
            }`}>
        <div className="flex flex-col items-center justify-center">
            <Image
                src="/imgs/logo-icon.png"
                alt="Icharter-Logo"
                width={59}
                height={60}
                priority
            />
            <h1
                className={`font-[500] text-[#454545] text-center leading-[36px] ${
                    isResponsive ? "mt-[15px] mb-[6px] text-[22px]" : "mt-[30px] mb-[12px] text-[28px]"
                }`}
            >
                Thank you for joining the waitlist!
            </h1>
            <small className={`font-[400] text-[#333] text-center ${isResponsive ? 'mb-[15px] text-[14px]' : 'mb-[27px] text-[16px]'}`}>
                We&apos;ll be in touch soon.
            </small>
            <div>
            <Button 
                text="Go to homepage"
                className={`font-[500] py-[19px] rounded-xl ${
                    isResponsive ? "mt-[15px] w-[250px] text-[16px]" : "mt-[12px] w-[445px] text-[18px]"
                  }`}
                test-id="waitlist_submit"
                onClick={() => router.replace("/")}
            />
          </div>
        </div>
        {/* {showExplosions && expolosionCount === 2 && <ConfettiExplosion particleCount={200} duration={2000} width={isResponsive ? 360 : 1600} force={0.8}/>} */}
    </section>
      </div>
      {/* {showExplosions && expolosionCount === 3 && <ConfettiExplosion particleCount={200} duration={2000} width={isResponsive ? 360 : 1600} force={0.8}/>} */}
    </div>
  )
}

export default WaitListConfirmation