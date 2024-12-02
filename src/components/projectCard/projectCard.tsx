import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import styles from './projectCard.module.scss';

interface ProjectCardProps {
  logo: string;
  name: string;
  count: number;
  slug: string;
  isFavorite?: boolean;
}

export default function ProjectCard({ logo, name, count, slug, isFavorite }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className={cn(styles['project-card'])}>
        <Image
          className={cn(styles['project-card__logo'])}
          src={logo || '/avatar-test.jpg'}
          width={32}
          height={32}
          alt="project-logo"
        />
        <button className={cn(styles['project-card__favorite-btn'])} type="button">
          <svg className="social-icon" viewBox="0 0 18 18" width="18" height="18">
            <use href={`/sprite.svg#favorite${isFavorite ? 'Active' : ''}`} />
          </svg>
        </button>
        <h3 className={cn(styles['project-card__name'])}>{name || 'Без названия'}</h3>
        <p className={cn(styles['project-card__count'])}>
          {count === 1 ? `${count} сотрудник` : `${count} сотрудников`}
        </p>
      </div>
    </Link>
  );
}
