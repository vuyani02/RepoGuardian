import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  label: css`
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
  `,
  divider: css`
    color: #9ca3af;
    font-size: 12px;
    margin: 16px 0;
  `,
  errorText: css`
    color: #ef4444;
    font-size: 13px;
    margin-top: 8px;
  `,
  scanBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;

    &:hover:not(:disabled) {
      background: #4338ca !important;
      border-color: #4338ca !important;
    }
  `,
  cancelBtn: css`
    border-radius: 10px !important;
    font-weight: 500 !important;

    &:hover:not(:disabled) {
      color: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }
  `,
}))
