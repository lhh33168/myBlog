<!DOCTYPE html>
<html>

<head>
    <link href="/public/EEkpin.ico" rel="EEkpin icon" type="image/x-icon"/>
    <link rel="stylesheet" href="/public/lib/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="/public/lib/bootstrap-treeview/bootstrap-treeview.min.css">
    <link rel="stylesheet" href="/public/lib/zTree_v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <script src="/public/lib/jquery/3.2.1/jquery-3.2.1.min.js"></script>
    <script src="/public/lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="/public/lib/echarts/echarts.js"></script>
    <script src="/public/lib/bootstrap-treeview/bootstrap-treeview.min.js"></script>
    <script src="/public/lib/bootstrap-treeview/my-treeview.js"></script>
    <script language="javascript" type="text/javascript" src="/public/lib/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="/public/lib/zTree_v3/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="/public/lib/zTree_v3/js/jquery.ztree.exedit.js"></script>


    <link rel="stylesheet" href="/public/lib/zTree_v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <script type="text/javascript" src="/public/lib/zTree_v3/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="/public/lib/zTree_v3/js/jquery.ztree.exedit.js"></script>
    <!-- swiper -->
    <link rel="stylesheet" href="/public/lib/swiper/css/swiper.min.css">
    <script type="text/javascript" src="/public/lib/swiper/js/swiper.min.js"></script>

    <!-- 配置文件 -->
    <script type="text/javascript" src="/public/lib/ueditor/ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="/public/lib/ueditor/ueditor.all.js"></script>

    <script type="text/javascript" src="/public/js/common.js"></script>
    <title>
        {% if 1==ctx.session.user.syscode %}
            EE快聘 - 管理平台
        {% elif 2==ctx.session.user.syscode %}
            精英易 - 管理平台
        {% elif 3==ctx.session.user.syscode %}
            聘得易 - 管理平台
        {% elif 4==ctx.session.user.syscode %}
            权限系统 - 管理平台
        {% else %}
            EE快聘 - 管理平台
        {% endif %}
    </title>
    <style>
        .tips {
            color: red;
            font-size: 0.5em;
        }
        .badge {
            padding: 6px 11px;
        }
    </style>
</head>

<body>
    {% block body %}{% endblock %}
    <footer class="footer" style="padding-bottom: 20px; back">
        <div class="container" style="text-align:center;">
            <small style="color: #777">@2017 oneonejl.com  广州一一网络技术有限公司 ® 版权所有 <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #777">粤ICP备18024612号-4</a> <a href="/admin/jyy/version" style="color: #777">Version:1.11.0</a></small>
        </div>
    </footer>
</body>

<script>
    $(function () {
        var msg = '{{status.message}}';
        if (msg) {
            alert(msg);
        }
    });
</script>

</html>