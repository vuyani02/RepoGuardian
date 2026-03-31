import { verifySession } from '@/lib/dal'
import AppNavbar from '@/components/app/AppNavbar'
import AppFooter from '@/components/app/AppFooter'
import AppShell from '@/components/app/AppShell'
import { RepositoryProvider } from '@/providers/repositories'
import { ScansProvider } from '@/providers/scans'
import { DashboardProvider } from '@/providers/dashboard'
import { RepositoryDetailProvider } from '@/providers/repositoryDetail'
import { ProfileProvider } from '@/providers/profile'

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  await verifySession()

  return (
    <ProfileProvider>
      <AppShell navbar={<AppNavbar />} footer={<AppFooter />}>
        <RepositoryProvider>
          <ScansProvider>
            <DashboardProvider>
              <RepositoryDetailProvider>
                {children}
              </RepositoryDetailProvider>
            </DashboardProvider>
          </ScansProvider>
        </RepositoryProvider>
      </AppShell>
    </ProfileProvider>
  )
}

export default AppLayout
