"use client";

import CheckIcon from "@mui/icons-material/Check";
import BackPageBtn from "@/components/shared/general/BackPageBtn";
import CustomAlert from "@/components/shared/general/CustomAlert";
import apiService from "@/services/apiService";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { doesPasswordMeetsNeeds } from "@/utils/validators/password";

function ResetPasswordPage() {
  const router = useRouter();
  const URLverficationCode = useSearchParams().get("verification_code");
  const userEmail = useSearchParams().get("email");

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [showMessageSentAlert, setShowMessageSentAlert] =
    useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [passwordWrongFormatError, setPasswordWrongFormatError] =
    useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  async function confirmPwdChange(e: any) {
    e.preventDefault();
    const { error } = await apiService.post("auth/confirmPassword", {
      name: email,
      verificationCode: code,
      newPassword: password,
    });

    if (error) {
      if (error === "Invalid verification code provided, please try again.") {
        setShowErrorAlert(true);
        return;
      }
      toast.error(error);
      return;
    }
    router.replace("/auth/sign-in");
    toast.success(`Successfully updated password for ${email}`);
  }

  async function resendEmail(e: any) {
    e.preventDefault();
    const { error } = await apiService.post("auth/forgotPassword", {
      name: email,
    });

    if (error) {
      toast.error(error);
      return;
    }
    setShowMessageSentAlert(true);
  }

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }

    if (URLverficationCode) {
      setCode(URLverficationCode);
      return;
    }

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

      setCode(clipboardValue);
    };

    window.addEventListener("paste", handlePasteAnywhere);

    return () => {
      window.removeEventListener("paste", handlePasteAnywhere);
    };
  }, [])

  useEffect(() => {
    if (doesPasswordMeetsNeeds(password) || !password) {
      setPasswordWrongFormatError(false);
    } else {
      setPasswordWrongFormatError(true);
    }

    if (confirmPwd !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    setDisableBtn(
      !(
        code.length === 6 &&
        doesPasswordMeetsNeeds(password) &&
        password === confirmPwd
      )
    );
  }, [code, password, confirmPwd]);

  return (
    <>
      <BackPageBtn />
      <div className="mt-10 flex flex-col items-center justify-center w-full md:w-[500px] px-8 md:px-0">
        <Image
          src="/imgs/logo-icon.png"
          alt="Icharter-Logo"
          width={59}
          height={60}
          priority
          className="mb-10"
        />
        <h1 className="text-[28px] mb-[42px] font-[500] text-[#454545]">
          Enter new password
        </h1>

        <form className="w-full flex flex-col" onSubmit={confirmPwdChange}>
          <div className="flex flex-col gap-[42px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#737473] text-[16px] font-[500]">
                Reset Code
              </label>
              <FormInput
                testId="resetCode"
                value={code}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCode(event?.target.value)
                }
                placeholder="Enter 6-digit code"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#737473] text-[16px] font-[500]">
                New Password
              </label>
              <FormInput
                testId="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event?.target.value)
                }
                placeholder="Enter new password"
                isInvalid={passwordWrongFormatError}
                errorMessage="Please make sure the passwords contains all neccessary characters"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#737473] text-[16px] font-[500]">
                Confirm Password
              </label>
              <FormInput
                testId="confirmPwd"
                value={confirmPwd}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPwd(event?.target.value)
                }
                placeholder="Enter new password"
                isInvalid={!passwordsMatch}
                errorMessage="Passwords must match"
                type="password"
              />
            </div>
          </div>

          <div className="mt-[33px] flex flex-col gap-[27px]">
            <small className="text-[#7F7F7F] text-[11px] font-[400]">
              Your password must contain at least 1 number, 1 special character,
              and be a minimum of 8 characters.
            </small>

            <Button
              text="Reset your password"
              disabled={disableBtn}
              type="submit"
              className="text-[18px] font-[500] py-[19px] rounded-full"
            />
          </div>

          <p className="text-[14px] font-[500] text-center mt-[10px]">
            Didn&apos;t receive a code?{" "}
            <button className="font-bold" onClick={resendEmail}>
              {" "}
              Resend code
            </button>
          </p>
        </form>
      </div>

      {showMessageSentAlert && (
        <CustomAlert
          openModal={showMessageSentAlert}
          setOpenModal={setShowMessageSentAlert}
        >
          <div className="flex flex-col items-center my-6">
            <CheckIcon sx={{ mb: 1, fontSize: "70px", color: "#91B3FA" }} />
            <p className="font-medium text-xl">Code Resent</p>
            <p className="text-sm">
              A new 6-digit code has been sent to your email
            </p>
          </div>
        </CustomAlert>
      )}
      {showErrorAlert && (
        <CustomAlert
          openModal={showErrorAlert}
          setOpenModal={setShowErrorAlert}
        >
          <div className="flex flex-col items-center my-4">
            <ClearIcon sx={{ mb: 1, fontSize: "70px", color: "#91B3FA" }} />
            <p className="font-medium text-xl">Invalid Code</p>
            <p className="text-sm text-center">
              The 6-digit verification code you entered is incorrect
            </p>
          </div>
        </CustomAlert>
      )}
    </>
  );
}

export default ResetPasswordPage;
