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
    <style>
        .form-signin {
            max-width: 330px;
            padding: 15px;
            margin: 0 auto;
        }

        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }

        .form-signin .checkbox {
            font-weight: normal;
        }

        .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    </style>
</head>

<body>
    <div class="container" align="center">
        <form class="form-signin" action="/main/login" method="POST" id="loginForm">
            <div class="panel panel-default" style="margin-top: 100px; ">
                <div class="panel-heading" style="font-size: 26px;">
                    个人博客管理后台
                </div>
                <div class="panel-body">
                    <label for="inputEmail" class="sr-only">账号</label>
                    <input name="uname" type="text" id="inputEmail" class="form-control" placeholder="请输入账号..." autofocus >
                    <label for="inputPassword" class="sr-only">密码</label>
                    <input name="pword" type="password" id="inputPassword" class="form-control" placeholder="请输入密码..." >

                    <button class="btn btn-lg btn-warning btn-block" style="background-color: rgb(255, 153, 0);border-color:#ff8c00;" type="submit">登录</button>
                </div>
            </div>
        </form>
        <footer class="footer navbar-fixed-bottom" style="padding-bottom: 20px;">
            <div class="container" style="text-align:center;">
                <small style="color: #777">@2017 oneonejl.com  广州一一网络技术有限公司 ® 版权所有 <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #777">粤ICP备18024612号-4</a></small>
            </div>
        </footer>
    </div>
    <script>
        $(function () {
            //进入登录页面inputEmail获得光标
            document.getElementById("inputEmail").focus();

            var msg = '{{status.message}}';
            if (msg) {
                alert(msg);
            }

        });
    </script>
</body>

</html>