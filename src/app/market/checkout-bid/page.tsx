"use client"
import moment from "moment";
import Cookies from "js-cookie";
import apiService from "@/services/apiService";
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export default async function CheckoutBid({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
})
{
  console.log("params", params);
  console.log("searchParams", searchParams);
  if(!searchParams || !searchParams["checkout_bid_request_id"]){
    return;
  }
  const checkout_bid_request_id = searchParams["checkout_bid_request_id"].toString()
  const { error, data: response } = await apiService.get(`bid/${checkout_bid_request_id}`);
  console.log("RESPONSE", response);
  const { amount, departureDate, listing, user} = response;
  
  const cookieData = [
    {name: "checkout_listing_id", value: listing.id},
    {name: "checkout_bid_request_id", value: checkout_bid_request_id},
    {name: "checkout_start_date", value: departureDate},
    {name: "checkout_user_id", value: user.id},
    {name: "checkout_first_name", value: user.name},
    {name: "checkout_last_name", value: user.lastName},
    {name: "checkout_email", value: user.email},
    {name: "checkout_bid_amount", value: amount},
    {name: "checkout_mobile", value: ""}
  ]

  cookieData.map((item) => {
    if(item.value){
      if(item.name == "checkout_start_date"){
        Cookies.set(item.name, moment(item.value).format("dddd, MMMM D, YYYY"))
      }else{
        Cookies.set(item.name, item.value);
      }
      console.log(item.name, item.value);
    }
  });


  return (
    <div className="w-full text-[#454545] flex justify-center">
           <meta httpEquiv="refresh" content={`3;url=/market/checkout`} />
    </div>
  );
}
