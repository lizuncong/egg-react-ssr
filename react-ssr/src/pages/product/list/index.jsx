import React from 'react';
import Create from './components/create';
import Card from './components/card';
import styles from './index.module.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { list, getList } = this.props;
    const { editedRecord } = this.state;
    return (
      <div className={['container', styles.container].join(' ')}>
        <div className={styles.header}>
          <Create
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
        <div className={styles.gridContainer}>
          {
            list.map((item) => (
              <Card
                info={item}
                key={item.id}
                getList={getList}
                onEdit={(info) => {
                  this.setState({
                    editedRecord: info,
                  });
                }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Index;
