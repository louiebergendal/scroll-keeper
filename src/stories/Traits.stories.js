import Traits from '../components/traits.vue'

export default {
  title: 'Traits',
  component: Traits,
}

const Template = (args) => ({
  components: { Traits },
  setup() {
    return { args }
  },
  template: '<traits />',
})

export const Primary = Template.bind({})
Primary.args = {}
