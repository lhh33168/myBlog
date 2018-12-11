<!DOCTYPE html>
<html>

<head>
    <link href="/public/favicon.ico" rel="jianliyi icon" type="image/x-icon"/>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="/public/lib/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- 必须先引用jquery.js -->
    <script src="/public/lib/jquery/1.12.4/jquery.min.js"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="/public/lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>个人博客管理后台</title>
</head>

<body>
    <div class="container" align="center">
        <div class="panel panel-default" style="margin-top: 100px; ">
            <div class="panel-heading" style="font-size: 26px;">
                {{ status.message }}
            </div>
            <div class="panel-body">
                {{ status.data }}
            </div>
        </div>
        <footer class="footer navbar-fixed-bottom" style="padding-bottom: 20px;">
            <div class="container" style="text-align:center;">
                <small style="color: #777">@2017 oneonejl.com  广州一一网络技术有限公司 ® 版权所有 <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #777">粤ICP备18024612号-4</a></small>
            </div>
        </footer>
    </div>
</body>

</html>