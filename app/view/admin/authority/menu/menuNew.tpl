{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/authority/menu',ctx)}}
<div class="container" style="margin-top:70px; margin-bottom:20px;">
    <ol class="breadcrumb">
        <li class="active">菜单功能管理</li>
        <li class="active">{{ "修改" if status.data.id else "新增" }}菜单功能</li>
        <li>{{ template.btnGoback("/admin/authority/menu") }}</li>
    </ol>

    <div class="panel panel-default">
        <div class="panel-heading">
            {{ "修改" if status.data.id else "新增" }}菜单功能
        </div>
        <div class="panel-body">
            <form action='/admin/authority/menu/{{ "edit" if status.data.id else "add" }}' method='POST'>
                <input type="hidden" name="id" value="{{status.data.id}}">
                <div class="form-group">
                    <label for="title">父级名称</label>
                    <select class="form-control" name="parent_id" id="parent_id">
                        <option value=0>-请选择-</option>
                        {% for item in menuList %}
                            <option value={{item.id}} {{ "selected" if item.id==status.data.parent_id else "" }}>{{item.title}}</option>
                        {% endfor %}
                    </select>
                    <span class="tips">{{status.data.errors.parent_id}}</span>
                </div>
                <div class="form-group">
                    <label for="title">名称</label>
                    <input type="text" class="form-control" name="title" id="title" placeholder="请输入名称" value="{{status.data.title}}">
                    <span class="tips">{{status.data.errors.title}}</span>
                </div>
                <div class="form-group">
                    <label for="type">类型</label>
                    <select name="type" class="form-control">
                        <option value=''>-请选择-</option>
                        <option value='1' {{ "selected" if "1"==status.data.type else "" }}>菜单</option>
                        <option value='2' {{ "selected" if "2"==status.data.type else "" }}>功能</option>
                    </select>
                    <span class="tips">{{status.data.errors.type}}</span>
                </div>
                <div class="form-group">
                    <label for="url">URL地址</label>
                    <input type="text" class="form-control" name="url" id="url" placeholder="请输入URL地址" value="{{status.data.url}}">
                    <span class="tips">{{status.data.errors.url}}</span>
                </div>
                <div class="form-group">
                    <label for="url">顺序</label>
                    <input type="number" class="form-control" name="seq" id="seq" placeholder="请输入顺序" value="{{status.data.seq}}">
                    <span class="tips">{{status.data.errors.seq}}</span>
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