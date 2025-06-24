"use client";

import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { useAuthContext } from "@/context/AuthContext";
import apiService from "@/services/apiService";
import Cookies from "js-cookie";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UserData } from "./types";
import { ScreenLoading } from "@/components/shared/general/atoms/ScreenLoading";
import { clearCookies } from "@/helpers/auth/cookies";
import { useRouter } from "next/navigation";

export default function LoginSettingsScreen() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { user, setUser, refetchUser } = useAuthContext();
  const router = useRouter();

  const handleChangePassword = async (event: MouseEvent<HTMLAnchorElement>) => {
    const { error } = await apiService.post("auth/forgotPassword", {
      name: user?.email,
    });

    if (error) {
      event.preventDefault();
      toast.error(`Oops, there was a problem while sending the email`);
    }

    Cookies.set("email", user?.email!);
  };

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
    });
  }, [user]);

  useEffect(() => {
    setIsDisabled(
      !Boolean(
        userData.name &&
          userData.lastName &&
          userData.email &&
          userData.password
      )
    );
  }, [userData]);

  const handleChangeInfo = async () => {
    setIsPageLoading(true);
    const { status } = await apiService.put("auth/updateUserAndLoginInfo", {
      id: user?.id,
      name: userData.name,
      lastName: userData.lastName,
      ...(userData.email === user?.email ? {} : { newEmail: userData.email }),
      oldEmail: user?.email,
      password: userData.password,
    });

    if (status === 400) {
      setIsPageLoading(false);
      toast.error(`Oops, there was a problem updating your information`);
      return;
    }

    if (user?.email && (userData.email !== user.email)) {
      setIsPageLoading(false);
      clearCookies();
      Cookies.set("email", user.email);
      Cookies.set("password", userData.password);
      toast.success("We sent you a verification code via email, please enter it below")
      router.replace("/auth/verify-email");
      setUser(null);
      return;
    }

    setIsPageLoading(false);
    refetchUser();
    location.reload();
  };

  return (
    <section className="p-[30px] lg:p-[45px] bg-white rounded-[12px] flex flex-col gap-[45px]">
      {isPageLoading && <ScreenLoading />}
      <h2 className="text-[28px] font-[700]">Log In Information</h2>
      <div className="max-w-[445px] flex flex-col gap-[28px]">
        <FormField label="First Name">
          <FormInput
            testId="firstName"
            value={userData.name}
            placeholder="John"
            onChange={(event) =>
              setUserData((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </FormField>
        <FormField label="Last Name">
          <FormInput
            testId="lastName"
            value={userData.lastName}
            placeholder="Doe"
            onChange={(event) =>
              setUserData((prev) => ({ ...prev, lastName: event.target.value }))
            }
          />
        </FormField>
        <FormField label="Email">
          <FormInput
            testId="email"
            value={userData.email}
            placeholder="john@doe.com"
            type="email"
            onChange={(event) =>
              setUserData((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </FormField>
        <div className="flex flex-col">
          <FormField label="Password">
            <FormInput
              testId="password"
              value={userData.password}
              onChange={(event) =>
                setUserData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              type="password"
              dissableToggle
            />
          </FormField>
          <Link
            href="/auth/reset-password"
            onClick={handleChangePassword}
            className="text-[13px] font-[500] underline self-end"
          >
            Change Password
          </Link>
        </div>
      </div>
      <Button
        text="Save"
        className="w-[130px] self-end"
        disabled={isDisabled}
        onClick={handleChangeInfo}
      />
    </section>
  );
}
