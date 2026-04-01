'use client'

import { Collapse, Switch, Tag, Typography, Spin } from 'antd'
import { IRuleDefinition } from '@/Types/Rules/Types'
import { useStyles } from './styles/RulesAccordion.style'

const { Text } = Typography

const CATEGORY_COLOURS: Record<string, string> = {
  Documentation: 'blue',
  Testing: 'green',
  CiCd: 'orange',
  Dependencies: 'purple',
  Security: 'red',
}

interface RulesAccordionProps {
  rules: IRuleDefinition[]
  activeOnly: boolean
  isTogglePending: boolean
  onToggle: (ruleId: string, activate: boolean) => Promise<void>
}

const RulesAccordion = ({ rules, activeOnly, isTogglePending, onToggle }: RulesAccordionProps) => {
  const { styles } = useStyles()

  const filtered = rules.filter((r) => r.isActive === activeOnly)

  const byCategory = filtered.reduce<Record<string, IRuleDefinition[]>>((acc, rule) => {
    acc[rule.category] = [...(acc[rule.category] ?? []), rule]
    return acc
  }, {})

  if (filtered.length === 0) {
    return (
      <div className={styles.empty}>
        {activeOnly ? 'All rules have been deactivated.' : 'No rules have been deactivated.'}
      </div>
    )
  }

  const categoryPanels = Object.entries(byCategory).map(([category, categoryRules]) => ({
    key: category,
    label: (
      <span>
        <strong>{category}</strong>
        <Text className={styles.sectionCount}> — {categoryRules.length} rule{categoryRules.length !== 1 ? 's' : ''}</Text>
      </span>
    ),
    children: (
      <Collapse
        ghost
        items={categoryRules.map((rule) => ({
          key: rule.ruleId,
          label: (
            <div className={styles.ruleHeader}>
              <div className={styles.ruleLeft}>
                <span className={styles.ruleName}>{rule.ruleName}</span>
                <Tag color={CATEGORY_COLOURS[rule.category] ?? 'default'} className={styles.categoryTag}>
                  {rule.ruleId}
                </Tag>
              </div>
              <Spin spinning={isTogglePending} size="small">
                <Switch
                  checked={rule.isActive}
                  size="small"
                  onClick={(_, e) => {
                    e.stopPropagation()
                    onToggle(rule.ruleId, !rule.isActive)
                  }}
                />
              </Spin>
            </div>
          ),
          children: (
            <div className={styles.explanationGrid}>
              <div className={styles.explanationCard}>
                <Text className={styles.explanationLabel}>What is it?</Text>
                <p className={styles.explanationText}>{rule.whatIsIt}</p>
              </div>
              <div className={styles.explanationCard}>
                <Text className={styles.explanationLabel}>Why it matters</Text>
                <p className={styles.explanationText}>{rule.whyItMatters}</p>
              </div>
              <div className={styles.explanationCard}>
                <Text className={styles.explanationLabel}>How to add it</Text>
                <p className={styles.explanationText}>{rule.howToAdd}</p>
              </div>
            </div>
          ),
        }))}
      />
    ),
  }))

  return <Collapse items={categoryPanels} defaultActiveKey={Object.keys(byCategory)} />
}

export default RulesAccordion
