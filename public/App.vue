<template>
  <div id="app">
    <div class="form-demo">
      <vux-form ref="form" :model="formData" :schema="formSchema">
        <group title="表单标准化">
          <vux-form-field
            type="input"
            title="Input"
            prop="aa"
            placeholder="请输入"
            required
            :rules="[]"
          ></vux-form-field>
          <vux-form-field
            type="textarea"
            title="Textarea"
            prop="bb"
            placeholder="请输入多行文字"
            required
          ></vux-form-field>
          <vux-form-field
            type="number"
            title="Number"
            prop="cc"
            :rules="[
              { required: true, }
            ]"
          ></vux-form-field>
          <vux-form-field
            required
            prop="dd"
          >
            <popup-radio title="PopupRadio" :options="options" v-model="formData.dd"></popup-radio>
          </vux-form-field>
        </group>
      </vux-form>
      <group>
        <x-button type="primary" @click.native="submit">Submit</x-button>
      </group>
    </div>
  </div>
</template>

<script>
import { VuxForm, VuxFormField } from "../src";
import { XButton, Group, PopupRadio } from "vux";

export default {
  name: "app",
  components: {
    VuxForm,
    VuxFormField,
    XButton,
    Group,
    PopupRadio,
  },
  data() {
    return {
      formData: {
        aa: "hello ejay",
        bb: "Talk is cheap, show me the code",
        cc: 123,
        dd: '',
      },
      formSchema: {
        groups: [
          // {
          //   title: '表单标准化',
          //   fields: [
          //     {
          //       modelKey: 'aa',
          //       title: 'Input',
          //       type: 'input',
          //       placeholder: '请输入',
          //       rules: [
          //       ],
          //     },
          //     {
          //       modelKey: 'bb',
          //       title: 'Textarea',
          //       type: 'textarea',
          //       placeholder: '请输入',
          //     },
          //     {
          //       modelKey: 'cc',
          //       title: 'Number',
          //       type: 'number',
          //     },
          //   ],
          // },
        ]
      },
      options: ['A', 'B', 'C'],
    };
  },
  methods: {
    submit() {
      this.$refs.form.submit((valid, field) => {
        console.log('submit result:', valid, field)
      });
    },
  }
};
</script>

<style>


</style>

<style lang="less">
@import "~vux/src/styles/reset.less";

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
  .form-demo {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

</style>
