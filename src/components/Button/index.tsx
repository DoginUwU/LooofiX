import React from 'react';

import { cx } from '@/utils/cx';

import style from './styles.module.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: React.FC<IProps> = ({ ...args }) => {
  return <button {...args} className={cx(style.button, args.className)}  />;
}

export default Button;
