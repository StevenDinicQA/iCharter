import { useState } from "react";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import Tooltip from "@/components/shared/general/Tooltip";
import CustomAlert from "@/components/shared/general/CustomAlert";
import apiService from "@/services/apiService";
import { DeleteIcon } from "@/components/shared/general/atoms/icons/DeleteIcon";
import { DeleteListingErrorTypes, ListingActionsProps } from "./types";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { DuplicateIcon } from "@/components/shared/general/atoms/icons/DuplicateIcon";
import { Switch } from "@/components/shared/forms/atoms/Switch";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

export const ListingActions = ({
  id,
  onDelete,
  isPublished,
  onPublish,
  onDuplicate,
  fullRowData,
}: ListingActionsProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [hasActiveBookings, setHasActiveBookings] = useState(false);
  const [isUnpublish, setIsUnpublish] = useState(false);
  const [errorType, setErrorType] = useState<DeleteListingErrorTypes | null>(
    null
  );
  const [publishUncompletedModal, setPublishUncompletedModal] = useState(false);
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();
  const url = "/home/listings/new";
  const { setListingData } = useData();

  const handleDelete = async () => {
    // Send delete request to the API
    const { error, data, status } = await apiService.delete(`listings/${id}`);

    // If there's an error and the listing is published
    if (error && isPublished) {
      // Determine the type of error
      error === "Listing has pending bid requests"
        ? setErrorType(DeleteListingErrorTypes.Bids)
        : setErrorType(DeleteListingErrorTypes.Bookings);

      // Close the delete modal and set active bookings flag
      setDeleteModal(false);
      setHasActiveBookings(true);
    }
    // If there's an error and the listing is not published
    else if (error && !isPublished) {
      // Determine the type of error
      error === "Listing has pending bid requests"
        ? setErrorType(DeleteListingErrorTypes.Bids)
        : setErrorType(DeleteListingErrorTypes.Bookings);

      // Close the delete modal and set unpublish flag
      setDeleteModal(false);
      setIsUnpublish(true);
    }
    // If there's no error, call the onDelete callback
    else {
      onDelete();
    }

    // Close the delete modal
    setDeleteModal(false);
  };

  const handlePublish = async (body = {}) => {
    const { data, error, status } = await apiService.put(
      `listings/${id}/publish`,
      body
    );
    if (error) {
      toast.error("Error publishing listing");
      return;
    } else if (status === 400) {
      setPublishUncompletedModal(true);
      return;
    }
    onPublish(id, data.isPublished);
  };

  const handleDuplicate = async () => {
    const { data, error, status } = await apiService.post(
      `listings/duplicate/${id}`,
      {}
    );
    if (error) {
      toast.error("Error duplicating listing");
      return;
    } else if (!error) {
      onDuplicate(data);
    }
  };

  const handleFinish = () => {
    setListingData(fullRowData);
    setPublishUncompletedModal(false);
    router.push(`${url}?finish=true`);
  };

  return (
    <>
      <Tooltip
        testId="tooltip-publish-listing"
        text={isPublished ? "Unpublish" : "Publish"}
      >
        <Switch
          testId="switch-publish-listing"
          htmlFor={`switch–${nanoid()}`}
          active={isPublished}
          onChange={handlePublish}
        />
      </Tooltip>
      <div className="cursor-pointer" onClick={handleDuplicate}>
        <Tooltip text="Duplicate" testId="btn-duplicate-listing">
          <DuplicateIcon size={24} />
        </Tooltip>
      </div>
      <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
        <Tooltip text="Delete" testId="btn-delete-listing">
          <DeleteIcon size={24} />
        </Tooltip>
      </div>

      {/* ... Delete listing modal ... */}
      <CustomAlert
        removeCloseIcon={true}
        openModal={deleteModal}
        setOpenModal={setDeleteModal}
        width={isResponsive ? 355 : 446}
      >
        <div className="text-[#454545] text-center flex flex-col items-center">
          <h2 className="text-[20px] font-[700] mb-[25px]">
            Are you sure you want to delete this listing?
          </h2>
          <Image
            src="/imgs/delete_fish.png"
            width={150}
            height={105}
            alt="Delete listing fish"
          />
          <p
            className={`${
              isResponsive ? "text-[14px]" : "text-[16px]"
            } font-normal leading-[20px] mt-[25px] mb-[24px]`}
          >
            This action cannot be undone. This listing will be removed from
            marketplace and all data related will be erased.
          </p>
          <div className="flex gap-2.5">
            <Button
              text="Yes, delete"
              isSecondary={true}
              onClick={handleDelete}
            />
            <Button text="Cancel" onClick={() => setDeleteModal(false)} />
          </div>
        </div>
      </CustomAlert>

      {/* ... Publish uncompleted listing modal ... */}
      <CustomAlert
        openModal={publishUncompletedModal}
        setOpenModal={setPublishUncompletedModal}
        width={isResponsive ? 355 : 446}
      >
        <div className="text-[#454545] text-center flex flex-col items-center">
          <h2 className="text-[20px] font-[700] mb-[25px]">
            Oh! It looks like this listing is missing some important
            information.
          </h2>
          <Image
            src="/imgs/publish_fish_2.png"
            width={180}
            height={116}
            alt="Publish listing fish"
          />
          <p
            className={`${
              isResponsive ? "text-[14px]" : "text-[16px] w-[354px]"
            } font-normal leading-[20px] mt-[25px] mb-[24px]`}
          >
            To be able to publish a listing on the marketplace this one needs to
            be completed.
          </p>
          <div className="flex gap-2.5">
            <Button text="Finish" onClick={handleFinish} />
          </div>
        </div>
      </CustomAlert>

      {/* ... Active bookings listing modal ... */}
      <CustomAlert
        removeCloseIcon={true}
        openModal={hasActiveBookings}
        setOpenModal={setHasActiveBookings}
        width={isResponsive ? 355 : 446}
      >
        <div className="text-[#454545] text-center flex flex-col items-center">
          <h2 className="text-[20px] font-[700] mb-[25px]">
            Oh! It looks like this listing has active {errorType} and can&apos;t
            be deleted.
          </h2>
          <Image
            src="/imgs/delete_fish.png"
            width={150}
            height={105}
            alt="Delete listing fish"
          />
          <p
            className={`${
              isResponsive ? "text-[14px]" : "text-[16px] w-[354px]"
            } font-normal leading-[20px] mt-[25px] mb-[24px]`}
          >
            For now it&apos;s only possible to unpublish the listing.
          </p>
          <div className="flex gap-2.5">
            <Button
              text="Yes, unpublish"
              isSecondary={true}
              onClick={() => handlePublish({ publish: false })}
            />
            <Button text="Cancel" onClick={() => setHasActiveBookings(false)} />
          </div>
        </div>
      </CustomAlert>

      {/* ... Active bookings and unpublished listing modal ... */}
      <CustomAlert
        removeCloseIcon={true}
        openModal={isUnpublish}
        setOpenModal={setIsUnpublish}
        width={isResponsive ? 355 : 446}
      >
        <div className="text-[#454545] text-center flex flex-col items-center">
          <h2 className="text-[20px] font-[700] mb-[25px]">
            Oh! It looks like this listing has active {errorType} and can&apos;t
            be deleted.
          </h2>
          <Image
            src="/imgs/delete_fish.png"
            width={150}
            height={105}
            alt="Delete listing fish"
          />
          <p
            className={`${
              isResponsive ? "text-[14px]" : "text-[16px] w-[354px]"
            } font-normal leading-[20px] mt-[25px] mb-[24px]`}
          >
            For now it&apos;s only possible to keep the listing unpublished.
          </p>
          <Button text="Close" onClick={() => setIsUnpublish(false)} />
        </div>
      </CustomAlert>
    </>
  );
};
