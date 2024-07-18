import axios from "axios";
import { ServerIP, AppName } from "./export-server";

async function sendFriendRequest(email, pfemail) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/sendFriendRequest`, {
      projectname: AppName,
      senderEmail: email,
      receiverEmail: pfemail,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send friend request:", error);
    throw new Error("Failed to send friend request");
  }
}

async function acceptFriendRequest(pf, user) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/acceptFriendRequest`, {
      projectname: AppName,
      senderEmail: pf,
      receiverEmail: user,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to accept friend request:", error);
    throw new Error("Failed to accept friend request");
  }
}

async function rejectFriendRequest(pf, user) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/rejectFriendRequest`, {
      projectname: AppName,
      senderEmail: pf,
      receiverEmail: user,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to reject friend request:", error);
    throw new Error("Failed to reject friend request");
  }
}

async function removeFriend(pf, user) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/removeFriend`, {
      projectname: AppName,
      userEmail: user,
      friendEmail: pf,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove friend:", error);
    throw new Error("Failed to remove friend");
  }
}

async function IfPendingFriend(user) {
  try {
    const userPf = user.pfriends || [];
    if (userPf.length === 0) {
      return "Don't Have Friends Request";
    }
    return `You Have ${userPf.length} Pending Friend${userPf.length > 1 ? "s" : ""}`;
  } catch (error) {
    console.error("Failed to check pending friends:", error);
    throw new Error("Failed to check pending friends");
  }
}

async function IfFriend(user, email) {
  try {
    const userFriends = user.friends || [];
    return userFriends.includes(email);
  } catch (error) {
    console.error("Failed to check if friend:", error);
    throw new Error("Failed to check if friend");
  }
}

async function blockFriend(userEmail, friendEmail) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/blockFriend`, {
      userEmail,
      friendEmail,
      projectname: AppName,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to block friend:", error);
    throw new Error("Failed to block friend");
  }
}

async function unblockFriend(userEmail, friendEmail) {
  try {
    const response = await axios.post(`${ServerIP}/api/database/account/unblockFriend`, {
      userEmail,
      friendEmail,
      projectname: AppName,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to unblock friend:", error);
    throw new Error("Failed to unblock friend");
  }
}

async function IfblockFriend(user, email) {
  try {
    const userFriends = user.blocked || [];
    userFriends.includes(email)
    return true;
  } catch (error) {
    console.error("Failed to check if blockedfriend:", error);
    throw new Error("Failed to check if blockedfriend");
  }
}

async function Follow(user, acc) {
  try {
    const Type = user.follow.includes(acc.username) ? "" : "push";
    const response = await axios.post(
      `${ServerIP}/api/database/account/update`,
      {
        e: user.email,
        Type,
        method: "insertFollowingUser",
        data: acc.username,
        projname: AppName,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Follow:", error);
    throw new Error("Failed to Follow");
  }
}


async function IfFollow(user, pf) {
  try {
    const userPf = user.follow || [];
    return userPf.includes(pf.username) ? "unFollow" : "Follow";
  } catch (error) {
    console.error("Failed to check follow status:", error);
    throw new Error("Failed to check follow status");
  }
}


export {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  IfPendingFriend,
  IfFriend,
  blockFriend,
  unblockFriend,
  IfblockFriend,
  Follow,
  IfFollow
};
