'use client'

import { useStyles } from "./style";

export default function StyleWrapper({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles();
  return <div className={styles.page}>{children}</div>;
}
