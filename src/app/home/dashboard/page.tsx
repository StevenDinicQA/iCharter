'use client';

import BidsTable from '@/components/dashboard/organisms/BidsTable';
import CharterUpcomingBookings from '@/components/dashboard/organisms/CharterUpcomingBookings';
import DashboardDetailsModal from '@/components/dashboard/organisms/DashboardDetailsModal';
import { Button } from '@/components/shared/forms/atoms/buttons/Button';
import { ScreenLoading } from '@/components/shared/general/atoms/ScreenLoading';
import { RightArrowIcon } from '@/components/shared/general/atoms/icons/RightArrowIcon';
import { useAuthContext } from '@/context/AuthContext';
import apiService from '@/services/apiService';
import { CharterBid, CharterBidsResponse } from '@/types/bids/CharterBids';
import { UpcomingBookingsResponse } from '@/types/charterUpcomingBookings/CharterUpcomingBookings';
import { Listing } from '@/types/listings/listing';
import { CHARTER_BIDS_PER_CALL } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const DashboardScreen = () => {

  const { user } =  useAuthContext();

  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [bidsData, setBidsData] = useState<CharterBidsResponse | null>(null);
  const [upcomingBookingsData, setUpcomingBookingsData] = useState<UpcomingBookingsResponse | null>(null);
  const [showBidDetailModal, setShowBidDetailModal] = useState<boolean>(false);
  const [showBookingDetailModal, setShowBookingDetailModal] = useState<boolean>(false);
  const [selectedBidForDetails, setSelectedBidForDetails] = useState<CharterBid | null>(null);
  const [selectedListingForDetails, setSelectedListingForDetails] = useState<Listing | null>(null);

const getBids = async (page: string, pageSize: string,) => {

    if(!user || !page || !pageSize) return;

    const {error, data} = await apiService.get(`bid/charterProfile/${user?.charterProfile?.id}?status=pending&page=${page}&pageSize=${pageSize}`);

    if(error){
        toast.error(error);
        return;
    }

    setBidsData(data);
    setIsPageLoading(false);
}

const getUpcomingBookings = async () => {
  if(!user) return;

  const {error, data} = await apiService.get(`bookings/charter/${user?.charterProfile?.id}/upcoming`);

  if(error) {
    toast.error(error);
    return;
  }

  setUpcomingBookingsData(data);

}

const handleAcceptOrDeclineBid = async (option: number, bidId: string, customer: string, experience:string) => {
  if(!bidId) return;

  const shortenedCustomerName = customer.split(/(\s+)/);

  if(option === 0) {

    const { error } = await apiService.patch(`bid/${bidId!}/status`, {
      status: 'rejected',
    })

    if(!error) {
      toast.custom(<div className='bg-[#FFF4E7] text-center py-[29px] px-[23px] rounded-xl drop-shadow-lg flex flex-col items-center gap-2'>
        <h2 className='text-[#DA7501] font-bold text-[20px]'>Declined</h2>
        <p className='text-[16px] text-[#DA7501] max-w-[80%]'>{`You declined ${shortenedCustomerName && shortenedCustomerName[0]}'s bid for the ${experience} experience. We sent them an email to let them know.`}</p>
      </div>)

      getBids('1', CHARTER_BIDS_PER_CALL.toString());
    }

  } else {

    const { error } = await apiService.patch(`bid/${bidId!}/status`, {
      status: 'accepted',
    })

    if(!error) {
      toast.custom(<div className='bg-[#F3F4F9] text-center py-[29px] px-[23px] rounded-xl drop-shadow-lg flex flex-col items-center gap-2'>
      <h2 className='text-[#2D3AAF] font-bold text-[20px]'>Congrats!</h2>
      <p className='text-[16px] text-[#2D3AAF] max-w-[80%]'>{`You accepted ${shortenedCustomerName && shortenedCustomerName[0]}'s bid for the ${experience} experience. We sent them a confirmation email.`}</p>
    </div>)

      getBids('1', CHARTER_BIDS_PER_CALL.toString());
    }

  }
} 

const getListingsDetails = async (listingId: string) => {
  const {error, data} = await apiService.get(`listings/${listingId}`);

  if(error) {
    toast.error(error);;
    return
  };
  
  setSelectedListingForDetails(data);

}

const handleOpenDetailsModal = (bidInfo: CharterBid) => {
  setSelectedBidForDetails(bidInfo);

  setShowBidDetailModal(true);
}

const handleOpenBookingDetailsModal = (listingId: string) => {

    getListingsDetails(listingId);

    setShowBookingDetailModal(true);
}

const handleCloseModal = () => {
  setShowBidDetailModal(false);
  setShowBookingDetailModal(false);
}

useEffect(() => {
    getBids('1', CHARTER_BIDS_PER_CALL.toString());
    getUpcomingBookings();
}, [user]);

  return (
    <main className="text-[#454545] pt-[20px] lg:pt-[75px] pl-[16px] lg:pl-[85px] pr-[18px] lg:pr-[90px] flex flex-col gap-[20px] lg:gap-[37px] pb-[120px]">
      {isPageLoading && <ScreenLoading />}
      {!isPageLoading && (
        <>
          <section className="flex justify-between items-center">
            <h2 className="text-[18px] lg:text-[28px] font-[700]">Dashboard</h2>
          </section>
          {upcomingBookingsData && (
            <CharterUpcomingBookings openBookingDetailsModal={handleOpenBookingDetailsModal} bookingsData={upcomingBookingsData}/>
          )}
          {bidsData && (
            <BidsTable 
            openDetailsModal={handleOpenDetailsModal}
            getBids={getBids} 
            bidsData={bidsData} 
            handleAcceptOrDeclineBid={handleAcceptOrDeclineBid} 
            mainContainerStyles={showBidDetailModal || showBookingDetailModal ? 'hidden' : ''}/>
          )}
        </>
      )}
      {
        showBidDetailModal && selectedBidForDetails && (
          <DashboardDetailsModal 
          isBidModal={true} 
          handleCloseModal={handleCloseModal} 
          bidInfo={selectedBidForDetails}
          handleAcceptOrDeclineBid={handleAcceptOrDeclineBid}
          />
        )
      }
      {
        showBookingDetailModal && selectedListingForDetails && (
          <DashboardDetailsModal 
          isBidModal={false}
          handleCloseModal={handleCloseModal} 
          listingInfo={selectedListingForDetails}
          />
        )
      }
    </main>
  )
}

export default DashboardScreen;