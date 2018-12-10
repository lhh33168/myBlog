<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="/public/lib/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="/public/css/index.css">
    <link rel="stylesheet" href="/public/lib/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="/public/css/base.css">
    <script src="/public/lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container" style="padding-top:90px;">
        <div>
            {% for item in status.data %}
            <div style="margin-bottom:20px;">
                <a href="/blog/note/details?id={{item.id}}">
                    <label>标题：{{item.title}}</label>
                    <div>分类：{{item.category_title}}</div>
                    <div>简介：{{item.intro}}</div>
                    <div>发布时间：{{item.create_time|dateFormat("yyyy-MM-dd hh:mm:ss")}}</div>
                </a>
            </div>
            <hr>
            {% endfor %} 
        </div>
    </div>
</body>
</html>