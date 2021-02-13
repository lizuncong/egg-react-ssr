import React from 'react';
import { Button, Input } from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
  }

  render() {
    const { username, password } = this.state;
    const { userInfo, login, logout } = this.props;
    if (userInfo.username) {
      return (
        <div>
          <div>
            欢迎：
            {userInfo.username}
          </div>
          <Button
            onClick={() => {
              logout();
            }}
          >
            退出
          </Button>
        </div>
      );
    }
    return (
      <div className="pageContainer">
        <div>
          <div>
            账号：
            <Input
              value={username}
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div>
            密码：
            <Input
              value={password}
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => {
            login({
              username, password,
            });
          }}
        >
          登录
        </Button>
      </div>
    );
  }
}

export default Login;
