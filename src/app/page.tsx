"use client";
import HomePageBanner from "../components/home/molecules/HomePageBanner";
import NavBar from "../components/home/molecules/NavBar/NavBar";
import Footer from "@/components/home/atoms/Footer";
import CharterIndustry from "@/components/home/molecules/CharterIndustry";
import ListYourExperience from "@/components/home/molecules/ListYourExperience";
import IcharterBid from "@/components/home/molecules/IcharterBid";
import IcharterCarousel from "@/components/home/molecules/IcharterCarousel";
import ReviewCharter from "@/components/home/molecules/ReviewCharter/ReviewCharter";
import TopListings from "@/components/home/molecules/TopListings";
import BrowsebyExperience from "@/components/home/molecules/BrowsebyExperience";
import PopularDestinations from "@/components/home/molecules/PopularDestinations";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";

export default function Home() {
  const [listings, setListings] = useState([]);
  // Fetch market listings
  async function getListings() {
    //Set params
    const params = {
      location: "",
      dateFrom: "",
      dateTo: "",
      experienceType: [],
      guests: 0,
      withBid: undefined,
    };

    const { data, error } = await apiService.get("listings/all", params);

    setListings(data);
  }

  // Fetch marketPlaceListing when the component mounts
  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <NavBar />
      <HomePageBanner />
      {/* <CharterIndustry /> */}
      <IcharterBid />
      <TopListings listings={listings} />
      <BrowsebyExperience />
      <PopularDestinations listings={listings} />
      <IcharterCarousel />
      <ReviewCharter />
      <ListYourExperience />
      <Footer />
    </>
  );
}
