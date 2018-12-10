{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/blog/note',ctx)}}
<div class="container" style="margin-top:70px; margin-bottom:20px;">
    <ol class="breadcrumb">
        <li class="active">系统设置</li>
        <li><a href='/admin/blog/note'>笔记发布</a></li>
        <li class="active">{{ "修改" if status.data.id else "新增" }}笔记</li>
        <li>{{ template.btnGoback("/admin/blog/note") }}</li>
    </ol>

    <div class="panel panel-default">
        <div class="panel-heading">
            {{ "修改" if status.data.id else "新增" }}笔记
        </div>
        <div class="panel-body">
            <form action='/admin/blog/note/{{ "edit" if status.data.id else "add" }}' method='POST'>
                <input type="hidden" name="id" value="{{status.data.id}}">
                <div class="form-group">
                    <label for="title">标题</label>
                    <input type="text" class="form-control" name="title" id="title" placeholder="请输入标题" value="{{status.data.title}}">
                    <span class="tips">{{status.data.errors.title}}</span>
                </div>
                <div class="form-group">
                    <label for="category_id">分类</label>
                    <select class="form-control" name="category_id" id="category_id">
                        <option value="">-请选择选择-</option>
                        {% for item in categoryStatus.data %}
                            <option value="{{item.id}}" {{ "selected" if item.id==status.data.category_id else "" }}>{{item.title}}</option>
                        {% endfor %}  
                    </select>
                    <span class="tips">{{status.data.errors.category_id}}</span>
                </div>
                <div class="form-group">
                    <label for="intro">简介</label>
                    <textarea  class="form-control" name="intro" id="intro" placeholder="请输入简介" >{{status.data.intro}}</textarea>
                    <span class="tips">{{status.data.errors.intro}}</span>
                </div>
                <div class="form-group">
                    <label for="content">内容</label>
                    <!--style给定宽度可以影响编辑器的最终宽度-->
                    <script type="text/plain" name="content" id="content" style="width:100%;height:30vh;">
                        {{ status.data.content | safe }}
                    </script>
                    <!-- 实例化编辑器 -->
                    <script type="text/javascript">
                        var ue = UE.getEditor('content');
                    </script>
                    <span class="tips">{{status.data.errors.content}}</span>
                </div>
                <div class="form-group">
                    <label for="title">关键字</label>
                    <input type="text" class="form-control" name="keyword" id="keyword" placeholder="请输入关键字，多个关键字用英文逗号隔开..." value="{{status.data.keyword}}">
                    <span class="tips">{{status.data.errors.keyword}}</span>
                </div>
                {{ template.btnSave() }}
            </form>
        </div>
    </div>
</div>
{% endblock %}