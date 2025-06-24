"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "@/components/shared/forms/atoms/customInputs/CustomInput";
import BackPageBtn from "@/components/shared/general/BackPageBtn";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";

function RecoverAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  async function sendRecoveryMail(e: any) {
    e.preventDefault();
    setDisableBtn(true);
    const { error } = await apiService.post("auth/forgotPassword", {
      name: email,
    });

    if (error) {
      toast.error(error);
      setDisableBtn(false);
      return;
    }
    router.replace("reset-password?email=" + email);
    toast.success(`A new code has been sent to ${email}`);
    setDisableBtn(false);
  }

  useEffect(() => {
    if (!email) {
      setDisableBtn(true);
      return;
    }

    setDisableBtn(false);
  }, [email]);

  return (
    <>
      <BackPageBtn path="/auth/sign-in" />
      <div className="mt-10 flex flex-col items-center justify-center md:w-[450px] sm:w-full px-6">
        <Image
          src="/imgs/logo-icon.png"
          alt="Icharter-Logo"
          width={59}
          height={60}
          priority
          className="mb-10"
        />
        <h1 className="text-[28px] mb-2 font-[500] text-[#454545]">
          Reset Your Password
        </h1>
        <p className="text-[13px] font-[400] text-center">
          Please enter the email adress you’d like your password reset
          information sent to
        </p>
        <form className="w-full mt-10" onSubmit={sendRecoveryMail}>
          <div className="flex flex-col gap-[8px] mb-[27px]">
            <label className="text-[#737473] text-[16px] font-[500]">
              Email
            </label>
            <FormInput
              testId="email"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event?.target.value)
              }
              placeholder="Enter Address"
              type="email"
            />
          </div>

          <Button
            text="Reset your password"
            disabled={disableBtn}
            type="submit"
            className="text-[18px] font-[500] w-full py-[19px] rounded-full"
          />
        </form>
      </div>
    </>
  );
}

export default RecoverAccount;
