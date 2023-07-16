import { cx } from '@/utils/cx';
import { Icon } from '@iconify/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import style from './styles.module.scss';

interface IProps extends RadixCheckbox.CheckboxProps {
  label: string;
}

const Checkbox = ({ className, label, id, ...args }: IProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} id={id}>
      <RadixCheckbox.Root className={cx(style.root, className)} {...args}>
        <RadixCheckbox.Indicator className={style.indicator}>
          <Icon icon="akar-icons:check" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className={style.label} htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
