'use client'

import { useEffect } from 'react'
import { Badge, Divider, Skeleton, Typography } from 'antd'
import { useRulesState, useRulesActions } from '@/providers/rules'
import { useProfileState, useProfileActions } from '@/providers/profile'
import RulesAccordion from '@/components/rules/RulesAccordion'
import { useStyles } from './style'

const { Title, Text } = Typography

const RulesPage = () => {
  const { styles } = useStyles()
  const { rules, isPending, isTogglePending } = useRulesState()
  const { getRules, toggleRule } = useRulesActions()
  const { profile } = useProfileState()
  const { getProfile } = useProfileActions()

  const isAdmin = profile?.currentUserIsAdmin ?? false

  useEffect(() => {
    getRules()
    if (!profile) getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeCount = rules?.filter((r) => r.isActive).length ?? 0
  const inactiveCount = rules?.filter((r) => !r.isActive).length ?? 0

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title className={styles.title}>Rule Management</Title>
          <Text className={styles.subtitle}>
            Customise which compliance rules apply to your team&apos;s repositories
          </Text>
        </div>
      </div>

      {isPending && <Skeleton active paragraph={{ rows: 8 }} />}

      {!isPending && rules && (
        <>
          <Text className={styles.sectionLabel}>
            <Badge status="success" />
            Active Rules ({activeCount})
          </Text>
          <RulesAccordion
            rules={rules}
            activeOnly
            isTogglePending={isTogglePending}
            isAdmin={isAdmin}
            onToggle={toggleRule}
          />

          <Divider className={styles.divider} />

          <Text className={styles.sectionLabel}>
            <Badge status="default" />
            Deactivated Rules ({inactiveCount})
          </Text>
          <RulesAccordion
            rules={rules}
            activeOnly={false}
            isTogglePending={isTogglePending}
            isAdmin={isAdmin}
            onToggle={toggleRule}
          />
        </>
      )}
    </div>
  )
}

export default RulesPage
