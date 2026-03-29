import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  modalTitle: css`font-weight: 700;`,
  form: css`margin-top: 16px;`,
  input: css`border-radius: 10px !important;`,
  okBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
  `,
}))
