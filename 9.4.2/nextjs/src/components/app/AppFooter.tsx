'use client'

import { Typography } from 'antd'
import { useStyles } from './styles/AppFooter.style'

const { Text } = Typography

const AppFooter = () => {
  const { styles } = useStyles()

  return (
    <footer className={styles.footer}>
      <Text className={styles.copyright}>
        © {new Date().getFullYear()} RepoGuardian. All rights reserved.
      </Text>
      <Text className={styles.brand}>
        Powered by <span>Gemini AI</span>
      </Text>
    </footer>
  )
}

export default AppFooter
