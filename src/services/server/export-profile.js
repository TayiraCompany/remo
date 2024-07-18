import axios from "axios";
import { useEffect, useState } from "react";
import { AppName, ServerAPIs, ServerIP } from "./export-server";

function usePF(username) {
  const [pf, setPF] = useState({
    email: "",
    password: "",
    displayname: "",
    username: username,
    PhotoURL: "",
    admin: false,
    banned: false,
    blocked: []
  });

  useEffect(() => {
    async function fetchUserData() {
      if (pf.username) {
        try {
          const response = await axios.post(
            `${ServerIP}/api/database/account/findUser?type=username`,
            {
              username: username,
              projectname: AppName,
            }
          );
          const userData = response.data;

          setPF((prevUser) => ({
            ...prevUser,
            email: userData.user.email,
            password: userData.user.password,
            displayname: userData.user.displayname,
            username: userData.user.username,
            PhotoURL: userData.user.PhotoURL,
            banned: userData.user.banned,
            admin: userData.user.userApplication.administrative,
            blocked: userData.user.userApplication.blocked,
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUserData();
  }, [pf.username]);

  return {
    pf,
  };
}

export { usePF };
