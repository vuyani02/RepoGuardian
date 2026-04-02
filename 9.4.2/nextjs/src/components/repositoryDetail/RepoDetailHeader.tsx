'use client'

import { Button, Skeleton, Typography } from 'antd'
import { GithubOutlined, RadarChartOutlined, UserOutlined } from '@ant-design/icons'
import { RepoDetailHeaderProps } from '@/Types/Repository/Types'
import { useStyles } from './styles/RepoDetailHeader.style'

const { Title, Text, Link } = Typography

const scoreBadgeKey = (score: number | null) => {
  if (score === null) return 'scoreDefault'
  if (score >= 80) return 'scoreGreen'
  if (score >= 50) return 'scoreAmber'
  return 'scoreRed'
}

const RepoDetailHeader = ({ repository, lastScanScore, lastScanBranch, isPending, onScan, isScanning }: RepoDetailHeaderProps) => {
  const { styles } = useStyles()

  return (
    <div className={styles.card}>
      {isPending ? (
        <>
          <div>
            <Skeleton.Input active className={styles.skeletonName} />
            <Skeleton.Input active className={styles.skeletonOwner} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.left}>
            <div className={styles.nameRow}>
              <Title className={styles.name}>{repository?.name}</Title>
              <span className={`${styles.scoreBadge} ${styles[scoreBadgeKey(lastScanScore)]}`}>
                {lastScanScore !== null ? `${lastScanScore}%` : 'No scans yet'}
              </span>
              {lastScanBranch && (
                <span className={styles.defaultBranchBadge}>
                  {lastScanBranch}
                </span>
              )}
            </div>
            <Text className={styles.owner}>
              <UserOutlined /> {repository?.owner}
            </Text>
            <Link href={repository?.githubUrl} target="_blank" className={styles.link}>
              <GithubOutlined /> {repository?.githubUrl}
            </Link>
          </div>

          <div className={styles.right}>
            <Button
              type="primary"
              size="large"
              icon={<RadarChartOutlined spin={isScanning} />}
              onClick={onScan}
              className={styles.scanBtn}
            >
              Scan
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default RepoDetailHeader
