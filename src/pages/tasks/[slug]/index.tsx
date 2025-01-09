'use client';

import { useRouter } from 'next/router';
import React from 'react';

const TaskPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Динамическая страница</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default TaskPage;
