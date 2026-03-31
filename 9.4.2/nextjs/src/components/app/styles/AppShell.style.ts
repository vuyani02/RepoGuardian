import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  shell: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  main: css`
    flex: 1;
    background: #f9fafb;
    padding-top: 60px;
  `,
}))
