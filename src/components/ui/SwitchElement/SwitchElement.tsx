import { Switch } from '@headlessui/react';
import React from 'react';
import cn from 'classnames';
import styles from './SwitchElement.module.scss';
//-----------------------------------------------------
interface SwitchElementProps {
  label: string;
  switchChecked: boolean;
  switchOnChange: (checked: boolean) => void;
}
const SwitchElement = ({ label, switchChecked, switchOnChange }: SwitchElementProps) => (
  <div className={cn(styles['switch-element'])}>
    <Switch
      checked={switchChecked}
      onChange={switchOnChange}
      className={cn(styles['switch-container'], { [styles.active]: switchChecked })}
    >
      <span className={cn(styles['switch-thumb'], { [styles.active]: switchChecked })} />
    </Switch>
    <span className={cn(styles['switch-element__text'])}>{label}</span>
  </div>
);

export default SwitchElement;
