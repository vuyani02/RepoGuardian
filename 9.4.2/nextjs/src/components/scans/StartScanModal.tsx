'use client'

import { useState } from 'react'
import { Button, Divider, Input, Modal, Select, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import axios from 'axios'
import { StartScanModalProps } from '@/Types/Scan/Types'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { useStyles } from './styles/StartScanModal.style'

const { Text } = Typography


const StartScanModal = ({ open, onClose, onScanComplete, onScanStart, onScanEnd }: StartScanModalProps) => {
  const { styles } = useStyles()
  const { repositories } = useRepositoryState()
  const { getRepositories } = useRepositoryActions()

  const [selectedRepoId, setSelectedRepoId] = useState<string | undefined>(undefined)
  const [newUrl, setNewUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpen = () => {
    if (!repositories) getRepositories()
  }

  const handleClose = () => {
    setSelectedRepoId(undefined)
    setNewUrl('')
    setError(null)
    onClose()
  }

  const handleScan = async () => {
    setError(null)
    setIsScanning(true)
    onScanStart?.()

    try {
      let repositoryId = selectedRepoId

      if (!repositoryId) {
        if (!newUrl.trim()) {
          setError('Select an existing repository or enter a GitHub URL.')
          setIsScanning(false)
          return
        }
        const addRes = await axios.post('/api/repositories', { githubUrl: newUrl.trim() })
        repositoryId = addRes.data.id
      }

      const scanRes = await axios.post('/api/repositories/scan', { repositoryId })
      handleClose()
      onScanComplete(scanRes.data)
    } catch {
      setError('Scan failed. Please check the URL and try again.')
    } finally {
      setIsScanning(false)
      onScanEnd?.()
    }
  }

  const repoOptions = (repositories ?? []).map((r) => ({
    label: `${r.owner}/${r.name}`,
    value: r.id,
  }))

  const footer = [
    <Button key="cancel" className={styles.cancelBtn} onClick={handleClose} disabled={isScanning}>
      Cancel
    </Button>,
    <Button
      key="scan"
      type="primary"
      className={styles.scanBtn}
      icon={<RadarChartOutlined spin={isScanning} />}
      loading={false}
      disabled={isScanning}
      onClick={handleScan}
    >
      Scan
    </Button>,
  ]

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Start a Scan"
      footer={footer}
      afterOpenChange={(visible) => { if (visible) handleOpen() }}
    >
      <label htmlFor="scan-repo-select" className={styles.label}>Select an existing repository</label>
      <Select
        id="scan-repo-select"
        placeholder="Choose a repository…"
        options={repoOptions}
        value={selectedRepoId}
        onChange={(val) => { setSelectedRepoId(val); setNewUrl('') }}
        style={{ width: '100%' }}
        allowClear
        disabled={isScanning}
      />

      <Divider className={styles.divider}>or</Divider>

      <label htmlFor="scan-github-url" className={styles.label}>Enter a new GitHub URL</label>
      <Input
        id="scan-github-url"
        placeholder="https://github.com/owner/repo"
        value={newUrl}
        onChange={(e) => { setNewUrl(e.target.value); setSelectedRepoId(undefined) }}
        disabled={isScanning}
      />

      {error && <Text className={styles.errorText}>{error}</Text>}
    </Modal>
  )
}

export default StartScanModal
