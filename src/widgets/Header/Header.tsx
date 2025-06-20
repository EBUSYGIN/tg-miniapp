import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

import styles from './Header.module.css';
import { Tag, Title } from '../../shared/ui';

export function Header() {
  const { userImage, profile } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.header}>
      {userImage && <img src={userImage} className={styles.profileImage} />}
      {profile && <Title tag='h1'>{profile.name}</Title>}
      {profile && (
        <Tag className={styles.tag}>Кол-во задач: {profile.tasks?.length}</Tag>
      )}
    </div>
  );
}
