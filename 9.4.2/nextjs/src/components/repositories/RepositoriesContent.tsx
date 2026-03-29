'use client'

import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import { useStyles } from '@/app/repositories/style'
import { RepositoryProvider, useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import AppNavbar from '@/components/app/AppNavbar'
import RepositoryTable from './RepositoryTable'
import AddRepositoryModal from './AddRepositoryModal'
import ScanResultModal from './ScanResultModal'

const { Title } = Typography

const RepositoriesInner = () => {
  const { styles } = useStyles()
  const [addOpen, setAddOpen] = useState(false)
  const { getRepositories } = useRepositoryActions()
  const { scanResult } = useRepositoryState()

  useEffect(() => {
    getRepositories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.page}>
      <AppNavbar />

      <div className={styles.content}>
        <div className={styles.header}>
          <Title className={styles.title}>Repositories</Title>
          <Button
            type="primary"
            size="large"
            onClick={() => setAddOpen(true)}
            className={styles.addBtn}
          >
            + Add Repository
          </Button>
        </div>

        <div className={styles.tableWrap}>
          <RepositoryTable />
        </div>
      </div>

      <AddRepositoryModal open={addOpen} onClose={() => setAddOpen(false)} />
      {scanResult && <ScanResultModal />}
    </div>
  )
}

const RepositoriesContent = () => {
  return (
    <RepositoryProvider>
      <RepositoriesInner />
    </RepositoryProvider>
  )
}

export default RepositoriesContent
