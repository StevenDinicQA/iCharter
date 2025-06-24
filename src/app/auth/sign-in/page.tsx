"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import apiService from "@/services/apiService";
import { LoginResponse } from "@/types/auth/Login";
import { saveAuthCookies } from "@/helpers/auth/cookies";
import User from "@/types/user/User";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { USER_TYPE } from "@/utils/enums/user";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { ArrowLeft } from "@/components/shared/general/atoms/icons/ArrowLeft";

function SignInPage() {
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const searchParams = useSearchParams();
  const fromURL = searchParams.get("from");

  const router = useRouter();
  const { setUser } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    // We’ll manage te behavior when the form is submitted,
    // so let’s prevent the default behavior.
    event.preventDefault();

    setDisableBtn(true);

    const { error: loginError, data } = await apiService.post<LoginResponse>(
      "auth/login",
      {
        name: email,
        password: password,
      }
    );

    if (loginError) {
      toast.error(loginError);
      setDisableBtn(false);
      return;
    }

    saveAuthCookies(data!);

    apiService.authType = "cognito";
    apiService.authToken = data?.accessToken.jwtToken;

    const { error: userError, data: user } = await apiService.get<User>(
      `auth/me`
    );

    setDisableBtn(false);
    setUser(user);

    if (user?.userType) {
      Cookies.set("userType", user.userType, { expires: 90 });
    }

    if (fromURL) {
      const params: URLSearchParams = new URLSearchParams(
        searchParams.toString()
      );
      params.delete("from");
      router.replace(fromURL + `?${params.toString()}`);
      return;
    }

    if (user?.userType === USER_TYPE.CHARTER) {
      router.replace("/home/listings");
      return;
    }

    router.replace("/");
  }

  useEffect(() => {
    if (!email || !password) {
      setDisableBtn(true);
      return;
    }
    setDisableBtn(false);
  }, [email, password]);

  return (
    <>
      <button
        className="self-start ml-10 mt-10 flex items-center gap-1"
        onClick={() => router.back()}
        test-id="signin_back-button"
      >
        <ArrowLeft fill="black" size={16} />
        <p className="md:block hidden">Go Back</p>
      </button>
      <div
        className={`flex flex-col items-center justify-center w-full md:w-[447px] px-8 md:px-0 ${
          isResponsive ? "my-[97px]" : "mt-7"
        }`}
      >
        <Image
          src="/imgs/logo-icon.png"
          alt="Icharter-Logo"
          width={59}
          height={60}
          priority
        />
        <h1
          className={`text-3xl font-[500] text-[#454545] ${
            isResponsive ? "mt-8" : "mt-10"
          }`}
        >
          Welcome Back!
        </h1>

        <form
          className={`text-[#454545] w-full flex flex-col ${
            isResponsive ? "mt-12" : "mt-7"
          }`}
          onSubmit={(event) => handleLogin(event)}
        >
          <div className="flex flex-col gap-[27px] mb-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[#737473] text-[16px] font-[500]">
                Email
              </label>
              <FormInput
                testId="email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event?.target.value)
                }
                placeholder="Enter Email Address"
                type="email"
                test-id="signin_email"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between items-center">
                <label className="text-[#737473] text-[16px] font-[500]">
                  Password
                </label>
                <Link
                  href="/auth/recover-account"
                  className="text-[13px] underline font-medium"
                  test-id="signin_forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <FormInput
                testId="password"
                type="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event?.target.value)
                }
                placeholder="Enter Password"
                test-id="signin_password"
              />
            </div>

            <Button
              disabled={disableBtn}
              text="Log In"
              className={`text-[18px] font-[500] py-[19px] rounded-full ${
                isResponsive ? "mt-[8px]" : ""
              }`}
              type="submit"
              test-id="signin_login"
            />
          </div>

          <p className="text-[13px] font-[500] text-center">
            Don&apos;t have an account?{" "}
            <span className="font-bold">
              {" "}
              <Link href="/auth/sign-up" test-id="signin_create-account">
                Create account
              </Link>
            </span>
          </p>
        </form>

        {/*
            <hr
              className={`w-full h-[1px] bg-[#DDDCDC] ${
                isResponsive ? "my-[17px]" : "my-[27px]"
              }`}
            />
    
            <button
              className="w-full bg-[#4A66AD] rounded-full py-[16px] h-[56px] flex items-center justify-center"
              type="submit"
              onClick={responseFacebook}
              test-id="signin_facebook"
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
                Log In with Facebook
              </span>
            </button>
          */}
      </div>
    </>
  );
}

export default SignInPage;
