import { FunctionalComponent } from 'preact';
import style from './styles.module.scss';
import { PropsWithChildren } from 'preact/compat';

interface IProps {
  title: string;
}

const SettingsContainer: FunctionalComponent<PropsWithChildren<IProps>> = ({ children, title }) => {
  return (
    <div className={style.container}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default SettingsContainer;
