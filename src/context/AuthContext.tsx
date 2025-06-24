"use client";
import User from "@/types/user/User";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiService from "@/services/apiService";
import { LoginResponse } from "@/types/auth/Login";
import { clearCookies, saveAuthCookies } from "@/helpers/auth/cookies";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { mixPannelService } from "@/services/mixpanel-service";

interface IAuthContext {
  isLoggedIn: boolean;
  user: User | null | undefined;
  setUser: Function;
  refetchUser: Function;
  isUserCharter: () => boolean;
  currentScreenTitle: string | null;
  setCurrentScreenTitle: Function;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();
  const [currentScreenTitle, setCurrentScreenTitle] = useState<string | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();

  function setAuthData(authUser?: User | null) {
    setLoading(false);
    setUser(authUser);
    setIsLoggedIn(authUser ? true : false);
  }

  useEffect(() => {
    mixPannelService.trackEvent("page_view", {
      page: pathname.includes("market/listing") ? "/market/listing" : pathname,
    });
  }, [pathname]);

  function redirectUser(): void {
    router.push(`/auth/sign-in?from=${pathname}`);
    toast.success("Your session expired, please login");
  }

  async function initializeUser() {
    setLoading(true);
    let token = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const userEmail = Cookies.get("email");
    const authType = Cookies.get("authType");

    // no session found
    if (!token && !refreshToken) {
      setAuthData();
      clearCookies();
      return;
    }
    apiService.authType = authType;

    // session must be refreshed
    if (!token && refreshToken) {
      const { data: refreshedSessionData, error: refreshSessionError } =
        await apiService.post<LoginResponse>("auth/refreshSession", {
          userName: userEmail,
          refreshToken,
        });

      if (refreshSessionError) {
        setAuthData();
        return;
      }

      saveAuthCookies(refreshedSessionData!);
      token = refreshedSessionData?.accessToken.jwtToken;
    }

    apiService.authToken = token;
    const { error, data } = await apiService.get<User>("auth/me");
    if (error) {
      setAuthData();
      clearCookies();
      redirectUser();
      return;
    }

    if (data && data.userType) {
      Cookies.set("userType", data.userType, { expires: 1 });
    }

    mixPannelService.identifyUser(data!);

    setAuthData(data);
  }

  React.useEffect(() => {
    initializeUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUserCharter = () => {
    return user?.userType === "charter" || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        refetchUser: initializeUser,
        isUserCharter,
        setCurrentScreenTitle,
        currentScreenTitle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
