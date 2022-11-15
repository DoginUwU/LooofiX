import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Icon } from '@iconify/react';

import style from './styles.module.scss';
import { cx } from '@/utils/cx';
import { forwardRef } from 'react';

interface IProps extends RadixCheckbox.CheckboxProps {
  label: string;
}

const Checkbox = forwardRef<HTMLDivElement, IProps>(({ className, label, id, ...args }, ref) => {
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
})

export default Checkbox;
