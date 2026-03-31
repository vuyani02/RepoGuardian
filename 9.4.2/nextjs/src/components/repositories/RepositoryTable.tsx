'use client'

import { useState } from 'react'
import { Button, Input, Table, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { IRepository } from '@/Types/Repository/Types'
import { useStyles } from './styles/RepositoryTable.style'

const { Link } = Typography

const RepositoryTable = () => {
  const { styles } = useStyles()
  const router = useRouter()
  const { repositories, isPending, isScanPending, scanningRepositoryId } = useRepositoryState()
  const { startScan } = useRepositoryActions()

  const [search, setSearch] = useState('')

  const filtered = (repositories ?? []).filter((r) => {
    const q = search.toLowerCase()
    return r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q)
  })

  const columns = [
    {
      title: 'Repository',
      key: 'name',
      minWidth: 180,
      render: (_: unknown, row: IRepository) => (
        <div>
          <span
            className={styles.repoLink}
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/repositories/${row.id}`)}
            onKeyDown={(e) => e.key === 'Enter' && router.push(`/repositories/${row.id}`)}
          >
            {row.name}
          </span>
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
          onClick={(e) => { e.stopPropagation(); startScan(row.id) }}
          className={styles.scanBtn}
        >
          Scan
        </Button>
      ),
    },
  ]

  return (
    <>
      <div className={styles.toolbar}>
        <Input.Search
          placeholder="Search by name or owner…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(val) => setSearch(val)}
          allowClear
          className={styles.searchInput}
        />
      </div>
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        loading={isPending}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '50'] }}
        locale={{ emptyText: search ? 'No repositories match your search.' : 'No repositories yet. Add one to get started.' }}
        onRow={(row) => ({
          onClick: () => router.push(`/repositories/${row.id}`),
          className: styles.clickableRow,
        })}
      />
    </>
  )
}

export default RepositoryTable
