import React from 'react';
import { Table } from 'antd';
import styles from './index.module.less';

class CTable extends React.Component {
  render() {
    const { columns } = this.props;
    return (
      <Table
        /* eslint-disable */
        {...this.props}
        pagination={false}
        columns={columns}
        className={styles.table}
      />
    );
  }
}

export default CTable;
