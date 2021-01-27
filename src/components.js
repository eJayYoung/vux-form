import XInput from 'vux/src/components/x-input';
import XTextarea from 'vux/src/components/x-textarea';
import XNumber from 'vux/src/components/x-number';
import Datetime from 'vux/src/components/datetime';
import PopupPicker from 'vux/src/components/popup-picker';
import PopupRadio from 'vux/src/components/popup-radio';

import Uploader from 'vux-uploader-component';

export default {
  input: XInput,
  textarea: XTextarea,
  number: XNumber,
  datetime: Datetime,
  picker: PopupPicker,
  radio: PopupRadio,
  uploader: Uploader
};
