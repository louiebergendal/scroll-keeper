import Attributes from '../components/attributes.vue'

export default {
  title: 'Attributes',
  component: Attributes,
}

const Template = (args) => ({
  components: { Attributes },
  setup() {
    return { args }
  },
  template: '<attributes />',
})

export const Primary = Template.bind({})
Primary.args = {}
