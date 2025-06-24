import Image from "next/image";
import { BoatInformationProps } from "./types";

export function BoatInformation({
  type,
  numberOfPeople,
  description,
  boatImgUrl,
}: BoatInformationProps) {
  return (
    <div className="flex flex-col xl:grid grid-cols-[max-content_1fr] gap-[50px]">
      <div>
        <h4 className="text-[16px] font-[700] mb-[14px]">Type</h4>
        <div className="flex flex-row gap-3">
          {
            !boatImgUrl
            ? null
            : (<Image 
              src={boatImgUrl as string} 
              alt="boat-type-img" 
              width={0} height={0} 
              sizes="100vw" 
              style={{width: '72px', height: '32px'}}/>)
          }
          <div className="pt-3">
            <p className="align-bottom">{type}</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-[16px] font-[700] mb-6 mt-[2px]">Description</h4>
        <p className="break-all">{description}</p>
      </div>
      <div>
        <h4 className="text-[16px] font-[700]">Number of people</h4>
        <p>
          {numberOfPeople} {numberOfPeople > 1 ? "guests" : "guest"}
        </p>
      </div>
    </div>
  );
}
