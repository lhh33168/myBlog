{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
{{ template.menu('/admin/blog/note',ctx) }}
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">笔记列表</li>
            <li>{{ template.btnAdd("/admin/blog/note/new") }}</li>
        </ol>

        <form class="form-inline" action="/admin/blog/note" method="GET" id="formId" style="margin-bottom:20px;">
            <input name="page" value="{{status.data.page}}" type="hidden" />
            <div class="form-group">
                <label for="status">分类</label>
                <select name="category_id" id="category_id" class="form-control">
                    <option value="">-请选择-</option>
                    {% for item in categoryStatus.data %}
                        <option value="{{item.id}}" {{ "selected" if item.id==params.category_id else "" }}>{{item.title}}</option>
                    {% endfor %}  
                </select>    
            </div>
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="请输入标题..." value="{{params.title}}">      
            </div>
            <div class="form-group">
                <label for="nick_name">发布时间</label>
                <input type="text" name="start_date" id="start_date" class="form-control" placeholder="请选择开始日期..." value="{{params.start_date}}" onClick="WdatePicker({skin:'twoer',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'end_date\',{M:-1})}',maxDate:'#F{$dp.$D(\'end_date\')}'})" readonly style="background-color:#fff;">      
            </div>
            <div class="form-group">
                <label for="nick_name">至</label>
                <input type="text" name="end_date" id="end_date" class="form-control" placeholder="请选择截止日期..." value="{{params.end_date}}" onClick="WdatePicker({skin:'twoer',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'start_date\')}',maxDate:'#F{$dp.$D(\'start_date\',{M:1})}'})" readonly style="background-color:#fff;">      
            </div>
            <div class="form-group">
                <label for="status">状态</label>
                <select name="status" id="status" class="form-control">
                    <option value="">-请选择-</option>
                    <option value="1" {{ "selected" if 1==params.status else "" }}>草稿</option>
                    <option value="2" {{ "selected" if 2==params.status else "" }}>已发布</option>
                </select>    
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
                                    <a href="/admin/blog/note/repeal?id={{item.id}}" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true">撤销</span></a>
                                {% else %}
                                    <a href="/admin/blog/note/publish?id={{item.id}}" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true">发布</span></a>
                                {% endif %}
                                {{ template.btnEdit("/admin/blog/note/edit?id="+item.id) }}
                                {{ template.btnDel("javascript:if(confirm('确定要删除该内容吗?'))location='/admin/blog/note/del?id="+item.id+"'") }}
                            </div>
                        </div>
                    </div>

                    <!-- heading end -->

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12">
                                {{ item.content|safe }}
                            </div>
                        </div>
                    </div>

                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12 col-sm-3">
                                <label>状态：</label>
                                {% if 2==item.status %}
                                    <font color="green">已发布</font>
                                {% else %}
                                    草稿
                                {% endif %}
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label>分类：</label>{{item.category_title}}
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label>创建：</label>{{ item.create_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
                            </div>
                            <div class="col-xs-12 col-sm-3">
                                <label>更新：</label>{{ item.update_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
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