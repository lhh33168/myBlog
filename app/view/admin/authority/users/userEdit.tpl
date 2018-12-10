{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %}
    {{ template.menu('/admin/authority/users',ctx) }}
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li><a href="/admin/authority/users">账号管理</a></li>
            <li class="active">{{ "修改" if status.data.id else "新增" }}账号</li>
            <li>{{ template.btnGoback("/admin/authority/users") }}</li>
        </ol>
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ "修改" if status.data.id else "新增" }}账号
            </div>
            <div class="panel-body">
                <form action='/admin/authority/users/{{ "update" if status.data.id else "add" }}' method='POST'>
                    <input type="hidden" id="id" name="id" value="{{status.data.id}}">
                    <div class="form-group">
                        <label for="uname">账号名</label>
                        <input type="text" class="form-control" name="uname" id="uname" placeholder="请输入账号名..." value="{{status.data.uname if status.data.uname else params.uname}}" {{ "readonly" if status.data.id else "" }}  >
                        <span class="tips">{{status.data.errors.uname}}</span>
                    </div>
                    <div class="form-group">
                        <label for="phone">手机号码</label>
                        <input type="text" class="form-control" name="phone" id="phone" placeholder="请输入手机号..." value="{{status.data.phone if status.data.phone else params.phone}}" {{ "readonly" if status.data.id else "" }}  >
                        <span class="tips">{{status.data.errors.phone}}</span>
                    </div>
                    {% if status.data.id %}
                        {# 修改页面不对密码进行操作 #}
                    {% else %}
                        <div class="form-group">
                            <label for="pword">密码</label>
                            <input type="password" class="form-control" name="pword" id="pword" placeholder="请输入密码">
                            <span class="tips">{{status.data.errors.pword}}</span>
                        </div>
                        <div class="form-group">
                            <label for="rePword">确认密码</label>
                            <input type="password" class="form-control" name="rePword" id="rePword" placeholder="请输入确认密码">
                            <span class="tips">{{status.data.errors.rePword}}</span>
                        </div>
                    {% endif %}

                    {{ template.btnSave() }}
                </form>
            </div>
        </div>
    </div>
{% endblock %}