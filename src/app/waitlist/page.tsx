"use client";

import { useEffect } from "react";
import Image from "next/image";
import NewsletterForm from "./form";
import Close from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";

function WaitlistScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => {
          router.replace("/");
        }}
        className="z-10 absolute text-[18px] top-5 left-5 flex items-center gap-[5px] cursor-pointer"
        title="Close"
      >
        <ArrowBack sx={{ fontSize: 24, marginTop: 0.25 }} />
        <p className="pt-[4px]">Go back</p>
      </button>
      <Image
        src="/imgs/ocean.png"
        fill
        alt="ocean"
        priority
        className="absolute z-0"
        style={{ opacity: 0.7 }}
      />
      <div className="z-1 absolute top-20">
        <NewsletterForm />
      </div>
    </div>
  );
}

export default WaitlistScreen;
