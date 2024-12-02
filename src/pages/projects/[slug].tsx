// pages/projects/[slug].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';

function ProjectSlug() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{slug ? `Проект: ${slug}` : 'Загрузка...'}</title>
        <meta name="description" content={`Проект ${slug}`} />
      </Head>
      <div>{slug ? <h1>Проект: {slug}</h1> : <p>Загрузка...</p>}</div>
    </>
  );
}

export default ProjectSlug;
