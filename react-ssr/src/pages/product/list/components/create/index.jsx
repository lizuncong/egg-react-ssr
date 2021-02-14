import React, { memo, useState, useEffect } from 'react';
import { Input, message } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { request } from 'request';
import { productCreateApi, productUpdateApi } from 'api/product';
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
          setParams({});
          onCancel();
        }}
        onOk={async () => {
          const result = await request.post(record ? productUpdateApi : productCreateApi, params);
          if (result) {
            message.success(record ? '编辑成功' : '新增成功！');
            getList();
            setVisible(false);
            onOk();
            setParams({});
          }
        }}
      >
        <div className={styles.row}>
          <span className={styles.left}>商品名称：</span>
          <Input
            value={params.name}
            onChange={(e) => {
              setParams({ ...params, name: e.target.value });
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>商品价格：</span>
          <Input
            value={params.price}
            onChange={(e) => {
              setParams({ ...params, price: e.target.value });
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.left}>商品描述：</span>
          <Input
            value={params.description}
            onChange={(e) => {
              setParams({ ...params, description: e.target.value });
            }}
          />
        </div>
      </Modal>
    </>
  );
});

export default Index;
