"use client";

import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import CustomAlert from "@/components/shared/general/CustomAlert";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { Modal } from "@/components/shared/general/molecules/Modal";
import { useAuthContext } from "@/context/AuthContext";
import { clearCookies } from "@/helpers/auth/cookies";
import apiService from "@/services/apiService";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function SettingsNav({ onItemClicked }: any) {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const [isDeactivateOpen, setIsDeactivateOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isBookingErrorAlertOpen, setIsBookingErrorAlertOpen] =
    useState<boolean>(false);

  const pathName = usePathname();
  const { user, setUser, isUserCharter } = useAuthContext();
  const isCharter = isUserCharter();

  useEffect(() => {
    if (!password) {
      setIsButtonDisabled(true);
      return;
    }
    setIsButtonDisabled(false);
  }, [password]);

  const handleDeactivate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    if (!user) {
      toast.error(`User not found`);
      return;
    }

    const { error } = await apiService.post(`users/deactivate/${user.id}`, {});

    if (error) {
      toast.error(`Oops, something went wrong, try again later.`);
    } else {
      toast.success(`Account deactivated`);
      clearCookies();
      setUser(null);
      location.reload();
    }
    setPassword("");
    setIsButtonDisabled(false);
    setIsDeactivateOpen(false);
  };

  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    if (!user) {
      toast.error(`User not found`);
      return;
    }

    const { error, data, status } = await apiService.post(`users/delete`, {
      userId: user.id,
      email: user.email,
      password: password,
    });

    if (status === 409) {
      setIsBookingErrorAlertOpen(true);
    } else if (error) {
      toast.error(error);
    } else if (data.message === "User deleted successfully") {
      toast.success(`Account Successfully Deleted`);
      clearCookies();
      setUser(null);
      location.reload();
    } else {
      toast.error(
        "An error has occurred, check the information you sent and try again"
      );
    }
    setPassword("");
    setIsButtonDisabled(false);
    setIsDeactivateOpen(false);
  };

  const handleCancelButton = () => {
    setIsDeactivateOpen(false);
    setPassword("");
  };

  return (
    <section className="flex flex-col items-center gap-[15px]">
      <nav className="w-full px-[20px] lg:px-[30px] py-[20px] lg:py-[45px] bg-white rounded-[12px]">
        <ul className="text-[16px]">
          {!isCharter ? null : (
            <li className="leading-[12px]">
              <Link
                href="/home/settings/profile"
                onClick={() => {
                  onItemClicked?.();
                }}
                className={
                  pathName.includes("profile")
                    ? "text-[#203290] font-[700]"
                    : ""
                }
              >
                Charter Profile
              </Link>
            </li>
          )}
          {isCharter && <hr className="my-[20px] bg-[#EAE8E1]" />}
          <li className="leading-[12px]">
            <Link
              href="/home/settings/notifications"
              onClick={() => {
                onItemClicked?.();
              }}
              className={
                pathName.includes("notifications")
                  ? "text-[#203290] font-[700]"
                  : ""
              }
            >
              Notifications
            </Link>
          </li>
          <hr className="my-[20px] bg-[#EAE8E1]" />
          <li className="leading-[12px]">
            <Link
              href="/home/settings/login"
              onClick={() => {
                onItemClicked?.();
              }}
              className={
                pathName.includes("login") ? "text-[#203290] font-[700]" : ""
              }
            >
              Login Information
            </Link>
          </li>
      
          
          {!isCharter && (
            <>
              <hr className="my-[20px] bg-[#EAE8E1]" />
              <li className="leading-[12px]">
                <Link
                  href="/home/settings/bookings"
                  onClick={() => {
                    onItemClicked?.();
                  }}
                  className={
                    pathName.includes("bookings")
                      ? "text-[#203290] font-[700]"
                      : ""
                  }
                >
                  My bookings
                </Link>
              </li>
            </>
          )}

          {!isCharter && <>
            <hr className="my-[20px] bg-[#EAE8E1]" />
            <li className="leading-[12px]">
            <Link
              href="/home/settings/charterbids"
              onClick={() => {
                onItemClicked?.();
              }}
              className={
                pathName.includes("charterbids")
                  ? "text-[#203290] font-[700]"
                  : ""
              }
            >
              My iCharterBids
            </Link>
          </li>
          </>}

          
        </ul>
      </nav>
      <button
        className="text-[13px] font-[400]"
        onClick={() => {
          setIsDeactivateOpen(true);
        }}
      >
        <span className="font-[700]">
          {isUserCharter() ? "Deactivate" : "Delete"}
        </span>{" "}
        my account
      </button>
      <Modal
        isVisible={isDeactivateOpen}
        transparent
        className={`text-center text-[#454545] w-full ${
          isResponsive ? "max-w-[355px]" : "max-w-[485px]"
        } px-[25px] py-[35px] bg-white rounded-[12px] border border-[rgba(0,0,0,0.05)] shadow-lg flex flex-col items-center`}
      >
        <button
          className="self-end mt-[-15px]"
          onClick={() => setIsDeactivateOpen(false)}
        >
          <CloseIcon size={24} />
        </button>

        <div className="text-center text-zinc-700 text-xl font-bold leading-loose">
          Delete account
        </div>

        <p className="text-center text-zinc-700 text-base font-normal leading-tight my-[25px]">
          {
            "Are you sure you want to delete your account?\nAll your data will be permanently deleted"
          }
        </p>
        <div className="flex gap-[10px]">
          <form
            className={`text-[#454545] ${
              isResponsive ? "w-[334px]" : "w-[447px]"
            } flex flex-col`}
            onSubmit={(event) =>
              isUserCharter() ? handleDeactivate(event) : handleDelete(event)
            }
          >
            <FormInput
              testId="password"
              type="password"
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event?.target.value)
              }
              placeholder="Enter Password"
              test-id="delete_account_password"
            />
            <div className="flex gap-[10px] justify-center mt-[40px]">
              <Button text="Cancel" onClick={handleCancelButton} width={140} />
              <Button
                disabled={isButtonDisabled}
                text="Yes, Delete"
                isSecondary
                width={140}
              />
            </div>
          </form>
        </div>
      </Modal>
      <CustomAlert
        width={isResponsive ? 348 : 447}
        openModal={isBookingErrorAlertOpen}
        setOpenModal={setIsBookingErrorAlertOpen}
      >
        <div className="flex flex-col items-center gap-[25px] pb-[12px]">
          <div className="text-center text-zinc-700 text-xl font-bold leading-loose">
            Oh! It looks like you have active bookings
          </div>
          <Image
            src={"/svgs/dead_fish.svg"}
            alt="fish-error"
            width={150}
            height={104}
          />

          <div className="text-center text-zinc-700 text-base font-normal leading-tight">
            Cancel your bookings before deleting your account.
          </div>
        </div>
      </CustomAlert>
    </section>
  );
}
