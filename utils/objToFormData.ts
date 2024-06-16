export const objToFormData = (obj: any) => {
  const formData = new FormData();

  _objToFormData(obj, formData);

  return formData;
};

const _objToFormData = (obj: any, formData: FormData, key: string = '') => {
  if (Object.prototype.toString.call(obj) == '[object FileList]') {
    formData.append(key, obj[0]);
  } else if (obj !== null && typeof obj === 'object') {
    Object.entries(obj).forEach(([index, value]) => {
      _objToFormData(value, formData, key == '' ? index : `${key}[${index}]`);
    });
  } else {
    formData.append(key, obj);
  }
};
