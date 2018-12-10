{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/authority/role',ctx)}}
<div class="container" style="margin-top:70px; margin-bottom:20px;">
    <ol class="breadcrumb">
        <li class="active">系统设置</li>
        <li><a href='/admin/authority/role'>角色管理</a></li>
        <li class="active">{{ "修改" if status.data.id else "新增" }}角色</li>
        <li>{{ template.btnGoback("/admin/authority/role") }}</li>
    </ol>

    <div class="panel panel-default">
        <div class="panel-heading">
            {{ "修改" if status.data.id else "新增" }}角色
        </div>
        <div class="panel-body">
            <form action='/admin/authority/role/{{ "edit" if status.data.id else "add" }}' method='POST'>
                <input type="hidden" name="id" value="{{status.data.id}}">
                <div class="form-group">
                    <label for="name">角色名</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="请输入角色名" value="{{status.data.name}}">
                    <span class="tips">{{status.data.errors.name}}</span>
                </div>
                <div class="form-group">
                    <label for="remark">备注</label>
                    <input type="text" class="form-control" name="remark" id="remark" placeholder="请输入备注" value="{{status.data.remark}}">
                    <span class="tips">{{status.data.errors.remark}}</span>
                </div>
                <div class="form-group">
                    <label for="status">状态</label>
                    <select class="form-control" id="status" name="status">
                        <option value=1 {{ "selected" if 1==status.data.status else "" }}>启用</option>
                        <option value=2 {{ "selected" if 2==status.data.status else "" }}>禁用</option>
                    </select>
                    <span class="tips">{{status.data.errors.status}}</span>
                </div>
                {{ template.btnSave() }}
            </form>
        </div>
    </div>
</div>
{% endblock %}