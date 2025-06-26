import { useState } from 'react';
import { Title } from '../../shared/ui';
import { ArchiveTasks, AdminTasks, UserApprovalList } from '../../widgets';
import styles from './Admin.module.css';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';

export function Admin() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Title tag='h1' className={styles.pageTitle}>
          Задачи
        </Title>
      </div>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className={styles.tabs}>
          <Tab className={styles.tab}>
            {({ selected }) => (
              <div
                className={`${styles.tabButton} ${
                  selected ? styles.activeTab : ''
                }`}
              >
                Текущие
              </div>
            )}
          </Tab>
          <Tab className={styles.tab}>
            {({ selected }) => (
              <div
                className={`${styles.tabButton} ${
                  selected ? styles.activeTab : ''
                }`}
              >
                Архив
              </div>
            )}
          </Tab>

          <Tab className={styles.tab}>
            {({ selected }) => (
              <div
                className={`${styles.tabButton} ${
                  selected ? styles.activeTab : ''
                }`}
              >
                Пользователи
              </div>
            )}
          </Tab>
        </TabList>

        <TabPanels className={styles.tabPanels}>
          <TabPanel className={styles.tabPanel}>
            <AdminTasks />
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <ArchiveTasks />
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <UserApprovalList />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
