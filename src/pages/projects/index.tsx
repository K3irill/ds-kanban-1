'use client';

import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import Breadcrumb from '@/components/ui/Navigations/Breadcrumb/Breadcrumb';
import ProjectCard from '@/components/projectCard/projectCard';
import { IProjectData } from '@/types/project.type';
import styles from './Projects.module.scss';

const fetchProjects = async (): Promise<Projects> => ProjectService.getListProjects();
export default function ProjectPage() {
  const [projects, setProjects] = useState<IProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectList = await ProjectService.getProjects();
        setProjects(projectList);
      } catch (err) {
        setError('Ошибка загрузки проектов');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const favoriteProjects = projects.filter((project) => project.is_favorite);
  const otherProjects = projects.filter((project) => !project.is_favorite);

  return (
    <>
      <Head>
        <title>Проекты</title>
        <meta name="description" content="Список проектов" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={cn(styles['project-page'])}>
        <div>
          <Sidebar />
        </div>

        <div className={cn(styles.projects)}>
          <div className={cn(styles.projects__breadcrumb)}>
            <ul>
              <li>
                <Breadcrumb href="/" isFirst>
                  Главная
                </Breadcrumb>
              </li>
              <li>
                <Breadcrumb href="/projects" isActive>
                  Проекты
                </Breadcrumb>
              </li>
            </ul>
          </div>
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

            {isLoading && <p>Загрузка...</p>}

            {error && <p className={cn(styles['error-message'])}>{error}</p>}

            {!isLoading && !error && (
              <>
                {favoriteProjects.length > 0 && (
                  <div className={cn(styles['projects__projects-section-favorite '])}>
                    <h2>Избранное</h2>
                    <div className={cn(styles['projects__projects-section '])}>
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
                    <hr className={cn(styles['projects__hr-line '])} />
                  </div>
                )}

                {otherProjects.length > 0 ? (
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
                ) : (
                  <p>Нет данных</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
