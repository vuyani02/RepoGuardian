'use client'

import { useStyles } from "./style";

const StyleWrapper = ({ children }: { children: React.ReactNode }) => {
  const { styles } = useStyles();
  return <div className={styles.page}>{children}</div>;
}

export default StyleWrapper
