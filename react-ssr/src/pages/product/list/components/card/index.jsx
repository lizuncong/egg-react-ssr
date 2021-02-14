import React from 'react';
import { Modal, message } from 'antd';
import { productUpdateApi, productDelApi } from 'api/product';
import { request } from 'request';
import styles from './index.module.less';

const Card = ({ info, getList, onEdit }) => (
  <div className={styles.card}>
    <div className={styles.left}>
      <img src={info.image} alt="" />
    </div>
    <div className={styles.right}>
      <div className={styles.productName}>
        {info.name}
      </div>
      <div>
        <span className={styles.productPrice}>{info.price}</span>
        ¥
      </div>
      <div>{info.status === '1' ? '上架' : '下架'}</div>
      <div>{info.createdAt}</div>
      <div>{info.description}</div>
    </div>
    <div className={styles.operate}>
      <div className={styles.bottom}>
        <span
          onClick={() => {
            onEdit(info);
          }}
        >
          编辑
        </span>
        <span
          onClick={async () => {
            const result = await request.post(productUpdateApi, {
              id: info.id,
              status: info.status === '1' ? '2' : '1',
            });
            if (result) {
              getList();
            }
          }}
        >
          { info.status === '1' ? '下架' : '上架'}
        </span>
        <span
          onClick={() => {
            Modal.confirm({
              title: '确认删除商品？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const result = await request.post(productDelApi, { id: info.id });
                if (result) {
                  message.success('删除成功！');
                  getList();
                }
              },
            });
          }}
        >
          删除
        </span>
      </div>
    </div>
  </div>
);

export default Card;
