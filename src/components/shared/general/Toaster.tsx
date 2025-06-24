"use client";
import * as React from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          error: {
            style: {
              width: "fit-content",
              border: "1px solid #CF202C",
              padding: "16px",
              backgroundColor: "#FCEEEF",
              color: "#CF202C",
              maxWidth: 800,
            },
          },
          success: {
            style: {
              width: "fit-content",
              border: "1px solid #2D3AAF",
              padding: "16px",
              backgroundColor: "#EFF0F9",
              color: "black",
              maxWidth: 800,
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>{({ message }) => <>{message}</>}</ToastBar>
        )}
      </Toaster>
    </div>
  );
}
