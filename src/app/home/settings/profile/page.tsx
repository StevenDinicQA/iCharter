"use client";

import { CharterMedia } from "@/components/onboarding/organisms/CharterMedia/CharterMedia";
import { CharterProfile } from "@/components/onboarding/organisms/CharterProfile/CharterProfile";
import { GROUPS } from "@/components/onboarding/organisms/CharterProfile/constants";
import { CharterProfileFormValues } from "@/components/onboarding/organisms/CharterProfile/types";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { EyeIcon } from "@/components/shared/general/atoms/icons/EyeIcon";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { useAuthContext } from "@/context/AuthContext";
import { clearCookies } from "@/helpers/auth/cookies";
import apiService from "@/services/apiService";
import s3Service from "@/services/s3_service";
import { urlToObject } from "@/services/urlToFile";
import { FileType } from "@/types/media/files";
import { ICHARTER_PROD_BASE_URL, ICHARTER_STAGING_BASE_URL } from "@/utils/constants";
import { getValidity } from "@/utils/validators/genericValidator";
import { useMediaQuery } from "@mui/material";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const _ = require('lodash');

export default function ProfileSettingsScreen() {

  const { user, refetchUser, setUser } = useAuthContext();

  const router = useRouter();

  const isCharter = user?.userType === 'charter';
  const isStandardMobileDevice = useMediaQuery("(min-width: 390px)");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentHref, setCurrentHref] = useState<string>('');
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>("");
  const [baseFiles, setBaseFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [filesCopy, setFilesCopy] = useState<FileType[]>([]);
  const [formData, setFormData] = useState<CharterProfileFormValues>({
    avatar: null,
    companyName: "",
    captainsNames: [""],
    phoneNumber: "",
    location: "",
    license: [],
    experience: "",
    nationality: "",
    groups: [],
    instagram: "",
    facebook: "",
    tikTok: "",
    yelp: "",
  });
  const [formDataCopy, setFormDataCopy] = useState<CharterProfileFormValues>({
    avatar: null,
    companyName: "",
    captainsNames: [""],
    phoneNumber: "",
    location: "",
    license: [],
    experience: "",
    nationality: "",
    groups: [],
    instagram: "",
    facebook: "",
    tikTok: "",
    yelp: "",
  });

  useEffect(() => {
    const fetchCharterProfile = async () => {
      setIsPageLoading(true);

      if (!user?.charterProfile) {
        setIsPageLoading(false);
        return;
      }

      const groups: string[] = [];

      Object.entries(user.charterProfile.groups).forEach(([key, value]) => {

        if (value) {
          switch (key) {
            case "veteran":
              groups.push("veteran");
              break;
            case "military":
              groups.push("military");
              break;
            case "firstResponders":
              groups.push("firstResponders");
              break;
            case "minorityOwnedBusiness":
              groups.push("minorityOwnedBusiness");
              break;
            default:
              break;
          }
        }
      });

      let avatar = undefined;
      let license = undefined;
      const licenseName = user.charterProfile.licensePDFUrl
        .match(/\/\d+\..+\.pdf/)?.[0]
        .split(".");

      licenseName?.shift();

      try {
        avatar = await urlToObject(user.charterProfile.profilePictureUrl!);
      } catch (error) {}

      try {
        license = await urlToObject(
          user.charterProfile.licensePDFUrl,
          licenseName?.join(".")
        );
        // console.log("LIceNSEEE", license);
      } catch (error) {}

      setFormDataCopy({
        avatar: avatar || null,
        companyName: user.charterProfile.companyName,
        captainsNames: user.charterProfile.captains,
        phoneNumber: user.charterProfile.phoneNumber,
        location: user.charterProfile.location,
        license: license ? [{ id: nanoid(), file: license }] : [],
        experience: user.charterProfile.yearsOfExperience,
        nationality: user.charterProfile.nationality,
        groups,
        instagram: user.charterProfile.instagram || "",
        facebook: user.charterProfile.facebook || "",
        tikTok: user.charterProfile.tikTok || "",
        yelp: user.charterProfile.yelp || "",
      });

      setFormData({
        avatar: avatar || null,
        companyName: user.charterProfile.companyName,
        captainsNames: user.charterProfile.captains,
        phoneNumber: user.charterProfile.phoneNumber,
        location: user.charterProfile.location,
        license: license ? [{ id: nanoid(), file: license }] : [],
        experience: user.charterProfile.yearsOfExperience,
        nationality: user.charterProfile.nationality,
        groups,
        instagram: user.charterProfile.instagram || "",
        facebook: user.charterProfile.facebook || "",
        tikTok: user.charterProfile.tikTok || "",
        yelp: user.charterProfile.yelp || "",
      });

      const { data, error } = await apiService.get(
        `charterProfiles/${user.charterProfile.id}`
      );

      if (error || !data.media) {
        setIsPageLoading(false);
        return;
      }

      const mediaFiles = [];

      for (const file of data.media) {
        const mediaFile = await urlToObject(file.fileUrl);
        if (!mediaFile) continue;
        mediaFiles.push({ id: file.id, file: mediaFile });
      }

      setFiles(mediaFiles);
      setFilesCopy(mediaFiles);
      setBaseFiles(mediaFiles.map((file) => file.id));
      setIsPageLoading(false);
    };

    fetchCharterProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /*
   * Functions
   */
  const onCharterProfileSubmit = async () => {
    setIsUploading(true);

    // Call the API to update the Charter profile with
    // the `formData` state
    if (user) {
      if (!formData.license) {
        toast.error(`A license must be provided!`);
        setIsUploading(false);
        return;
      }

      const licensePDFUrl = await s3Service.uploadFileToBucket(
        formData.license[0].file
      );

      if (!licensePDFUrl) {
        toast.error(
          `There was a problem while uploading the license, try again later.`
        );
        setIsUploading(false);
        return;
      }

      let profilePictureUrl: string | null = null;

      if (formData.avatar) {
        profilePictureUrl = await s3Service.uploadFileToBucket(formData.avatar);
      }

      const {
        data: createCharterProfileResponse,
        error: createCharterProfileError,
      } = await apiService.post("charterProfiles", {
        userId: user.id,
        ...(user.charterProfile
          ? { charterProfileId: user.charterProfile.id }
          : null),
        companyName: formData.companyName,
        captains: formData.captainsNames,
        phoneNumber: formData.phoneNumber,
        email: user.email,
        licensePDFUrl: licensePDFUrl,
        location: formData.location,
        createdAt: new Date().toISOString(),
        profilePictureUrl,
        yearsOfExperience: Number(formData.experience),
        nationality: formData.nationality,
        groups: {
          veteran: formData.groups.includes(GROUPS[0].key),
          military: formData.groups.includes(GROUPS[1].key),
          firstResponders: formData.groups.includes(GROUPS[2].key),
          minorityOwnedBusiness: formData.groups.includes(GROUPS[3].key),
        },
        instagram: formData.instagram,
        facebook: formData.facebook,
        tikTok: formData.tikTok,
        yelp: formData.yelp,
      });

      if (
        createCharterProfileError &&
        createCharterProfileError !==
          "A charter profile already exists with this associated user"
      ) {
        toast.error(createCharterProfileError);
        setIsUploading(false);
        return;
      }

      toast.success('Your profile has been successfully updated!')
      await refetchUser();
      setIsUploading(false);
    }
  };

  const onCharterMediaSubmit = async () => {
    if (!user || !user.charterProfile?.id) {
      toast.error(`Couldn’t find the user account. Try again later.`);
      return;
    }

    setIsUploading(true);

    // Upload the media to the bucket and fetch their
    // respective URL
    const bucketUrls = [];

    const filteredFiles = files.filter((file) => !baseFiles.includes(file.id));
    const deletedFiles = baseFiles.filter(
      (file) => !files.map((item) => item.id).includes(file)
    );

    for (const file of deletedFiles) {
      await apiService.delete(
        `charterProfiles/${user.charterProfile.id}/media/${file}`
      );
    }

    for (const file of filteredFiles) {
      const bucketUrl = await s3Service.uploadFileToBucket(file.file);

      if (bucketUrl) {
        bucketUrls.push(bucketUrl);
      }
    }

    // Update the charter profile with the media URLs
    for (const bucketUrl of bucketUrls) {
      await apiService.post(
        `charterProfiles/${user.charterProfile?.id}/media`,
        {
          fileUrl: bucketUrl,
        }
      );
    }

    setIsUploading(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPageLoading(true);
    await onCharterProfileSubmit();
    await onCharterMediaSubmit();
    setIsPageLoading(false);
  };

  const handleDelete = async () => {
    setIsPageLoading(true);

    const { data, error } = await apiService.post("users/delete", {
      userId: user?.id,
      email: user?.email,
      password: deletePassword,
    });

    if (error || data.error) {
      setIsPageLoading(false);
      toast.error(`Oops, something went wrong while deleting your account.`);
      return;
    }

    clearCookies();
    setUser(null);
    setIsPageLoading(false);
    location.reload();
  };

  const handleSeeMyProfile = async () => {

    let baseHref = ICHARTER_PROD_BASE_URL;

    if(currentHref.includes('localhost')) {
      baseHref = 'localhost:3000';
    }

    if(currentHref.includes('staging')) {
      baseHref = ICHARTER_STAGING_BASE_URL;
    }

    try {
      await navigator.clipboard.writeText(`${baseHref}/market/charter/${user?.charterProfile?.id}`)

      toast.success('Copied to the clipboard!')

      router.push(`/market/charter/${user?.charterProfile?.id}`)

    } catch (error) {
      toast.error('Whops! An error occurred...')
    }
  }

  useEffect(() => {
    let isEqual = true;

    if(files?.length !== filesCopy?.length) {
      isEqual =  false;
    }

    if(files?.length === filesCopy?.length) {
      for(let i=0; i<files?.length; i++){
        if(files[i]?.id !== filesCopy[i]?.id) {
          isEqual = false;
        }
      }
    }

    if(formData?.avatar?.lastModified !== formDataCopy?.avatar?.lastModified) {
      isEqual = false;
    }

    if(!_.isEqual(formData?.captainsNames, formDataCopy?.captainsNames)) {
      isEqual = false;
    }

    if(formData?.companyName !== formDataCopy?.companyName) {
      isEqual = false;
    }

    if(formData?.experience !== formDataCopy?.experience) {
      isEqual = false;
    }

    if(formData?.location !== formDataCopy?.location) {
      isEqual = false;
    }

    if(formData?.nationality.toLowerCase() !== formDataCopy?.nationality.toLowerCase()) {
      isEqual = false;
    }

    if(formData?.phoneNumber !== formDataCopy?.phoneNumber) {
      isEqual = false;
    }
    
    if(formData?.facebook !== formDataCopy?.facebook) {
      isEqual = false;
    }

    if(formData?.instagram !== formDataCopy?.instagram) {
      isEqual = false;
    }

    if(formData?.yelp !== formDataCopy?.yelp) {
      isEqual = false;
    }

    if(formData?.tikTok !== formDataCopy?.tikTok) {
      isEqual = false;
    }

    if(formData?.license[0]?.file?.lastModified !== formDataCopy?.license[0]?.file?.lastModified) {
      isEqual = false;
    }

    if(!_.isEqual(formData?.groups, formDataCopy?.groups)) {
      isEqual = false;
    }

    const isAvatarValid = getValidity(formData.avatar);
    const isCaptainNamesValid = getValidity(formData.captainsNames);
    const isPhoneValid = getValidity(formData.phoneNumber);
    const isLocationValid = getValidity(formData.location);
    const isLicenseValid = getValidity(formData.license);
    const isYearsValid = getValidity(formData.experience);
    const isMediaValid = getValidity(files) && files.length >= 5;

    if (
      isAvatarValid &&
      isCaptainNamesValid &&
      isPhoneValid &&
      isLocationValid &&
      isLicenseValid &&
      isYearsValid &&
      isMediaValid && 
      !isEqual
    ) {
      setIsDisabled(false);
      return;
    }

    setIsDisabled(true);
  }, [formData, files]);

  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  if(user && !isCharter) {
    window.location.replace('/home/settings/login')
    return;
  }

  return (
    <main className="flex flex-col gap-[20px] pb-[80px] lg:pb-[150px]">
      {isPageLoading && <ScreenLoading />}
      <form
        onSubmit={onSubmit}
        className={`py-[20px] ${isStandardMobileDevice && 'px-[8px]'} lg:pr-[45px] lg:p-[45px] bg-white rounded-[12px] flex flex-col`}
      >
        <div className="flex flex-row justify-between w-full">
        <h2 className="text-[18px] lg:text-[28px] font-[700] mb-[45px]">
          Charter Profile
        </h2>
        <div onClick={handleSeeMyProfile} className="flex flex-row gap-2 cursor-pointer pt-[2px] lg:pt-[11px]">
            <div className="pt-[2px]">
            <EyeIcon size={20}/>
            </div>
            <p className="font-medium">See my profile</p>
        </div>
        </div>
        <CharterProfile
          formData={formData}
          setFormData={setFormData}
          buttonText="Save"
        />
        <CharterMedia files={files} setFiles={setFiles} className="mt-4" formFieldStyles='mt-[-24px]'/>
        <Button text="Save" className="self-end" disabled={isDisabled} />
      </form>
      <button
        className="text-[13px] font-[400] lg:self-start"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <span className="font-[700]">Delete</span> my account
      </button>
      <Modal
        isVisible={isDeleteModalOpen}
        transparent
        className="text-[#454545] text-center w-full max-w-[450px] px-[25px] py-[35px] bg-white shadow-lg rounded-[12px] border border-[rgba(0,0,0,0.05)] flex flex-col items-center gap-[25px]"
      >
        <h3 className="text-[20px] font-[700]">Delete account</h3>
        <p className="text-[16px] font-[400]">
          Are you sure you want to delete your account? All your data will be
          permanently deleted.
        </p>
        <FormInput
          testId="password"
          placeholder="Password"
          value={deletePassword}
          type="password"
          onChange={(event) => setDeletePassword(event.target.value)}
        />
        <div className="flex gap-[10px]">
          <Button text="Cancel" onClick={() => setIsDeleteModalOpen(false)} />
          <Button
            text="Yes, delete"
            isSecondary
            disabled={!Boolean(deletePassword)}
            onClick={handleDelete}
          />
        </div>
      </Modal>
    </main>
  );
}
