import React, { Component } from 'react';
import { Spin } from 'antd'

export class Dashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }
  componentDidMount(props) {

  }
  render() {
    return (
      // <Spin spinning={this.state.loading}>

      // </Spin>
      <div>
        <h2>欢迎进入博客管理后台....</h2>
      </div>
    )
  }
}
