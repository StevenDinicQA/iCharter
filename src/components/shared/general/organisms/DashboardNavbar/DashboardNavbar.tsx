"use client";

import Link from "next/link";
import { WidthContainer } from "../../atoms/WidthContainer";
import Image from "next/image";
import { ACTIVE_LINK_STYLES, DEFAULT_LINK_STYLES } from "./constants";
import { BellIcon } from "../../atoms/icons/BellIcon";
import IconButton from "@mui/material/IconButton";
import { Avatar, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/enums/routes";
import { useAuthContext } from "@/context/AuthContext";
import { USER_TYPE } from "@/utils/enums/user";
import { useEffect, useState } from "react";
import BasicMenu from "@/components/home/molecules/NavBar/BasicMenu";
import { clearCookies } from "@/helpers/auth/cookies";
import NotificationsMenu from "@/components/home/molecules/NavBar/NotificationsMenu";
import MobileNotificationsMenu from "@/components/home/molecules/NavBar/MobileNotificationsMenu";
import MobileMenu from "@/components/home/molecules/NavBar/MobileMenu";

type Props = {
  isHomePage?: boolean;
  isMarketPage?: boolean;
}

export const DashboardNavbar = ({ isHomePage, isMarketPage }: Props) => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  const pathName = usePathname();
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileNotificationsMenu, setMobileNotificationsMenu] = useState(false);
  const [currentNavigatedPage, setCurrentNavigatedPage] = useState<string>("");

  function handleLogout() {
    clearCookies();
    setUser(null);
    router.push("/");
  }

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const toggleNotificationsMobileMenu = () => {
    setMobileNotificationsMenu(!mobileNotificationsMenu);
  };

  const handleNavigationChange = (page: string) => {
    setCurrentNavigatedPage(page);
  };

  useEffect(() => {
    const items = {
      "listings": "listings",
      "bookings": "bookings",
      "reviews": "reviews",
      "earnings": "earnings",
      "settings": "settings",
      "dashboard": "dashboard",
    }

    Object.keys(items).map((item) => {
      if (pathName.includes(item)) {
        setCurrentNavigatedPage(item);
      }
    });
  }, [pathName]);

  /**
   * Navbar that’s going to be used for default navigation.
   */
  const defaultNavbar = (
    <div className={`flex justify-between items-center w-full ${isHomePage || isMarketPage ? "text-white" : "text-[#2D3AAF]"}`}>
      {user && isResponsive && (
        <div className="-m-0.5">
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
        </div>
      )}
      <Link href="/" className="hidden lg:block">
        <Image
          src={isHomePage || isMarketPage ? "/imgs/logo_heading_white.png" : "/imgs/logo_heading.png"}
          width={isResponsive ? 81 : 94}
          height={isResponsive ? 32 : 38}
          alt="Logo"
          test-id="nav_icharter-logo"
        />
      </Link>
      {!isResponsive && (
        <ul className="text-white flex gap-4">
          <li className={`text-sm p-3 px-5 rounded-xl flex items-center justify-center font-medium ${!(isHomePage || isMarketPage) && currentNavigatedPage !== 'dashboard' && DEFAULT_LINK_STYLES} ${currentNavigatedPage === 'dashboard' && ACTIVE_LINK_STYLES}`} test-id="nav_dashboard">
            <Link onClick={() => handleNavigationChange('dashboard')} href="/home/dashboard">Dashboard</Link>
          </li>
          <li
            className={`text-sm p-3 px-5 rounded-xl flex items-center justify-center font-medium ${!(isHomePage || isMarketPage) && currentNavigatedPage !== 'listings' && DEFAULT_LINK_STYLES} ${currentNavigatedPage === 'listings' && ACTIVE_LINK_STYLES}`}
            test-id="nav_listings"
          >
            <Link
              onClick={() => handleNavigationChange("listings")}
              href="/home/listings"
            >
              Listings
            </Link>
          </li>
          <li
            className={`text-sm p-3 px-5 rounded-xl flex items-center justify-center font-medium ${!(isHomePage || isMarketPage) && currentNavigatedPage !== 'bookings' && DEFAULT_LINK_STYLES} ${currentNavigatedPage === 'bookings' && ACTIVE_LINK_STYLES}`}
            test-id="nav_bookings"
          >
            <Link
              onClick={() => handleNavigationChange("bookings")}
              href="/home/bookings"
            >
              Bookings
            </Link>
          </li>
          <li className={`text-sm p-3 px-5 rounded-xl flex items-center justify-center ${!(isHomePage || isMarketPage) && DEFAULT_LINK_STYLES}`} test-id="nav_reviews">
            <Link href="#">Reviews</Link>
          </li>
          <li className={`text-sm p-3 px-5 rounded-xl flex items-center justify-center ${!(isHomePage || isMarketPage) && DEFAULT_LINK_STYLES}`} test-id="nav_earnings">
            <Link href="#">Earnings</Link>
          </li>
        </ul>
      )}

      <div className="relative flex items-center rounded-full overflow-hidden">
        {user?.charterProfile?.profilePictureUrl ? (
          <Image
            src={user?.charterProfile?.profilePictureUrl || undefined}
            alt="Charter Profile"
            width={32}
            height={32}
            className="hidden lg:block w-[32px] lg:w-[46px] h-[32px] lg:h-[46px]"
            test-id="nav_avatar"
          />
        ) : (
          <Image
            src="/svgs/default_profile_picture.svg"
            alt="Charter Profile"
            width={32}
            height={32}
            className="w-[32px] lg:w-[46px] h-[32px] lg:h-[46px]"
            test-id="nav_avatar"
          />
        )}
        {user && !isResponsive && (
          <BasicMenu handleLogout={handleLogout} user={user} dashboard={true} />
        )}
      </div>
    </div>
  );

  /**
   * Navbar that’s going to be used only on the onboarding screen.
   */
  const onboardingNavbar = (
    <div
      className={`flex ${isResponsive ? "justify-center" : "justify-start"}`}
    >
      <Link href="/" className="lg:ml-[90px]">
        <Image
          src="/icharter_logo.svg"
          width={isResponsive ? 81 : 94}
          height={isResponsive ? 32 : 38}
          alt="Logo"
          id="icharter-logo"
        />
      </Link>
    </div>
  );

  return (
    <nav className={`w-full flex justify-center ${(isHomePage || isMarketPage) ? "" : "lg:py-2"}`}>
      {pathName !== ROUTES.ONBOARDING && pathName !== ROUTES.NEW_LISTING
        ? defaultNavbar
        : onboardingNavbar}
    </nav>
  );
};
