import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
// import {  } from '../../../../../services/server/chat-server'

import style from '../Chat.module.css';

export default function Header({ user, pf }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <header className={style["chat-header"]}>
            {isMobile ? (
                <>
                    <div className={style["profile-info"]}>
                        <img
                            className={style["profile-img"]}
                            src={pf.PhotoURL}
                            alt="Profile"
                            onClick={(e) => { window.location.href = `/profile/${pf.username}` }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className={style["profile-info"]}>
                        <img
                            className={style["profile-img"]}
                            src={pf.PhotoURL}
                            alt="Profile"
                            onClick={(e) => { window.location.href = `/profile/${pf.username}` }}
                        />
                        <div className={style["profile-details"]}>
                            <h3 className={style["profile-username"]}>{pf.username}</h3>
                            <p className={style["profile-status"]}>{pf.status}</p>
                        </div>

                    </div>
                </>
            )}

            <div className={style["header-actions"]}>
                {isMobile ? (
                    <>
                        <Link to="#" className={`btn btn-primary ${style["btn-chat"]}`}>
                            <i className="bi bi-phone"></i>
                        </Link>
                        <Button
                            variant="secondary"
                            className={style["btn-video-call"]}
                            onClick={() => {
                            }}
                        >
                            <i className="bi bi-camera-video"></i>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="primary"
                            className={style["btn-video-call"]}
                            onClick={() => {
                            }}
                        >
                            <i className="bi bi-phone"></i> Call
                        </Button>
                        <Button
                            variant="secondary"
                            className={style["btn-video-call"]}
                            onClick={() => {
                            }}
                        >
                            <i className="bi bi-camera-video"></i> Video Call
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}