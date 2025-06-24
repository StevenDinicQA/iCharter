// import apiService from "@/services/apiService";
// import { FBLoginResponse } from "@/types/auth/Login";
// import { saveFbCookies } from "./cookies";
// import User from "@/types/user/User";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// declare module global {
//   var FB: {
//     login(callback: (response: FBLoginResponse) => void): void;
//     api(endpoint: string, callback: (response: any) => void): void;
//   };
// }

// export const handleFacebookAuth = (
//   setUser: Function,
//   router: AppRouterInstance,
//   userType = "customer"
// ) => {
//   global.FB.login((response) => {
//     const data = response.authResponse;
//     if (!data) return;
//     saveFbCookies(response);
//     apiService.authType = "facebook";
//     apiService.authToken = data.accessToken;
//     apiService.get<User>(`auth/me`).then((data) => {
//       if (data.data) {
//         setUser(data.data);
//         router.replace("/");
//         return;
//       }
//     });

//     // if we get to this point, user does not exists on db, so we must create
//     // its reference
//     global.FB.api("/me?fields=email,name", (userRes) => {
//       apiService
//         .post<User>(`users/create`, {
//           id: userRes.id,
//           name: userRes.name,
//           email: userRes.email,
//           isFacebookUser: true,
//           userType,
//         })
//         .then((createdUserRes) => {
//           const user = createdUserRes.data;
//           if (user) {
//             setUser(user);
//             router.replace("/");
//           }
//         });
//     });
//   });
// };
