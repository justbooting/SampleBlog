let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/admin.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.js('resources/assets/js/app.js', 'public/js');
// 监听 resources 和 public 文件夹变化，禁用通知
// if (ENV == 'development') {
//    mix.browserSync({
//       proxy: 'localhost:8000',
//       files: [
//          './resources/',
//          './public/'
//       ]
//    }).disableNotifications();;
// }
