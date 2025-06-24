import { UpcomingBookingsResponse } from '@/types/charterUpcomingBookings/CharterUpcomingBookings'
import Image from 'next/image'
import React from 'react'

const CharterUpcomingBookings = ({bookingsData, openBookingDetailsModal}: {bookingsData: UpcomingBookingsResponse, openBookingDetailsModal: (listingid:string) => void}) => {
  return (
    <section className=' w-full flex flex-col px-[20px] py-[20px] rounded-xl bg-[#FFFFFF]'>
    {bookingsData?.upcomingBookins?.length === 0
    ? (<>
                    <section className="px-0 sm:px-4  md:px-10 py-4  bg-white rounded-[12px] flex flex-col items-center justify-center gap-[12px]">
                    <div className="my-[65px] flex flex-col justify-center items-center gap-[12px]">
                      <Image
                        width={236}
                        height={124}
                        src="/svgs/empty_charter_bookings.svg"
                        alt="Fish icon"
                      />
                      <h3 className="text-[18px] font-[500] text-[#454545] text-center">
                      You don&apos;t have any upcoming trips
                      </h3>
                      <p className="text-[#BDBDBD] text-[16px]  lg:w-[426px] text-center mb-[11px]">
                      Here you will see your upcoming trips
                      </p>
                    </div>
                </section>
    </>)
    : (<>
        <div className=' flex flex-row gap-2 items-center'>
            <h2 className='font-bold text-[18px] text-[#454545] whitespace-nowrap'>Upcoming bookings</h2>
            <div className='bg-[#E0E2F0] flex justify-center items-center h-[31px] px-[14px] py-[6px] rounded-[25px] whitespace-nowrap'>
                <p className='font-medium text-[#2D3AAF] text-[12px]'>{bookingsData?.nextBooking}</p>
            </div>
        </div>
        <div className=' mt-[30px] text-[#454545] flex flex-row overflow-x-scroll gap-5'>
        {bookingsData?.upcomingBookins?.map(b => {
            return (
            <div key={b?.bookingId} 
            onClick={() => openBookingDetailsModal(b?.listingId)}
            className='bg-[#F9F9F9] border-[1px] border-[#EFEFEF] flex flex-col p-[12px] min-w-[160px] gap-[8px] rounded-xl justify-center cursor-pointer'>
                <div>
                    <p className='text-[12px]'>Date</p>
                    <h2 className='font-medium text-[14px]'>{b?.date}</h2>
                </div>
                <div>
                    <p className='text-[12px]'>Listing</p>
                    <h2 className='font-medium text-[14px]'>{b?.listingName?.length < 16 ? b.listingName : `${b.listingName.slice(0, 14)}...` }</h2>
                </div>
                <div>
                    <p className='text-[12px]'>Place</p>
                    <h2 className='font-medium text-[14px]'>{b?.address?.length < 14 ? b.address : `${b.address.slice(0, 14)}...` }</h2>
                </div>
            </div>
            )
        })}
        </div>
    </>)}
    </section>
  )
}

export default CharterUpcomingBookings