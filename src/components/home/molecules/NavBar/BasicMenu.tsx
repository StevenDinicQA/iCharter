import * as React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "next/link";
import { DownArrowIcon } from "@/components/shared/general/atoms/icons/DownArrowIcon";
import { Logout } from "@mui/icons-material";

interface MenuProps {
  handleLogout: () => void;
  user?: {
    name: string;
    userType: string;
  };
  dashboard?: boolean;
  customMenuStyles?: object;
  isHomePage?: boolean;
  isMarketPage?: boolean;
}

const BasicMenu: React.FC<MenuProps> = ({ handleLogout, user, dashboard, customMenuStyles = {}, isHomePage, isMarketPage }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        test-id="nav_down_arrow"
        className="hidden lg:flex w-[46px] h-[46px] absolute right-0 justify-end items-center"
      >
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{...{
          left: "-16px",
          top: "8px",
        }}}
      >
        <div className="w-[278px] flex flex-col justify-start py-4 items-center">
            <div
              onClick={handleClose}
              className="rounded-[11px] h-14 w-[240px] pl-4"
              style={{ background: "#F5F5F5" }}
              test-id="nav_my-account"
            >
              <Link href="/home/settings/profile" className="flex items-center pl-2 py-4 rounded-[11px] h-14 w-[240px]">
                <div className="pl-[1px]">
                  <PersonOutlineOutlinedIcon/>
                </div>
                <div>
                  <span className="ml-2"> My Account </span>
                </div>
              </Link>
            </div>
          <div
            className="text-red-600/100 h-14 w-[240px] flex items-center pl-6 cursor-pointer"
            onClick={handleLogout}
            test-id="nav_logout"
          >
            <div>
              <Logout className="ml-1"/>
            </div>
            <div>
              <span className="ml-2 justify-self-start"> Log out </span>
            </div>
          </div>
            <div
              className="h-14 w-[278px] border-t-[1px] border-[#EFEFEF] self-start pl-[34px]"
              style={{ color: "#454545" }}
              test-id="nav_faqs"
            >
            <Link href="/faqs" className="flex items-center pl-2 py-4 rounded-[11px] h-14 w-[240px]">
              <div className="pl-1">
                <HelpOutlineIcon/>
              </div>
              <div>
                <span className="ml-2"> FAQs </span>
              </div>         
            </Link>   
            </div>
        </div>
      </Menu>
    </>
  );
};

export default BasicMenu;
