import React from 'react';
import { message } from 'antd';
import { request } from 'request/index';
import { userDelApi } from 'api/user';
import Table from 'components/Table';
import CreateUser from './components/createUser';
import styles from './index.module.less';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        render: (text, record) => (
          <>
            <span
              className={[styles.clickText, styles.edit].join(' ')}
              onClick={() => this.onEdit(record)}
            >
              编辑
            </span>
            <span
              className={styles.clickText}
              onClick={() => this.onDelete(record)}
            >
              删除
            </span>
          </>
        ),
      },
    ];
    this.state = {
      editedRecord: null,
    };
  }

  componentDidMount() {
    const { getList, list } = this.props;
    if (!list.length) {
      getList();
    }
  }

  onEdit(record) {
    this.setState({
      editedRecord: record,
    });
  }

  async onDelete(record) {
    const { getList } = this.props;
    const result = await request.post(userDelApi, {
      id: record.id,
    });
    if (result) {
      message.success('删除成功');
      getList();
    }
  }

  render() {
    const { list, getList } = this.props;
    const { editedRecord } = this.state;
    return (
      <div className="container">
        <div className={styles.header}>
          <CreateUser
            getList={getList}
            record={editedRecord}
            onCancel={() => {
              this.setState({
                editedRecord: null,
              });
            }}
            onOk={() => {
              this.setState({
                editedRecord: null,
              });
            }}
          />
        </div>
        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={list}
        />
      </div>
    );
  }
}

export default User;
