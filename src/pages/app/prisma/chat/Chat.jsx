import React from "react";
import { useUser } from "../../../../services/server/account-stats";
import { usePF } from "../../../../services/server/export-profile";
import { useParams } from "react-router-dom";

import style from "./Chat.module.css";
import Toolbar from "../../../../components/toolbar";
import Header from "./abc/Header";
import Footer from "./abc/Footer";
import Main from "./abc/Main";

export default function Chat() {
  const { username } = useParams();
  const { user } = useUser();
  const { pf } = usePF(username);
  return (
    <div>
      <Toolbar user={user} />
      <Header user={user} pf={pf} />
      <Main user={user} pf={pf} />
      <Footer user={user} pf={pf} />
    </div>
  );
}
