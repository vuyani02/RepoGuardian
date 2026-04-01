import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  page: css`
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 40px;

    @media (max-width: 768px) {
      padding: 24px 16px;
    }
  `,
  heading: css`
    font-size: 24px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 24px !important;
  `,
  tabs: css`
    .ant-tabs-nav {
      margin-bottom: 24px;
    }
    .ant-tabs-tab {
      font-size: 14px;
      font-weight: 500;
    }
  `,
}))
