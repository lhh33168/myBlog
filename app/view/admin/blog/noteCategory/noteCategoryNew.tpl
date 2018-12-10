{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/blog/noteCategory',ctx)}}
<div class="container" style="margin-top:70px; margin-bottom:20px;">
    <ol class="breadcrumb">
        <li class="active">系统设置</li>
        <li><a href='/admin/blog/noteCategory'>笔记分类</a></li>
        <li class="active">{{ "修改" if status.data.id else "新增" }}笔记分类</li>
        <li>{{ template.btnGoback("/admin/blog/noteCategory") }}</li>
    </ol>

    <div class="panel panel-default">
        <div class="panel-heading">
            {{ "修改" if status.data.id else "新增" }}笔记分类
        </div>
        <div class="panel-body">
            <form action='/admin/blog/noteCategory/{{ "edit" if status.data.id else "add" }}' method='POST'>
                <input type="hidden" name="id" value="{{status.data.id}}">
                <div class="form-group">
                    <label for="title">标题</label>
                    <input type="text" class="form-control" name="title" id="title" placeholder="请输入标题" value="{{status.data.title}}">
                    <span class="tips">{{status.data.errors.title}}</span>
                </div>

                {{ template.btnSave() }}
            </form>
        </div>
    </div>
</div>
{% endblock %}