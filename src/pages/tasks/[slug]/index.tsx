// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
// import React from 'react';

// const fetchTaskBySlug = async (slug: string): Promise<Project> => ProjectService.getProject(slug);

// const TaskPage = () => {
//   const router = useRouter();
//   const { slug } = router.query;
//   const taskSlug = Array.isArray(slug) ? slug[0] : slug;

//   const {
//     data: task,
//     isLoading,
//     error,
//   } = useQuery<any>({
//     queryKey: ['project', taskSlug],
//     queryFn: () => fetchTaskBySlug(taskSlug),
//   });

//   return (
//     <div>
//       <h1>Динамическая страница</h1>
//       <p>Slug: {slug}</p>
//     </div>
//   );
// };

// export default TaskPage;
