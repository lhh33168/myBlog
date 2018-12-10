{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %}
    {{ template.menu('/admin/authority/users',ctx) }}

    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">账号管理</li>
            <li>{{ template.btnAdd("/admin/authority/users/new") }}</li>
        </ol>

        <form class="form-inline" action="/admin/authority/users" method="GET" id="formId" style="margin-bottom:20px;">
            <input name="page" value="{{status.data.page}}" type="hidden" />
            <div class="form-group">
                <label for="phone">手机号</label>
                <input type="text" name="phone" id="phone" class="form-control" placeholder="请输入手机号..." value="{{params.phone}}">      
            </div>
            <div class="form-group">
                <label for="uname">账号</label>
                <input type="text" name="uname" id="uname" class="form-control" placeholder="请输入账号..." value="{{params.uname}}">      
            </div>
            <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"  aria-hidden="true">查询</span></button>
        </form>

        {% if 0==status.data.rowCount %}
            {{ template.noDataPanel() }}
        {% else %}
            {% for item in status.data.data %}
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <!-- heading start -->
                        <div class="row">
                            <div class="col-sm-3" align="left" style="margin-top:10px;">
                                <span class="badge" style="background:green;">{{ item.phone }}</span>&nbsp;&nbsp;
                            </div>
                            <div class="col-sm-9" align="right">
                                {% if 0==item.status %}
                                    {{ template.btnDisable("/admin/authority/users/disable?id="+item.id) }}
                                {% else %}
                                    {{ template.btnEnabled("/admin/authority/users/enabled?id="+item.id) }}
                                {% endif %}
                                {{ template.btnAuthority("/admin/authority/users/authority?id="+item.id) }}
                                {{ template.btnDel("javascript:if(confirm('确定要删除该内容吗?'))location='/admin/authority/users/del?id="+item.id+"'") }}
                            </div>
                        </div>
                        <!-- heading end -->
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12">
                                <label>账号：</label>{{ item.uname }}
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4">
                                状态：
                                {% if 0==item.status %}
                                    <font color="green">启用</font>
                                {% else %}
                                    <font color="red">禁用</font>
                                {% endif %}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                创建：{{ item.create_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                更新：{{ item.update_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
                            </div>
                        </div>
                    </div>
                    <!-- footer内容 end -->
                </div>
            {% endfor %} 
        {% endif %}
        {{ template.page(status.data, 'formId') }}
    </div>

{% endblock %}