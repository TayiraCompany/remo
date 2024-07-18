import React from 'react';
import { AccountChecker } from '../services/server/account.checker';
import { useUser } from '../services/server/account-stats';
import style from '../styles/Home.module.css';

// COMPONENTS ::
import ToolBar from '../components/toolbar';

export default function Home() {
  const { user } = useUser();
  AccountChecker("/Register&LoginForm");
  return (
    <div className={style.Home}>
      <ToolBar user={user} style={style} />
    </div>
  )
}
