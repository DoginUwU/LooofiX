import { cx } from '@/utils/cx';
import { Icon } from '@iconify/react';
import { FC, useEffect, useState } from 'react';
import { ITEMS } from './helper';

import style from './styles.module.scss';

interface IProps {
  onTabChange: (tab: JSX.Element) => void;
}

const SettingsSidebar: FC<IProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('general');

  const hasActiveTab = (tab: string) => activeTab === tab;

  const handleTabClick = (tab: string) => () => {
    setActiveTab(tab);
    const component = ITEMS.find(item => item.id === tab)?.component;
    if(!component) return;
    onTabChange(component);
  }

  useEffect(() => {
    onTabChange(ITEMS[0].component);
  }, []);

  return (
    <nav className={style.sidebar}>
      {ITEMS.map((item) => (
        <div
          key={item.id}
          onClick={handleTabClick(item.id)}
          className={cx(style.item, { [style.itemActive]: hasActiveTab(item.id), [style.bottom]: item.bottom })}
        >
          <div className={style.itemIcon}>
            <Icon icon={item.icon} />
          </div>
          <span>{item.title}</span>
        </div>
      ))}
    </nav>
  )
}

export default SettingsSidebar;
