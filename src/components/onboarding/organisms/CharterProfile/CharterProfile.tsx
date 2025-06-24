import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { ProfilePicturePicker } from "../../atoms/ProfilePicturePicker";
import { SelectInput } from "@/components/shared/forms/atoms/SelectInput";
import { CheckBox } from "@/components/shared/forms/atoms/CheckBox";
import { TooltipWrapper } from "@/components/shared/general/atoms/TooltipWrapper/TooltipWrapper";
import { COUNTRIES, GROUPS } from "./constants";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { CharterProfileProps } from "./types";
import { DragnDrop } from "@/components/shared/forms/atoms/DragnDrop";
import { PlusIcon } from "@/components/shared/general/atoms/icons/PlusIcon";
import { useAuthContext } from "@/context/AuthContext";
import { DeleteIcon } from "@/components/shared/general/atoms/icons/DeleteIcon";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { MAX_TEXT_LENGTH, PHONE_REGEX } from "@/utils/constants";
import SocialMediaBox from "@/components/shared/forms/atoms/SocialMediaBox/SocialMediaBox";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const libraries: any[] = ["places"];

export const CharterProfile = ({
  onSubmit,
  formData,
  setFormData,
  fromOnboarding = false,
}: CharterProfileProps) => {
  /**
   * We can change how we handle the form state with
   * react-hook-form. See more on https://www.react-hook-form.com/
   */

  //Prevent enter key
  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    // We cast the type of the `event.target` here to have
    // the correct type of the input[@type="file"] field
    const target = event.target as HTMLInputElement;

    // If there’s a file uploaded, then we get the first
    // one available (this is because the user can upload
    // more than one file to the input).
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      setFormData({ ...formData, avatar: file });
    }
  };

  const [showSocialMediaModal, setShowSocialMediaModal] =
    useState<boolean>(false);
  const [socialMediaToEdit, setSocialMediaToEdit] = useState<string>("");
  const [searchBox, setSearchBox] = useState(null);
  const { user, setUser, isUserCharter } = useAuthContext();

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const handleCaptainNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (event.target.value.length > MAX_TEXT_LENGTH) return;

    const updatedCaptainNames = [...formData.captainsNames];

    updatedCaptainNames[index] = event.target.value;

    setFormData({ ...formData, captainsNames: updatedCaptainNames });
  };

  const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= 0 && Number(event.target.value) <= 99) {
      setFormData({ ...formData, experience: event.target.value });
    }
  };

  const handleNationalityChange = (newValue: any) => {
    setFormData({ ...formData, nationality: newValue.value });
  };

  const handleGroupCheck = (groupName: string) => {
    if (formData.groups.includes(groupName)) {
      const groupNameIndex = formData.groups.indexOf(groupName);
      const newGroupState = Array.from(formData.groups);
      newGroupState.splice(groupNameIndex, 1);

      setFormData({
        ...formData,
        groups: newGroupState,
      });
    } else {
      setFormData({ ...formData, groups: [...formData.groups, groupName] });
    }
  };

  //Select social media url to edit when opening the modal
  const handleOpenSocialMediaModal = (id: number) => {
    switch (id) {
      case 0:
        setSocialMediaToEdit("Instagram");
        break;
      case 1:
        setSocialMediaToEdit("Facebook");
        break;
      case 2:
        setSocialMediaToEdit("TikTok");
        break;
      case 3:
        setSocialMediaToEdit("Yelp");
        break;

      default:
        break;
    }

    setShowSocialMediaModal(true);
  };

  //when the modal input changes, handle the form depending on the social media to edit
  const handleSocialMediaLinksChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (socialMediaToEdit) {
      case "Instagram":
        setFormData({ ...formData, instagram: e.target.value });
        break;
      case "Facebook":
        setFormData({ ...formData, facebook: e.target.value });
        break;
      case "TikTok":
        setFormData({ ...formData, tikTok: e.target.value });
        break;
      case "Yelp":
        setFormData({ ...formData, yelp: e.target.value });
        break;

      default:
        break;
    }
  };

  //clear the state of social media to edit when closing modal
  const handleCloseModal = () => {
    setSocialMediaToEdit("");
    setShowSocialMediaModal(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const onPlacesChanged = () => {
    //@ts-ignore
    const querySelected = searchBox?.getPlaces();

    if (querySelected) {
      const address = querySelected[0]?.address_components?.map(
        (a: any) => a?.long_name
      );
      const joinAddressElements = address?.join(", ");

      const addressComponents = querySelected[0]?.address_components || [];

      let city = "";
      let state = "";

      addressComponents.forEach((component: any) => {
        const types = component?.types || [];
        const longName = component?.long_name || "";

        if (types.includes("locality")) {
          city = longName;
        } else if (types.includes("administrative_area_level_1")) {
          state = longName;
        }
      });

      setFormData({ ...formData, location: `${city}, ${state}` });
    }
  };

  useEffect(() => {
    if (isUserCharter() && formData.license) {
      setFormData({ ...formData, license: formData.license });
    }
  }, []);

  // console.log("USRRR", user);

  return (
    <div className="text-[#454545] w-full flex flex-col gap-[21px]">
      <section>
        <div className="flex flex-col items-center lg:items-start">
          <FormField label="Profile Picture" required>
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            {isUserCharter() ? (
              <ProfilePicturePicker
                htmlFor="avatar"
                file={formData.avatar}
                profilePictureUrl={
                  user?.charterProfile?.profilePictureUrl || ""
                }
              />
            ) : (
              <ProfilePicturePicker
                htmlFor="avatar"
                file={formData.avatar}
                profilePictureUrl={""}
              />
            )}
          </FormField>
        </div>
        <div className="max-w-[447px] flex flex-col gap-[21px]">
          <FormField
            label="Company name"
            constrainsLabel={`${formData.companyName.length}/${MAX_TEXT_LENGTH}`}
            labelInputGap={6}
            required
          >
            <FormInput
              testId="companyName"
              value={formData.companyName}
              onChange={(event) => {
                if (event.target.value.length <= MAX_TEXT_LENGTH) {
                  setFormData({ ...formData, companyName: event.target.value });
                }
              }}
              placeholder="Company name"
            />
          </FormField>
          <FormField
            label="Captain’s name"
            required
            labelInputGap={0}
            className=""
          >
            <div className="flex gap-[8px]">
              <div className="w-full flex flex-col">
                {formData.captainsNames.map((name, index) => {
                  return (
                    <div
                      key={index}
                      className="relative max-w-[80%] lg:max-w-full"
                    >
                      <FormField
                        constrainsLabel={`${formData.captainsNames[index].length}/${MAX_TEXT_LENGTH}`}
                        labelInputGap={8}
                      >
                        <FormInput
                          testId="captainsName"
                          value={formData.captainsNames[index]}
                          onChange={(event) => {
                            handleCaptainNameChange(event, index);
                          }}
                          placeholder="Captain’s name"
                        />
                      </FormField>
                      {index === 0 && (
                        <div className="absolute top-[8px] -right-[52px] text-slate-200 hover:text-red-400 cursor-pointer transition">
                          <button
                            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                              event.preventDefault();

                              setFormData({
                                ...formData,
                                captainsNames: [...formData.captainsNames, ""],
                              });
                            }}
                            className="min-w-[46px] h-[46px] rounded-full bg-[#2D3AAF] flex items-center justify-center cursor-pointer self-center"
                          >
                            <PlusIcon size={24} stroke="white" />
                          </button>
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => {
                            const updatedArr = [...formData.captainsNames];
                            updatedArr.splice(index, 1);

                            setFormData({
                              ...formData,
                              captainsNames: updatedArr,
                            });
                          }}
                          className="absolute top-[15px] -right-[40px] text-slate-200 hover:text-red-400 cursor-pointer transition"
                        >
                          <DeleteIcon size={19} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FormField>
          <FormField
            label="Phone number"
            required
            errorMessage={
              formData.phoneNumber !== ""
                ? PHONE_REGEX.test(formData.phoneNumber)
                  ? ""
                  : "Enter a valid phone number"
                : ""
            }
            className="-mt-6"
            labelInputGap={6}
          >
            <FormInput
              testId="tel"
              type="tel"
              value={formData.phoneNumber}
              onChange={(event) => {
                if (event.target.value.length <= 16) {
                  setFormData({ ...formData, phoneNumber: event.target.value });
                }
              }}
              placeholder="Phone number"
            />
          </FormField>
          <FormField
            label="Enter location"
            required
            constrainsLabel={`${formData.location.length}/${MAX_TEXT_LENGTH}`}
            labelInputGap={6}
          >
            {isLoaded && (
              <StandaloneSearchBox
                onPlacesChanged={() => onPlacesChanged()}
                onLoad={onSBLoad}
              >
                <FormInput
                  testId="location"
                  value={formData.location}
                  onChange={(event) => {
                    if (event.target.value.length <= MAX_TEXT_LENGTH) {
                      setFormData({
                        ...formData,
                        location: event.target.value,
                      });
                    }
                  }}
                  placeholder="Enter location"
                  onKeyDown={handleEnterKey}
                />
              </StandaloneSearchBox>
            )}
          </FormField>
          <FormField
            label="OUPV license or master license"
            required
            labelInputGap={6}
          >
            <DragnDrop
              files={formData.license}
              setFiles={(updatedLicense) => {
                setFormData({ ...formData, license: updatedLicense });
              }}
              isPDF
              isShrinked
              footnote="Supported files: PDF, PNG, JPG, JPEG, HEIC, and HEIF."
              inputName="license"
            />
          </FormField>
          <FormField
            label="Years of experience"
            required
            className="-mt-6"
            labelInputGap={6}
          >
            <FormInput
              testId="yearsOfExperience"
              type="number"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleExperienceChange}
            />
          </FormField>
          <FormField label="Nationality" labelInputGap={6}>
            <SelectInput
              value={
                formData.nationality
                  ? {
                      label: formData.nationality,
                      value: formData.nationality,
                    }
                  : null
              }
              placeholder="Select Nationality"
              options={COUNTRIES}
              onChange={handleNationalityChange}
            />
          </FormField>
        </div>
        <FormField
          label="Are you part of any of these groups?"
          subLabel={
            <p>
              With this information we will be able to match you with customers
              from <br /> the same group.
            </p>
          }
          className="mt-6"
          labelInputGap={0}
        >
          <div className="flex gap-[4px] items-center">
            <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[40px] mt-3">
              {GROUPS.map((groupName) => (
                <CheckBox
                  key={groupName.key}
                  label={groupName.label}
                  isChecked={formData.groups.includes(groupName.key)}
                  onClick={() => {
                    handleGroupCheck(groupName.key);
                  }}
                />
              ))}
            </div>
            <div className="self-end">
              <TooltipWrapper
                message={
                  <>
                    <p>
                      Businesses which are at least 51% owned, operated and
                      controlled on a daily basis by one or more American
                      citizens of the following ethnic minority and/or gender
                      and/or military veteran classifications:
                    </p>
                    <ul className="ml-[30px] list-disc">
                      <li>African American Asian</li>
                      <li>American or Pacific Islander</li>
                      <li>Hispanic American</li>
                      <li>Native American, including Aleuts</li>
                    </ul>
                  </>
                }
              >
                <div className="mb-[1px]">
                  <HelpOutline />
                </div>
              </TooltipWrapper>
            </div>
          </div>
        </FormField>
        <FormField
          className="mt-6"
          label="Connect your social media to your account"
          subLabel="Link your social media accounts to your charter profile to reach a wider audience!"
          labelInputGap={8}
        >
          <div
            className={`flex flex-row ${fromOnboarding ? "gap-1" : "gap-4"}`}
          >
            <div onClick={() => handleOpenSocialMediaModal(0)}>
              <SocialMediaBox
                socialMediaName="instagram"
                iconSlug="/svgs/instagram.svg"
                socialMediaSlug={formData?.instagram}
              />
            </div>
            <div onClick={() => handleOpenSocialMediaModal(1)}>
              <SocialMediaBox
                socialMediaName="Facebook"
                iconSlug="/svgs/facebook.svg"
                socialMediaSlug={formData?.facebook}
              />
            </div>
            <div onClick={() => handleOpenSocialMediaModal(2)}>
              <SocialMediaBox
                socialMediaName="TikTok"
                iconSlug="/svgs/tiktok.svg"
                socialMediaSlug={formData?.tikTok}
              />
            </div>
            <div onClick={() => handleOpenSocialMediaModal(3)}>
              <SocialMediaBox
                socialMediaName="Yelp"
                iconSlug="/svgs/yelp.svg"
                socialMediaSlug={formData?.yelp}
              />
            </div>
          </div>
        </FormField>
        <Modal
          isVisible={showSocialMediaModal}
          className="w-[90%] lg:w-[438px]"
        >
          <div className="w-full bg-white h-[291px] flex flex-col items-center rounded-xl shadow-md">
            <div
              onClick={handleCloseModal}
              className="w-full flex justify-end pt-4 pr-4 cursor-pointer"
            >
              <CloseIcon size={24} />
            </div>
            <h2 className="text-center text-xl font-bold mt-2">
              Connect your social profile!
            </h2>
            <FormField
              label={`${socialMediaToEdit} URL` || `TikTok URL`}
              className="mt-12 max-w-[80%]"
              labelInputGap={12}
            >
              {socialMediaToEdit === "Instagram" && (
                <FormInput
                  testId="instagram"
                  type="text"
                  placeholder="https://www.instagram.com"
                  value={formData?.instagram}
                  onChange={(e) => handleSocialMediaLinksChange(e)}
                  withIcon
                  iconUrl="/svgs/instagram.svg"
                />
              )}
              {socialMediaToEdit === "Facebook" && (
                <FormInput
                  testId="facebook"
                  type="text"
                  placeholder="https://www.facebook.com"
                  value={formData?.facebook}
                  onChange={(e) => handleSocialMediaLinksChange(e)}
                  withIcon
                  iconUrl="/svgs/facebook.svg"
                />
              )}
              {socialMediaToEdit === "TikTok" && (
                <FormInput
                  testId="tiktok"
                  type="text"
                  placeholder="https://www.tiktok.com"
                  value={formData?.tikTok}
                  onChange={(e) => handleSocialMediaLinksChange(e)}
                  withIcon
                  iconUrl="/svgs/tiktok.svg"
                />
              )}
              {socialMediaToEdit === "Yelp" && (
                <FormInput
                  testId="yelp"
                  type="text"
                  placeholder="https://www.yelp.com"
                  value={formData?.yelp}
                  onChange={(e) => handleSocialMediaLinksChange(e)}
                  withIcon
                  iconUrl="/svgs/yelp.svg"
                />
              )}
            </FormField>
            <button
              onClick={handleCloseModal}
              className="bg-[#2D3AAF] text-white rounded-xl w-[138px] h-[40px] text-medium text-base"
            >
              Save
            </button>
          </div>
        </Modal>
      </section>
    </div>
  );
};
