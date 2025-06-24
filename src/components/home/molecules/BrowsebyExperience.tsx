import { useMarketPlaceContext } from "@/context/MarketPlaceContext";
import { useMarketListings } from "@/hooks/useMarketListings";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const experiences = [
  {
    name: "Fishing Charters",
    img: "/imgs/fishing_charters.png",
  },
  {
    name: "Tours: Dolphins, Island, Sunset/Sunrise, Shelling",
    img: "/imgs/tours_dolphins_island_sunset_sunrise_shelling.png",
  },
];

export default function BrowsebyExperience() {
  const router = useRouter();

  function handleExperience(experience: string) {
    // Create a new URLSearchParams object based on the current query parameters in the URL
    const searchParams = new URLSearchParams(window.location.search);

    // Set the 'experience' parameter to the provided value
    searchParams.set("experience", experience);

    // Delete unnecessary parameters from the search params
    searchParams.delete("location");
    searchParams.delete("guests");
    searchParams.delete("date");

    // Construct the new path with updated query parameters
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    // Navigate to the new path
    router.push(`/market${newPathName}`);
  }

  return (
    <section className="mt-[26px] lg:mt-[52px] px-4 xl:px-0 w-full max-w-[1200px]">
      <h2 className="text-xl lg:text-2xl font-bold mb-5">
        Browse by Experience
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {experiences.map((experience, i) => (
          <article
            className="min-w-44 w-full p-2 bg-white rounded-xl cursor-pointer"
            key={i}
            onClick={() => handleExperience(experience.name)}
          >
            <div className="relative flex flex-col justify-end rounded-lg overflow-hidden min-w-[160px] w-full h-[160px] lg:h-[250px]">
              <div className="absolute flex inset-0">
                <Image
                  src={experience.img}
                  fill
                  alt={experience.name}
                  priority
                  className="object-cover"
                />
                <div className="w-full h-32 bg-gradient-to-b from-transparent to-[#0F133A] absolute bottom-0"></div>
              </div>

              <h3
                className={`font-bold text-white text-xs lg:text-xl line-clamp-2 h-8 lg:h-14 mb-3 lg:mb-4 mx-2 lg:mx-4 z-10 ${
                  experience.name === "Fishing Charters"
                    ? "max-w-20 lg:max-w-40"
                    : "max-w-72"
                }`}
                title={experience.name}
              >
                {experience.name}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
