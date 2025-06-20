import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

import styles from './Header.module.css';
import { Tag } from '../../shared/ui';

export function Header() {
  const { userImage, profile } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.header}>
      {userImage && <img src={userImage} className={styles.profileImage} />}
      {profile && <div className={styles.name}>{profile.name}</div>}
      {profile && <Tag>Кол-во: {profile.tasks?.length}</Tag>}
    </div>
  );
}
