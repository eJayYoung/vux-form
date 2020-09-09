<template>
  <div id="app">
    <div class="form-demo">
      <group
        class="demo-section"
        title="内置表单"
      >
        <vux-form
          ref="form1"
          :model="formData1"
        >
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
        </vux-form>
        <group>
          <x-button
            type="primary"
            @click.native="submit(1)"
          >Submit</x-button>
          <x-button
            @click.native="clearValidate(1)"
          >clear validate</x-button>
          <x-button
            @click.native="resetForm(1)"
          >Reset</x-button>
        </group>
      </group>
      <group
        class="demo-section"
        title="自定义组件"
      >
        <vux-form
          ref="form2"
          :model="formData2"
        >
          <vux-form-field
            prop="selector"
            required
            message="selector是必填的噢"
          >
            <selector
              title="Selector"
              v-model="formData2.selector"
              direction="rtl"
              :options="[
                {key: true, value: '是'},
                {key: false, value: '否'}
              ]"
            ></selector>
          </vux-form-field>
        </vux-form>
        <group>
          <x-button
            type="primary"
            @click.native="submit(2)"
          >Submit</x-button>
        </group>
      </group>
      <group title="类型校验">
        <vux-form
          ref="form3"
          :model="formData3"
        >
          <vux-form-field
            title="数字校验"
            type="input"
            prop="validNumber"
            :props="{
              type: 'number',
              textAlign: 'right',
            }"
            :rules="[
              {
                required: true,
                message: '数字校验不能为空'
              },
              {
                transform: value => Number(value),
                validator: (rule, value) => value !== 0,
                message: '数字校验不能为0'
              }
            ]"
          ></vux-form-field>
          <vux-form-field
            title="邮箱校验"
            type="input"
            prop="validEmail"
            required
            message="邮箱校验不能为空"
            :props="{
              textAlign: 'right',
            }"
            :rules="[
              {
                type: 'email',
                message: '不符合邮箱格式'
              }
            ]"
          ></vux-form-field>
        </vux-form>
        <group>
          <x-button
            type="primary"
            @click.native="submit(3)"
          >Submit</x-button>
        </group>
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
      formData1: {
        input: '123',
        textarea:
          'Talk is cheap, show me the code. \n Talk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap, show me the codeTalk is cheap',
        number: 123,
        switch: false,
        radio: '',
        picker: ['A'],
        upload: [
          {
            url:
              'https://raw.githubusercontent.com/eJayYoung/vux-uploader-component/master/assets/logo.png',
          },
        ],
        calendar: '',
        date: null,
      },
      formData2: {
        selector: '',
      },
      formData3: {
        validNumber: '',
      },
      formData4: {
        province: [],
        city: [],
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
      provinceOptions: [['浙江', '江苏', '安徽']],
      cityMap: {
        '浙江': [['杭州', '宁波', '温州']],
        '江苏': [['南京', '苏州', '无锡']],
        '安徽': [['合肥', '安庆', '宿州']],
      },
    }
  },
  mounted() {},
  methods: {
    submit(serial) {
      this.$refs[`form${serial}`].submit((valid, field) => {
        if (!valid) {
          const msg = Object.values(field)[0][0].message
          this.$vux.toast.text(msg)
        } else {
          this.$vux.toast.text('valid success!')
          // eslint-disable-next-line no-console
          console.log('formData:', JSON.parse(JSON.stringify(this[`formData${serial}`])))
        }
      })
    },
    clearValidate(serial) {
      this.$refs[`form${serial}`].clearValidate()
    },
    resetForm(serial) {
      this.$refs[`form${serial}`].resetFields()
    },
    handleInputOnBlur(value, $event) {
      // eslint-disable-next-line no-console
      console.log('handle input onblur:', value, $event)
    },
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
    .demo-section {
      margin-bottom: 20px;
    }
  }
}
</style>
