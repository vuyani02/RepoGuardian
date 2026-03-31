import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      padding: 20px;
    }
  `,
  name: css`
    font-size: 22px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    margin-bottom: 4px !important;
  `,
  owner: css`
    font-size: 14px !important;
    color: #6b7280 !important;
    margin-bottom: 12px !important;
  `,
  link: css`
    font-size: 13px !important;
    color: #4f46e5 !important;
  `,
  skeletonName: css`
    width: 220px !important;
    height: 28px !important;
    margin-bottom: 8px !important;
    display: block !important;
  `,
  skeletonOwner: css`
    width: 140px !important;
    height: 18px !important;
  `,
}))
