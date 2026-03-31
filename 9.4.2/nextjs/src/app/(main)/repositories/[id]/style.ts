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
  backBtn: css`
    margin-bottom: 24px;
    padding: 0 !important;
    color: #6b7280 !important;
    font-size: 14px !important;

    &:hover {
      color: #4f46e5 !important;
    }
  `,
}))
