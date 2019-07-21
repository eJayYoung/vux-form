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
      fields: [],
    };
  },
  methods: {
    submit(cb) {
      this.validate(cb);
    },
    validate(cb) {
      const { fields } = this
      let valid = true
      let count = 0
      let invalidFields = {}
      fields.forEach(field => {
        field.validate((message, field) => {
          if (message) valid = false
          invalidFields = Object.assign({}, invalidFields, field)
          if (typeof cb === 'function' && ++count === fields.length) {
            cb(valid, invalidFields);
          }
        });
      });
    },
    addField(field) {
      this.fields.push(field);
    },
    removeField(field) {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    },
  }
};
</script>
<style lang="less" scoped>
</style>

