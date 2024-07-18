import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/Home.module.css";

export default function Toolbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.ToolBar}>
      {/* MOBILE Design */}
      <div className={styles["mobile-design"]}>
        <button
          className={styles["menu-toggle"]}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      <ul className={`${styles["items-ul"]} ${menuOpen ? styles["open"] : ""}`}>
        <Link to={"/"}>
          <li className={styles["items-li"]}>
            <i className="bi bi-house-door-fill"></i>
          </li>
        </Link>

        <Link to={`/profile/${user.username}`}>
          <li className={styles["items-li"]}>
            <img
              src={user.PhotoURL}
              width={32}
              height={32}
              alt="Avatar"
              className={styles.avatar}
            />
          </li>
        </Link>

        <Link to={"/chat"}>
          <li className={styles["items-li"]}>
            <i className="bi bi-chat-fill"></i>
          </li>
        </Link>

        <Link to={"/settings"}>
          <li className={styles["items-li"]}>
            <i className="bi bi-gear-fill"></i>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
