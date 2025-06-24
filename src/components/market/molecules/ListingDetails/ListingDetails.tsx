import { useState } from "react";
import { DetailsTabs, ListingDetailsProps } from "./types";
import { nanoid } from "nanoid";
import { TargetedSpecies } from "../../atoms/TargetedSpecies";
import { BoatInformation } from "../../atoms/BoatInformation";
import { FeaturesSection } from "../../atoms/FeaturesSection";
import { PricingPanel } from "../../atoms/PricingPanel";
import { boatTypes } from "@/components/listings/organisms/BoatInformationForm/types";

const itemStyles = "min-w-max py-[8px] px-[14px] rounded-[12px]";
const activeItemStyles = `${itemStyles} text-[#2D3AAF] font-[700] bg-[#E0E2F061]`;

export function ListingDetails({
  targetedSpecies,
  boatInformation,
  fishingTechniques,
  includedInPrice,
  facilities,
  paymentAndCancellation,
}: ListingDetailsProps) {
  const [currentTab, setCurrentTab] = useState<string>(
    DetailsTabs.TARGETED_SPECIES
  );

  const boatType =
    boatTypes?.filter((bt) => bt.name === boatInformation.type) || [];
  const boatImgUrl = `/imgs/${boatType[0]?.img}.svg` || "";

  return (
    <section className="flex flex-col gap-[30px] max-w-[calc(100vw-32px)] mx-4 xl:mx-0">
      <ul className="text-[13px] p-[7px] text-[#454545] font-[500] bg-white rounded-[12px] flex justify-between items-center list-none xl:gap-0 overflow-x-auto">
        {Object.values(DetailsTabs).map((tab) => (
          <li
            key={nanoid()}
            className={currentTab === tab ? activeItemStyles : itemStyles}
          >
            <button
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div className="py-[26px] px-[30px] bg-white rounded-[12px] flex flex-col gap-[30px]">
        <h4 className="text-[20px] font-[700]">{currentTab}</h4>
        {currentTab === DetailsTabs.TARGETED_SPECIES && targetedSpecies && (
          <TargetedSpecies species={targetedSpecies} />
        )}
        {currentTab === DetailsTabs.BOAT_INFORMATION && (
          <BoatInformation
            type={boatInformation.type}
            numberOfPeople={boatInformation.numberOfPeople}
            description={boatInformation.description}
            boatImgUrl={boatImgUrl}
          />
        )}
        {currentTab === DetailsTabs.FISHING_TECHNIQUES && (
          <FeaturesSection features={fishingTechniques} />
        )}
        {currentTab === DetailsTabs.INCLUDED_IN_PRICE && (
          <FeaturesSection features={includedInPrice} />
        )}
        {currentTab === DetailsTabs.FACILITIES && (
          <FeaturesSection features={facilities} />
        )}
        {currentTab === DetailsTabs.PAYMENT_AND_CANCELLATION && (
          <PricingPanel policy={paymentAndCancellation} />
        )}
      </div>
    </section>
  );
}
