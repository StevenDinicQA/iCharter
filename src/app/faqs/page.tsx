"use client";
import InfoBox from "@/components/faqs/molecules/InfoBox";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

const faqs = [
  {
    title: "Who is iCharter?",
    text: "iCharter was founded by three individuals who saw an opportunity to reimagine and innovate how charters are booked leveraging enhanced search capabilities, rankings driven by repeat and referral business, not how much the charters pays, active military and first responder discounts, and consumers rewards. This innovative approach to booking charters will ensure you have the best experience.",
  },
  {
    title: "What is iCharterBid?",
    text: "iCharterBid is a unique approach to matching last minute charter requests with Captains who have availability. A customer can submit a bid to Charters in the area. Like rideshare, the Captains will be notified of your request and will accept or decline your offer. Not every Captain participates in iCharterBid, but new Captains are being added every day.",
  },
  {
    title: "How do I get my refund for a canceled charter?",
    text: "We hope you are able to work with your Captain to reschedule your charter. However, if a refund has been requested, it will be processed within 7-10 days. Thank you for using iCharter.",
  },
  {
    title: "Cancelation policies?",
    text: "iCharter allows Captains to determine their own cancellation policy. Please refer to your confirmation email and contact your captain directly if you need to cancel your charter.",
  },
  {
    title: "Do charters offer discounts?",
    text: "iCharter allows Captains to provide discounts to active military, veterans, and first responders. The rate is set by each Captain and is applied at checkout.",
  },
];

function FaqsScreen() {
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const isNotResponsive = useMediaQuery("(min-width: 1024px)");
  const isSmallestDevice = useMediaQuery("(max-width: 320px)");
  const isMobileDevice = useMediaQuery("(min-width: 375px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={`bg-[#F9F9F9] ${
        isResponsive ? "mt-3" : "px-[80px] my-[87px]"
      }`}
    >
      <div
        className={`${
          isResponsive ? "" : "flex justify-between"
        } md:flex md:justify-around`}
      >
        <div
          className={`${
            isResponsive ? "" : "flex justify-between"
          } md:flex md:justify-around lg:gap-2 w-full ${
            isNotResponsive && "min-w-[980px]"
          }`}
        >
          <h1
            className={`font-medium ${
              isResponsive
                ? isSmallestDevice
                  ? "text-[22px] w-[300px] mb-5"
                  : "text-[25px] w-[300px] mb-5"
                : "text-[40px] w-[548px] mb-[70px]"
            } ${isSmallestDevice && "w-[300px]"} ${
              isMobileDevice && "w-[350px]"
            } ${isTablet && "w-[350px]"} ${isNotResponsive && "w-[480px]"}`}
          >
            Do you have a question? We have an answer.
          </h1>
          {/*Ghost div for making title aligned to content*/}
          <div
            className={`bg-[#F9F9F9] cursor-pointer min-h-[58px] px-[12px] md:px-[23px] py-[8px] rounded-xl ${
              !isTablet && "hidden"
            } ${isSmallestDevice && "w-[300px]"} ${isTablet && "w-[350px]"} ${
              isNotResponsive && "w-[480px]"
            } `}
          ></div>
        </div>
      </div>
      <div
        className={`${
          isResponsive ? "" : "flex justify-between"
        } md:flex md:justify-around lg:gap-2`}
      >
        <div>
          <div className={`${isResponsive ? "mb-[12px]" : "mb-[22px]"}`}>
            <InfoBox title={faqs[0].title} text={faqs[0].text} />
          </div>
          <div className={`${isResponsive ? "mb-[12px]" : "mb-[22px]"}`}>
            <InfoBox title={faqs[1].title} text={faqs[1].text} />
          </div>
          <div className={`${isResponsive ? "mb-[12px]" : ""}`}>
            <InfoBox title={faqs[2].title} text={faqs[2].text} />
          </div>
        </div>
        <div>
          <div className={`${isResponsive ? "mb-[12px]" : "mb-[22px]"}`}>
            <InfoBox title={faqs[3].title} text={faqs[3].text} />
          </div>
          <InfoBox title={faqs[4].title} text={faqs[4].text} />
        </div>
      </div>
    </div>
  );
}

export default FaqsScreen;
