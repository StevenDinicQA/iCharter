import { CheckList } from "@/components/shared/forms/atoms/CheckList";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { FilterData, FiltersBarProps } from "./types";
import { useMarketListings } from "@/hooks/useMarketListings";
import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { nanoid } from "nanoid";
import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";
import { OptionsModal } from "../modals/OptionsModal";

export const FiltersBar = ({
  filtersData,
  setFiltersData,
  onChange,
}: FiltersBarProps) => {
  const [hasFilters, setHasFilters] = useState<boolean>(false);
  const [fishingTechniques, setFishingTechniques] = useState([]);
  const [isFTModalVisible, setIsFTModalVisible] = useState<boolean>(false);
  const [targetedSpecies, setTargetedSpecies] = useState([]);
  const [isTSModalVisible, setIsTSModalVisible] = useState<boolean>(false);

  const [localFiltersData, setLocalFiltersData] = useState<FilterData>(filtersData);

  const updateFilter = (filter: keyof FilterData, value: string[]) => {
    setFiltersData((current: FilterData) => ({
      ...current,
      [filter]: value,
    }));
  };

  const [marketListingsLoading, marketListingsError, getListings] =
    useMarketListings(filtersData);

  useEffect(() => {

    if(localFiltersData !== filtersData) {
      
      setLocalFiltersData(filtersData);
      onChange?.(filtersData);

      getListings();

      // Check if we need to show the clear filters button
      let hasFiltersFlag = false;

      Object.values(filtersData).forEach((filter) => {
        if (Array.isArray(filter) && filter.length > 0) {
          hasFiltersFlag = true;
        }
      });

      setHasFilters(hasFiltersFlag);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersData]);

  const getFishingTechniques = async (all?: boolean) => {
    const { data, error } = await apiService.get(
      `listings/fishingTechniques/all${all ? "?showMore=true" : ""}`
    );

    if (error) {
      toast.error("Can’t fetch fishing techniques");
      return;
    }

    return data;
  };

  const getTargetedSpecies = async (all?: boolean) => {
    const { data, error } = await apiService.get(
      `listings/targetedSpecies/all${all ? "?showMore=true" : ""}`
    );

    if (error) {
      toast.error("Can’t fetch targeted species");
      return;
    }

    return data;
  };

  const getFiltersData = async () => {
    const fishingTechniquesResults = await getFishingTechniques();
    const targetSpeciesResults = await getTargetedSpecies();

    setFishingTechniques(
      fishingTechniquesResults.map((element: string) => ({
        label: element,
        value: element,
      }))
    );

    setTargetedSpecies(
      targetSpeciesResults.map((element: string) => ({
        label: element,
        value: element,
      }))
    );
  };

  useEffect(() => {
    getFiltersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltersClear: MouseEventHandler<HTMLButtonElement> = () => {
    setFiltersData({
      iCharterBid: [],
      departureTime: [],
      duration: [],
      season: [],
      packageType: [],
      price: [],
      specialDiscounts: [],
      reviewScore: [],
      fishingTechniques: [],
      targetedSpecies: [],
      captainGroups: [],
    });
  };

  const separator = <hr className="mb-[13px]" />;

  return (
    <div>
      <div className="mb-[20px]">
        <h4 className="text-[16px] font-[500]">Selected Filters:</h4>
        <div className="flex flex-wrap gap-[5px]">
          {/**
           * I’m sorry for the code you’re about to read, and may
           * god be with you if you need to work with this piece of code 🙏🏻
           * (it isn’t that hard, but it isn’t that clean either)
           */}
          {Object.entries(filtersData).map(
            (entry) =>
              Array.isArray(entry[1]) &&
              entry[1].map((filter) => (
                <div
                  key={nanoid()}
                  className="text-[#2D3AAF] font-[500] text-[12px] px-[12px] py-[4px] rounded-full border border-[#2D3AAF] bg-[#E0E2F0] flex items-center gap-[2px]"
                >
                  <span>
                    {filter}
                  </span>
                  <div
                    onClick={() => {
                      updateFilter(
                        entry[0] as keyof FilterData,
                        Array.isArray(entry[1])
                          ? entry[1].filter((item) => item !== filter)
                          : []
                      );
                    }}
                    className="cursor-pointer"
                  >
                    <CloseIcon size={12} />
                  </div>
                </div>
              ))
          )}
        </div>
        {hasFilters && (
          <button
            onClick={handleFiltersClear}
            className="text-[#BDBDBD] text-[13px] font-[500] w-full mt-[10px] py-[6px] text-center border border-[currentcolor] rounded-[12px]"
          >
            Clear all
          </button>
        )}
      </div>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      >
        <FormField label="iCharterBid">
          <CheckList
            options={[
              { id: nanoid(), label: "With iCharterBid", value: "bid" },
            ]}
            selectedOptions={filtersData.iCharterBid}
            setSelected={(value: string[]) => {
              updateFilter(`iCharterBid`, value);
            }}
          />
        </FormField>

        <FormField label="Departure Time" collapsable>
          <CheckList
            options={[
              {
                id: nanoid(),
                label: "Morning – 12 AM to 11 AM",
                value: "morning",
              },
              {
                id: nanoid(),
                label: "Afternoon – 12 PM to 5 PM",
                value: "afternoon",
              },
              {
                id: nanoid(),
                label: "Evening – 6 PM to 11 PM",
                value: "evening",
              },
            ]}
            selectedOptions={filtersData.departureTime}
            setSelected={(value: string[]) => {
              updateFilter(`departureTime`, value);
            }}
          />
        </FormField>

        <FormField label="Duration" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "2 hours", value: "2 hours" },
              { id: nanoid(), label: "Half Day (4 hours)", value: "Half Day" },
              { id: nanoid(), label: "6 hours", value: "6 hours" },
              { id: nanoid(), label: "Full Day (8 hours)", value: "Full Day" },
            ]}
            selectedOptions={filtersData.duration}
            setSelected={(value: string[]) => {
              updateFilter(`duration`, value);
            }}
          />
        </FormField>

        <FormField label="Season" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "Summer (Jun – Aug)", value: "Summer" },
              { id: nanoid(), label: "Winter (Dec – Feb)", value: "Winter" },
              { id: nanoid(), label: "Spring (Mar – May)", value: "Spring" },
              { id: nanoid(), label: "Fall (Sep – Nov)", value: "Fall" },
              { id: nanoid(), label: "Year round", value: "Year round" },
            ]}
            selectedOptions={filtersData.season}
            setSelected={(value: string[]) => {
              updateFilter(`season`, value);
            }}
          />
        </FormField>

        <FormField label="Captain Group" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "Veteran", value: "Veteran" },
              { id: nanoid(), label: "Active Military", value: "Military" },
              {
                id: nanoid(),
                label: "First Responders",
                value: "First Responders",
              },
              {
                id: nanoid(),
                label: "Minority Owned Business",
                value: "Minority Owned Business",
              },
            ]}
            selectedOptions={filtersData.captainGroups}
            setSelected={(value: string[]) => {
              updateFilter(`captainGroups`, value);
            }}
          />
        </FormField>

        <FormField label="Package Type" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "Private", value: "private" },
              { id: nanoid(), label: "Public", value: "public" },
            ]}
            selectedOptions={filtersData.packageType}
            setSelected={(value: string[]) => {
              updateFilter(`packageType`, value);
            }}
          />
        </FormField>

        <FormField label="Price" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "– $400", value: "400" },
              { id: nanoid(), label: "$400 – $600", value: "400 - 600" },
              { id: nanoid(), label: "$600 – $800", value: "600 - 800" },
              { id: nanoid(), label: "+ $800", value: "800" },
            ]}
            selectedOptions={filtersData.price}
            setSelected={(value: string[]) => {
              updateFilter(`price`, value);
            }}
          />
        </FormField>

        <FormField label="Special Discount" collapsable>
          <CheckList
            options={[
              { id: nanoid(), label: "Veteran", value: "Veteran" },
              { id: nanoid(), label: "Active Military", value: "Military" },
              {
                id: nanoid(),
                label: "First Responders",
                value: "First Responders",
              },
            ]}
            selectedOptions={filtersData.specialDiscounts}
            setSelected={(value: string[]) => {
              updateFilter(`specialDiscounts`, value);
            }}
          />
        </FormField>

        <FormField label="Review Score" collapsable>
          <CheckList
            options={[
              {
                id: nanoid(),
                label: (
                  <div className="flex items-center gap-[5px]">
                    <div className="flex">
                      {Array.from(Array(4)).map(() => (
                        <AnchorIcon key={nanoid()} fill="#2D3AAF" size={18} />
                      ))}
                    </div>
                    <span> & Up</span>
                  </div>
                ),
                value: "4",
              },
              {
                id: nanoid(),
                label: (
                  <div className="flex items-center gap-[5px]">
                    <div className="flex">
                      {Array.from(Array(3)).map(() => (
                        <AnchorIcon key={nanoid()} fill="#2D3AAF" size={18} />
                      ))}
                    </div>
                    <span> & Up</span>
                  </div>
                ),
                value: "3",
              },
              {
                id: nanoid(),
                label: (
                  <div className="flex items-center gap-[5px]">
                    <div className="flex">
                      {Array.from(Array(2)).map(() => (
                        <AnchorIcon key={nanoid()} fill="#2D3AAF" size={18} />
                      ))}
                    </div>
                    <span> & Up</span>
                  </div>
                ),
                value: "2",
              },
            ]}
            selectedOptions={filtersData.reviewScore}
            setSelected={(value: string[]) => {
              updateFilter(`reviewScore`, value);
            }}
          />
        </FormField>

        <FormField label="Fishing Techniques" collapsable>
          <CheckList
            options={fishingTechniques}
            selectedOptions={filtersData.fishingTechniques}
            setSelected={(value: string[]) => {
              updateFilter(`fishingTechniques`, value);
            }}
          />
          <button
            className="mt-[10px] text-[#2D3AAF] flex items-center gap-[5px]"
            onClick={() => {
              setIsFTModalVisible(true);
            }}
          >
            <span className="text-[13px] font-[400] leading-[18px]">
              See more
            </span>
            <RightArrowIcon size={10} />
          </button>
        </FormField>

        <FormField label="Targeted Species" collapsable>
          <CheckList
            options={targetedSpecies}
            selectedOptions={filtersData.targetedSpecies}
            setSelected={(value: string[]) => {
              updateFilter(`targetedSpecies`, value);
            }}
          />
          <button
            onClick={() => {
              setIsTSModalVisible(true);
            }}
            className="mt-[10px] text-[#2D3AAF] flex items-center gap-[5px]"
          >
            <span className="text-[13px] font-[400] leading-[18px]">
              See more
            </span>
            <RightArrowIcon size={10} />
          </button>
        </FormField>
      </form>
      {isFTModalVisible && (
        <OptionsModal
          title="Fishing Techniques"
          isVisible
          onClose={() => {
            setIsFTModalVisible(false);
          }}
          selectedOptions={filtersData.fishingTechniques}
          setSelected={(value: string[]) => {
            updateFilter(`fishingTechniques`, value);
          }}
          getOptions={() => getFishingTechniques(true)}
        />
      )}
      {isTSModalVisible && (
        <OptionsModal
          title="Targeted Species"
          isVisible
          onClose={() => {
            setIsTSModalVisible(false);
          }}
          selectedOptions={filtersData.targetedSpecies}
          setSelected={(value: string[]) => {
            updateFilter(`targetedSpecies`, value);
          }}
          getOptions={() => getTargetedSpecies(true)}
        />
      )}
    </div>
  );
};
