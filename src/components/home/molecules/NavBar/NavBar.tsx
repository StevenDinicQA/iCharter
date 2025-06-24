"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "@/components/shared/forms/atoms/customInputs/CustomButton";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { clearCookies } from "@/helpers/auth/cookies";
import { useMediaQuery, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MobileNotificationsMenu from "./MobileNotificationsMenu";
import MobileMenu from "./MobileMenu";
import NotificationsMenu from "./NotificationsMenu";
import BasicMenu from "./BasicMenu";
import { WidthContainer } from "@/components/shared/general/atoms/WidthContainer";
import { DashboardNavbar } from "@/components/shared/general/organisms/DashboardNavbar";
import { BellIcon } from "@/components/shared/general/atoms/icons/BellIcon";
import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { Router } from "next/router";
import { usePathname, useRouter } from "next/navigation";

function NavBar() {
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, isUserCharter, currentScreenTitle } = useAuthContext();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileNotificationsMenu, setMobileNotificationsMenu] = useState(false);

  const media1456 = useMediaQuery("(max-width:1456px)");

  const isHomePage = pathname === '/';

  const isMarketPage = pathname === '/market';

  function handleLogout() {
    clearCookies();
    setUser(null);
    router.push("/");
  }

  const toggleMobileMenu = () => {
    if (!user && isResponsive) {
      setMobileMenu(!mobileMenu);
    } else {
      setMobileMenu(!mobileMenu);
    }
  };

  const toggleNotificationsMobileMenu = () => {
    setMobileNotificationsMenu(!mobileNotificationsMenu);
  };

  return (
    <nav
      className={`flex w-full h-12 lg:h-[74px] bg-transparent justify-center items-center z-50 ${
        isResponsive && !isUserCharter && "pt-12 pb-8 px-3 text-white"
      } text-white`}
    >
      <div className="flex justify-center items-center w-full mx-4 max-w-[1200px]">
        {!user ? (
          <>
            {isResponsive ? (
              <div className="w-full flex flex-row justify-between">
                <div className="flex items-center">
                  <Link href="/">
                    <Image
                      src="/imgs/logo_heading_white.png"
                      alt="Icharter-Logo"
                      width={98}
                      height={24}
                      test-id="nav_icharter-logo"
                    />
                  </Link>
                </div>
                <div className="flex flex-row gap-4">
                <Link href="/auth/sign-in" test-id="nav_list-waitlist">
                    <div className="py-[8px]">
                      <p className="text-sm font-medium">Sign In</p>
                    </div>
                  </Link>
                  <Link href="/auth/sign-up" test-id="nav_list-waitlist">
                    <div className="py-[8px]">
                      <p className="text-sm font-medium">Sign Up</p>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <WidthContainer className="w-full flex justify-between items-center">
                <div className="hidden lg:block">
                  <Link href="/">
                    <Image
                      src="/imgs/logo_heading_white.png"
                      alt="Icharter-Logo"
                      width={93}
                      height={68}
                      test-id="nav_icharter-logo"
                    />
                  </Link>
                </div>
                <div className="flex items-center gap-10 -m-3">
                  <div className="flex flex-row gap-5">
                    <Link href={"/auth/sign-up"}>
                    <CustomButton 
                      title="List your boat"
                      onClick={() => {}}
                      />
                    </Link>
                    <Link href="/auth/sign-in" test-id="nav_list-waitlist">
                      <div className="py-2 px-3">
                       <p className="text-sm font-medium">Sign In</p>
                      </div>
                    </Link>
                    <Link href="/auth/sign-up" test-id="nav_list-waitlist">
                      <div className="py-2 px-3">
                      <p className="text-sm font-medium">Sign Up</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </WidthContainer>
            )}
          </>
        ) : (
          <>
            {isResponsive ? (
              isUserCharter() ? (
                <DashboardNavbar isHomePage={isHomePage} isMarketPage={isMarketPage} />
              ) : (
                <div className={`flex justify-between items-center w-full -ml-1 ${isHomePage || isMarketPage ? "text-white" : "text-[#2D3AAF]"}`}>
                  {/* Menu */}
                  <button
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMobileMenu}
                    test-id="nav_burger-menu"
                  >
                    <MenuIcon fontSize="medium" />
                  </button>

                  <MobileMenu
                    open={mobileMenu}
                    onClose={toggleMobileMenu}
                    user={user}
                    handleLogout={handleLogout}
                  />
                  {/* {isHomePage || isMarketPage && (
                    currentScreenTitle ? (
                      <div className="text-center text-zinc-700 text-lg font-bold leading-[15px]">
                        {currentScreenTitle}
                      </div>
                    ) : (
                      <Image
                        src="/svgs/icharter_logo.svg"
                        width={27}
                        height={32}
                        alt="ICharter Icon"
                      />
                    )
                  )} */}
                  <div className="w-[35px]"></div>
                  {/* Notifications 
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleNotificationsMobileMenu}
                    test-id="nav_notifications"
                  >
                    <BellIcon size={28} />
                  </IconButton>
                */}
                  <MobileNotificationsMenu
                    open={mobileNotificationsMenu}
                    onClose={toggleNotificationsMobileMenu}
                  />
                </div>
              )
            ) : (
              <>
                {isUserCharter() ? (
                  <DashboardNavbar isHomePage={isHomePage} isMarketPage={isMarketPage} />
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <div
                      className={`${
                        isUserCharter()
                          ? "pl-[144px]"
                          : `${isHomePage || isMarketPage ? "" : "flex flex-between w-full"}`
                      }`}
                    >
                      <Link href="/">
                        <Image
                          src={isHomePage || isMarketPage ? "/imgs/logo_heading_white.png" : "/imgs/logo_heading.png"}
                          alt="Icharter-Logo"
                          width={93}
                          height={68}
                          test-id="nav_icharter-logo"
                        />
                      </Link>
                    </div>
                    <div
                      className={`${
                        isUserCharter()
                          ? "mr-[20px] lg:mr-[90px] flex items-center gap-2 lg:gap-4"
                          : `relative flex items-center gap-2 lg:gap-4`
                      }`}
                    >
                      <NotificationsMenu />
                      {user?.charterProfile?.profilePictureUrl ? (
                        <Avatar
                          className="w-[28px] lg:w-[46px] h-[28px] lg:h-[46px]"
                          src={
                            user?.charterProfile?.profilePictureUrl || undefined
                          }
                          test-id="nav_avatar"
                        />
                      ) : (
                        <Avatar
                          className="w-[28px] lg:w-[46px] h-[28px] lg:h-[46px]"
                          src="/svgs/default_profile_picture.svg"
                          test-id="nav_avatar"
                        />
                      )}
                      <BasicMenu
                        handleLogout={handleLogout}
                        user={user}
                        customMenuStyles={{
                          left: media1456 ? "-152px" : "-260px",
                        }}
                        isHomePage={isHomePage}
                        isMarketPage={isMarketPage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
