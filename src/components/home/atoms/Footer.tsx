import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { ICHARTER_PP, ICHARTER_TOU } from "@/utils/constants";

function Footer() {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const images = [
    {
      name: "facebook",
      src: "https://www.facebook.com/iCharterBooking/",
      testId: "footer_facebook-icon",
    },
    {
      name: "instagram",
      src: "https://www.instagram.com/icharterbooking/",
      testId: "footer_instagram-icon",
    },
    {
      name: "tiktok",
      src: "https://www.tiktok.com/@icharterbooking",
      testId: "footer_tiktok-icon",
    },
  ];

  return (
    <footer className="w-full border-t border-[#E0E0E0] bg-white flex flex-col items-center px-4 xl:px-0">
      <div className="w-full flex flex-col mx-[17px] lg:flex-row lg:max-w-[1200px]">
        <div className="flex justify-between mt-[38px] lg:mt-6 items-start flex-col lg:flex-1 gap-6">
          <Image
            src="/imgs/logo_blue.png"
            alt="Icharter-Logo"
            width={isResponsive ? 256 : 165}
            height={isResponsive ? 64 : 40}
            priority
          />
          <div className="flex flex-col">
            <p className="text-black text-sm">icharterbooking.com</p>
          </div>
          <div className="flex items-center gap-6 opacity-50">
            {images.map((item, index) => {
              return (
                <Link href={item.src} key={index}>
                  <Image
                    src={`/footer/${item.name}.svg`}
                    alt="social media"
                    width={16}
                    height={16}
                    style={{ color: "#000000" }}
                    color="#000000"
                    test-id={item.testId}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-start flex-col lg:flex-row lg:gap-20">
          <div className="flex gap-y-3 flex-col mt-6">
            <p className="font-bold">Discover</p>
            <Link href="/market">
              <p className="text-black font-medium" test-id="footer_marketplace">
                Marketplace
              </p>
            </Link>
            <Link href="#top-listings">
              <p
                className="text-black font-medium"
                test-id="footer_top_listings"
              >
                Top Listings
              </p>
            </Link>
            <Link href="#popular_destinations">
              <p
                className="text-black font-medium"
                test-id="footer_popular_destinations"
              >
                Popular Destinations
              </p>
            </Link>
          </div>
          <div
            className="flex gap-y-3 flex-col mt-14 lg:mt-5"
          >
            <p className="font-bold">Support</p>
            <Link href="/faqs">
              <p
                className="text-black font-medium"
                test-id="footer_faqs"
              >
                FAQs
              </p>
            </Link>
            <p
              className="text-black font-medium"
              test-id="footer_privacy"
            >
              <a href={ICHARTER_PP} rel="noopener" target="_blank">
                Privacy
              </a>{" "}
              &{" "}
              <a href={ICHARTER_TOU} rel="noopener" target="_blank">
                {" "}
                Terms
              </a>
            </p>
            <Link href="https://forms.clickup.com/8683127/f/88zkq-39757/HVKHKDGYEC5781CZE4" target="_blank">
              <p
                className="text-black font-medium"
                test-id="footer_contact"
              >
                Send Feedback
              </p>
            </Link>
            <Link href="mailto:info@icharterbooking.com">
              <p
                className="text-black font-medium"
                test-id="footer_contact"
              >
                Contact Us
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="flex border-t border-[#EEE] w-full gap-5 mt-8 pt-8 pb-6 lg:max-w-[1200px] mx-[17px]"
      >
        <p className={`text-black text-sm font-medium`}>
          Copyright © 2024 iCharter
        </p>
      </div>
    </footer>
  );
}

export default Footer;
