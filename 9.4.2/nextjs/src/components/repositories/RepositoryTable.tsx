'use client'

import { Button, Table, Typography } from 'antd'
import { createStyles } from 'antd-style'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { IRepository } from '@/lib/definitions'

const { Link } = Typography

const useStyles = createStyles(({ css }) => ({
  repoName: css`
    font-weight: 600;
    font-size: 14px;
    color: #111827;
  `,
  owner: css`
    font-size: 12px;
    color: #9ca3af;
    margin-top: 2px;
  `,
  url: css`
    font-size: 13px;
    color: #6b7280;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  `,
}))

export default function RepositoryTable() {
  const { styles } = useStyles()
  const { repositories, isPending, isScanPending, scanningRepositoryId } = useRepositoryState()
  const { startScan } = useRepositoryActions()

  const columns = [
    {
      title: 'Repository',
      key: 'name',
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
          loading={isScanPending && scanningRepositoryId === row.id}
          disabled={isScanPending && scanningRepositoryId !== row.id}
          onClick={() => startScan(row.id)}
          style={{ background: '#4f46e5', borderColor: '#4f46e5', borderRadius: 8 }}
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
