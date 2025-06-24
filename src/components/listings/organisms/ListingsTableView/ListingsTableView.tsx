import { Chip, useMediaQuery } from "@mui/material";
import { ListingTableRow } from "../../molecules/ListingTableRow";
import { ListingsTableViewProps } from "./types";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import Image from "next/image";
import { nanoid } from "nanoid";
import { ListingActions } from '../../molecules/ListingActions/ListingActions';
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";
import { useEffect } from "react";

type Media = {
  id: string;
  fileUrl: string;
  isCompleted: boolean;
}[];

export const ListingsTableView = ({ rows = [], onDelete, onPublish, onDuplicate }: ListingsTableViewProps) => {
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();
  const url = '/home/listings/new';
  const { setListingData } = useData();

  const handleClick = (rowData: any) => {
    setListingData(rowData);
    if (rowData.isFinished) {
      router.push(`${url}?edit=true`);
    } else {
      router.push(`${url}?finish=true`);
    }
  };

  function getPreviewImage(media: Media) {
    // Filter out video files and select the first image file
    const imageFiles = media.filter((file) => {
      // Extract the file extension from the file URL and convert it to lowercase
      const fileExtension = file.fileUrl.split(".").pop()?.toLowerCase();

      // Ensure fileExtension is not undefined before using it and check if it's an image format
      return fileExtension && ["jpg", "jpeg", "png"].includes(fileExtension);
    });

    // Return the URL of the first image file found, or null if no image files were found
    return imageFiles.length > 0 ? imageFiles[0].fileUrl : null;
  };

  const tableView = (
    <table className="w-full border-separate border-spacing-y-[10px]">
      <thead>
        <tr>
          {["Listing Name", "Status", "Experience", "Duration", "Bid", ""].map(
            (heading, index) => (
              <th
                key={nanoid()}
                className={`${index === 0 && "rounded-l-[12px] pl-[20px]"} ${
                  index === 5 && "rounded-r-[12px]"
                } text-[13px] font-[500] py-2 uppercase bg-[#EFEFEF]`}
              >
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-center">
        {rows.map((rowData) => {
          const previewImage = getPreviewImage(rowData.media);

          return (
            <ListingTableRow
              key={nanoid()}
              {...rowData}
              fullRowData={rowData}
              duration={rowData?.boat?.duration}
              complete={rowData?.isFinished}
              previewImgUrl={previewImage}
              isCharterBidEnabled={rowData?.pricingModel?.hasIcharterBid}
              onDelete={() => onDelete(rowData.id)}
              onPublish={(id, isPublished) => onPublish(id, isPublished)}
              onDuplicate={(data) => onDuplicate(data)}
            />
          )})
        }
      </tbody>
    </table>
  );

  const responsiveView = (
    <div className="w-full">
      {rows.map((rowData) => (
        <div key={nanoid()} className="w-full flex flex-col items-center p-[12px] mb-[10px] bg-[#F9F9F9] border border-[#EFEFEF]s rounded-[12px]">
          <div className="w-full flex gap-[10px]">
            <div className="min-w-[65px] w-[65px] min-h-[65px] h-[65px] bg-gradient-to-b from-[#2DD9C3] to-[#2D3AAF] rounded-[12px] flex justify-center items-center overflow-hidden">
              {rowData?.media[0]?.fileUrl && (
                <Image
                  src={rowData?.media[0]?.fileUrl}
                  width={65}
                  height={65}
                  alt="Listing preview image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="lex flex-1 flex-col items-start gap-[10px]">
              <h2 className="text-[14px] font-[500]">
                {rowData.experienceName.slice(0, 14)}
                {rowData.experienceName.length > 15 && "..."}
              </h2>
            </div>
            <div className="flex justify-between items-center gap-[10px]">
              <ListingActions 
                fullRowData={rowData}
                id={rowData.id} 
                isPublished={rowData.isPublished} 
                onDelete={() => onDelete(rowData.id)} 
                onPublish={(id, isPublished) => onPublish(id, isPublished)}    
                onDuplicate={(data) => onDuplicate(data)}           
              />      
            </div>
          </div>
          <div className="w-full text-[#454545] mt-[15px] mb-[20px] flex gap-[11px] opacity-50">
            {rowData?.boat?.duration && (
              <div className="w-[87px]">
                <h3 className="text-[11px] font-[500] leading-[18px]">
                  Duration
                </h3>
                <p className="text-[14px] font-[400] leading-[18px]">
                  {rowData.boat.duration}
                </p>
              </div>
            )}
              <div className="w-[40px]">
                <h3 className="text-[11px] font-[500] leading-[18px]">
                  Bid
                </h3>
                <p className="text-[14px] font-[400] leading-[18px]">
                  {rowData?.pricingModel?.hasIcharterBid === true ? 'Yes' : 'No'}
                </p>
              </div>
            {rowData?.experienceType?.length > 0 && (
              <div>
                <h3 className="text-[11px] font-[500] leading-[18px]">
                  Experience
                </h3>
                <p className="text-[14px] font-[400] leading-[18px]">
                  {rowData.experienceType.join(', ')}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between w-full items-center">
            <Chip
              label={rowData?.isFinished ? "Complete" : "Incomplete"}
              className={`text-[12px] font-[500] w-[93px] ${
                rowData?.isFinished
                  ? "text-[#2B9251] bg-[#CBF1D9]"
                  : "text-[#DA7501] bg-[#FBE6CE]"
              }`}
            />
            <Button
              style={{height:'40px', padding:'12px', width:'103px'}}
              text={rowData?.isFinished ? "Edit" : "Finish"}
              className="self-end"
              onClick={() => handleClick(rowData)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return isResponsive ? responsiveView : tableView;
};
