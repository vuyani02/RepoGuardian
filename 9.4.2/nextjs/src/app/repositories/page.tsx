import { verifySession } from '@/lib/dal'
import RepositoriesContent from '@/components/repositories/RepositoriesContent'

export default async function RepositoriesPage() {
  await verifySession()
  return <RepositoriesContent />
}
