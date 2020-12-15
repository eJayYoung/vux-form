# vux-form

![](https://api.travis-ci.org/eJayYoung/vux-form.svg?branch=master)

a form solution for [vux](https://github.com/airyland/vux)

## Install

```bash
npm install -S vux-form

// or

yarn add vux-form
```

## Online demo
![](./assets/qrcode.png)

[https://ejayyoung.github.io/vux-form/](https://ejayyoung.github.io/vux-form/)

## Usage

### Basic
```html
<template>
  <vux-form
    ref="form"
    :model="formData"
  >
    <vux-form-field
      type="input"
      prop="aa"
      title="Input"
      placeholder="please enter"
      required
      message="Input is required"
    ></vux-form-field>
  </vux-form-field>
</template>
<script>
  import { VuxForm, VuxFormField } from 'vux-form
  export default {
    components: {
      VuxForm,
      VuxFormField
    },
    data() {
      return {
        formData: {
          aa: ''
        }
      }
    }
  }
</script>
```

### pass built-in components self props
```html
<template>
  <vux-form
    ref="form"
    :model="formData"
  >
    <vux-form-field
      type="input"
      prop="aa"
      title="Input"
      placeholder="please enter"
      :props="{
        'type': 'email',
        'readonly': true,
        'text-align': 'right'
      }"
    ></vux-form-field>
  </vux-form-field>
</template>
<script>
  import { VuxForm, VuxFormField } from 'vux-form
  export default {
    components: {
      VuxForm,
      VuxFormField
    },
    data() {
      return {
        formData: {
          aa: ''
        }
      }
    }
  }
</script>
```

### pass built-in components self events
```html
<template>
  <vux-form
    ref="form"
    :model="formData"
  >
    <vux-form-field
      type="input"
      prop="aa"
      title="Input"
      placeholder="please enter"
      :events="{
        'on-focus': handleInputFocus,
        'on-blur': handleInputBlur
      }"
    ></vux-form-field>
  </vux-form-field>
</template>
<script>
  import { VuxForm, VuxFormField } from 'vux-form

  export default {
    components: {
      VuxForm,
      VuxFormField
    },
    methods: {
      handleInputFocus(value, $event) {
        console.log('handle input focus:', value, $event);
      },
      handleInputBlur(value, $event) {
        console.log('handle input blur:', value, $event);
      }
    }
  }
</script>
```

### validate rules
```html
<template>
  <vux-form
    ref="form"
    :model="formData"
  >
    <vux-form-field
      type="input"
      prop="aa"
      title="Input"
      placeholder="please enter"
      :props="{
        type: 'number'
      }"
      :rules="[
        { required: true, message: 'input is required' },
        {
          validator(rules, value, cb) {
            if (value > 0) {
              cb()
            } else {
              cb('请输入大于0的数字')
            }
          }
        }
      ]"
    ></vux-form-field>
  </vux-form-field>
</template>
<script>
  import { VuxForm, VuxFormField } from 'vux-form

  export default {
    components: {
      VuxForm,
      VuxFormField
    },
    methods: {
      handleInputFocus(value, $event) {
        console.log('handle input focus:', value, $event);
      },
      handleInputBlur(value, $event) {
        console.log('handle input blur:', value, $event);
      }
    }
  }
</script>
```

### custom field
```html
<template>
  <vux-form
    ref="form"
    :model="formData"
  >
    <vux-form-field
      prop="aa"
    >
      <custom-component v-model="formData.aa"></custom-component>
    </vux-form-field>
  </vux-form-field>
</template>
<script>
  import { VuxForm, VuxFormField } from 'vux-form
  import CustomComponent from 'custom-component'
  export default {
    components: {
      VuxForm,
      VuxFormField,
      CustomComponent
    },
    data() {
      return {
        formData: {
          aa: ''
        }
      }
    }
  }
</script>
```

## Props

### VuxForm
| property | type | default | description |
| -------- | ---- | ------- | ----------- |
| model | Object | {} | 表单数据对象，在使用validate方法情况下，为必填 |

### VuxFormField
| property | type | default | description |
| -------- | ---- | ------- | ----------- |
| prop | String | - | 表单域字段，传入`VuxForm`组件的`model`中的`key`，在使用validate方法情况下，为必填 |
| title | String | - | label标签的文本 |
| placeholder | String | - | 表单域占位符的文本 |
| type | String | - | 内置组件类型，目前已有：`input`, `textarea`, `number`, `datetime`, `picker`, `radio`, `uploader` |
| props | Object | - | 内置组件对应组件的props, 参考[demo](#pass-built-in-components-self-props) |
| events | Object | - | 内置组件对应组件的events, 参考[demo](#pass-built-in-components-self-events) |
| rules | Array \| Object | - | 校验规则，参考[async-validator](https://github.com/yiminghe/async-validator) |
| required | Boolean | - | 是否必填 |
| message | String | - | 校验提示语 |

### built-in components type Mapping
| type | component |
| ---- | --------- |
| input | [x-input](https://doc.vux.li/zh-CN/components/x-input.html) |
| textarea | [x-textarea](https://doc.vux.li/zh-CN/components/x-textarea.html) |
| number | [x-number](https://doc.vux.li/zh-CN/components/x-number.html) |
| datetime | [datetime](https://doc.vux.li/zh-CN/components/datetime.html) |
| picker | [popup-picker](https://doc.vux.li/zh-CN/components/popup-picker.html) |
| radio | [popup-radio](https://doc.vux.li/zh-CN/components/popup-radio.html) |
| uploader | [vux-uploader-component](https://github.com/eJayYoung/vux-uploader-component) |


## Form Instance Methods

| method | description | params |
| ------ | ----------- | ------ |
| validate | 对整个表单进行校验的方法，参数为一个回调函数，该回调函数会在校验结束后被调用，并传入两个参数：valid(是否校验通过),invalidFields(未通过校验的字段)，若不传入回调函数，则会返回一个promise | Function(callback: Function(valid: Boolean, invalidFields: Object) |
| submit | 同上 | 同上 |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | - |

## TodoList

- [x] 内置类型扩展及完善
- [x] 统一的表单样式及校验方式
- [ ] 重置表单方法`reset`


## Development
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for demo
```
yarn run build:demo
```

### build for production with minification
```
yarn run build:lib
```

### Lints and fixes files
```
yarn run lint
```

### publish package
```
npm version patch
npm publish
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).