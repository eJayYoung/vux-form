<template>
  <div id="app">
    <div class="form-demo">
      <vux-form
        ref="form"
        :model="formData"
        :schema="formSchema"
      >
        <group title="内置表单">
          <vux-form-field
            type="input"
            title="Input"
            prop="input"
            placeholder="请输入"
            required
            message="输入框是必填的噢"
            :events="{
              'on-blur': handleInputOnBlur
            }"
          ></vux-form-field>
          <vux-form-field
            type="textarea"
            title="Textarea"
            prop="textarea"
            v-model="formData.textarea"
            placeholder="请输入多行文字"
            required
            :props="{
              max: 2000,
              autosize: true,
            }"
          ></vux-form-field>
          <vux-form-field
            type="number"
            title="Number"
            prop="number"
            required
            message="Number是必填的噢"
            :props="{
              fillable: true
            }"
          ></vux-form-field>
          <vux-form-field
            type="switch"
            title="Switch"
            prop="switch"
            required
            message="Switch是必填的噢"
          ></vux-form-field>
          <vux-form-field
            type="radio"
            title="PopupRadio"
            prop="radio"
            required
            message="Radio是必填的噢"
            :props="{
              options
            }"
          ></vux-form-field>
          <vux-form-field
            type="picker"
            title="PopupPicker"
            prop="picker"
            required
            message="Picker是必填的噢"
            :rules="pickerRules"
            :props="{
              data: pickerOptions
            }"
          ></vux-form-field>
          <vux-form-field
            type="upload"
            title="Upload"
            prop="upload"
            required
            message="上传组件是必填的噢"
          ></vux-form-field>
          <vux-form-field
            type="calendar"
            title="Calendar"
            prop="calendar"
            placeholder="请选择日历组件"
            required
            message="日历组件是必填的噢"
          ></vux-form-field>
          <vux-form-field
            type="date"
            title="Datetime"
            prop="date"
            placeholder="请选择时间组件"
            required
            message="时间组件是必填的噢"
            :props="{
              format: 'HH:mm'
            }"
          ></vux-form-field>
        </group>
        <group title="自定义组件">
          <vux-form-field
            prop="selector"
            required
            message="selector是必填的噢"
          >
            <selector
              title="Selector"  
              v-model="formData.selector"
              :options="[
                {key: true, value: '是'},
                {key: false, value: '否'}
              ]"
            ></selector>
          </vux-form-field>
        </group>
      </vux-form>
      <group>
        <x-button
          type="primary"
          @click.native="submit"
        >Submit</x-button>
      </group>
    </div>
  </div>
</template>

<script>
import { VuxForm, VuxFormField } from '../src'
import { XButton, Group, Selector } from 'vux'

export default {
  name: 'app',
  components: {
    VuxForm,
    VuxFormField,
    XButton,
    Group,
    Selector,
  },
  data() {
    return {
      formData: {
        input: '123',
        textarea:
          'Talk is cheap, show me the code. \n Talk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap',
        number: 123,
        switch: null,
        radio: '小米',
        picker: ['A'],
        upload: [
          {
            url:
              'https://raw.githubusercontent.com/eJayYoung/vux-uploader-component/master/assets/logo.png',
          },
        ],
        date: null,
        calendar: '',
        selector: '',
      },
      formSchema: {
        groups: [
          // {
          //   title: '表单标准化',
          //   fields: [
          //     {
          //       modelKey: 'input',
          //       title: 'Input',
          //       type: 'input',
          //       placeholder: '请输入',
          //       rules: [
          //       ],
          //     },
          //     {
          //       modelKey: 'textarea',
          //       title: 'Textarea',
          //       type: 'textarea',
          //       placeholder: '请输入',
          //     },
          //     {
          //       modelKey: 'number',
          //       title: 'Number',
          //       type: 'number',
          //     },
          //   ],
          // },
        ],
      },
      options: ['苹果', '华为', '小米'],
      pickerOptions: [['A', 'B', 'C']],
      pickerRules: [
        {
          transform(value) {
            if (Array.isArray(value)) {
              return value[0]
            }
            return value
          },
        },
      ],
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.form.submit((valid, field) => {
        if (!valid) {
          const msg = Object.values(field)[0][0].message
          this.$vux.toast.text(msg)
        } else {
          this.$vux.toast.text('valid success!')
          // eslint-disable-next-line no-console
          console.log('formData:', JSON.parse(JSON.stringify(this.formData)))
        }
      })
    },
    handleInputOnBlur(value, $event) {
      // eslint-disable-next-line no-console
      console.log('handle input onblur:', value, $event)
    }
  },
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
