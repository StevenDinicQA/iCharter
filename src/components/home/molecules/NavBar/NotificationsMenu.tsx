import * as React from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import NotificationCard from "@/components/CustomCards/NotificationCard";
import { BellIcon } from "@/components/shared/general/atoms/icons/BellIcon";

interface NotificationsMenuProps {
  dashboard?: boolean;
}

const useStyles = makeStyles({
  popover: {
    marginTop: "8px",
  },
});

export default function NotificationsMenu({
  dashboard,
}: NotificationsMenuProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/*
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        test-id="nav_notifications"
      >
        <BellIcon size={28} />
      </IconButton>
      */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.popover }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          left: dashboard ? "-258px" : "-400px",
          top: "2px",
        }}
      >
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start gap-5 w-[567px] h-500">
          <div className="">
            <p className="font-bold text-xl">Notifications</p>
          </div>
          <NotificationCard customWidth="515px" offlineMode={true}>
            <div className="flex flex-col">
              <p>
                Your iCharterBid for <b>Musical Boat Ride</b> has been{" "}
                <b>accepted</b> by the charter. Click here to continue with
                checkout
              </p>
              <p className="text-right mt-3" style={{ color: "#BDBDBD" }}>
                10 minutes ago
              </p>
            </div>
          </NotificationCard>
          <NotificationCard customWidth="515px">
            <div className="flex flex-col">
              <p>
                Your iCharterBid for <b>Musical Boat Ride</b> has been{" "}
                <b>declined</b> by the charter
              </p>
              <p className="text-right mt-3" style={{ color: "#BDBDBD" }}>
                10 minutes ago
              </p>
            </div>
          </NotificationCard>
          <NotificationCard customWidth="515px">
            <div className="flex flex-col">
              <p>
                Your iCharterBid for <b>Catch that fish of a lifetime</b>{" "}
                experience for <b>May 27, 2023</b> has been <b>accepted</b> by{" "}
                <b>Musical Boat Ride</b>
              </p>
              <p className="text-right mt-3" style={{ color: "#BDBDBD" }}>
                10 minutes ago
              </p>
            </div>
          </NotificationCard>
        </div>
      </Popover>
    </div>
  );
}
