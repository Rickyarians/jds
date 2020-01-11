import '../public/assets/styles/form.less'

import FormWrapper from '../components/form/Wrapper'
import FormComponent from '../components/form/Form'

export default (props) => {
  return (
    <FormWrapper {...props}>
      <FormComponent inputs={props.inputs} links={props.links} submitText={props.submitText} onSubmit={props.onSubmit} />
    </FormWrapper>
  )
}
