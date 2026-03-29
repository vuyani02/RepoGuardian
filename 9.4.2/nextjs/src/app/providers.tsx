'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StyleProvider } from 'antd-style'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <StyleProvider>{children}</StyleProvider>
    </AntdRegistry>
  )
}

export default Providers
