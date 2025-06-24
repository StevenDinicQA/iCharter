"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import apiService from "@/services/apiService";
import { SignUpResponse, User } from "@/types/auth/Signup";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { USER_TYPE } from "@/utils/enums/user";
import { doesPasswordMeetsNeeds } from "@/utils/validators/password";
import { ICHARTER_PP, ICHARTER_TOU } from "@/utils/constants";
import { mixPannelService } from "@/services/mixpanel-service";
import { ArrowLeft } from "@/components/shared/general/atoms/icons/ArrowLeft";

function SignUpPage() {
  const { setUser } = useAuthContext();
  const router = useRouter();

  const [userType, setUserType] = useState<USER_TYPE>(USER_TYPE.CHARTER);
  const pathname = usePathname();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [formCompleted, setFormCompleted] = useState(false);

  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pwdError, setPwdError] = useState<boolean>(false);
  const [passwordWrongFormatError, setPasswordWrongFormatError] =
    useState<boolean>(false);

  const hasAllFields =
    !firstName || !lastName || !email || !password || !confirmPwd;

  useEffect(() => {
    if (!doesPasswordMeetsNeeds(password) && password !== "") {
      setPasswordWrongFormatError(true);
      setDisableBtn(true);
      return;
    } else {
      setPasswordWrongFormatError(false);
    }

    if (hasAllFields) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }

    if (password !== confirmPwd) {
      setDisableBtn(true);
      setPwdError(true);
    } else {
      setPwdError(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPwd, firstName, lastName, email]);

  useEffect(() => {
    const handleWindowClose = () => {
      if (formCompleted && pathname === "/auth/sign-up") return;

      mixPannelService.trackEvent("Signup Incomplete", {
        userType: "customer",
        email,
      });
    };

    handleWindowClose();
  }, [email, formCompleted, pathname, userType]);

  async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    // We’ll manage what does the form submit does,
    // so let’s prevent the default behavior.
    event.preventDefault();

    setDisableBtn(true);

    const { error: authError, data } = await apiService.post<SignUpResponse>(
      "auth/register",
      {
        name: email,
        email,
        password: password,
      }
    );

    if (authError) {
      toast.error(authError);
      setDisableBtn(false);
      return;
    }

    const { error: userError } = await apiService.post<User>(`users/create`, {
      id: data?.userSub,
      name: firstName,
      lastName: lastName,
      email,
      isFacebookUser: false,
      userType,
    });

    if (userError) {
      toast.error("An error occured, please try again");
      setDisableBtn(false);
      return;
    }
    setFormCompleted(true);

    Cookies.set("email", email);
    Cookies.set("userType", userType);

    mixPannelService.trackEvent("Started Signup", {
      email,
      userType,
    });

    router.replace("/auth/confirm-email");
  }

  return (
    <>
      <button
        className="self-start ml-10 mt-10 flex items-center gap-1"
        onClick={() => router.back()}
        test-id="signup_back-button"
      >
        <ArrowLeft fill="black" size={16} />
        <p className="md:block hidden">Go Back</p>
      </button>
      <div className="w-full mt-10 flex flex-col items-center justify-center max-w-[600px] lg:p-0 px-8">
        <Image
          src="/imgs/logo-icon.png"
          alt="Icharter-Logo"
          width={59}
          height={60}
          priority
          className="mb-10"
        />
        <h1 className="text-3xl mb-2 font-semibold text-[#454545]">
          Welcome to iCharter
        </h1>
        <p className="text-[13px] font-[400] md:text-start">
          Choose your account type
        </p>

        <div className="flex flex-wrap w-full justify-center gap-8 my-8">
          {/* Added disabled = true */}
          {
            <button
              onClick={() => setUserType(USER_TYPE.CUSTOMER)}
              /*
                {
                }className={`border border-[transparent] rounded-[12px] ${
                  userType === "customer" ? "border-primary" : ""
                }`}
              */
              className={`border rounded-[12px] ${
                userType === "customer"
                  ? "border-primary"
                  : "border-[lightgray]"
              } text-[gray]`}
              test-id="signup_customer"
              disabled={false}
            >
              <Image
                src="/svgs/customer.svg"
                alt="customer"
                width={180}
                height={40}
              />
            </button>
          }

          <button
            onClick={() => setUserType(USER_TYPE.CHARTER)}
            className={`border border-[transparent] rounded-[12px] ${
              userType === "charter" ? "border-primary" : ""
            }`}
            test-id="signup_charter"
          >
            <Image
              src="/svgs/charter.svg"
              alt="charter"
              width={180}
              height={40}
            />
          </button>
        </div>

        <small className="text-[13px] font-[400]">
          Please fill the information below to get started
        </small>

        <form
          className="w-full text-[#454545] flex flex-col"
          onSubmit={(event) => handleCreateAccount(event)}
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex w-full flex-col lg:flex-row justify-between gap-[27px] mt-[20px] ">
              <div className="flex flex-1 flex-col gap-[8px]">
                <label className="text-[#737473] text-[16px] font-[500]">
                  First name
                </label>
                <FormInput
                  testId="firstName"
                  value={firstName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(event?.target.value)
                  }
                  placeholder="First name"
                  test-id="signup_first-name"
                  autoFocus
                />
              </div>
              <div className="flex flex-1 flex-col gap-[8px]">
                <label className="text-[#737473] text-[16px] font-[500]">
                  Last name
                </label>
                <FormInput
                  testId="lastName"
                  value={lastName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setLastName(event?.target.value)
                  }
                  placeholder="Last name"
                  test-id="signup_last-name"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-[8px]">
              <label className="text-[#737473] text-[16px] font-[500]">
                Email Address
              </label>
              <FormInput
                testId="email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event?.target.value)
                }
                placeholder="Enter Email Address"
                type="email"
                test-id="signup_email"
              />
            </div>
            <div className="flex w-full justify-between gap-4 mb-[8px] flex-col lg:flex-row">
              <div className="flex flex-1 flex-col gap-[8px]">
                <label className="text-[#737473] text-[16px] font-[500]">
                  Password
                </label>
                <FormInput
                  testId="password"
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPassword(event?.target.value)
                  }
                  placeholder="Enter Password"
                  type="password"
                  isInvalid={passwordWrongFormatError}
                  errorMessage="Please make sure the passwords contains all neccessary characters"
                  test-id="signup_password"
                />
              </div>
              <div className="flex flex-1 flex-col w-full">
                <div className="flex flex-1 flex-col gap-[8px]">
                  <label className="text-[#737473] text-[16px] font-[500]">
                    Confirm Password
                  </label>
                  <FormInput
                    testId="confirmPwd"
                    value={confirmPwd}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPwd(event?.target.value)
                    }
                    placeholder="Enter Password"
                    type="password"
                    isInvalid={pwdError}
                    errorMessage="Passwords must match"
                    test-id="signup_confirm-password"
                  />
                </div>
              </div>
            </div>
          </div>

          <small className="opacity-50 text-[11px] font-[400] mb-[29px]">
            Your password must contain at least 1 number, 1 special character,
            and be a minimum of 8 characters.
          </small>

          <Button
            test-id="signup_create-account"
            text="Create Account"
            disabled={disableBtn}
            type="submit"
            className="text-[18px] font-[500] py-[19px] rounded-full mt-[8px] mb-[16px]"
          />

          <p className="text-[11px] text-[#454545] font-[400] text-center">
            By signing up to iCharter you agree to the
            <a href={ICHARTER_PP} rel="noopener" target="_blank">
              <span className="font-bold" test-id="signup_privacy">
                {" "}
                Privacy Policy
              </span>{" "}
            </a>
            and
            <a href={ICHARTER_TOU} rel="noopener" target="_blank">
              <span className="font-bold" test-id="signup_terms">
                {" "}
                Terms of Service
              </span>
            </a>
          </p>

          <p className="text-[13px] font-[500] text-center mt-[16px] mb-[50px]">
            Already have an account?{" "}
            <span className="font-bold">
              {" "}
              <Link href="sign-in" test-id="signup_sign-in">
                Sign In
              </Link>
            </span>
          </p>
        </form>

        {/*
            <hr className="w-full h-[1px] my-[30px] bg-[#BDBDBD]" />
    
            <button
              className="w-full bg-[#4A66AD] rounded-full py-[12px] mb-[20px] flex items-center justify-center"
              type="submit"
              onClick={responseFacebook}
              test-id="signup_facebook"
            >
              <Image
                src={`/footer/facebook.svg`}
                alt="facebook"
                width={32}
                height={32}
                className="mr-4"
                style={{ color: "#E7E7EB" }}
                color="#E7E7EB"
                priority
              />
              <span className="text-[18px] font-[500] text-white">
                Sign Up with Facebook
              </span>
            </button>
          */}
      </div>
    </>
  );
}

export default SignUpPage;
