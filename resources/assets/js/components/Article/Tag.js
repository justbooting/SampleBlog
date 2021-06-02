import React, { Component, useState } from 'react';
import { Breadcrumb, Icon, Table, Button, Tooltip, Modal, message, Form, Input } from 'antd';
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import { Link } from 'react-router-dom';

export class Tag extends React.Component {
  constructor() {
    super();
    this.state = {
      // 表单开关
      isModalVisible: false,
      //表格数据
      tags: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.fetchData()
  }
  render() {
    //表格行配置
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    }, {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '文章数',
      dataIndex: 'article_num',
      key: 'article_num',
    }, {
      title: '搜索热度',
      dataIndex: 'search_num',
      key: 'search_num',
    }, {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
          <ButtonGroup>
            <Tooltip title="删除">
              <Button icon="delete" onClick={this.handleDelete.bind(this, record.id)} />
            </Tooltip>
          </ButtonGroup>
        </span>
      ),
    },];
    // 表单列设置
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    return (
      <div style={{ padding: 20 }}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/articles">
              <Icon type="home" />
              <span> 文章管理</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            标签管理
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={this.showModal.bind(this)}>
          创建标签
        </Button>
        <Modal title="创建标签" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <WrappedSettingPasswordForm ref="form"></WrappedSettingPasswordForm>
        </Modal>
        <Table
          size="small"
          bordered
          dataSource={this.state.tags}
          loading={this.state.loading}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true
          }} />
      </div>
    )
  }
  //获取数据
  fetchData() {
    this.setState({ loading: true });
    axios.get(window.apiURL + 'tags')
      .then((response) => {
        this.setState({
          tags: response.data.tags,
          loading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //删除标签
  handleDelete = (id) => {
    confirm({
      title: '确认删除',
      content: '此操作将会永久删除此标签，确认继续？',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.get(window.apiURL + 'tags/delete/' + id)
          .then((response) => {
            if (response.status == 200) {
              this.fetchData()
              message.success(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel: () => {
        console.log('取消删除');
      },
    });
  }
  // 创建标签
  handCreate = () => {
    axios.post(window.apiURL + 'tags/publish', {
      tag_name: "不懂得"
    })
      .then(function (response) {
        console.log("返回数据" + response)
        message.success(response.data.message);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
        message.error('error');
      });
  }
  // 展示对话框
  showModal = function () {
    this.setState({
      isModalVisible: true
    })
  }
  // 对话框处理完毕
  handleOk = (e) => {
    e.preventDefault();
    this.refs["form"].validateFields((err, values) => {
      if (!err) {
        this.handCreate()
      }
    });

  }
  // 取消对话框的处理
  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }
  //new function
}

// 表单组件
const FormItem = Form.Item;
// 表单布局
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
class SettingPasswordForm extends React.Component {
  state = {
    formData: {
      password: '',
      newPassword: '',
      newPasswordRepeat: '',
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formData = this.state.formData;

    return (
      <Form onSubmit={this.props.handleSubmit} style={{ paddingTop: 20 }}>
        <FormItem {...formItemLayout} label="标签名">
          {getFieldDecorator('tagname', {
            rules: [{
              required: true,
              message: '标签名不能为空！',
            }],
          })(
            <Input placeholder="请输入标签名" />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedSettingPasswordForm = Form.create()(SettingPasswordForm);