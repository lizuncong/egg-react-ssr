import React from 'react';

class NotFound extends React.Component {
  render() {
    const { staticContext } = this.props;

    // 只有服务端才接收这个staticContext
    if (staticContext) {
      staticContext.status = 404;
    }
    return (
      <div>404，当你看到这个页面的时候，说明你真的迷路了。</div>
    );
  }
}

export default NotFound;
