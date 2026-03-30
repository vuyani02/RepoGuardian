import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  repoName: css`
    font-weight: 600;
    font-size: 13px;
    color: #111827;
  `,
  owner: css`
    font-size: 12px;
    color: #9ca3af;
  `,
  scoreGreen: css`color: #10b981; font-weight: 700;`,
  scoreAmber: css`color: #f59e0b; font-weight: 700;`,
  scoreRed:   css`color: #ef4444; font-weight: 700;`,
  scorePending: css`color: #9ca3af;`,
  viewBtn: css`
    border-radius: 8px;
  `,
}))
