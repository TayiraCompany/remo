import React from "react";
import { useUser } from "../../../../services/server/account-stats";
import { usePF } from "../../../../services/server/export-profile";
import { useParams } from "react-router-dom";
import Header from "./cc/header";

import style from "./profile.module.css";
import Toolbar from "../../../../components/toolbar";

export default function Profile() {
  const { username } = useParams();
  const { user } = useUser();
  const { pf } = usePF(username);
  return (
    <div>
      <Toolbar user={user} />
      <Header user={user} pf={pf} />
    </div>
  );
}
