import React from 'react';
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
    ];
  }

  componentDidMount() {
    const { getList, list } = this.props;
    if (!list.length) {
      getList();
    }
  }

  render() {
    const { list, getList } = this.props;
    return (
      <div className="container">
        <div className={styles.header}>
          <CreateUser getList={getList} />
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
