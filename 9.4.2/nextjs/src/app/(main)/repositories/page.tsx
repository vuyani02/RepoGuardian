'use client'

import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import { useStyles } from './style'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import RepositoryTable from '@/components/repositories/RepositoryTable'
import AddRepositoryModal from '@/components/repositories/AddRepositoryModal'
import ScanResultModal from '@/components/repositories/ScanResultModal'

const { Title } = Typography

const RepositoriesPage = () => {
  const { styles } = useStyles()
  const [addOpen, setAddOpen] = useState(false)
  const { getRepositories } = useRepositoryActions()
  const { scanResult } = useRepositoryState()

  useEffect(() => {
    getRepositories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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

      <AddRepositoryModal open={addOpen} onClose={() => setAddOpen(false)} />
      {scanResult && <ScanResultModal />}
    </div>
  )
}

export default RepositoriesPage
