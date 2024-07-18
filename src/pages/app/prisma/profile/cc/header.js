import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "../profile.module.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  IfPendingFriend,
  IfFriend,
  Follow,
  IfFollow,
  blockFriend,
  IfblockFriend
} from '../../../../../services/server/user-actions';
import { banUser } from '../../../../../services/server/admin-actions'

export default function Header({ user, pf }) {
  const [friend, setFriend] = useState(pf.friends);
  const [banned, setBanned] = useState(pf.banned);
  const [hasPendingFriends, setHasPendingFriends] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [followStatus, setFollowStatus] = useState("Follow");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const hasPending = await IfPendingFriend(user);
        const friendStatus = await IfFriend(user, pf.email);
        const blockedfriendStatus = await IfblockFriend(user, pf.email);
        const followStatus = await IfFollow(user, pf);

        if (pf.banned === false) {
          setBanned(false);
        } else if (pf.banned === true) {
          setBanned(true);
        }

        setIsFriend(friendStatus);
        setFollowStatus(followStatus);

        if (blockedfriendStatus === true) {
          setIsBlocked(true);
        } else if (blockedfriendStatus === false) {
          setIsBlocked(false);
        }

        if (hasPending === "Don't Have Friends Request") {
          setHasPendingFriends(false);
          setIsPending(false);
          setHasRequested(false);
        } else {
          setHasPendingFriends(true);
          setIsPending(user.pendingFriends.includes(pf.username));
          setHasRequested(pf.pendingFriends.includes(user.username));
        }


      } catch (error) {
        console.error("Failed to check status", error);
      }
    };

    checkStatus();
  }, [user, pf]);

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(user.email, pf.email);
      window.location.reload();
      setIsPending(true);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptFriendRequest = async (forceAccept = false) => {
    try {
      if (forceAccept) {
        await acceptFriendRequest(user.email, pf.email);
        window.location.reload();
      } else {
        await acceptFriendRequest(pf.email, user.email);
        window.location.reload();
      }
      setIsFriend(true);
      setIsPending(false);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      await rejectFriendRequest(pf.email, user.email);
      window.location.reload();
      setIsPending(false);
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(user.email, pf.email);
      window.location.reload();
      setIsFriend(false);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };


  const handleFollow = async () => {
    try {
      await Follow(user, pf);
      const followStatus = await IfFollow(user, pf);
      window.location.reload();
      setFollowStatus(followStatus);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  const ChatNow = async (url) => {
    try {
      window.location.href = `/chat/${pf.username}`;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const showModalConfirmation = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (modalAction === "RemoveFriend") {
      await handleRemoveFriend();
    }
    setShowModal(false);
  };

  const banUserF = async () => {
    if (user.admin === true) {
      if (pf.banned !== true) {
        await banUser(true,pf.email);
      } else if (pf.banned !== false) {
        await banUser(false, pf.email);
      }
    } else if (user.admin === false) {
      console.log("Bro You Not a Admin !! ;)");
    }
  }

  return (
    <header className={style["p-header"]}>
      <div className={style["profile-info"]}>
        <img className={style["profile-img"]} src={pf.PhotoURL} alt="Profile" />
        <div className={style["profile-details"]}>
          <h1 className={style["profile-username"]} title={pf.displayname}>{pf.displayname}</h1>
          {pf.admin === true && (
            <div className="badge badge-dark">Adminstrator</div>
          )}
          {user.admin === true && (
            <div className="badge badge-dark">Adminstrator</div>
          )}
          <div className={style["profile-actions"]}>
            {isMobile ? (
              <>
                <button className={`btn-theme2 btn-dark ${style["menu-button"]}`} onClick={() => setMenuOpen(!menuOpen)}>
                  <i className="bi bi-list"></i>
                </button>
                {menuOpen && (
                  <div className={style["menu"]}>
                    {user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme3 btn-tertiary"
                        onClick={handleFollow}
                      >
                        <i className="bi bi-person-check-fill"></i> {followStatus}
                      </Link>
                    )}

                    {!isFriend && user.username !== pf.username && !isPending && !hasRequested && !hasPendingFriends && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme2 btn-dark"
                        onClick={handleSendFriendRequest}
                        title="Add Friend"
                      >
                        <i className="bi bi-person-plus-fill" ></i> Add Friend
                      </Link>
                    )}

                    {hasPendingFriends && user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        title="Accept Friend"
                        className="btn-theme2 btn-success"
                        onClick={() => handleAcceptFriendRequest(0)}
                      >
                        <i className="bi bi-person-check-fill" ></i> Accept Friend
                      </Link>
                    )}

                    {!hasPendingFriends && user.admin && !isFriend && user.username !== pf.username && (
                      <Link
                        title="Admin ? Force AcceptFriend : 'Accept Friend'"
                        to="javascript:void(0);"
                        className="btn-theme2 btn-success"
                        onClick={() => handleAcceptFriendRequest(true)}
                      >
                        <i className="bi bi-person-check-fill"></i> Force Accept Friend
                      </Link>
                    )}

                    {hasPendingFriends && user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme2 btn-danger"
                        onClick={handleRejectFriendRequest}
                      >
                        <i className="bi bi-person-x-fill"></i> Reject Friend
                      </Link>
                    )}

                    {!hasPendingFriends && user.admin && !isFriend && user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme2 btn-danger"
                        onClick={handleRejectFriendRequest}
                        title="Admin ? Force RejectFriend : 'Reject Friend'"
                      >
                        <i className="bi bi-person-x-fill"></i> Force Reject Friend
                      </Link>
                    )}

                    {isFriend && user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme2 btn-danger"
                        onClick={() => showModalConfirmation("RemoveFriend")}
                        title="Remove Friend"
                      >
                        <i className="bi bi-person-dash-fill"></i> Remove Friend
                      </Link>
                    )}

                    {isFriend && user.username !== pf.username && (
                      <Link
                        to="javascript:void(0);"
                        className="btn-theme2 btn-dark"
                        onClick={ChatNow}
                        title={`SEND ${pf.username}! `}
                      >
                        <i className="bi bi-chat-fill"></i> SEND!
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {user.username !== pf.username && <Link
                  to="javascript:void(0);"
                  className="btn-theme3 btn-tertiary"
                  onClick={handleFollow}
                >
                  <i className="bi bi-person-check-fill"></i> {followStatus}
                </Link>}

                {!isFriend && user.username !== pf.username && !isPending && !hasRequested && !hasPendingFriends && (
                  <Link
                    to="javascript:void(0);"
                    className="btn-theme2 btn-dark"
                    onClick={handleSendFriendRequest}
                    title="Add Friend"
                  >
                    <i className="bi bi-person-plus-fill" ></i> Add Friend
                  </Link>
                )}

                {hasPendingFriends && user.username !== pf.username && (
                  <Link
                    to="javascript:void(0);"
                    title="Accept Friend"
                    className="btn-theme2 btn-success"
                    onClick={() => handleAcceptFriendRequest(0)}
                  >
                    <i className="bi bi-person-check-fill" ></i> Accept Friend
                  </Link>
                )}

                {!hasPendingFriends && user.admin && !isFriend && user.username !== pf.username && (
                  <Link
                    title="Admin ? Force AcceptFriend : 'Accept Friend'"
                    to="javascript:void(0);"
                    className="btn-theme2 btn-success"
                    onClick={() => handleAcceptFriendRequest(true)}
                  >
                    <i className="bi bi-person-check-fill"></i> Force Accept Friend
                  </Link>
                )}

                {hasPendingFriends && user.username !== pf.username && (
                  <Link
                    to="javascript:void(0);"
                    className="btn-theme2 btn-danger"
                    onClick={handleRejectFriendRequest}
                  >
                    <i className="bi bi-person-x-fill"></i> Reject Friend
                  </Link>
                )}

                {!hasPendingFriends && user.admin && !isFriend && user.username !== pf.username && (
                  <Link
                    to="javascript:void(0);"
                    className="btn-theme2 btn-danger"
                    onClick={handleRejectFriendRequest}
                    title="Admin ? Force RejectFriend : 'Reject Friend'"
                  >
                    <i className="bi bi-person-x-fill"></i> Force Reject Friend
                  </Link>
                )}

                {isFriend && user.username !== pf.username && (
                  <Link
                    to="javascript:void(0);"
                    className="btn-theme2 btn-danger"
                    onClick={() => showModalConfirmation("RemoveFriend")}
                    title="Remove Friend"
                  >
                    <i className="bi bi-person-dash-fill"></i> Remove Friend
                  </Link>
                )}

                {isFriend && user.username !== pf.username && (
                  <Link
                    to="javascript:void(0);"
                    className="btn-theme2 btn-dark"
                    onClick={ChatNow}
                    title={`SEND ${pf.username}! `}
                  >
                    <i className="bi bi-chat-fill"></i> SEND!
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {user.admin && (
        <div className={style["admin-actions"]}>
          <div className={style["action-section"]}>
            {user.username !== pf.username && (
              <Link
                to="javascript:void(0);"
                className="btn-theme2 btn-danger"
                onClick={banUserF}
              >
                <i className={`bi ${banned ? "bi-check-circle-fill" : "bi-ban-fill"}`}></i>
                {banned ? "Unban User" : "Ban User"}
              </Link>
            )}
            {user.username !== pf.username && (
              <Link
                to="javascript:void(0);"
                className="btn-theme3 btn-tertiary"
              >
                <i className="bi bi-cloud-download-fill"></i> Get Data
              </Link>
            )}
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {modalAction === "RemoveFriend" ? "remove this friend" : "block this user"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}
