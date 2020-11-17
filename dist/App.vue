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
            message="输入框是必填的噢"
          ></vux-form-field>
          <vux-form-field
            type="textarea"
            title="Textarea"
            prop="bb"
            v-model="formData.bb"
            placeholder="请输入多行文字"
            required
            :props="{
              max: 2000,
              readonly: true,
              autosize: true,
            }"
          ></vux-form-field>
          <vux-form-field
            type="number"
            title="Number"
            prop="cc"
            :rules="[
              { required: true, }
            ]"
          ></vux-form-field>
          <vux-form-field required prop="dd" message="下拉是必填的噢">
            <popup-radio title="PopupRadio" :options="options" v-model="formData.dd"></popup-radio>
          </vux-form-field>
          <vux-form-field required prop="ee" message="Picker是必填的噢" :rules="pickerRules">
            <popup-picker title="PopupPicker" :data="pickerOptions" v-model="formData.ee" show-name></popup-picker>
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
import { VuxForm, VuxFormField } from '../src'
import { XButton, Group, PopupRadio, PopupPicker } from 'vux'

export default {
  name: 'app',
  components: {
    VuxForm,
    VuxFormField,
    XButton,
    Group,
    PopupRadio,
    PopupPicker
  },
  data() {
    return {
      formData: {
        aa: '123',
        bb: '',
        cc: 123,
        dd: 'A',
        ee: ['A']
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
      pickerOptions: [['A', 'B']],
      pickerRules: [
        {
          transform(value) {
            if (Array.isArray(value)) {
              return value[0]
            }
            return value
          }
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData.bb =
        'Talk is cheap, show me the code. \n Talk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, '
    }, 1000)
  },
  methods: {
    submit() {
      this.$refs.form.submit((valid, field) => {
        if (!valid) {
          const msg = Object.values(field)[0][0].message
          this.$vux.toast.text(msg)
        } else {
          this.$vux.toast.text('sumbit handler: valid success')
        }
      })
    }
  }
}
</script>

<style>
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,
body {
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
