import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import style from './styles.module.scss';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <RadixTooltip.Root delayDuration={500}>
      <RadixTooltip.Trigger  asChild>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={style.tooltip} align={'start'} sideOffset={4}>
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

export default Tooltip;
