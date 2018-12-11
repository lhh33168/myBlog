{% extends "../common/base.tpl" %} 
{% block body %} 
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
            <li>aaaa</li>
        </ul>
        <h2 class="my_blog_right_title">最新发布</h2>
        <ul>
            <li></li>
        </ul>
    </div>
</div>

{% endblock %}