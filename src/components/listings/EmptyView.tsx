import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../shared/forms/atoms/buttons/Button";

function ListingsEmptyView({ isDisabled }: { isDisabled?: boolean }) {
  const router = useRouter();

  return (
    <div className="my-[65px] flex flex-col justify-center items-center gap-[12px]">
      <Image
        width={157}
        height={124}
        src="/svgs/empty_listings.svg"
        alt="Fish icon"
      />
      <h3 className="text-[18px] font-[500]">
        You don’t have any listings yet!
      </h3>
      <p className="text-[#BDBDBD] text-[16px] w-[268px] lg:w-[426px] text-center mb-[11px]">
        Add all the listings you have to offer and publish them on the
        marketplace!
      </p>
      <Button
        text="+ Create Listing"
        onClick={() => {
          router.push("/home/listings/new");
        }}
        disabled={isDisabled}
      />
    </div>
  );
}

export default ListingsEmptyView;
