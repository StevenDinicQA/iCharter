import React, { Dispatch, SetStateAction } from 'react'
import CharterBidDiscountTag from '../atoms/CharterBidDiscountTag'
import { Button } from '@/components/shared/forms/atoms/buttons/Button'
import { RightArrowIcon } from '@/components/shared/general/atoms/icons/RightArrowIcon'
import { CharterBid } from '@/types/bids/CharterBids'
import { Listing } from '@/types/listings/listing'

const DashboardDetailsModal = (
    {
    handleCloseModal, 
    bidInfo = null,
    listingInfo = null,
    isBidModal = false,
    handleAcceptOrDeclineBid,
}: {
  handleCloseModal: () => void, 
  bidInfo?: CharterBid | null, 
  listingInfo?: Listing | null,
  isBidModal: boolean,
  handleAcceptOrDeclineBid?: (option: number, bidId: string, customer: string, experience: string) => void,
}
    ) => {

  return (
    <div className='w-full h-full flex items-center justify-center absolute left-0 top-0'>
    <div className='bg-white opacity-60 w-full h-full absolute left-0 top-0 z-10'></div>
    <div className='bg-white border-[1px] rounded-xl drop-shadow-lg w-full max-w-[630px] min-h-screen md:min-h-0 lg:max-h-[800px] absolute left-0 top-0 flex flex-col items-center pb-[32px] md:relative z-20'>
    <div className='w-[90%]'>
            <div  
            className={`self-start mt-[26px] w-fit rotate-180 cursor-pointer`} 
            onClick={handleCloseModal}
            >
                <RightArrowIcon size={14} />
            </div>
            { isBidModal && (
                <div>
                  <p className='font-medium text-[13px] mt-[20px]'>{bidInfo?.customer}</p>
                </div>
            )
            }
            <div className='mt-[16px]'>
              <h3 className='font-medium text-[20px]'>{isBidModal ? bidInfo?.experienceName : listingInfo?.experienceName}</h3>
              {!isBidModal && (<p className='text-[16px]'>{listingInfo?.experienceType[0]}</p>)}
              <p className='text-[14px]'>{bidInfo?.departureDate}</p>
            </div>
            <div className='flex flex-row gap-[12px] flex-wrap mt-[16px]'>
              <div className='py-[22px] px-[22px] rounded-xl border-[#EFEFEF] border-[1px]'>
                <h3 className='font-medium text-[16px] text-[#454545]'>Guest</h3>
                <p className='font-normal text-[#454545]'>{isBidModal ? bidInfo?.guestCapacity : listingInfo?.boat?.guestCapacity}</p>
              </div>
              {!isBidModal && (
                              <div className='py-[22px] px-[22px] rounded-xl border-[#EFEFEF] border-[1px]'>
                              <h3 className='font-medium text-[16px] text-[#454545]'>Duration</h3>
                              <p className='font-normal text-[#454545]'>{listingInfo?.boat?.duration}</p>
                            </div>
              )}
              {!isBidModal && (
                              <div className=' py-[22px] px-[22px] rounded-xl border-[#EFEFEF] border-[1px]'>
                              <h3 className='font-medium text-[16px] text-[#454545]'>Departure time</h3>
                              <p className='font-normal text-[#454545]'>{listingInfo?.boat?.departureTime?.hour! < 10 ? `0${listingInfo?.boat?.departureTime?.hour!}` : listingInfo?.boat?.departureTime?.hour!}:{listingInfo?.boat?.departureTime?.minute! < 10 ? `0${listingInfo?.boat?.departureTime?.minute!}` : listingInfo?.boat?.departureTime?.minute!}{listingInfo?.boat?.departureTime?.isPM ? ' PM' : ' AM' }</p>
                            </div>
              )}
              <div className='py-[22px] px-[22px] rounded-xl border-[#EFEFEF] border-[1px]'>
                <h3 className='font-medium text-[16px] text-[#454545]'>{isBidModal ? 'Original price' : 'Price'}</h3>
                <p className='font-normal text-[#454545]'>${isBidModal ? bidInfo?.listingAmount : listingInfo?.pricingModel?.pricePerTrip}</p>
              </div>
            {isBidModal && (
                            <div className='bg-[#E0E2F0] py-[22px] px-[22px] rounded-xl text-[#2D3AAF] min-w-[93px]'>
                            <h3 className='font-medium text-[16px]'>Bid</h3>
                            <p className='font-normal'>${bidInfo?.bidAmount}</p>
                          </div>
            )}
            </div>
              {!isBidModal && (
                            <div className='text-[#454545] mt-[16px] flex flex-col'>
                            <div className='overflow-hidden'>
                              <h4 className='text-medium text-[16px]'>Description</h4>
                              <p className='text-[#000000] font-normal max-h-[160px] overflow-scroll'>{listingInfo?.description}</p>
                            </div>
                            <h4 className='text-medium text-[16px] mt-[16px]'>Meeting point</h4>
                            <h4 className='text-medium text-[16px] mt-[12px]'>{listingInfo?.meetingPoint?.streetAddresss}</h4>
                            <p className='text-[#000000] font-normal'>{listingInfo?.meetingPoint?.directions}</p>
                          </div>
              )}
            <div className='flex flex-row gap-[12px] items-center mt-[18px]'>
              <h2 className='font-medium'>Group</h2>
              <div className='flex flex-row gap-[8px] flex-wrap'>
                {isBidModal 
                ? bidInfo?.discounts?.map(d => <CharterBidDiscountTag key={d} tagName={d}/>)
                : Object.keys(listingInfo?.pricingModel?.specialDiscounts!).map(d => <CharterBidDiscountTag key={d} tagName={d}/>)}
              </div>
            </div>
            {bidInfo && isBidModal && handleAcceptOrDeclineBid && (
                        <div className='flex flex-row justify-center gap-[16px] mt-[38px]'>
                          <Button isSecondary text='Decline' onClick={() => {
                            handleAcceptOrDeclineBid(0, bidInfo?.id, bidInfo?.customer, bidInfo?.experienceName)
                            handleCloseModal()
                          }}/>
                          <Button text='Accept' onClick={() => {
                            handleAcceptOrDeclineBid(1, bidInfo?.id, bidInfo?.customer, bidInfo?.experienceName)
                            handleCloseModal()
                          }}/>
                        </div>
            )}
    </div>
  </div>
  </div>
  )
}

export default DashboardDetailsModal