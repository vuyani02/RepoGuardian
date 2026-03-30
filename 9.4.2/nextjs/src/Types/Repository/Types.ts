export interface IRepository {
  id: string
  githubUrl: string
  owner: string
  name: string
}

export interface AddRepositoryModalProps {
  open: boolean
  onClose: () => void
}
