import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FormLayout } from "../FormLayout";
import { EXPERIENCE_TYPE, GeneralInformationFormProps } from "./types";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { DragnDrop } from "@/components/shared/forms/atoms/DragnDrop";
import { FileType } from "@/types/media/files";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import apiService from "@/services/apiService";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { CheckList } from "@/components/shared/forms/atoms/CheckList";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import { EXPERIENCE_NAME_MAX_CHARACTERS } from "./constants";

export const GeneralInformationForm = ({
  formData,
  setFormData,
  onSubmit,
  hasBookings,
}: GeneralInformationFormProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [disableFishingTypes, setDisableFishingTypes] =
    useState<boolean>(false);
  const [disableNonFishingTypes, setDisableNonFishingTypes] =
    useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>(
    formData.media
  );

  const searchParams = useSearchParams();
  const { user } = useAuthContext();

  const handleMediaChange = useCallback((arg: FileType[]) => {
    setUploadedFiles(arg);
  }, []);

  useEffect(() => {
    if (formData.media.length > 0) {
      handleMediaChange(formData.media);
    }
  }, [formData.media, handleMediaChange]);

  useEffect(() => {
    setFormData({ ...formData, media: uploadedFiles });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //if (!formData.id) {
    setIsUploading(true);

    if (!user || !user.charterProfile) {
      setIsUploading(true);
      return;
    }

    const { data: createListingData, error: createListingError } =
      await apiService.post("listings", {
        id: formData.id ? formData.id : "",
        charterProfileId: user.charterProfile.id,
        experienceName: formData.experienceName,
        experienceType: formData.experienceType || null,
        captains: formData.captains,
        description: formData.description,
      });

    if (createListingError) {
      toast.error(createListingError);
      setIsUploading(false);
      return;
    }

    setFormData({
      ...formData,
      id: createListingData.id,
      charterProfileId: user.charterProfile.id,
    });

    setIsUploading(false);
    // }
    onSubmit?.();
  };

  useEffect(() => {
    formData.experienceName ? setIsDisabled(false) : setIsDisabled(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const inputLengthValid = (inputLegth: number): boolean => {
    return (
      inputLegth <= EXPERIENCE_NAME_MAX_CHARACTERS ||
      inputLegth < formData.experienceName.length
    );
  };

  return (
    <FormLayout
      formTitle="General Information"
      disabled={isDisabled}
      isUploading={isUploading}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col gap-[20px]">
        <FormField
          className="max-w-[447px]"
          label="Experience Name"
          constrainsLabel={`${formData.experienceName.length}/35`}
          required
        >
          <FormInput
            testId="experienceName"
            value={formData.experienceName}
            onChange={(event) => {
              if (inputLengthValid(event.target.value.length)) {
                setFormData({
                  ...formData,
                  experienceName: event.target.value,
                });
              }
            }}
            placeholder="Example: Full Day Fishing Trip"
          />
        </FormField>
        <FormField
          className="max-w-[447px]"
          label="Type of experience"
          subLabel="What kind of experience are you offering?"
          required
        >
          <CheckList
            selectedOptions={formData.experienceType}
            setSelected={(value: string[]) => {
              setFormData({ ...formData, experienceType: value });
            }}
            options={[
              {
                id: nanoid(),
                label: EXPERIENCE_TYPE.FISHING_CHARTERS,
                value: EXPERIENCE_TYPE.FISHING_CHARTERS,
                disabled:
                  formData.experienceType.includes(
                    EXPERIENCE_TYPE.TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING
                  ) || disableFishingTypes,
              },
              {
                id: nanoid(),
                label: EXPERIENCE_TYPE.TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING,
                value: EXPERIENCE_TYPE.TOURS_DOLPHINS_ISLAND_SUNSET_SUNRISE_SHELLING,
                disabled:
                  formData.experienceType.includes(
                    EXPERIENCE_TYPE.FISHING_CHARTERS
                  ) || disableFishingTypes,
              }
            ]}
            disabled={hasBookings}
          />
        </FormField>
        <FormField
          label="Description"
          subLabel="What is unique about this experience? What is about?"
          className="max-w-[578px]"
          constrainsLabel={`${formData.description.length}/500`}
          required
        >
          <FormInput
            testId="description"
            value={formData.description}
            onChange={(event) => {
              if (event.target.value.length <= 500) {
                setFormData({ ...formData, description: event.target.value });
              }
            }}
            type="textarea"
          />
        </FormField>
        <FormField
          className="max-w-[447px]"
          label="Select Captain"
          subLabel="Select what captain will take over this experience"
          required
        >
          <CheckList
            selectedOptions={formData.captains}
            setSelected={(value: string[]) => {
              setFormData({ ...formData, captains: value });
            }}
            options={(user?.charterProfile?.captains || []).map((captain) => ({
              id: nanoid(),
              label: captain,
              value: captain,
            }))}
            selectOne={true}
          />
        </FormField>
        <FormField
          label="Photos and Videos"
          subLabel="Upload at least 5 photos or videos to publish in your listing."
          required
        >
          <DragnDrop
            listingId={formData.id}
            inputName="photos"
            files={uploadedFiles}
            isShrinked={uploadedFiles.length > 0}
            setFiles={handleMediaChange}
            footnote={useMemo(() => {
              return (
                <>
                  <strong>Images:</strong> JPEG, JPG, PNG{" "}
                  <strong>Videos:</strong> MP4, MOV, AVI, WAV
                </>
              );
            }, [])}
          />
        </FormField>
      </div>
    </FormLayout>
  );
};
