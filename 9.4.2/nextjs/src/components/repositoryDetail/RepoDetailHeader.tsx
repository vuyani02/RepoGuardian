'use client'

import { Skeleton, Typography } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { IRepository } from '@/Types/Repository/Types'
import { useStyles } from './styles/RepoDetailHeader.style'

const { Title, Text, Link } = Typography

interface RepoDetailHeaderProps {
  repository: IRepository | undefined
  isPending: boolean
}

const RepoDetailHeader = ({ repository, isPending }: RepoDetailHeaderProps) => {
  const { styles } = useStyles()

  return (
    <div className={styles.card}>
      {isPending ? (
        <>
          <Skeleton.Input active className={styles.skeletonName} />
          <Skeleton.Input active className={styles.skeletonOwner} />
        </>
      ) : (
        <>
          <Title className={styles.name}>{repository?.name}</Title>
          <Text className={styles.owner}>{repository?.owner}</Text>
          <br />
          <Link href={repository?.githubUrl} target="_blank" className={styles.link}>
            <GithubOutlined /> {repository?.githubUrl}
          </Link>
        </>
      )}
    </div>
  )
}

export default RepoDetailHeader
