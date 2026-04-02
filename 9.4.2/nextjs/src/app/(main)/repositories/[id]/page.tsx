'use client'

import { use, useEffect, useState } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useRepositoryDetailState, useRepositoryDetailActions } from '@/providers/repositoryDetail'
import RepoDetailHeader from '@/components/repositoryDetail/RepoDetailHeader'
import RepoTrendChart from '@/components/repositoryDetail/RepoTrendChart'
import RepoScansTable from '@/components/repositoryDetail/RepoScansTable'
import ScanResultModal from '@/components/repositories/ScanResultModal'
import { IScanResult } from '@/Types/Scan/Types'
import { useStyles } from './style'

const RepositoryDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const { styles } = useStyles()
  const router = useRouter()
  const { detail, isPending } = useRepositoryDetailState()
  const { getRepositoryDetail } = useRepositoryDetailActions()
  const [viewedResult, setViewedResult] = useState<IScanResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    getRepositoryDetail(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleView = async (scanRunId: string) => {
    const res = await axios.get(`/api/scans/${scanRunId}`)
    setViewedResult(res.data)
  }

  const handleScan = async () => {
    setIsScanning(true)
    try {
      const res = await axios.post('/api/repositories/scan', { repositoryId: id })
      setViewedResult(res.data)
      getRepositoryDetail(id)
    } finally {
      setIsScanning(false)
    }
  }

  const DEFAULT_BRANCHES = ['main', 'master']
  const defaultBranchScan = detail?.scans?.find(
    (s) => s.status === 'Completed' && DEFAULT_BRANCHES.includes(s.branch ?? '')
  ) ?? detail?.scans?.find((s) => s.status === 'Completed') ?? null
  const lastScanScore = defaultBranchScan?.overallScore ?? null
  const lastScanBranch = defaultBranchScan?.branch ?? null

  return (
    <div className={styles.content}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push('/repositories')}
        className={styles.backBtn}
      >
        Back to Repositories
      </Button>

      <RepoDetailHeader
        repository={detail?.repository}
        lastScanScore={lastScanScore}
        lastScanBranch={lastScanBranch}
        isPending={isPending}
        onScan={handleScan}
        isScanning={isScanning}
      />

      <RepoTrendChart scans={detail?.scans ?? []} isPending={isPending} />

      <RepoScansTable
        scans={detail?.scans ?? []}
        isPending={isPending}
        onView={handleView}
      />

      {viewedResult && (
        <ScanResultModal
          scanResult={viewedResult}
          onClose={() => setViewedResult(null)}
        />
      )}
    </div>
  )
}

export default RepositoryDetailPage
