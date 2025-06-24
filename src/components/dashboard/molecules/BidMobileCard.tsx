import { CharterBid } from '@/types/bids/CharterBids'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CharterBidDiscountTag from '../atoms/CharterBidDiscountTag'

const BidMobileCard = ({
    bidData, 
    openDetailsModal,
    onAcceptBidOrRejectBid
}: {bidData: CharterBid, 
     openDetailsModal: (bidInfo: CharterBid) => void,
     onAcceptBidOrRejectBid: (e: any, b: CharterBid, option: number) => void
    }) => {

return (
    <div onClick={() => openDetailsModal(bidData)} className='bg-[#F9F9F9] w-[90%] flex flex-col gap-2 px-[20px] py-[12px] rounded-xl'>
        <div className='flex flex-row gap-2 items-center flex-wrap'>
            <h2 className='text-[16px] font-medium font-[#454545] leading-[18px]'>{bidData?.customer}</h2>
            {bidData?.discounts?.map(t => (<CharterBidDiscountTag tagName={t} key={t}/>))}
        </div>
        <div>
            <h3 className='font-medium text-[11px] text-[#454545] leading-[18px]'>DATE</h3>
            <p className='font-normal text-[14px] text-[#454545] leading-[18px]'>{bidData?.departureDate}</p>
        </div>
        <div>
            <h3 className='font-medium text-[11px] text-[#454545] leading-[18px]'>EXPERIENCE</h3>
            <p className='font-normal text-[14px] text-[#454545] leading-[18px]'>{bidData?.experienceName}</p>
        </div>
        <div>
            <h3 className='font-medium text-[11px] text-[#454545] leading-[18px]'>PRICE</h3>
            <p className='font-normal text-[14px] text-[#454545] leading-[18px]'>${bidData?.listingAmount}</p>
        </div>
        <div className='flex flex-row justify-between'>
            <div>
                <h2 className='font-medium text-[11px] text-[#454545] leading-[18px]'>BID</h2>
                <p className='font-medium text-[20px] text-[#2D3AAF] leading-[18px]'>${bidData?.bidAmount}</p>
            </div>
            <div className='flex flex-row gap-1'>
                <Image className='cursor-pointer' onClick={(e) => onAcceptBidOrRejectBid(e, bidData, 1)} src='/svgs/accept_rounded.svg' alt='accept-button' width={36} height={36}/>
                <Image className='cursor-pointer' onClick={(e) => onAcceptBidOrRejectBid(e, bidData, 1)} src='/svgs/decline-rounded.svg' alt='decline-button' width={36} height={36}/>
            </div>
        </div>
    </div>
  )
}

export default BidMobileCard