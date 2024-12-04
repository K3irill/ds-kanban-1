import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import User from '@/components/user/User';
import { useState } from 'react';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/store';

import styles from './Sidebar.module.scss';

// ------------------------------------------------------------
/* eslint-disable jsx-a11y/control-has-associated-label */

export default function Sidebar() {
  const { logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  // useEffect(() => {
  //   console.log(user);
  // });

  const handleLogoutBtn = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className={cn(styles.sidebar, { [styles['sidebar--open']]: isOpen })}>
      <div className={cn(styles.sidebar__wrapper)}>
        <div className={cn(styles.sidebar__content)}>
          <div className={cn(styles.sidebar__main)}>
            <div
              className={cn(styles.sidebar__interactive, {
                [styles['sidebar__interactive--open']]: isOpen,
              })}
            >
              {isOpen && (
                <Link href="/">
                  <Image src="/logo-white.svg" width={105} height={21} alt="logo" />
                </Link>
              )}

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(styles['sidebar__switch-btn'])}
                type="button"
              >
                <svg className="social-icon" viewBox="0 0 16 16" width="16" height="16">
                  <use href={`/sprite.svg#sidebar${isOpen ? 'Close' : 'Open'}`} />
                </svg>
              </button>
            </div>
            {isOpen && (
              <div className={cn(styles['sidebar__user-info'])}>
                <User
                  user_avatar={user?.avatar || '/avatar-test.jpg'}
                  user_name={`${user?.name} ${user?.surname}`}
                  user_position={user?.position || `1`}
                />
                <button
                  onClick={handleLogoutBtn}
                  type="button"
                  className={styles['sidebar__signout-btn']}
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
          <div
            className={cn(styles.sidebar__links, {
              [styles['sidebar__links--open']]: isOpen,
            })}
          >
            <hr className={cn(styles['sidebar__hr-line'])} />

            <ul className={cn(styles.sidebar__links_list)}>
              <li className={cn(styles.sidebar__links_item)}>
                <Link href="/projects">
                  <svg className="social-icon" viewBox="0 0 18 18" width="18" height="18">
                    <use href="/sprite.svg#project" />
                  </svg>
                  {isOpen && <span>Проекты</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
