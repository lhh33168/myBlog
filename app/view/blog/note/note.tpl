<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="/public/lib/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="/public/css/index.css">
    <link rel="stylesheet" href="/public/lib/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="/public/css/base.css">
    <script src="/public/lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>李浩瀚的个人博客</title>
</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand hidden-sm" href="/" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">李浩瀚的个人博客</a>
        </div>
        <div class="navbar-collapse collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li class="hidden-sm hidden-md"><a href="https://v2.bootcss.com/"  target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'v2doc'])">javaScript</a></li>
                <li><a href="https://v3.bootcss.com/" target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'v3doc'])">node.js</a></li>
                <li><a href="https://v4.bootcss.com/" target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'v4doc'])">vue</a></li>
                <li><a href="/p/lesscss/" target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'less'])">mysql</a></li>
                <li><a href="https://www.jquery123.com/" target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'jquery'])">jQuery</a></li>
                <li><a class="reddot" href="http://www.youzhan.org/" target="_blank" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'youzhan-main-nav'])">面试专题</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right hidden-sm">
                <li style="padding-top:8px;"><input type="text" class="form-control" placeholder="查询"></li>
            </ul>
        </div>
    </div>
</div>
<div class="container" style="padding-top:90px;">
    <div class="col-md-8 my_blog_left">
        {% for item in status.data.data %}
        <div class="my_blog_left_list" style="margin-bottom:20px;">
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
    <div class="col-md-4 my_blog_right">
        <h2 class="my_blog_right_title">分类标签</h2>
            {% for item in categoryLabel.data.data %}
                <span class="my_blog_label"><a href="/blog/note/noteList?id={{item.id}}">{{item.title}}</a></span>
            {% endfor %} 
        <h2 class="my_blog_right_title">热门文章</h2>
        <ul>
            <li></li>
        </ul>
        <h2 class="my_blog_right_title">最新发布</h2>
        <ul>
            <li></li>
        </ul>
    </div>
</div>

</body>
</html>