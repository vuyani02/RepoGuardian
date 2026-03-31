import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    overflow: hidden;
  `,
  title: css`
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin: 0 !important;
    padding: 20px 24px 16px;
  `,
  scoreGreen:   css`color: #10b981; font-weight: 700;`,
  scoreAmber:   css`color: #f59e0b; font-weight: 700;`,
  scoreRed:     css`color: #ef4444; font-weight: 700;`,
  scorePending: css`color: #9ca3af;`,
  viewBtn: css`
    border-radius: 8px;
  `,
}))
