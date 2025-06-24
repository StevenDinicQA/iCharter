import React, { ReactNode } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    display: "flex",
    // width: "343px",
    padding: "15px 20px 15px 18px",
    alignItems: "flex-start",
    gap: "10px",
    borderRadius: "12px",
    border: "1px solid var(--icharter-color, #2D3AAF)",
    background: "#F6F9FC",
    fontSize: '16px',
  },
  cardFalse: {
    display: "flex",
    // width: "343px",
    padding: "15px 20px 15px 18px",
    alignItems: "flex-start",
    gap: "10px",
    borderRadius: "12px",
    border: "1px solid var(--stroke, #EFEFEF)",
    background: "var(--backgrounds, #F9F9F9)",
    fontSize: '14px',
  },
});

interface CardProps {
    children: ReactNode;
    className?: string;
    offlineMode?: boolean;
    customWidth?: string;
}

const NotificationCard: React.FC<CardProps> = ({ children, className, offlineMode, customWidth }) => {
  const classes = useStyles();

  const cardClassName = offlineMode ? classes.cardFalse : classes.card;

  const cardStyles = {
    width: customWidth,
  };

  return <div className={clsx(cardClassName, className)} style={cardStyles}>{children}</div>;
};

export default NotificationCard;