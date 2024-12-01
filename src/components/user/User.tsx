import Image from 'next/image';
import cn from 'classnames';
import styles from './User.module.scss';

interface UserProps {
  user_avatar: string;
  user_name: string;
  user_position: string;
}
export default function User({ user_avatar, user_name, user_position }: UserProps) {
  return (
    <div className={cn(styles.user)}>
      <Image
        className={cn(styles.user__avatar)}
        src={user_avatar}
        width={48}
        height={48}
        alt={user_name}
      />
      <div className={cn(styles['user__main-info'])}>
        <h3 className={cn(styles.user__name)}>{user_name}</h3>
        <p className={cn(styles.user__position)}>{user_position}</p>
      </div>
    </div>
  );
}
