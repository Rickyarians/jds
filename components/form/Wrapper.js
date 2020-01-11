import { Row, Col } from 'antd'

import FormSection from './FormSection'

export default (props) => {
  const {
    logo, children, formTitle,
    pageTitle, pageDesctiption, formDescription
  } = props

  return (
    <Row className="auth" type="flex" justify="center"  style={{backgroundColor: '#00B8F0', paddingTop: '3%', paddingBottom: '3%'}}>
      <Col lg={18} md={18} sm={24} xs={24} className="p-5" style={{backgroundColor: '#fff', }}>
        <FormSection title={formTitle} description={formDescription} logo={logo}>
          {children}
        </FormSection>
      </Col>
    </Row>
  )
}
