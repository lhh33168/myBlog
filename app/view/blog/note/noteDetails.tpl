<html>
详情页面
<br>

<div>
    <h1>标题：{{status.data.title}}</h1>
</div>
<div>
    分类：{{status.data.category_title}}
</div>
<div>
    发布时间：{{status.data.create_time|dateFormat("yyyy-MM-dd hh:mm:ss")}}
</div>
<hr>
<div>
    {{status.data.content|safe}}
</div>
<hr>
<div>
    <!--PC版-->
    <div id="SOHUCS" sid="http://weiniji.com/blog/note/details?id={{status.data.id}}"></div>
    <script charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/changyan.js" ></script>
    <script type="text/javascript">
        window.changyan.api.config({
            appid: 'cytbTeqXg',
            conf: 'prod_0cf92ed78299b2d958a7f6e39554a1c8'
        });
    </script>
</div>
</html>