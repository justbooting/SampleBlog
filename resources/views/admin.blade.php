<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>管理后台</title>
    </head>
    <body>
        <div id="root">

        </div>
    </body>
    <script type="text/javascript">
        //挂载博主信息
        window.master = @json($master);
        //挂载存储盘信息
        window.file_disk = @json($file_disk);
    </script>
    <script src="{{ asset('js/admin.js') }}"></script>
</html>
