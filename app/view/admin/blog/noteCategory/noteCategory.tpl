{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/blog/noteCategory',ctx) }}
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">笔记分类列表</li>
            <li>{{ template.btnAdd("/admin/blog/noteCategory/new") }}</li>
        </ol>

        <form class="form-inline" action="/admin/blog/noteCategory" method="GET" id="formId" style="margin-bottom:20px;">
            <input name="page" value="{{status.data.page}}" type="hidden" />
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="请输入标题..." value="{{params.title}}">      
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
                            <div class="col-sm-6" align="left" style="margin-top:10px;">
                                <span class="badge" style="background:green; ">{{ item.title }}</span>
                            </div>
                            <div class="col-sm-6" align="right">
                                {% if 2==item.status %}
                                    <a href="/admin/blog/noteCategory/repeal?id={{item.id}}" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true">撤销</span></a>
                                {% else %}
                                    <a href="/admin/blog/noteCategory/publish?id={{item.id}}" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true">发布</span></a>
                                {% endif %}
                                {{ template.btnEdit("/admin/blog/noteCategory/edit?id="+item.id) }}
                                {{ template.btnDel("javascript:if(confirm('确定要删除该内容吗?'))location='/admin/blog/noteCategory/del?id="+item.id+"'") }}
                            </div>
                        </div>
                    </div>

                    <!-- heading end -->

                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4">
                                状态：
                                {% if 2==item.status %}
                                    <font color="green">已发布</font>
                                {% else %}
                                    未公开
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