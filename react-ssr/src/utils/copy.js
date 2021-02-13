import { message } from 'antd';

const execCopy = (data) => {
  const element = document.createElement('p');
  element.innerText = data;
  element.style.cssText = 'color: "rgba(0, 0, 0, 0); pointer-event: none;"';
  document.body.appendChild(element);
  const range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(element);
  window.getSelection().addRange(range);
  const copyStatus = document.execCommand('Copy');
  if (copyStatus) {
    message.success('复制成功');
  } else {
    message.error('复制失败');
  }
  window.getSelection().removeAllRanges();
  document.body.removeChild(element);
};

export default execCopy;
