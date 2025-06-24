import { FormEvent, useState, useEffect } from "react";
import { FormLayout } from "../FormLayout";
import { Fish, FishingFormProps } from "./types";
import {
  OptionWithPhoto,
  SelectInput,
  SingleValueWithPhoto,
} from "@/components/shared/forms/atoms/SelectInput";
import { CheckList } from "@/components/shared/forms/atoms/CheckList";
import { AddOtherBtn } from "@/components/shared/forms/atoms/buttons/AddOtherButton";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { CheckOption } from "@/components/shared/forms/atoms/CheckList/type";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { TargetedSpecies } from "@/types/listings/listing";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";

export const FishingForm = ({
  formData,
  setFormData,
  onSubmit,
}: FishingFormProps) => {
  const [fishesData, setFishesData] = useState<Fish[]>([]);
  const [techniques, setTechniques] = useState<CheckOption[]>([
    {
      id: nanoid(),
      label: "Light Tackle",
      value: "Light Tackle",
    },
    {
      id: nanoid(),
      label: "Heavy Tackle",
      value: "Heavy Tackle",
    },
    {
      id: nanoid(),
      label: "Bottom Fishing",
      value: "Bottom Fishing",
    },
    {
      id: nanoid(),
      label: "Deep Sea Fishing",
      value: "Deep Sea Fishing",
    },
    {
      id: nanoid(),
      label: "Trolling",
      value: "Trolling",
    },
  ]);
  const [included, setIncluded] = useState<CheckOption[]>([
    {
      id: nanoid(),
      label: "Fly Fishing Equipment",
      value: "Fly Fishing Equipment",
    },
    {
      id: nanoid(),
      label: "Rods, Reels & Terminal Tackle",
      value: "Rods, Reels & Terminal Tackle",
    },
    {
      id: nanoid(),
      label: "Live Bait",
      value: "Live Bait",
    },
    {
      id: nanoid(),
      label: "Catch Cleaning & Filleting",
      value: "Catch Cleaning & Filleting",
    },
    {
      id: nanoid(),
      label: "Lures",
      value: "Lures",
    },
    {
      id: nanoid(),
      label: "Drinks",
      value: "Drinks",
    },
  ]);

  const labelsToHide = [
    "Anglerfish",
    "Antarctic icefish",
    "Synaphobranchus kaupii",
    "Bigeye squaretail",
    "Asian carp",
    "Bluefish",
    "Cod",
    "Denticle herring",
    "Harelip sucker",
    "Herring",
    "King-of-the-salmon",
    "Long-finned char",
    "Longjaw mudsucker",
    "Mackerel",
    "Mexican golden trout",
    "North Pacific daggertooth",
    "Plaice",
    "Smalleye squaretail",
    "Stargazer",
    "Tailor",
    "Thresher shark",
    "Tuna",
  ];

  useEffect(() => {
    const fetchFishes = async () => {
      const url = `${process.env.FISHES_API_URL}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.FISHES_API_KEY}`,
          "X-RapidAPI-Host": `${process.env.FISHES_API_HOST}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const result: Fish[] = await response.json();

        //Filter results with no image or broken images
        const filteredResult = result.filter(
          (fish) =>
            Object.keys(fish.meta).length > 0 &&
            !labelsToHide.includes(fish.name)
        );

        //Sort results by name
        filteredResult.sort((a, b) => a.name.localeCompare(b.name));

        //Uppercase result names
        filteredResult.forEach((fish) => {
          fish.name = fish.name.charAt(0).toUpperCase() + fish.name.slice(1);
        });

        setFishesData(filteredResult);
      } catch (error: any) {
        toast.error(error);
        return;
      }
    };

    const techniquesCache = window.localStorage.getItem("techniques");
    const includedCache = window.localStorage.getItem("included");

    if (techniquesCache) {
      setTechniques(JSON.parse(techniquesCache));
    }

    if (includedCache) {
      setIncluded(JSON.parse(includedCache));
    }

    fetchFishes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem("techniques", JSON.stringify(techniques));
    window.localStorage.setItem("included", JSON.stringify(included));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techniques, included]);

  const setTargetedSpecies = (arg: TargetedSpecies[]) => {
    setFormData({ ...formData, targetedSpecies: arg });
  };

  const setFishingTechniques = (arg: string[]) => {
    setFormData({ ...formData, fishingTechniques: arg });
  };

  const setIncludedInPrice = (arg: string[]) => {
    setFormData({ ...formData, includedInPrice: arg });
  };

  const handleNewFishingTechniques = (arg: CheckOption) => {
    if (!arg.value) return;

    if (!formData.fishingTechniques.includes(arg.value)) {
      setFormData({
        ...formData,
        fishingTechniques: [...formData.fishingTechniques, arg.value],
      });
    }

    if (!techniques.includes(arg)) {
      setTechniques([...techniques, arg]);
    }
  };

  const handleNewIncludedInPrice = (arg: CheckOption) => {
    if (!arg.value) return;

    if (!formData.includedInPrice.includes(arg.value)) {
      setFormData({
        ...formData,
        includedInPrice: [...formData.includedInPrice, arg.value],
      });
    }

    if (!included.includes(arg)) {
      setIncluded([...included, arg]);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.();
  };

  return (
    <FormLayout formTitle="Fishing" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-[20px]">
        <FormField
          className="max-w-[447px]"
          label="Targeted Species"
          subLabel="What species are you able to catch on this trip?"
          required
        >
          <div className="flex flex-col gap-[10px]">
            {formData.targetedSpecies.map((fish) => {
              return (
                <div
                  key={fish.value}
                  test-id={fish.label}
                  className="flex justify-between items-center border border-[#737473] rounded-[12px] p-[10px] mb-[10px]"
                >
                  <div className="flex items-center gap-[20px]">
                    <div className="w-[70px] h-[70px] relative rounded-[12px] overflow-hidden">
                      <ImageFallback
                        contain
                        src={fish.imageUrl}
                        fallbackSrc="/svgs/icharter_icon.svg"
                        alt={fish.label}
                      />
                    </div>
                    <p>{fish.label || fish.name}</p>
                  </div>
                  <button
                    type="button"
                    className="mr-[10px]"
                    onClick={() => {
                      const itemIndex = formData.targetedSpecies.findIndex(
                        (formDataFish) => formDataFish.value === fish.value
                      );

                      if (itemIndex >= 0) {
                        const updatedTargetedSpecies = [
                          ...formData.targetedSpecies,
                        ];
                        updatedTargetedSpecies.splice(itemIndex, 1);

                        setTargetedSpecies(updatedTargetedSpecies);
                        return;
                      }
                    }}
                  >
                    <CloseIcon size={24} />
                  </button>
                </div>
              );
            })}
          </div>
          <SelectInput
            test-id="targetSpecies"
            value={formData.targetedSpecies}
            onChange={(newValue) => {
              if (!Array.isArray(newValue)) {
                setTargetedSpecies([]);
                return;
              }

              setTargetedSpecies(newValue);
            }}
            options={fishesData.map((fish: any) => ({
              value: fish.name,
              label: fish.name,
              imageUrl: fish.img_src_set["1.5x"],
            }))}
            placeholder="Select targeted species"
            singleValueComponent={SingleValueWithPhoto}
            optionComponent={OptionWithPhoto}
            isMulti
            hideValue
            styles={{padding: '27px', marginTop: '12px'}}
          />
        </FormField>
        <div>
          <FormField
            label="Fishing Techniques"
            subLabel="Select which fishing techniques do you use"
          >
            <CheckList
              options={techniques}
              selectedOptions={formData.fishingTechniques}
              setSelected={setFishingTechniques}
              onDelete={(id) => {
                setTechniques((currentValue) =>
                  currentValue.filter((item) => item.id !== id)
                );
              }}
            />
          </FormField>
          <div className="">
            <AddOtherBtn
              onCreate={(value) => handleNewFishingTechniques(value)}
              customPlaceholder='Other fishing technique'
            />
          </div>
        </div>
        <div>
          <FormField
            label="Included in Price"
            subLabel="Select what is included in your trips"
          >
            <CheckList
              options={included}
              selectedOptions={formData.includedInPrice}
              setSelected={setIncludedInPrice}
              onDelete={(id) => {
                setIncluded((currentValue) =>
                  currentValue.filter((item) => item.id !== id)
                );
              }}
            />
          </FormField>
          <div className="mt-[14px]">
            <AddOtherBtn
              onCreate={(value) => handleNewIncludedInPrice(value)}
              customPlaceholder='What else do you offer?'
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};
