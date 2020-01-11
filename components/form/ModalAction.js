import { Modal, Icon, Typography } from 'antd'

export default ({ isVisible, icon, title, description, action, close }) => {
  const { Title, Paragraph } = Typography

  return (
    <Modal
      centered
      visible={isVisible}
      onCancel={close}
      bodyStyle={{ paddingTop: '2rem' }}
      footer={[]}
    >
      <div className="text-center">
        <Icon component={icon} style={{ fontSize: '5rem' }} />
        <Title level={2}>{title}</Title>
        <Paragraph className="subtitle">{description}</Paragraph>

        <div className="text-center px-5">
          {action}
          <a onClick={close} className="mt-2 text-bold d-block">CLOSE</a>
        </div>
      </div>
    </Modal>
  )
}
