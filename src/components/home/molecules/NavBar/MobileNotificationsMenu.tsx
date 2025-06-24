import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import NotificationCard from '@/components/CustomCards/NotificationCard'
import Drawer from "@mui/material/Drawer";

interface MobileNotificationsMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileNotificationsMenu: React.FC<MobileNotificationsMenuProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#F9F9F9',
        },
      }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        },
      }}
    >
      <Box className="w-screen px-4 pt-10">
        <div className="flex justify-between mb-10">
          <p className="font-bold text-xl">Notifications</p>  
          <CloseIcon fontSize="large" onClick={onClose} />
        </div>
        <NotificationCard className="mt-5" offlineMode={true}>
          <div className="flex flex-col">
            <p>Your iCharterBid for <b>Musical Boat Ride</b> has been <b>accepted</b> by the charter. Click here to continue with checkout</p>
            <p className="text-right mt-3" style={{color: '#BDBDBD'}}>10 minutes ago</p>
          </div>
        </NotificationCard>
        <NotificationCard className="mt-5">
          <div className="flex flex-col">
            <p>Your iCharterBid for <b>Musical Boat Ride</b> has been <b>declined</b> by the charter</p>
            <p className="text-right mt-3" style={{color: '#BDBDBD'}}>10 minutes ago</p>
          </div>
        </NotificationCard>
        <NotificationCard className="mt-5">
          <div className="flex flex-col">
            <p>Your iCharterBid for <b>Catch that fish of a lifetime</b> experience for <b>May 27, 2023</b> has been <b>accepted</b> by <b>Musical Boat Ride</b></p>
            <p className="text-right mt-3" style={{color: '#BDBDBD'}}>10 minutes ago</p>
          </div>
        </NotificationCard>
      </Box>
    </Drawer>
  );
};

export default MobileNotificationsMenu;