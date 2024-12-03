'use client';

import React from 'react';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Projects } from '@/types/project.type';
import ProjectCard from '@/components/projectCard/projectCard';
import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import Loader from '@/components/ui/Loader/loader';
import styles from './ProjectsPage.module.scss';

const fetchProjects = async (): Promise<Projects> => ProjectService.getListProjects();

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    error,
  }: UseQueryResult<Projects, Error> = useQuery<Projects>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const favoriteProjects = projects?.filter((project) => project.is_favorite) || [];
  const otherProjects = projects?.filter((project) => !project.is_favorite) || [];

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты', isActive: true },
  ];

  return (
    <>
      <Head>
        <title>Проекты</title>
        <meta name="description" content="Список проектов" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectLayout breadcrumbs={breadcrumbs}>
        <div className={cn(styles.projects__header)}>
          <h1>Проекты</h1>
        </div>

        <div className={cn(styles['projects__projects-wrapper'])}>
          <div className={cn(styles['projects__projects-activities'])}>
            <div className={cn(styles['projects__inputs-container'])}>
              <div className={cn(styles['projects__inputs-wrapper'])}>
                <label htmlFor="project-name">
                  <span>Название проекта</span>
                  <input
                    id="project-name"
                    style={{ background: 'var(--blue-light-background)' }}
                    type="text"
                  />
                </label>
              </div>
              <div className={cn(styles['projects__inputs-wrapper'])}>
                <label htmlFor="project-number">
                  <span>Номер задачи</span>
                  <input
                    id="project-number"
                    style={{ background: 'var(--blue-light-background)' }}
                    type="text"
                  />
                </label>
              </div>
            </div>
            <label htmlFor="archive-projects">
              <input type="checkbox" name="archive-projects" id="archive-projects" />
              Показать архивные проекты
            </label>
          </div>

          {isLoading && (
            <div className={cn('loader-container')}>
              <Loader />
            </div>
          )}

          {error && <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>}

          {!isLoading && !error && (
            <>
              {favoriteProjects.length > 0 && (
                <div className={cn(styles['projects__projects-section-favorite'])}>
                  <h2>Избранное</h2>
                  <div className={cn(styles['projects__projects-section'])}>
                    {favoriteProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        slug={project.slug}
                        logo={project.logo}
                        name={project.name}
                        count={project.user_count}
                        isFavorite={project.is_favorite}
                      />
                    ))}
                  </div>
                  <hr className={cn(styles['projects__hr-line'])} />
                </div>
              )}

              {otherProjects.length > 0 && (
                <div className={cn(styles['projects__projects-section'])}>
                  {otherProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      slug={project.slug}
                      logo={project.logo}
                      name={project.name}
                      count={project.user_count}
                      isFavorite={project.is_favorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </ProjectLayout>
    </>
  );
}
