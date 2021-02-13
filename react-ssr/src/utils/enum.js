class CEnum {
  constructor(options) {
    Object.keys(options).forEach((key) => {
      const op = options[key];
      this[key] = op;
      if (op.value !== undefined) {
        this[op.value] = op;
      }
    });
    this.list = Object.values(options);
  }

  // 根据value值获取对应的label
  getLabel(value) {
    const op = this[value] || { label: '' };
    return op.label;
  }

  // 根据给定的key及key对应的值，获取value
  getValueByKey(keyValue, keyName) {
    const op = this.list.find((item) => item[keyName] === keyValue);
    return op ? op.value : '';
  }

  // 根据value值，获取给定key的值
  get(value, key) {
    if (key === 'label') {
      return this.getLabel(value);
    }
    const op = this[value] || {};
    if (key === undefined) {
      return op;
    }
    return op[key] || '';
  }
}

export default CEnum;
