import AsyncValidator from 'async-validator'
import components from './components'
import mixin from './mixin'
import './field.less'

const vuxField = {
  name: 'VuxField',
  inject: ['form'],
  components: {
    ...Object.values(Array.from(components)),
  },
  mixins: [mixin],
  model: {
    prop: 'value',
    event: 'on-change',
  },
  props: {
    prop: String,
    value: [String, Number, Boolean, Array, Object, Date],
    title: String,
    placeholder: String,
    type: String,
    props: Object,
    events: Object,
    rules: [Object, Array],
    required: Boolean,
    message: String,
  },
  computed: {
    fieldComponent() {
      const { component, type } = this
      if (component) {
        return component
      }
      return components[type]
    },
    isRequired() {
      const { rules, required } = this
      if (rules && rules.length) {
        const rulesRequired = rules.every((rule) => rule.required)
        return rulesRequired || required
      }
      return required
    },
    modelValue() {
      return this.form.model[this.prop]
    },
  },
  watch: {
    fieldValue(val) {
      this.validate()
      this.$emit('on-change', val)
      this.form.model[this.prop] = val
    },
    modelValue(val) {
      this.fieldValue = val
    },
    value(val) {
      this.fieldValue = val

      // https://github.com/airyland/vux/blob/v2/src/components/x-textarea/index.vue#L120
      // 内容小于最大长度时需要手动更新文本框高度
      const { type } = this
      if (type === 'textarea' && !!val) {
        this.$nextTick(() => {
          this.$refs[`vux${type}`].updateAutosize()
        })
      }
    },
  },
  data() {
    return {
      fieldValue: this.value || this.form.model[this.prop],
      validateState: '',
      validateMessage: this.message,
      initialValue: '',
    }
  },
  mounted() {
    const { fieldValue } = this
    if (Array.isArray(fieldValue)) {
      this.initialValue = [].concat(fieldValue)
    } else {
      this.initialValue = fieldValue
    }
  },
  methods: {
    getRules() {
      const selfRules = this.rules || []
      const requiredRule =
        this.isRequired !== undefined ? { required: !!this.isRequired } : []
      if (this.message && this.isRequired) {
        requiredRule.message = this.message
      }
      return selfRules.some((rules) => rules.required)
        ? [].concat(selfRules)
        : [].concat(selfRules, requiredRule)
    },
    validate(cb) {
      const rules = this.getRules()

      const descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)

      const model = {}
      model[this.prop] = this.fieldValue

      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = errors ? 'error' : 'success'
          this.validteMessage = errors ? errors[0].message : ''
          cb(this.validteMessage, invalidFields)
        }
      )
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
    },
    resetField() {
      const { initialValue } = this
      if (Array.isArray(initialValue)) {
        this.fieldValue = [].concat(initialValue)
      } else {
        this.fieldValue = initialValue
      }
      this.$nextTick(() => {
        this.clearValidate()
      })
    },
  },
  created() {
    this.form.addField(this)
  },
  beforeDestroy() {
    this.form.removeField(this)
  },
  render(h) {
    const {
      fieldComponent,
      fieldValue,
      type,
      title,
      placeholder,
      props,
      isRequired,
      validateState
    } = this

    let fieldChildren

    if (type) {
      // https://stackoverflow.com/a/50892881/6472444
      const children = Object.keys(this.$slots).map(slot => h('template', { slot }, this.$slots[slot]))
      const typeVNode = h(fieldComponent, {
        ref: `vux${type}`,
        props: {
          title,
          placeholder,
          required: isRequired,
          value: fieldValue,
          ...props,
        },
        on: this.events,
        scopedSlots: this.$scopedSlots,
      }, children)
   
      fieldChildren = [typeVNode]
    } else {
      fieldChildren = this.$slots.default
    }

    return h('div', {
      class: {
        'vux-form-field': true,
        'is-required': isRequired,
        'is-success': validateState === 'success',
        'is-error': validateState === 'error',
      }
    }, fieldChildren)
  }
}

export default vuxField

