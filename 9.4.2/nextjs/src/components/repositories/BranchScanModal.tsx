'use client'

import { useEffect, useState } from 'react'
import { Button, Modal, Select, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useStyles } from './styles/BranchScanModal.style'

const { Text } = Typography

interface BranchScanModalProps {
  open: boolean
  repositoryId: string
  onCancel: () => void
  onConfirm: (branch: string) => void
}

const BranchScanModal = ({ open, repositoryId, onCancel, onConfirm }: BranchScanModalProps) => {
  const { styles } = useStyles()
  const [branches, setBranches] = useState<string[]>([])
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !repositoryId) return
    void (async () => {
      setIsLoading(true)
      setError(null)
      setSelectedBranch(undefined)
      try {
        const res = await axios.get(`/api/repositories/${repositoryId}/branches`)
        setBranches(res.data ?? [])
        if (res.data?.length > 0) setSelectedBranch(res.data[0])
      } catch {
        setError('Could not load branches. Please try again.')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [open, repositoryId])

  const handleConfirm = () => {
    if (selectedBranch) onConfirm(selectedBranch)
  }

  const footer = [
    <Button key="cancel" className={styles.cancelBtn} onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="scan"
      type="primary"
      className={styles.scanBtn}
      icon={<RadarChartOutlined />}
      disabled={!selectedBranch || isLoading}
      onClick={handleConfirm}
    >
      Scan
    </Button>,
  ]

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Select Branch"
      footer={footer}
    >
      <label htmlFor="branch-select" className={styles.label}>Branch to scan</label>
      <Select
        id="branch-select"
        placeholder="Choose a branch…"
        options={branches.map((b) => ({ label: b, value: b }))}
        value={selectedBranch}
        onChange={setSelectedBranch}
        loading={isLoading}
        style={{ width: '100%' }}
        disabled={isLoading}
      />
      {error && <Text className={styles.errorText}>{error}</Text>}
    </Modal>
  )
}

export default BranchScanModal
