import React, { memo, useState, useEffect } from 'react';
import { Input, message } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { request } from 'request/index';
import { userCreateApi, userUpdateApi } from 'api/user';
import styles from './index.module.less';

const Index = memo(({
  getList, onOk, record, onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState({});
  useEffect(() => {
    if (!record) return;
    setVisible(true);
    setParams(record);
  }, [record]);
  return (
    <>
      <Button
        onClick={() => setVisible(true)}
      >
        新增
      </Button>
      <Modal
        title={record ? '编辑用户' : '新增用户'}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          onCancel();
        }}
        onOk={async () => {
          const result = await request.post(record ? userUpdateApi : userCreateApi, params);
          if (result) {
            message.success(record ? '编辑成功' : '新增成功！');
            getList();
            setVisible(false);
            onOk();
          }
        }}
      >
        <div className={styles.row}>
          <span className={styles.left}>姓名：</span>
          <Input
            value={params.userName}
            onChange={(e) => {
              setParams({ ...params, userName: e.target.value });
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>密码：</span>
          <Input
            value={params.password}
            onChange={(e) => {
              setParams({ ...params, password: e.target.value });
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>电话：</span>
          <Input
            value={params.phone}
            onChange={(e) => {
              setParams({ ...params, phone: e.target.value });
            }}
          />
        </div>
      </Modal>
    </>
  );
});

export default Index;
