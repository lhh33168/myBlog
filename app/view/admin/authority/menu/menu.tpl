{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
    {{ template.menu('/admin/authority/menu',ctx) }} 
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">菜单功能管理</li>
            <li>{{ template.btnAdd("/admin/authority/menu/new") }}</li>
        </ol>

        <form class="form-inline" action="/admin/authority/menu" method="GET" id="formId"  style="margin-bottom:20px;">
            <input name="page" value="{{status.data.page}}" type="hidden" />
            <div class="form-group">
                <label for="title">名称</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="请输入名称..." value="{{params.title}}">
            </div>
            <div class="form-group">
                <label for="parent_title">父级名称</label>
                <input type="text" id="parent_title" name="parent_title" class="form-control" placeholder="请输入父级名称..." value="{{params.parent_title}}">
            </div>
            <div class="form-group">
                <label for="level">级别</label>
                <input type="number" id="level" name="level" class="form-control" placeholder="请输入级别..." value="{{params.level}}">
            </div>
            <div class="form-group">
                <label for="url">URL</label>
                <input type="text" id="url" name="url" class="form-control" placeholder="请输入URL..." value="{{params.url}}">
            </div>
            <div class="form-group">
                <label for="type">类型</label>
                <select name="type" class="form-control">
                    <option value=''>-请选择-</option>
                    <option value='1' {{ "selected" if "1"==params.type else "" }}>菜单</option>
                    <option value='2' {{ "selected" if "2"==params.type else "" }}>功能</option>
                </select>
            </div>
            {{ template.btnSearch("javascript:goPage(1);") }}
        </form>
        {% if 0==status.data.rowCount %}
            {{ template.noDataPanel() }}
        {% else %}
            {% for item in status.data.data %}
                <div class="panel panel-default">
                    <div class="panel-heading ">
                        <!-- heading start -->
                        <div class="row">
                            <div class="col-sm-3" align="left" style="margin-top:10px;">
                                <span class="badge" style="background:green; ">{{ item.id }}</span>
                            </div>
                            <div class="col-sm-9" align="right">
                                {% if 1==item.status %}
                                    {{ template.btnDisable("/admin/authority/menu/disable?id="+item.id) }}
                                {% else %}
                                    {{ template.btnEnabled("/admin/authority/menu/enabled?id="+item.id) }}
                                {% endif %}
                                {{ template.btnEdit("/admin/authority/menu/edit?id="+item.id) }}
                                {{ template.btnDel("javascript:if(confirm('确定要删除该内容吗?'))location='/admin/authority/menu/del?id="+item.id+"'") }}
                            </div>
                        </div>
                    </div>
                    <!-- heading end -->
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4">
                                <label>名称：</label>{{ item.title }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>父级名称：</label>{{ item.parent_title }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>父级路径：</label>{{ item.parent_path }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>URL：</label>{{ item.url }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>顺序：</label>{{ item.seq }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>级别：</label>{{ item.level }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>类型：</label>
                                {% if 1==item.type %}
                                    菜单
                                {% else %}
                                    功能
                                {% endif %}
                            </div>
                            <div class="col-xs-12 col-sm-8">
                                <label>备注：</label>{{ item.remark }}
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4">
                                <label>状态：</label>
                                {% if 1==item.status %}
                                    <font color="green">启用</font>
                                {% else %}
                                    <font color="red">禁用</font>
                                {% endif %}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>创建：</label>{{ item.create_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <label>更新：</label>{{ item.update_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
                        </div>
                    </div>
                </div>
            </div>
        {% endfor %}
        {% endif %}
        {{ template.page(status.data, 'formId') }}
    </div>
{% endblock %}