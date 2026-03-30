'use client'

import { Form, Input, Modal } from 'antd'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { useStyles } from './styles/AddRepositoryModal.style'
import { AddRepositoryModalProps } from '@/Types/Repository/Types'

const AddRepositoryModal = ({ open, onClose }: AddRepositoryModalProps) => {
  const { styles } = useStyles()
  const [form] = Form.useForm()
  const { addRepository } = useRepositoryActions()
  const { isAddPending } = useRepositoryState()

  const handleSubmit = async (values: { githubUrl: string }) => {
    await addRepository(values.githubUrl)
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Add Repository"
      okButtonProps={{ loading: isAddPending, className: styles.okBtn }}
      title={<span className={styles.modalTitle}>Add Repository</span>}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
        <Form.Item
          label="GitHub URL"
          name="githubUrl"
          rules={[
            { required: true, message: 'Please enter a GitHub URL' },
            {
              pattern: /^https:\/\/github\.com\/[^/]+\/[^/]+/,
              message: 'Must be a valid GitHub repo URL (e.g. https://github.com/owner/repo)',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="https://github.com/owner/repo"
            className={styles.input}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddRepositoryModal
