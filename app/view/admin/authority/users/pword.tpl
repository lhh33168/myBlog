{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %}
    {{ template.menu('/admin/authority/users/pword',ctx) }}
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">账号设置</li>
            <li class="active">修改密码</li>
        </ol>
        <div class="panel panel-default">
            <div class="panel-heading">
                修改密码
            </div>
            <div class="panel-body">
                <form action="/admin/authority/upPassword" method="POST">
                    <div class="form-group">
                        <label for="oldPword">原密码</label>
                        <input type="password" class="form-control" name="oldPword" id="oldPword" placeholder="请输入原密码">
                        <span class="tips">{{status.data.errors.oldPword}}</span>
                    </div>
                    <div class="form-group">
                        <label for="pword">新密码</label>
                        <input type="password" class="form-control" name="pword" id="pword" placeholder="请输入新密码">
                        <span class="tips">{{status.data.errors.pword}}</span>
                    </div>
                    <div class="form-group">
                        <label for="rePword">确认密码</label>
                        <input type="password" class="form-control" name="rePword" id="rePword" placeholder="请输入确认密码">
                        <span class="tips">{{status.data.errors.rePword}}</span>
                    </div>
                    {{ template.btnSave() }}
                </form>
            </div>
        </div>
    </div>
{% endblock %}