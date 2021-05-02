import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, Layout, Menu, Icon, Dropdown, Avatar, message } from 'antd';
const { Header, Sider, Content } = Layout;
// 引入react路由工具
import { BrowserRouter as Router, Route, Link, HashRouter, Redirect, Switch } from 'react-router-dom'
// 文章列表页面组件
import { Article } from './Article/Article'
// 文章创建页面组件
import { ArticleCreate } from './Article/ArticleCreate'
// 文章更新页面组件
import { ArticleUpdate } from './Article/ArticleUpdate'
// 标签管理页面组件
import { Tag } from './Article/Tag'
// 评论管理页面组件
import { Comment } from './Comment/Comment'
// 黑名单管理页面组件
import { Blacklist } from './Comment/Blacklist'
// 后台仪表盘组件
import { Dashboard } from './Dashboard/Dashboard'
// 设置组件
import { Setting } from './Setting/Setting'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from "./Main.css"

class SiderLayout extends React.Component {
  render() {
    return (
      <HashRouter>
        <LocaleProvider locale={zhCN}>
          <Layout className="layout">
            {/* 左侧后台仪表盘 */}
            <Sider collapsible >
              <div className="layout__logo" />
              <Menu
                theme="dark"
                defaultSelectedKeys={this.menuAutoSelect()}>
                <Menu.Item key="dashboard">
                  <Link to="/">
                    <Icon type="dashboard" />
                    <span>后台首页</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="articles">
                  <Link to="/articles">
                    <Icon type="edit" />
                    <span>文章管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="comments">
                  <Link to="/comments">
                    <Icon type="message" />
                    <span>留言管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Link to="/settings/web">
                    <Icon type="setting" />
                    <span>设置中心</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="exit">
                  <a href="/">
                    <Icon type="logout" />
                    <span>退出后台</span>
                  </a>
                </Menu.Item>
              </Menu>
            </Sider>
            {/* 右侧内容 */}
            <Layout>
              {/* 顶部面包屑 */}
              <Header className="layout__header">
                <div className="layout__header__right">
                  <Dropdown overlay={menu}>
                    <a href="#">
                      <Avatar src={master.avatar ? imageURL(master.avatar) : 'images/default-avatar.png'} />
                      <span className="layout__header__right__name">{master.name || ''}</span>
                    </a>
                  </Dropdown>
                </div>
              </Header>
              {/* 页面内容 */}
              <Content className="layout__content">
                <Switch>
                  {/* 后台首页 */}
                  <Route path="/" exact component={Dashboard} />
                  {/* 文章列表页 */}
                  <Route path="/articles" exact component={Article} />
                  {/* 文章创建页 */}
                  <Route path="/articles/create/:type" exact component={ArticleCreate} />
                  {/* 文章更新页 */}
                  <Route path="/articles/update/:id" component={ArticleUpdate} />
                  {/* 标签管理页 */}
                  <Route path="/tags" exact component={Tag} />
                  {/* 评论管理页 */}
                  <Route path="/comments" exact component={Comment} />
                  {/* 黑名单管理页 */}
                  <Route path="/blacklist" exact component={Blacklist} />
                  {/* 系统设置页 */}
                  <Route path="/settings/:module" exact component={Setting} />
                  <Redirect to="/" />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </LocaleProvider>
      </HashRouter>
    );
  }
  //左侧菜单选中状态根据 url 自动转换
  menuAutoSelect() {
    let key = window.location.hash.split('/')[1];
    if (key == '' || !key) {
      key = 'dashboard';
    }
    return new Array(key);
  }
  //new function
}

//头像下拉菜单处理
const avatarOnClick = function ({ key }) {
  switch (key) {
    case 'personal':
      location.hash = '#/settings/personal';
      break;
    case 'logout':
      axios.post('logout')
        .then(function (response) {
          location.reload()
        })
        .catch(function (error) {
          console.log(error);
        });
      break;
    default: break;
  }
};
//头像下拉菜单
const menu = (
  <Menu onClick={avatarOnClick}>
    <Menu.Item key="version">
      <Icon type="crown" />
      <span>版本 1.0.10</span>
    </Menu.Item>
    <Menu.Item key="personal">
      <Icon type="user" />
      <span>博主设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
);

//挂载根节点
if (document.getElementById('root')) {
  ReactDOM.render(<SiderLayout />, document.getElementById('root'));
}
