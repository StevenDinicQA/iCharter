import { useMarketPlaceContext } from "@/context/MarketPlaceContext";
import { useMarketListings } from "@/hooks/useMarketListings";
import { Chip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Listing } from "@/types/listings/listing";

// Types of destinations
const destinations = [
  {
    name: "Clearwater",
    img: "/imgs/destination_clearwater.png",
  },
  {
    name: "Tarpon Springs",
    img: "/imgs/destination_tarpon_springs.png",
  },
  {
    name: "Tampa",
    img: "/imgs/destination_tampa.png",
  },
];

type Props = {
  listings: Listing[];
};

export default function PopularDestinations({ listings }: Props) {
  const router = useRouter();
  const [charters, setCharters] = useState({
    clearwater: 0,
    tarponsprings: 0,
    tampa: 0,
  });

  useEffect(() => {
    // Filtered destination names
    const filteredDestinations = ["Clearwater", "Tarpon Springs", "Tampa"];

    // Group marketPlaceListing by destination name and count the number of charters for each destination
    const chartersByDestination: { [key: string]: number } = listings.reduce(
      (acc: { [key: string]: number }, item) => {
        if (item.meetingPoint) {
          const destinationName = item.meetingPoint.city
            ? item.meetingPoint.city
            : item.meetingPoint.streetAddresss;

          if (destinationName) {
            // Check if the destination name contains any of the filtered destination names
            const foundDestination = filteredDestinations.find((word) =>
              destinationName.toLowerCase().includes(word.toLowerCase())
            );

            if (foundDestination) {
              // Convert the found destination to a key
              const destinationKey = foundDestination
                .toLowerCase()
                .replace(/\s/g, ""); // Remove spaces
              acc[destinationKey] = (acc[destinationKey] || 0) + 1; // Increment count or initialize to 1
            }
          }
        }
        return acc;
      },
      {}
    );

    // Create a new object with the expected properties
    const newCharters = {
      clearwater: chartersByDestination["clearwater"] || 0,
      tarponsprings: chartersByDestination["tarponsprings"] || 0,
      tampa: chartersByDestination["tampa"] || 0,
    };

    // Update the state with the new charters object
    setCharters(newCharters);
  }, [listings]);

  function handleLocation(location: string) {
    // Create a new URLSearchParams object based on the current query parameters in the URL
    const searchParams = new URLSearchParams(window.location.search);

    // Set the 'location' parameter to the provided value
    searchParams.set("location", location);

    // Delete unnecessary parameters from the search params
    searchParams.delete("experience");
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
    <section
      id="popular_destinations"
      className="mt-[26px] lg:mt-[52px] px-4 xl:px-0 w-full max-w-[1200px]"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl lg:text-2xl font-bold">Popular Destinations</h2>
        <button
          className="text-[#2E3BAF] text-sm font-medium cursor-pointer"
          onClick={() => router.push("/market")}
        >
          Explore more
        </button>
      </div>
      <div className="overflow-hidden overflow-x-scroll scrollbar-hidden">
        <div className="grid grid-cols-3 gap-2 lg:gap-3 min-w-max">
          {destinations.map((destination, i) => (
            <article
              className="relative flex flex-col min-w-[160px] min-h-[140px] lg:max-w-[392px] lg:h-[200px] text-[#454545] rounded-xl overflow-hidden cursor-pointer"
              key={i}
              onClick={() => handleLocation(destination.name)}
            >
              <div className="absolute flex inset-0 rounded-xl -z-10">
                <Image
                  src={destination.img}
                  fill
                  alt="rod"
                  priority
                  className="object-cover"
                />
                <div className="w-full h-[65px] bg-gradient-to-b from-transparent to-[#0F133A] absolute bottom-0"></div>
              </div>
              <div className="m-2 flex justify-end">
                <Chip
                  label={`${
                    charters[
                      destination.name
                        .toLowerCase()
                        .replace(/\s/g, "") as keyof typeof charters
                    ] || 0
                  } charters`}
                  sx={{
                    color: "#454545",
                    backgroundColor: "#FFF",
                    fontSize: "12px",
                    fontWeight: "500",
                    paddingX: "8px",
                    paddingY: "4px",
                    height: "20px",
                  }}
                />
              </div>
              <div className="absolute bottom-2 flex items-center gap-2 px-2">
                <h3
                  className="font-bold text-white text-sm line-clamp-2"
                  title={destination.name}
                >
                  {destination.name}
                </h3>

                <Image
                  src="/imgs/flag_usa.png"
                  alt="United States"
                  width={24}
                  height={12}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
