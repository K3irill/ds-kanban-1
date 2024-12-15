'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ListProjects } from '@/types/project.type';
import ProjectCard from '@/components/projectCard/projectCard';
import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import Loader from '@/components/ui/Loader/loader';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import useAuthStore from '@/store/store';
import TaskModal from '@/components/task/TaskModal/TaskModal';
import useTaskStore from '@/store/taskStore';
import styles from './ProjectsPage.module.scss';
//----------------------------------------------------
/* eslint-disable no-nested-ternary */

const SECTION_TITLES = {
  favorite: 'Избранные проекты',
  archived: 'Архивные проекты',
};

const fetchProjects = async (): Promise<ListProjects> => ProjectService.getListProjects();

export default function ProjectsPage() {
  const [nameValueProject, setNameValueProject] = useState('');
  const [numberValueProject, setNumberValueProject] = useState('');
  const { addToFavorite, removeFromFavorite, isLoadingFavorite } = useFavoriteMutation();
  const [isArchived, setIsArchived] = useState(false);
  const { user } = useAuthStore();

  const {
    data: projects,
    isLoading,
    error,
  }: UseQueryResult<ListProjects, Error> = useQuery<ListProjects>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const filteredByNameProjects = useMemo(
    () =>
      (nameValueProject.length > 2 &&
        projects?.filter(
          (project) =>
            project.name.toLowerCase().includes(nameValueProject.toLowerCase()) &&
            !project.is_archived
        )) ||
      [],
    [projects, nameValueProject]
  );

  const filteredByNumberProjects = useMemo(
    () =>
      (numberValueProject &&
        projects?.filter(
          (project) => project.id.toString().includes(numberValueProject) && !project.is_archived
        )) ||
      [],
    [projects, numberValueProject]
  );

  const archivedProjects = useMemo(
    () => projects?.filter((project) => project.is_archived) || [],
    [projects]
  );

  const favoriteProjects = useMemo(
    () => projects?.filter((project) => project.is_favorite && !project.is_archived) || [],
    [projects]
  );

  const otherProjects = useMemo(
    () => projects?.filter((project) => !project.is_favorite && !project.is_archived) || [],
    [projects]
  );

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты', isActive: true },
  ];

  const onFavoriteToggle = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      removeFromFavorite.mutate(id);
    } else {
      addToFavorite.mutate(id);
    }
  };
  const renderProjects = (
    projectsToRender: ListProjects,
    sectionTitle?: string,
    favoriteSection?: boolean
  ) => {
    if (!projectsToRender.length) return null;

    return (
      <div className={cn(styles['projects__projects-section-wrapper'])}>
        {sectionTitle && <h2>{sectionTitle}</h2>}
        <div className={cn(styles['projects__projects-section'])}>
          {projectsToRender.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              slug={project.slug}
              logo={project.logo ? project.logo.link : null}
              name={project.name}
              count={project.user_count}
              isFavorite={project.is_favorite}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </div>
        {favoriteSection && <hr className={cn(styles['projects__hr-line'])} />}
      </div>
    );
  };

  const onChangeInputNameProject = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValueProject(e.target.value);
  };

  const onChangeInputNumberProject = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberValueProject(e.target.value);
  };

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
                    value={nameValueProject}
                    onChange={(e) => onChangeInputNameProject(e)}
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
                    value={numberValueProject}
                    onChange={onChangeInputNumberProject}
                    style={{ background: 'var(--blue-light-background)' }}
                    type="text"
                  />
                </label>
              </div>
            </div>
            {user?.is_admin && (
              <label htmlFor="archive-projects">
                <input
                  type="checkbox"
                  name="archive-projects"
                  id="archive-projects"
                  checked={isArchived}
                  onChange={(e) => setIsArchived(e.target.checked)}
                />
                Показать архивные проекты
              </label>
            )}
          </div>

          {(isLoading || isLoadingFavorite) && (
            <div className="loader-container">
              <Loader />
            </div>
          )}
          {error && <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>}

          {!isLoading &&
            !error &&
            (isArchived ? (
              renderProjects(archivedProjects, SECTION_TITLES.archived)
            ) : (nameValueProject.trim() === '' || nameValueProject.length < 3) &&
              numberValueProject.trim() === '' ? (
              <>
                {renderProjects(favoriteProjects, 'Избранные проекты', true)}
                {renderProjects(otherProjects)}
              </>
            ) : filteredByNameProjects.length > 0 || filteredByNumberProjects.length > 0 ? (
              <>
                {renderProjects(filteredByNameProjects)}
                {renderProjects(filteredByNumberProjects)}
              </>
            ) : (
              <p className={styles['error-message']}>Задача не найдена</p>
            ))}
        </div>
      </ProjectLayout>
    </>
  );
}
