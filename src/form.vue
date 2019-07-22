<template>
  <form ref="form" class="vux-form">
    <slot>
      <group v-for="(group, index) in groups" :key="index" :title="group.title">
        <vux-form-field
          v-for="(field, index) in group.fields"
          :key="index"
          v-model="model[field.prop]"
          v-bind="field"
        ></vux-form-field>
      </group>
    </slot>
  </form>
</template>
<script>
import { Group } from "vux";
import VuxFormField from "./field";

export default {
  name: "VuxForm",
  provide() {
    return {
      form: this
    }
  },
  components: {
    Group,
    VuxFormField
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    },
    schema: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    groups: vm => {
      const { schema } = vm;
      const { groups = [], fields } = schema;
      if (fields) {
        groups.unshift({
          fields
        });
      }
      return groups;
    }
  },
  data() {
    return {
      formFields: [],
    };
  },
  methods: {
    submit(cb) {
      this.validate(cb);
    },
    validate(cb) {
      let promise;
      // if no callback, return promise
      if (typeof cb !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          cb = function(valid) {
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      const { formFields } = this
      let valid = true
      let count = 0
      let invalidFields = {}
      formFields.forEach(field => {
        field.validate((message, field) => {
          if (message) valid = false
          invalidFields = Object.assign({}, invalidFields, field)
          if (typeof cb === 'function' && ++count === formFields.length) {
            cb(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    addField(field) {
      this.formFields.push(field);
    },
    removeField(field) {
      if (field.prop) {
        this.formFields.splice(this.formFields.indexOf(field), 1);
      }
    },
  }
};
</script>
<style lang="less" scoped>
</style>

