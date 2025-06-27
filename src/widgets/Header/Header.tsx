import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router';
import { RootState } from '../../app/store/store';
import styles from './Header.module.css';
import { Tag, Title } from '../../shared/ui';

export function Header() {
  const { userImage, profile } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const showBackButton = location.pathname === '/add-task';
  const showAddButton = location.pathname === '/admin';

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {showBackButton && (
          <Link to='/admin' className={styles.backButton}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M15 18L9 12L15 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        )}

        <div className={styles.userInfo}>
          {userImage && (
            <img
              src={userImage}
              className={styles.profileImage}
              alt='Profile'
            />
          )}
          <div className={styles.userDetails}>
            {profile && (
              <Title tag='h1' className={styles.userName}>
                {profile.name}
              </Title>
            )}
            {profile && !profile?.is_admin && (
              <Tag className={styles.taskCount}>
                Задач: {profile.tasks?.length || 0}
              </Tag>
            )}
          </div>
        </div>

        {showAddButton && (
          <Link to='/add-task' className={styles.createTaskLink}>
            <span className={styles.createTaskText}>Создать задачу</span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              className={styles.createTaskIcon}
            >
              <path
                d='M12 5V19M5 12H19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
