import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  label: css`
    display: block;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 6px;
    color: rgba(0, 0, 0, 0.85);
  `,
  errorText: css`
    display: block;
    margin-top: 8px;
    color: #ff4d4f;
    font-size: 13px;
  `,
  cancelBtn: css`
    min-width: 80px;
    border-radius: 10px !important;
    font-weight: 500 !important;

    &:hover:not(:disabled) {
      color: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }
  `,
  scanBtn: css`
    min-width: 80px;
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;

    &:hover:not(:disabled) {
      background: #4338ca !important;
      border-color: #4338ca !important;
    }
  `,
}))
