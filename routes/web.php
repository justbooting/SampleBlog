<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// 用户认证路由
Auth::routes();
// 网站主页
Route::get('/', 'HomeController@home')->name('home');
// 管理后台页
Route::get('/admin', 'AdminController@index')->name('admin');

// 读者文章搜索
Route::get('/articles/search/{key}', 'ArticleController@search')->name('articles.search.get');
Route::post('/articles/search', 'ArticleController@search')->name('articles.search.post');
Route::get('/articles/list', 'ArticleController@list')->name('articles.list');
Route::resource('/articles', 'ArticleController');
Route::resource('/comments', 'CommentController');
// 返回标签对应的文章
Route::get('/tags/{name}', 'TagController@show')->name('tags.show')->where('name', '.*');

// 其它需要身份验证的操作
Route::middleware(['auth', 'super'])->namespace('Admin')->prefix('admin-api')->group(function () {
  // 显示文章列表
  Route::get('/articles', 'ArticleController@index');
  // 保存文章
  Route::post('/articles', 'ArticleController@store');
  // 发表（或隐藏）文章
  Route::get('/articles/publish/{id}', 'ArticleController@publish');
  // 置顶文章
  Route::get('/articles/top/{id}', 'ArticleController@top');
  // 删除文章
  Route::get('/articles/delete/{id}', 'ArticleController@destroy');
  // html 转 markdown
  Route::post('/articles/markdown', 'ArticleController@markdown');
  // 返回某个文章
  Route::get('/articles/{id}', 'ArticleController@show');
  // 直接存储文件
  Route::post('/upload', 'ArticleController@uploadFileApi');
  // 导入其他数据库文章
  Route::post('/import', 'ArticleController@import');
  // 标签查增删改
  Route::get('/tags', 'TagController@index');
  Route::post('/tags/publish/', 'TagController@store');
  Route::get('/tags/delete/{id}', 'TagController@destroy');
  Route::get('/tags/edit/{id}', 'TagController@edit');
  // 显示评论列表
  Route::get('/comments', 'CommentController@index');
  // 删除评论
  Route::get('/comments/delete/{id}', 'CommentController@destroy');
  // 显示黑名单列表
  Route::get('/blacklist', 'BlacklistController@index');
  // 从黑名单列表中移除某用户
  Route::get('/blacklist/delete/{id}', 'BlacklistController@destroy');
  // 保存黑名单
  Route::post('/blacklist', 'BlacklistController@store');
  // 显示设置列表信息
  Route::get('/settings', 'SettingController@index');
  // 保存设置信息
  Route::post('/settings', 'SettingController@store');
  // 获取某个用户信息
  Route::get('/users/{id}', 'UserController@show');
  // 更新用户信息
  Route::post('/users/{id}', 'UserController@update');
  // 改变用户密码
  Route::post('/users/{id}/password', 'UserController@changePassword');
});
