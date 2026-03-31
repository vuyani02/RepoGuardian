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
    margin-bottom: 32px;
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
  filters: css`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
  filterSelect: css`
    width: 200px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  statsGrid: css`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
  scanBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;
  `,
}))
