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
  header: css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 12px;
  `,
  headerText: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  title: css`
    font-size: 24px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    margin-bottom: 0 !important;
  `,
  subtitle: css`
    font-size: 14px !important;
    color: #6b7280 !important;
  `,
  sectionLabel: css`
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 12px !important;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  divider: css`
    margin: 36px 0;
  `,
}))
