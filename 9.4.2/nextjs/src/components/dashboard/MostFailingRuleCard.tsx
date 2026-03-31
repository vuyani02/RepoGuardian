'use client'

import { Skeleton, Typography } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { MostFailingRuleCardProps } from '@/Types/Dashboard/Types'
import { useStyles } from './styles/MostFailingRuleCard.style'

const { Title, Text } = Typography

const MostFailingRuleCard = ({ mostFailingRule, isPending }: MostFailingRuleCardProps) => {
  const { styles } = useStyles()

  return (
    <div className={styles.card}>
      {isPending ? (
        <Skeleton.Input active className={styles.skeleton} />
      ) : !mostFailingRule ? (
        <Text className={styles.empty}>No rule failures in this period.</Text>
      ) : (
        <>
          <div className={styles.left}>
            <Title className={styles.heading}>Most Failing Rule</Title>
            <Title className={styles.ruleName}>{mostFailingRule.ruleName}</Title>
            <Text className={styles.ruleId}>{mostFailingRule.ruleId}</Text>
          </div>
          <span className={styles.badge}>
            <WarningOutlined /> {mostFailingRule.failCount} failure{mostFailingRule.failCount !== 1 ? 's' : ''}
          </span>
        </>
      )}
    </div>
  )
}

export default MostFailingRuleCard
