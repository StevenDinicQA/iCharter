import React from 'react'
import { SocialMediaBoxProps } from './types'
import Image from 'next/image'
import { useMediaQuery } from '@mui/material'

const SocialMediaBox = ({socialMediaName, iconSlug, socialMediaSlug = ''}: SocialMediaBoxProps) => {

  const isSmallestDevice = useMediaQuery("(max-width: 374px)")

  return (
    <div className={`${isSmallestDevice ? 'w-[68px]' : 'w-[81px]'} h-[106px]`}>
        <div className={`${isSmallestDevice ? 'w-[68px]' : 'w-[81px]'} h-[84px] flex justify-center items-center rounded-xl border-[1px] cursor-pointer relative`}>
            <div className='w-[40px] h-[40px]'>
                <img src={iconSlug || '/svgs/instagram.svg'} alt={`${socialMediaName || 'social-media'}-logo`} className='w-full h-full'/>
            </div>
          {
            socialMediaSlug?.length === 0
            ? null
            : (
              <div className='absolute bg-[#2D3AAF] w-[18px] h-[18px] bottom-[-9px] right-[-9px] rounded-full flex items-center justify-center'>
              <Image src='/svgs/check.svg' width={12} height={12} alt='check-icon'/>
            </div>
            )
          }
        </div>
        <p className='text-[13px] text-center mt-1 text-[#454545]'>{socialMediaName || 'SocialMedia'}</p>
    </div>
  )
}

export default SocialMediaBox