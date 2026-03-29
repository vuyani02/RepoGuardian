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
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  `,
  title: css`
    font-size: 24px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    margin-bottom: 0 !important;
  `,
  tableWrap: css`
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid #f3f4f6;
    overflow-x: auto;
    overflow-y: clip;
  `,
  addBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;
  `,
}))
