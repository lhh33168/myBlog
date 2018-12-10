{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/authority/role',ctx) }}
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">角色管理</li>
            <li>{{ template.btnAdd("/admin/authority/role/new") }}</li>
        </ol>

        <form class="form-inline" action="/admin/authority/role" method="GET" id="formId" style="margin-bottom:20px;">
            <input name="page" value="{{status.data.page}}" type="hidden" />
            <div class="form-group">
                <label for="name">角色名</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="请输入角色名..." value="{{params.name}}">      
            </div>
            <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"  aria-hidden="true">查询</span></button>
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
                                <span class="badge" style="background:green; ">{{ item.name }}</span>&nbsp;&nbsp;
                            </div>
                            <div class="col-sm-9" align="right">
                                {% if 1==item.status %}
                                    {{ template.btnDisable("/admin/authority/role/disable?id="+item.id) }}
                                {% else %}
                                    {{ template.btnEnabled("/admin/authority/role/enabled?id="+item.id) }}
                                {% endif %}
                                {{ template.btnAuthority("/admin/authority/role/authority?id="+item.id) }}
                                {{ template.btnEdit("/admin/authority/role/edit?id="+item.id) }}
                                {{ template.btnDel("javascript:if(confirm('确定要删除该内容吗?'))location='/admin/authority/role/del?id="+item.id+"'") }}
                            </div>
                        </div>
                    </div>

                    <!-- heading end -->

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12">
                                备注：{{ item.remark }}
                            </div>
                        </div>
                    </div>

                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4">
                                状态：
                                {% if 1==item.status %}
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