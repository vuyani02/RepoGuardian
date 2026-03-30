'use client'

import { Button, Table, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { IRepository } from '@/Types/Repository/Types'
import { useStyles } from './styles/RepositoryTable.style'

const { Link } = Typography

const RepositoryTable = () => {
  const { styles } = useStyles()
  const { repositories, isPending, isScanPending, scanningRepositoryId } = useRepositoryState()
  const { startScan } = useRepositoryActions()

  const columns = [
    {
      title: 'Repository',
      key: 'name',
      minWidth: 180,
      render: (_: unknown, row: IRepository) => (
        <div>
          <div className={styles.repoName}>{row.name}</div>
          <div className={styles.owner}>{row.owner}</div>
        </div>
      ),
    },
    {
      title: 'GitHub URL',
      key: 'githubUrl',
      minWidth: 260,
      render: (_: unknown, row: IRepository) => (
        <Link href={row.githubUrl} target="_blank" className={styles.url}>
          {row.githubUrl}
        </Link>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 120,
      render: (_: unknown, row: IRepository) => (
        <Button
          type="primary"
          size="small"
          icon={<RadarChartOutlined spin={isScanPending && scanningRepositoryId === row.id} />}
          disabled={isScanPending && scanningRepositoryId !== row.id}
          onClick={() => startScan(row.id)}
          className={styles.scanBtn}
        >
          Scan
        </Button>
      ),
    },
  ]

  return (
    <Table
      dataSource={repositories ?? []}
      columns={columns}
      rowKey="id"
      loading={isPending}
      pagination={false}
      locale={{ emptyText: 'No repositories yet. Add one to get started.' }}
    />
  )
}

export default RepositoryTable
