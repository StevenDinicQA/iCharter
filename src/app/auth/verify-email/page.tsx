"use client";

import "./styles.css";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";
import BackPageBtn from "@/components/shared/general/BackPageBtn";
import CustomAlert from "@/components/shared/general/CustomAlert";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import VerificationInput from "react-verification-input";

function VerifyEmail() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [codeValues, setCodeValues] = useState<string>("");
  const [completeModalVisible, setCompleteModalVisible] =
    useState<boolean>(false);

  async function resendEmail() {
    const { error } = await apiService.post("auth/resendConfirmationCode", {
      name: email,
    });

    if (error) {
      toast.error(error);
      return;
    }
    toast.success(`A new code has been sent to ${email}`);
  }

  async function handleVerifyEmail() {
    const body = {
      oldEmail: email,
      password: password,
      code: codeValues,
    };

    const { error } = await apiService.post("auth/verifyEmail", body);

    if (error) {
      setCodeValues("");
      toast.error(error);
      return;
    }

    setCompleteModalVisible(true);
  }

  useEffect(() => {
    const handlePasteAnywhere = (event: ClipboardEvent) => {
      const clipboardValue = event.clipboardData?.getData("text") as string;

      // If the clipboardValue doesn’t contain only numbers, we
      // shouldn’t do anything.
      if (
        !clipboardValue ||
        !/^\d+$/.test(clipboardValue) ||
        clipboardValue.length > 6
      )
        return;

      setCodeValues(clipboardValue);
    };

    window.addEventListener("paste", handlePasteAnywhere);

    return () => {
      window.removeEventListener("paste", handlePasteAnywhere);
    };
  }, []);

  // Note: Relying on a cookie to check if we should continue or not
  // will not meet all of the edge cases. Maybe it’s more secure to
  // receive the email we want to verify as a query param, and before
  // letting the user start this process, we can query te backend to
  // check if that email is already validated. This could help us for
  // a better re-use of this route.
  useEffect(() => {
    // If there isn’t a cookie for an email, then we shouldn’t proceed,
    // instead redirect the user to the homepage.
    const mail = Cookies.get("email");
    const password = Cookies.get("password");

    if (!mail || !password) {
      router.replace("/");
      return;
    }

    setEmail(mail);
    setPassword(password);
  }, [router]);

  useEffect(() => {
    // If the code is completely filled, then handle the logic
    // to confirm the given email.
    if (codeValues.length === 6) {
      handleVerifyEmail();
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeValues]);

  return (
    <>
      <BackPageBtn path="/auth/sign-in" />
      <div className="mt-10 flex flex-col items-center justify-center max-w-screen-sm mx-auto">
        <Image
          src="/imgs/logo-icon.png"
          alt="Icharter-Logo"
          width={59}
          height={60}
          priority
          className="mb-10"
        />
        <h1 className="text-3xl mb-2 font-semibold text-[#454545]">
          Check your email
        </h1>
        <p className="text-sm text-center">
          Please enter verification code sent to your email below.
        </p>
        <p className="text-sm text-center">
          If you don&lsquo;t see the email in your inbox, please check your spam
          folder and mark the email as not spam or junk.
        </p>
        <div className="relative h-32 w-32 mt-10 mb-5">
          <div className="absolute w-24 h-24 rounded-full bg-[#EDEDED] z-0 top-4 left-4 "></div>
          <Image
            src="/imgs/send-email.png"
            alt="icons"
            width={100}
            height={100}
            priority
            className=" w-36  h-24 object-cover absolute z-1  top-4 left-2"
          />
        </div>

        <VerificationInput
          autoFocus
          value={codeValues}
          onChange={(value) => setCodeValues(value)}
          validChars="/^\d+$/"
          length={6}
          classNames={{
            character: "verification-input",
          }}
        />

        <p className="text-sm  font-medium text-center my-6 ">
          Didn&apos;t receive a code?{" "}
          <button className="font-bold" onClick={resendEmail}>
            {" "}
            Resend code
          </button>
        </p>
      </div>
      <CustomAlert
        width={438}
        openModal={completeModalVisible}
        setOpenModal={setCompleteModalVisible}
        onClose={() => {
          router.replace("/");
        }}
      >
        <div className="text-[#454545] text-center py-[52px] pt-[10px] px-[23px] flex flex-col items-center justify-center">
          <Image
            src="/svgs/step_complete.svg"
            width={87}
            height={87}
            alt="Blue check icon"
          />
          <h2 className="text[20px] mt-[20px] mb-[12px] font-[700]">
            Email Verified
          </h2>
          <p className="font-[400] text-[16px] mb-[24px]">
            Your email has been verified, log in to your account to get started.
          </p>
          <Button
            text="Log In"
            onClick={() => {
              router.push("/auth/sign-in");
            }}
          />
        </div>
      </CustomAlert>
    </>
  );
}

export default VerifyEmail;
