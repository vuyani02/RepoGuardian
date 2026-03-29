import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  footer: css`
    background: #ffffff;
    border-top: 1px solid #f3f4f6;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;

    @media (max-width: 768px) {
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  copyright: css`
    font-size: 13px !important;
    color: #9ca3af !important;
  `,
  brand: css`
    font-size: 13px !important;
    color: #9ca3af !important;

    span {
      color: #4f46e5;
      font-weight: 600;
    }
  `,
}))
