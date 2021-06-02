# 项目名 person_blog

基于 Laravel 5.5 和 react 的个人博客系统

系统功能：
文章管理：
1. 支持置顶、公开/隐藏文章
2. 支持排序、筛选、搜索
3. 支持富文本编辑器、Markdown编辑器
4. 标签管理
评论管理：
1. 支持跳转评论位置
2. 支持查看评论者IP
3. 支持拉黑IP，拉黑后的IP无法评论
4. 黑名单管理
设置中心：
1. 可设置博主信息，网站名称
2. 支持开启/关闭评论和回复邮件提示功能


## 在本地安装流程
要求：配置PHP、node.js、mysql、Apache或者nginx服务器、laravel5.5以上
建议：安装laragon集成环境，免去配置上述要求的烦恼（不过node.js扔需要安装）

拉取代码
git clone 

拉取完毕后，进入项目目录，安装依赖

```
composer install
```

生成.env文件

```
cp .env.example .env
```

生成 laravel key

```
php artisan key:generate
```

创建软连接

```
php artisan storage:link
```

## 使用
执行迁移创建数据库表
php artisan make:migration

执行 seed 生成默认账号和默认文章

```
php artisan db:seed --class=DatabaseSeeder
```

访问 '根目录/admin' 进入后台

使用默认账号：admin@qq.com，密码：admin 进行登录




## 发送邮件配置

推荐使用QQ邮箱，根目录下的 .env文件中修改下列几行：

```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.qq.com
MAIL_PORT=465
MAIL_USERNAME= <你的QQ邮箱账号>
MAIL_PASSWORD= <你的QQ邮箱smtp授权码>
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS= <配置发送地址>
MAIL_FROM_NAME= <配置发送人>
```

