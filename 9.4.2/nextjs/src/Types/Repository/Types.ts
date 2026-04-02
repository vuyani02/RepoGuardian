import { IScanSummary } from '@/Types/Scan/Types'

export interface IRepository {
  id: string
  githubUrl: string
  owner: string
  name: string
}

export interface IRepositoryDetail {
  repository: IRepository
  scans: IScanSummary[]
}

export interface AddRepositoryModalProps {
  open: boolean
  onClose: () => void
}

export interface RepoDetailHeaderProps {
  repository: IRepository | undefined
  lastScanScore: number | null
  lastScanBranch: string | null
  isPending: boolean
  onScan: () => void
  isScanning: boolean
}
