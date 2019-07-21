<template>
  <div
    class="vux-form-field"
    :class="{
    'is-required': isRequired,
    'is-success': validateState === 'success',
    'is-error': validateState === 'error',
  }"
  >
    <slot>
      <component
        :is="fieldComponent"
        :placeholder="placeholder"
        :title="title"
        :required="isRequired"
        v-model="fieldValue"
        v-bind="props"
        v-on="events"
      ></component>
    </slot>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import components from './components'
import mixin from './mixin'

export default {
  name: "VuxFormField",
  inject: [ 'form' ],
  components: {
    ...Object.values(Array.from(components))
  },
  mixins: [ mixin ],
  model: {
    prop: "value",
    event: "on-change"
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
        const rulesRequired = rules.every(rule => rule.required)
        return rulesRequired || required
      }
      return required;
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
  },
  data() {
    return {
      fieldValue: this.value || this.form.model[this.prop],
      validateState: "",
      validateMessage: this.message,
    };
  },
  methods: {
    getRules() {
      const selfRules = this.rules || []
      const requiredRule =
        this.isRequired !== undefined ? { required: !!this.isRequired } : []
      if (this.message && this.isRequired) {
        requiredRule.message = this.message
      }
      return selfRules.some(rules => rules.required)
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
          this.validateState = errors ? "error" : "success"
          this.validteMessage = errors ? errors[0].message : ""
          cb(this.validteMessage, invalidFields)
        }
      );
    },
  },
  created() {
    this.form.addField(this)
  },
  mounted() {
  },
  beforeDestroy() {
    this.form.removeField(this)
  }
};
</script>
<style lang="less">
.vux-form-field {
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    height: 1px;
    color: #d9d9d9;
    border-top: 1px solid #d9d9d9;
    left: 15px;
    content: "";
    transform: scaleY(0.5);
    transform-origin: 0 0;
  }
  &.is-required {
    display: flex;
    align-items: center;
    &::before {
      content: "*";
      display: inline-block;
      vertical-align: middle;
      padding-left: 15px;
      padding-top: 12px;
      color: red;
    }
    .weui-cell {
      flex: 1;
    }
  }
  &.is-error {
    color: red;
    input::placeholder, textarea::placeholder {
      color: red;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: red;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: red;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: red;
    }
  }
}
</style>

