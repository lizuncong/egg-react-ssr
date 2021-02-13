import React, { memo, useState } from 'react';
import { Input, message } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { request } from 'request/index';
import { userCreateApi } from 'api/user';
import styles from './index.module.less';

const Index = memo(({ getList }) => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Button
        onClick={() => setVisible(true)}
      >
        新增
      </Button>
      <Modal
        title="新增用户"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={async () => {
          const result = await request.post(userCreateApi, {
            userName,
            phone,
            password,
          });
          if (result) {
            message.success('新增成功！');
            getList();
            setVisible(false);
          }
        }}
      >
        <div className={styles.row}>
          <span className={styles.left}>姓名：</span>
          <Input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>密码：</span>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>电话：</span>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
      </Modal>
    </>
  );
});

export default Index;
