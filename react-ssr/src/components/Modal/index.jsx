import React, { memo } from 'react';
import { Modal } from 'antd';
import styles from './index.module.less';

const Index = memo(({
  title, children, visible, onOk, onCancel,
  okText = '确认', cancelText = '取消',
}) => (
  <Modal
    wrapClassName={styles.customModal}
    title={title}
    visible={visible}
    onOk={onOk}
    okText={okText}
    cancelText={cancelText}
    onCancel={onCancel}
  >
    {children}
  </Modal>
));

export default Index;
