import React, { PropsWithChildren } from 'react';

import style from './styles.module.scss';

interface IProps {
  title: string;
}

const SettingsContainer: React.FC<PropsWithChildren<IProps>> = ({ children, title }) => {
  return (
    <div className={style.container}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default SettingsContainer;
