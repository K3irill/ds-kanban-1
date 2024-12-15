import React from 'react';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

import TaskColumn from '@/components/task/TaskColumn/TaskColumn';
import TaskCard from '@/components/task/TaskCard/TaskCard';
import useAuthStore from '@/store/store';
import { useRouter } from 'next/router';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';

export default function Home() {
  const { logout, isAuthorized } = useAuthStore();
  const router = useRouter();
  const { user } = useAuthStore();
  const handleSignClick = (): void => {
    logout();
    router.push('/login');
  };

  return (
    <div className={styles.page}>
      <Header handleSignClick={handleSignClick} isAuthorized={isAuthorized} />
      <main className={styles.main}>
        <div className={styles.main__wrapper}>
          <TaskColumn forMain scrollDirection="up">
            {Array.from({ length: 30 }).map((task, index) => (
              <TaskCard
                key={index}
                id={index}
                priority={{ name: 'Высокий', id: 1 }}
                name="Особо важная задача"
                users={[]}
                task_type={{ name: 'Задача', id: 2 }}
                epic={undefined}
                task_component={{ name: 'Фронтенд', id: 7, color: '#32C997' }}
              />
            ))}
          </TaskColumn>
          <div className={styles.main__info}>
            <h1>
              Приветствуем, <span>{user ? `${user.name} ${user.surname}` : 'Гость'}</span>!
            </h1>
            <h2>Время не ждет, а задачи сами себя не сделают. Начнём?</h2>
            <StandardButton onClick={() => router.push('projects')}>К проектам</StandardButton>
          </div>

          <TaskColumn forMain scrollDirection="down">
            {Array.from({ length: 30 }).map((task, index) => (
              <TaskCard
                key={index}
                id={index}
                priority={{ name: 'Средний', id: 2 }}
                name="Задача дня"
                users={[]}
                task_type={{ name: 'Задача', id: 2 }}
                epic={undefined}
                task_component={{ name: 'Разработка', id: 3, color: '#3787EB' }}
              />
            ))}
          </TaskColumn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
