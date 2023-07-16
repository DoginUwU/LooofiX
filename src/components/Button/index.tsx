import { cx } from '@/utils/cx';
import { FunctionalComponent, JSX } from 'preact';
import style from './styles.module.scss';

interface IProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

const Button: FunctionalComponent<IProps> = ({ ...args }) => {
  return <button {...args} className={cx(style.button, args.className)}  />;
}

export default Button;
