import { useCallback, useEffect, useState } from 'react';

import { IUser } from '@/entities/user/types';
import { Button, Card, Title } from '@/shared/ui';
import { userHandler } from '@/entities/user/handler';

import styles from './UserApprovalList.module.css';

export function UserApprovalList() {
  const [userApplications, setUserApplications] = useState<IUser[] | null>();
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  useEffect(() => {
    const getUsersApplications = async () => {
      const response = await userHandler.getUserApplications();

      if (response.success) setUserApplications(response.data);
    };

    getUsersApplications();
  }, [fetchTrigger]);

  const approveUser = useCallback(async (userId: string) => {
    const response = await userHandler.approveUser(userId);

    if (response.success) setFetchTrigger((prevState) => (prevState += 1));
  }, []);

  if (!userApplications || userApplications.length < 1) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <Title tag='h3' className={styles.emptyTitle}>
          Заявок нет
        </Title>
        <p className={styles.emptyText}>
          Здесь будут отображаться заявки на подтверждение
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title tag='h2' className={styles.title}>
          Заявок ({userApplications.length})
        </Title>
      </div>

      <div className={styles.tasksList}>
        {userApplications.map((user) => (
          <Card key={user.user_id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <div className={styles.taskInfo}>
                <Title tag='h3' className={styles.taskTitle}>
                  {user.name}
                </Title>
              </div>
            </div>
            <Button size='s' onClick={() => approveUser(user.user_id)}>
              Подтвердить
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
