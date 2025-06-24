import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import BidMobileCard from '../molecules/BidMobileCard'
import { RightArrowIcon } from '@/components/shared/general/atoms/icons/RightArrowIcon'
import Image from 'next/image'
import { CharterBid, CharterBidsResponse } from '@/types/bids/CharterBids'
import moment from 'moment'
import CharterBidDiscountTag from '../atoms/CharterBidDiscountTag'
import { CHARTER_BIDS_PER_CALL } from '@/utils/constants'

const BidsTable = ({
    bidsData, 
    getBids, 
    handleAcceptOrDeclineBid,
    openDetailsModal, 
    mainContainerStyles = ''
}: {
    bidsData: CharterBidsResponse, 
    getBids: (page: string, pageSize: string) => void, 
    handleAcceptOrDeclineBid: (option: number, bidId: string, customer: string, experience: string) => void, 
    mainContainerStyles?: string,
    openDetailsModal: (bidInfo: CharterBid) => void,
}) => {
    
    const totalPages = Math.ceil(bidsData?.totalItems / CHARTER_BIDS_PER_CALL);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const increaseOrDecreaseCurrentPage = (command: string) => {
        if(command === 'inc') {
            getBids((currentPage + 1).toString(), CHARTER_BIDS_PER_CALL.toString())
            setCurrentPage(currentPage + 1);
        } else {
            getBids((currentPage - 1).toString(), CHARTER_BIDS_PER_CALL.toString())
            setCurrentPage(currentPage - 1);
        }
    }

    const onAcceptBidOrRejectBid = (e: any, b: CharterBid, option: number) => {
        e.stopPropagation();
        handleAcceptOrDeclineBid(option, b?.id, b?.customer, b?.experienceName)
    }

return (
    <section className={`w-full ${mainContainerStyles}`}>
        <div className='h-[57px] flex flex-row'>
            <div className='bg-white h-full w-full flex flex-row gap-[4px] items-center px-2 rounded-t-lg lg:w-fit lg:px-4'>
                <p className='text-[13px] font-bold'>iCharterBid Requests</p>
                <div className='bg-[#E0E2F0] flex justify-center items-center rounded-full w-[31px] h-[31px]'>
                    <p className='text-[12px] font-medium text-[#2D3AAF]'>{bidsData?.totalItems}</p>
                </div>
            </div>
            <div className='h-full px-2 flex flex-row items-center'>
                <p className='text-[13px] font-bold text-[#F9F9F9]'>Accepted</p>
            </div>
            <div className='h-full px-2 flex flex-row items-center'>
                <p className='text-[13px] font-bold text-[#F9F9F9]'>Declined</p>
            </div>
        </div>
        {bidsData?.bids?.length === 0 && (
                <section className="px-0 sm:px-4  md:px-10 py-4  bg-white rounded-[12px] flex flex-col items-center justify-center gap-[12px]">
                    <div className="my-[65px] flex flex-col justify-center items-center gap-[12px]">
                      <Image
                        width={236}
                        height={124}
                        src="/svgs/charterbids_empty.svg"
                        alt="Fish icon"
                      />
                      <h3 className="text-[18px] font-[500] text-[#454545] text-center">
                      You don&apos;t have any iCharterBids
                      </h3>
                      <p className="text-[#BDBDBD] text-[16px]  lg:w-[426px] text-center mb-[11px]">
                      Here you will see your iCharterBids requests
                      </p>
                    </div>
                </section>
        )}
        <div className='bg-white flex flex-col items-center gap-5 py-[24px] lg:hidden'>
            {
                bidsData?.bids?.length > 0 && (
                    bidsData?.bids?.map(b => <BidMobileCard 
                        onAcceptBidOrRejectBid={onAcceptBidOrRejectBid} 
                        openDetailsModal={openDetailsModal} 
                        bidData={b} 
                        key={b?.id} />)
                )
            }
        </div>
        {bidsData?.bids?.length > 0 && (
                    <div className='hidden lg:flex flex-col items-center gap-5 py-[24px] bg-white'>
                    <table className='table-auto w-[95%] border-spacing-y-[16px] border-separate'>
                        <thead className='bg-[#EFEFEF] outline-[#EFEFEF] outline rounded-[12px]'>
                            <tr className='h-[35px]'>
                                <th className='text-[#454545] text-[11px] font-medium'>CUSTOMER</th>
                                <th className='text-[#454545] text-[11px] font-medium'>DATE</th>
                                <th className='text-[#454545] text-[11px] font-medium'>EXPERIENCE</th>
                                <th className='text-[#454545] text-[11px] font-medium'>GUESTS</th>
                                <th className='text-[#454545] text-[11px] font-medium'>BID</th>
                                <th className='text-[#454545] text-[11px] font-medium'>PRICE</th>
                                <th className='text-[#454545] text-[11px] font-medium'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-orange-300'>
                        {bidsData?.bids?.map((b, i) => {
                            return (
                            <tr onClick={() => openDetailsModal(b)} key={b?.id} className='text-center text-[#454545] h-[79px] bg-[#F9F9F9] rounded-[12px] font-normal text-[16px]  outline-[#EFEFEF] outline cursor-pointer'>
                                <td className='text-left pl-8 py-[6px]'>
                                    <div className='flex flex-col gap-2'>
                                        <p>{b?.customer}</p>
                                        <div className='flex flex-col gap-2'>
                                            {b?.discounts?.map(t => (<CharterBidDiscountTag tagName={t} key={t}/>))}
                                        </div>
                                    </div>
                                </td>
                                <td>{b?.departureDate}</td>
                                <td>{b?.experienceName}</td>
                                <td>{b?.guestCapacity}</td>
                                <td className='font-medium text-[#2D3AAF]'>${b?.bidAmount}</td>
                                <td>${b?.listingAmount}</td>
                                <td>
                                    <div className='flex flex-row items-center justify-center gap-[16px]'>
                                        <Image className='cursor-pointer' onClick={(e) => onAcceptBidOrRejectBid(e, b, 1)} src='/svgs/accept_rounded.svg' width={36} height={36} alt='accept-button' />
                                        <Image className='cursor-pointer' onClick={(e) => onAcceptBidOrRejectBid(e, b, 0)} src='/svgs/decline-rounded.svg' width={36} height={36} alt='decline-button' />
                                    </div>
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
        )}
        {bidsData && bidsData?.totalItems > 5 && (
                <div className='h-[60px] flex flex-row gap-10 items-center justify-center'>
                    <button className='cursor-default' disabled={currentPage === 1}>
                    <div 
                    className={`rotate-180 ${currentPage != 1 ? 'cursor-pointer' : ''}  ${currentPage === 1 ? 'opacity-50' : ''}`} 
                    onClick={() => increaseOrDecreaseCurrentPage('dec')}
                    >
                        <RightArrowIcon size={12} />
                    </div>
                    </button>
                    <div className='flex flex-row gap-6'>
                    {Array(totalPages).fill('').map((x, i) => (<p key={i} className={`font-medium text-[18px] text-[#454545] ${i + 1 === currentPage ? '' : 'opacity-50'}`}>{i + 1}</p>))}
                    </div>
                    <button className='cursor-default' disabled={currentPage === totalPages}>
                        <div className={`${currentPage === totalPages ? '' : 'cursor-pointer'} ${currentPage === totalPages ? 'opacity-50' : ''}`} onClick={() => increaseOrDecreaseCurrentPage('inc')}>
                            <RightArrowIcon size={12} />
                        </div>
                    </button>
                </div>
        )}
    </section>
  )
}

export default BidsTable