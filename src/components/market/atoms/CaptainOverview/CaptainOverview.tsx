import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { GuestIcon } from "@/components/shared/general/atoms/icons/GuestIcon";
import { LocationIcon } from "@/components/shared/general/atoms/icons/LocationIcon";
import { PhoneIcon } from "@/components/shared/general/atoms/icons/PhoneIcon";
import { EmailIcon } from "@/components/shared/general/atoms/icons/EmailIcon";
import { LicenseIcon } from "@/components/shared/general/atoms/icons/LicenseIcon";
import { CaptainOverviewProps } from "./types";
import { CardIcon } from "@/components/shared/general/atoms/icons/CardIcon";
import { CashIcon } from "@/components/shared/general/atoms/icons/CashIcon";
import { VeteranIcon } from "@/components/shared/general/atoms/icons/VeteranIcon";
import { MilitarIcon } from "@/components/shared/general/atoms/icons/MilitarIcon";
import { FirstResponderIcon } from "@/components/shared/general/atoms/icons/FirstResponderIcon";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import { useEffect, useState } from "react";
import { MedalIcon } from "@/components/shared/general/atoms/icons/MedalIcon";
import Link from "next/link";
import { CaptainIcon } from "@/components/shared/general/atoms/icons/CaptainIcon";

export function CaptainOverview({
  location,
  phone,
  email,
  license,
  companyName,
  captainName,
  captainProfilePictureURL,
  groups,
  paymentMethods,
  militaryDiscount,
  veteranDiscount,
  firstResponderDiscount,
  experience,
  charterId,
  charter,
  instagram,
  facebook,
  tikTok,
  yelp,
  experienceType,
}: CaptainOverviewProps) {
  const isResponsive = useMediaQuery("(max-width: 1280px)");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    if (!isResponsive) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isResponsive]);

  return (
    <div className="text-[#454545] w-full py-[20px] xl:py-[36px] px-[22px] bg-white rounded-[12px]">
      <div
        className={`${
          isResponsive
            ? "mb-0 xl:mb-[50px] flex items-center justify-between xl:justify-center"
            : "hidden"
        }`}
        onClick={() => {
          if (!isResponsive) return;
          setIsExpanded((prev) => !prev);
        }}
      >
        {isResponsive && !charter && (
          <div className="flex justify-center items-center text-[20px] font-medium gap-[10px] h-[52px]">
            <CaptainIcon size={30} />
            {captainName}
          </div>
        )}
        {isResponsive && charter && (
          <div className="flex items-center gap-[8px]">
            <div className="w-[50px] xl:w-[64px] h-[50px] xl:h-[64px] rounded-full overflow-hidden relative">
              <ImageFallback
                src={captainProfilePictureURL}
                fallbackSrc="/svgs/icharter_icon.svg"
                alt="Charter profile picture"
              />
            </div>
            {charterId ? (
              <Link href={`/market/charter/${charterId}`}>
                <h3 className="text-[20px] font-[500]">{companyName}</h3>
              </Link>
            ) : (
              <h3 className="text-[20px] font-[500]">{companyName}</h3>
            )}
          </div>
        )}
        <div
          className={`block xl:hidden transform ${
            isExpanded && "rotate-[90deg]"
          }`}
        >
          <RightArrowIcon size={12} />
        </div>
      </div>
      <div className={`flex flex-col ${isExpanded ? "flex" : "hidden"}`}>
        {!charter && (
          <div
            className={`${
              isResponsive ? "mt-[30px]" : "mb-[10px]"
            } flex items-center gap-[8px]`}
          >
            <div className="w-[50px] xl:w-[64px] h-[50px] xl:h-[64px] rounded-full overflow-hidden relative">
              <ImageFallback
                src={captainProfilePictureURL}
                fallbackSrc="/svgs/icharter_icon.svg"
                alt="Charter profile picture"
              />
            </div>
            {charterId ? (
              <Link href={`/market/charter/${charterId}`}>
                <h3 className="text-[20px] font-[500]">{companyName}</h3>
              </Link>
            ) : (
              <h3 className="text-[20px] font-[500]">{companyName}</h3>
            )}
          </div>
        )}
        <div className="mt-[30px] xl:mt-0">
          <h4 className="text-[13px] font-[500] mb-[6px]">Experience</h4>
          <div className="flex items-center gap-[4px]">
            <MedalIcon size={19} />
            <p className="text-[16px] font-[400]">
              {experience} years of experience
            </p>
          </div>
        </div>
        {location && (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[500] mb-[6px]">Location</h4>
              <div className="flex items-center gap-[4px]">
                <LocationIcon size={19} />
                <p className="text-[16px] font-[400]">
                  {location
                    // Split the location string into an array of words based on spaces
                    .split(" ")
                    // Capitalize the first letter of each word
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    // Join the modified words back into a single string with spaces between them
                    .join(" ")}
                </p>
              </div>
            </div>
          </>
        )}
        {groups && groups.length > 0 && (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[500] mb-[6px]">Group</h4>
              <div className="flex flex-col gap-[6px]">
                {groups.map((group) => (
                  <div key={group} className="flex items-center gap-[4px]">
                    <GuestIcon size={19} />
                    <p className="text-[16px] font-[400]">{group}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {
          phone && (
            <>
              <hr className="bg-[#EAE8E1] my-[18px]" />
              <div>
                <h4 className="text-[13px] font-[500] mb-[6px]">Phone number</h4>
                <div className="flex items-center gap-[4px]">
                  <PhoneIcon size={19} />
                  <p className="text-[16px] font-[400]">
                    {phone}
                  </p>
                </div>
              </div>
            </>
          )
        }
        {
          email && (
            <>
              <hr className="bg-[#EAE8E1] my-[18px]" />
              <div>
                <h4 className="text-[13px] font-[500] mb-[6px]">Email</h4>
                <div className="flex items-center gap-[4px]">
                  <EmailIcon size={19} />
                  <p className="text-[16px] font-[400]">
                    {email}
                  </p>
                </div>
              </div>
            </>
          )
        }
        {/* {
          license && (
            <>
              <hr className="bg-[#EAE8E1] my-[18px]" />
              <div>
                <div className="flex items-center gap-[4px]">
                  <LicenseIcon size={24} />
                  <a href={license} target="_blank" rel="noopener noreferrer">
                    <p className="text-[16px] font-[400]">
                      OUPV License 
                    </p>
                  </a>
                </div>
              </div>
            </>
          )
        } */}
        {!charter && (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[500] mb-[6px]">Payment Method</h4>
              <div className="flex flex-col gap-[6px]">
                {paymentMethods.map((method) => (
                  <div key={method} className="flex items-center gap-[4px]">
                    {/card/i.test(method) ? (
                      <CardIcon size={24} />
                    ) : (
                      <CashIcon size={24} />
                    )}
                    <p className="text-[16px] font-[400]">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {!charter && (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[500] mb-[6px]">Experience Model</h4>
              <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-[4px]">
                    <Image src={`/svgs/experience-${experienceType}.svg`} width={24} height={24} alt="experience-type-icon"/>
                    <p className="text-[16px] font-[400] capitalize">{experienceType}</p>
              </div>
              </div>
            </div>
          </>
        )}
        {(militaryDiscount !== "0" ||
          veteranDiscount !== "0" ||
          firstResponderDiscount !== "0") && (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[500] mb-[6px]">Discount</h4>
              <div className="flex flex-col gap-[6px]">
                {firstResponderDiscount !== "0" && (
                  <div className="text-[#543EAB] flex items-center gap-[6px]">
                    <div className="w-[41px] h-[41px] flex items-center justify-center bg-[#E5E3F0] border border-[currentcolor] rounded-full">
                      <FirstResponderIcon size={20} />
                    </div>
                    <p className="text-[16px] font-[500]">
                      {firstResponderDiscount}% First Responders
                    </p>
                  </div>
                )}
                {veteranDiscount !== "0" && (
                  <div className="text-[#008BD0] flex items-center gap-[6px]">
                    <div className="w-[41px] h-[41px] flex items-center justify-center bg-[#D9EEF7] border border-[currentcolor] rounded-full">
                      <VeteranIcon size={20} />
                    </div>
                    <p className="text-[16px] font-[500]">
                      {veteranDiscount}% Veterans
                    </p>
                  </div>
                )}
                {militaryDiscount !== "0" && (
                  <div className="text-[#3F8E84] flex items-center gap-[6px]">
                    <div className="w-[41px] h-[41px] flex items-center justify-center bg-[#D9F5F2] border border-[currentcolor] rounded-full">
                      <MilitarIcon size={20} />
                    </div>
                    <p className="text-[16px] font-[500]">
                      {militaryDiscount}% Active Military
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {instagram || facebook || tikTok || yelp ? (
          <>
            <hr className="bg-[#EAE8E1] my-[18px]" />
            <div>
              <h4 className="text-[13px] font-[700] mb-[6px]">Follow us!</h4>
              <div className="flex items-center gap-[4px]">
                <div className="flex items-center gap-[12px]">
                  {instagram && instagram.trim() !== '' && (
                    <a href={instagram} target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/svgs/instagram.svg"
                        alt="Instagram Icon"
                      />
                    </a>
                  )}
                  {facebook && facebook.trim() !== '' && (
                    <a href={facebook} target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/svgs/facebook.svg"
                        alt="Facebook Icon"
                      />
                    </a>
                  )}
                  {tikTok && tikTok.trim() !== '' && (
                    <a href={tikTok} target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/svgs/tiktok.svg"
                        alt="Tik Tok Icon"
                      />
                    </a>
                  )}
                  {yelp && yelp.trim() !== '' && (
                    <a href={yelp} target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/svgs/yelp.svg"
                        alt="Yelp Icon"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
