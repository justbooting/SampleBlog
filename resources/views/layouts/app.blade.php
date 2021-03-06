<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
@if(env('APP_NAME') == 'sadcreeper' && env('APP_DEBUG') == false)
  <script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?ec4335b5bc7f9967785dddd770b05538";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  </script>
@endif
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', setting('web_name', 'Laravel'))</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <!-- 导航头部 -->
                <div class="navbar-header">

                    <!-- 隐藏选项，媒体查询触发 -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- 网站logo，指向首页 -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        首页
                    </a>
                    <!-- 隐藏搜索框，媒体查询触发 -->
                    <div class="navbar-brand visible-xs-block" style="padding:4px 0 0 50px">
                      <form class="navbar-form navbar-left search" style="margin:0;border:0;float:right" role="search" action="{{ route('articles.search.post') }}" method="post">
                          {{ csrf_field() }}
                          <div class="form-group">
                              <span class="glyphicon glyphicon-search" style="line-height:inherit"></span>
                              <input type="text" name="key" style="border: none;margin-left:5px;width:100px" placeholder="搜索..">
                          </div>
                      </form>
                    </div>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- 导航栏左边部分 -->
                    <ul class="nav navbar-nav">
                        <li><a href="{{ route('articles.list') }}">全部文章</a></li>
                        <!-- <li><a href="https://github.com/justbooting/SampleBlog.git" target="_blank"><img src="/icons/github.png" alt="" style="width:18px;margin-bottom:3px"></a></li> -->
                    </ul>

                    <!-- 导航栏右边部分 -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- 搜索框 -->
                        <li class="hidden-xs" style="margin-top:6px">
                            <form class="navbar-form navbar-left search" role="search" action="{{ route('articles.search.post') }}" method="post">
                                {{ csrf_field() }}
                                <div class="form-group">
                                    <span class="glyphicon glyphicon-search"></span>
                                    <input type="text" name="key" style="border: none;margin-left:5px;width:100px" placeholder="搜素..">
                                </div>
                            </form>
                        </li>
                        <!-- 用户登录选项 -->
                        @guest
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <!-- <li><a href="{{ route('register') }}">Register</a></li> -->
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu">
                                    @if (Auth::check())
                                        @if (Auth::id() === 1)
                                          <li><a href="/admin">管理后台</a></li>
                                          <li role="separator" class="divider"></li>
                                        @endif
                                    @endif
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            退出
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        @yield('content')

        <footer class="z-footer">
            <p class="z-text">一个方便易用的博客管理系统</p>
            <p class="z-text-big"></p>
            @if(setting('web_icp', ''))
              <a href="http://www.miitbeian.gov.cn" target="_blank">{{setting('web_icp', '')}}</a>
            @endif
        </footer>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('scripts')
</body>
</html>
