import { Header } from '../../../widgets';
import { AuthProvider } from '../AuthProvider/AuthProvider';

import styles from './LayoutProvider.module.css';

export function LayoutProvider() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <AuthProvider />
      </main>
    </div>
  );
}
