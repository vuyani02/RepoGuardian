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
