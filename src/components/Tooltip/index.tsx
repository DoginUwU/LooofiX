import * as RadixTooltip from '@radix-ui/react-tooltip';
import style from './styles.module.scss';
import { FunctionComponent } from 'preact';

interface TooltipProps extends RadixTooltip.TooltipProps {
  content: string;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ children, content, ...args }) => {
  return (
    <RadixTooltip.Root delayDuration={500} {...args}>
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
