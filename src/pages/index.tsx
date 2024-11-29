import Head from 'next/head';
import cn from 'classnames';
import styles from '@/styles/Home.module.scss';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function Home() {
  // здесь потом с контекста будем информацию получать, это всё я написал УСЛОВНО для прикола
  const useStore = { isAuthorized: false, isLoading: false };
  const { isAuthorized, isLoading } = useStore;
  const router = useRouter();

  const handleSignClick = (): void => {
    if (isAuthorized) {
      router.push('/projects');
    } else {
      router.push('/auth');
    }
  };
  //----------------------------------------------------
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(styles.page)}>
        <Header
          handleSignClick={handleSignClick}
          isLoading={isLoading}
          isAuthorized={isAuthorized}
        />
        <main className={cn(styles.main)}>
          <div className={cn(styles.main__wrapper)}>
            <h1>Что нибудь попозже придумаем</h1>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
