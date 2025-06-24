import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Avatar, Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import MenuMobileCard from "../../atoms/MobileMenuCard";
import User from "@/types/user/User";
import { useMediaQuery } from "@mui/material";
import { SettingsNav } from "../SettingsNav";
import { Logout } from "@mui/icons-material";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user?: User;
  handleLogout: () => void;
  handleSignInClick?: () => void;
  handleSignUpClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  user,
  handleLogout,
}) => {
  const [isSettingsShown, setIsSettingsShown] = useState<boolean>(false);

  const { isUserCharter } = useAuthContext();

  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const texts = ["Dashboard", "Listings", "Earnings", "Bookings", "Reviews"];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#F9F9F9",
        },
      }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        },
      }}
    >
      <Box sx={{ width: 275 }}>
        <div className="flex flex-row-reverse mt-7">
          <IconButton size="large" onClick={onClose} test-id="nav_back-button">
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </div>
        {user ? (
          <>
            {isUserCharter() ? (
              <>
                <div className="flex px-4 pb-6 pt-4">
                  {user?.charterProfile?.profilePictureUrl ? (
                    <Avatar
                      test-id="side_nav_avatar"
                      src={user?.charterProfile?.profilePictureUrl || undefined}
                      sx={{
                        width: isResponsive ? "59px" : "46px",
                        height: isResponsive ? "59px" : "43px",
                      }}
                    />
                  ) : (
                    <Avatar
                      test-id="side_nav_avatar"
                      src="/svgs/default_profile_picture.svg"
                      sx={{
                        width: isResponsive ? "59px" : "46px",
                        height: isResponsive ? "59px" : "43px",
                      }}
                    />
                  )}
                  <p className="font-medium text-base pl-4 py-5">{user.name}</p>
                </div>
                <div className="px-4 pb-4">
                  <div>
                    {texts.map((text) => (
                      <div className="mt-[10px]" key={text}>
                        <Link
                          href={`/home/${text.toLowerCase()}`}
                          test-id={`navbar_${text.toLowerCase()}`}
                        >
                          <MenuMobileCard
                            key={text}
                            onClick={onClose}
                            bg="#FFF"
                            color="black"
                            text={text}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <Divider sx={{ color: "#EFEFEF" }} />
              </>
            ) : (
              <p className="font-bold px-4 pb-6 pt-4">{user.name}</p>
            )}
            <div className="p-4">
              <div className="flex flex-col gap-[15px]">
                <MenuMobileCard
                  onClick={() => {
                    setIsSettingsShown((prev) => !prev);
                  }}
                  bg="#E0E2F0"
                  color="#2D3AAF"
                  text="My Account"
                  hasIcon={true}
                  toggledArrow={isSettingsShown}
                />

                {isSettingsShown && <SettingsNav onItemClicked={onClose} />}
              </div>
              <button
                className="p-4 text-red-600/100 text-lg"
                onClick={handleLogout}
                test-id="nav_logout"
              >
                <Logout />
                <span className="ml-2"> Log out </span>
              </button>
              <div>
                <Link href="/faqs">
                  <button
                    className="px-4 text-lg"
                    style={{ color: "#454545" }}
                    test-id="nav_faqs"
                  >
                    <HelpOutlineIcon />
                    <span className="ml-2"> FAQs </span>
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs px-2 pb-6 pt-4">
              Sign Up to participate on iCharterBid and have a personalized
              experience!
            </p>
            <div className="p-4">
              <div className="text-[#2D3AAF] rounded-lg h-16 w-[246px] flex justify-between items-center">
                <div className="font-semibold">
                  <PersonOutlineOutlinedIcon />
                  <Link href="/auth/sign-in" test-id="nav_sign-in">
                    <span className="text-lg ml-2">Sign In</span>/
                  </Link>
                  <Link href="/auth/sign-up" test-id="nav_sign-up">
                    <span className="text-lg mr-4">Sign Up</span>
                  </Link>
                </div>
                <ChevronRightIcon fontSize="large" />
              </div>
              <div>
                <Link href="/faqs">
                  <button
                    style={{ color: "#454545" }}
                    className="mt-3"
                    test-id="nav_faqs"
                  >
                    <HelpOutlineIcon />
                    <span className="ml-2"> FAQs </span>
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
