import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  return (
    <aside className={cn(styles.sidebar)}>
      <div className={cn(styles.sidebar__wrapper)}>
        <div className={cn(styles.sidebar__content)}>
          <div className={cn(styles.sidebar__main)}>
            <Link href="/">
              <Image src="logo-white.svg" width={105} height={21} alt="logo" />
            </Link>
          </div>
          <div className={cn(styles.sidebar__projects)}>d</div>
        </div>
      </div>
    </aside>
  );
}
