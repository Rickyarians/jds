import { Fragment } from 'react'
import { Typography } from 'antd'

export default ({ title, description, logo, children }) => {
  const { Title, Paragraph } = Typography

  return (
    <Fragment>
      <div className="mt-3">
        <img src={logo} className="logo-img" />
        <div className="mt-4">
          <Title level={3} className="mb-0">{title}</Title>
          <Paragraph className="subtitle">{description}</Paragraph>
        </div>
      </div>

      <div className="mb-3">
        {children}
      </div>
    </Fragment>
  )
}
