import { ListingTableRowProps } from "./types";
import { Chip } from "@mui/material";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { nanoid } from "nanoid";
import { ListingActions } from '../ListingActions/ListingActions';
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

export const ListingTableRow = ({
  previewImgUrl,
  id,
  experienceName,
  complete,
  experienceType,
  duration,
  bidRequests,
  isCharterBidEnabled,
  isPublished,
  onDelete,
  onPublish,
  onDuplicate,
  fullRowData
}: ListingTableRowProps) => {
  const router = useRouter();
  const url = '/home/listings/new';
  const { setListingData } = useData();

  const handleClick = () => {
    setListingData(fullRowData);
    if (complete) {
      router.push(`${url}?edit=true`);
    } else {
      router.push(`${url}?finish=true`);
    }
  };

  return (
    <>
      <tr className="text-[#454545] h-[85px] outline outline-[#EFEFEF] bg-[#F9F9F9] rounded-[12px]">
        <td className="text-[16px] font[400] pl-[20px]">
          <div className="flex items-center gap-[13px]">
            <div className="min-w-[65px] w-[65px] min-h-[65px] h-[65px] bg-gradient-to-b from-[#2DD9C3] to-[#2D3AAF] rounded-[12px] flex justify-center items-center overflow-hidden relative">
              {
                <ImageFallback
                  src={previewImgUrl}
                  fallbackSrc="/svgs/icharter_icon.svg"
                  alt="Listing preview image"
                  className="w-full h-full object-cover"
                />
              }
            </div>
            <p className="max-w-[200px] min-w-[150px]">{experienceName}</p>
          </div>
        </td>
        <td className="w-[115px]">
          <Chip
            label={complete ? "Complete" : "Incomplete"}
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: complete ? "#2B9251" : "#DA7501",
              backgroundColor: complete ? "#CBF1D9" : "#FBE6CE",
            }}
          />
        </td>
        <td>
          {experienceType?.map((experience) => (
            <p key={nanoid()}>{experience}</p>
          ))}
        </td>
        <td className="w-[200px]">{duration}</td>
        <td className="w-[50px]">
          {/* {bidRequests === undefined ? "" : bidRequests.some(request => request.status === 'accepted') ? "Yes" : "No"} */}
          {isCharterBidEnabled ? "Yes" : "No"}
        </td>
        <td>
          <div className="pr-[20px] flex items-center justify-end gap-[14px]">
            <Button 
               test-id="btn-edit-listing"
               style={{width:'103px'}}
                text={complete ? "Edit" : "Finish"} 
                onClick={handleClick}
            />
            <ListingActions 
              fullRowData={fullRowData}
              id={id} 
              isPublished={isPublished} 
              onDelete={onDelete} 
              onPublish={(id, isPublished) => onPublish(id, isPublished)} 
              onDuplicate={(data) => onDuplicate(data)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};
