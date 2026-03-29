import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  content: css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px;

    @media (max-width: 768px) {
      padding: 24px 16px;
    }
  `,
  title: css`
    font-size: 24px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    margin-bottom: 4px !important;
  `,
  subtitle: css`
    font-size: 14px !important;
    color: #6b7280 !important;
  `,
}))
