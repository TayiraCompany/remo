import axios from "axios";
import { useEffect, useState } from 'react'
import { AppName, ServerAPIs, ServerIP } from "./export-server";
function CreateAccountValidator(email, password, cpassword) {
  const BlockedEmailCharacters = [
    "!",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "{",
    "}",
    "-",
    "+",
    "/",
  ];

  if (password !== cpassword) {
    return "Passwords do not match!";
  } else if (password.length < 8) {
    return "Password length is less than 8 characters";
  } else if (password.length > 63) {
    return "Password length is more than 63 characters";
  } else if (BlockedEmailCharacters.some((char) => email.includes(char))) {
    return "Email includes blocked characters, please check your email.";
  }
  return null;
}
async function CreateAccountMethod(email, password, displayname) {
  try {
    const response = await axios.post(
      `${ServerIP}${ServerAPIs.CreateAccountAPI}`,
      {
        email: email,
        displayname: displayname,
        password: password,
        PhotoURL:
          "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png",
        username: displayname,
        projectname: AppName,
      }
    );
    localStorage.setItem("e.m.l", email)
    return `Account created successfully! Response: ${response.data}`;
  } catch (error) {
    console.error("Error", error);
    return `Failed to create account. Error: ${error.message}`;
  }
}
async function LoginAccountMethod(email, password) {
  try {
    const response = await axios.post(
      `${ServerIP}${ServerAPIs.LoginAccountAPI}`,
      {
        email: email,
        password: password,
        projectname: AppName,
      }
    );
    localStorage.setItem("e.m.l", email)
    return `Account Login successfully! Response: ${response.data}`;
  } catch (error) {
    console.error("Error", error);
    return `Failed to Login to Your Account Error: ${error.message}`;
  }
};

function useUser() {
  const [user, setUser] = useState({
    email: localStorage.getItem("e.m.l") || "",
    password: "",
    displayname: "",
    username: "",
    PhotoURL: "",
    chatId: "",
    admin: false,
    friends: [],
    pfriends: [],
    follow: [],
    whoSendFriendFisrt: [],
    blocked: [],
  });

  useEffect(() => {
    async function fetchUserData() {
      if (user.email) {
        try {
          console.log(`Fetching user data for email: ${user.email}`);
          const response = await axios.get(
            `${ServerIP}/admin/root/app/db/accounts/${AppName}/(${user.email})/data/userData.json`
          );

          const userData = response.data;
          console.log('Fetched user data:', userData);

          if (userData) {
            setUser((prevUser) => ({
              ...prevUser,
              email: userData.email,
              password: userData.password,
              displayname: userData.displayname,
              username: userData.username,
              PhotoURL: userData.PhotoURL,
              admin: userData.userApplication.administrative,
              friends: userData.userApplication.friends,
              pfriends: userData.userApplication.pendingFriends,
              follow: userData.userApplication.followingUser,
              whoSendFriendFisrt: userData.userApplication.whoSendFriendFirst,
              blocked: userData.userApplication.blocked,
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUserData();
  }, [user.email]);

  return {
    user,
  };
}

export { CreateAccountValidator, CreateAccountMethod, LoginAccountMethod, useUser };
