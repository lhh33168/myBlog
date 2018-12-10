{# 导航条 #}
{% macro menu(url, ctx) %}
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="javascript:void(0);" style="cursor:default;">
                        管理后台
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navkeyShort" id="nav_menus">
                        
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class='dropdown {{ "active" if "/admin/authority/users/pword"==url else "" }}'>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ ctx.session.user.nick_name if ctx.session.user.nick_name else ctx.session.user.phone }}<span class="caret"></span></a>
                            <ul class='dropdown-menu'>
                                <li class='{{ "active" if "/admin/authority/users/pword"==url else "" }}'>
                                    <a href="/admin/authority/users/pword">修改密码</a>
                                </li>
                                <li>
                                    <a href="/main/logout">注销</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <script>
        let u = '{{url}}';
        function loadMenu(){
            $('#nav_menus').html("");
            $.ajax({
                type: "GET",
                url: "/admin/authority/getMenu",
                cache: false,
                success: function(status){
                    if(0===status.code && status.data){
                        let html = '';
                        for(let i=0,len=status.data.length;i<len;i++){
                            let item = status.data[i];

                            if(item.children && item.children.length>0){
                                let isIn = false;
                                html+=`<li class="dropdown $(active)">`;
                                html+=      `<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">${item.title}<span class="caret"></span></a>`;
                                html+=      `<ul class="dropdown-menu">`;
                                for(let j=0,jlen=item.children.length;j<jlen;j++){
                                    let item2 = item.children[j];
                                    if(u==item2.url){
                                        isIn = true;
                                        html+=  `<li class='active'>`;
                                    } else {
                                        html+=  `<li>`;
                                    }
                                    html+=          `<a href="${item2.url}">${item2.title}</a>`;
                                        html+=  `</li>`;
                                }
                                html+=      `</ul>`;
                                html+=`</li>`;
                                html = html.replace('$(active)', isIn?'active':'');
                            } else {
                                if(u==item.url){
                                    html+=`<li class='active'>`;
                                } else {
                                    html+=`<li>`;
                                }
                                html+=`<a href="${item.url}">${item.title}</a>`;
                                html+=`</li>`;
                            }
                        }
                        $('#nav_menus').append(html);                
                    }
                },
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('获取系统菜单数据出错，请稍后再试。');
                }
            });
        }
        $(function(){
            loadMenu();
        });
    </script>
{% endmacro %}

{# 分页条 #}
{% macro page(obj, formId) %}
    <div class="btn-toolbar pull-right" role="toolbar" aria-label="...">
        <div class="btn-group pull-right" role="group" aria-label="...">
            {% if 1<obj.page %}
                <a href="javascript:goPage({{obj.page*1-1}});" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>&nbsp;上一页</a>
            {% else %}
                <a href="javascript:void(0);" class="btn btn-default disabled"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>&nbsp;上一页</a>
            {% endif %}

            {% if obj.page<obj.pageCount %}
                <a href="javascript:goPage({{obj.page*1+1}});" class="btn btn-default">下一页&nbsp;<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a>
            {% else %}
                <a href="javascript:void(0);" class="btn btn-default disabled">下一页&nbsp;<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a>
            {% endif %}
        </div>
        <div class="btn-group pull-right" role="group" aria-label="..." style="height:34px;line-height:34px;">
            共 {{obj.rowCount}} 条 &nbsp; {{obj.page}}/{{obj.pageCount}} 页 &nbsp;&nbsp;
        </div>
    </div>
    <script>
        function goPage(page){
            $form = $('#{{formId}}');
            $($form.find("input[name='page']")[0]).val(page);
            $form.submit();
        }
        $(function(){
            $form = $('#{{formId}}');
            $form.keydown(function() {
                if (event.keyCode == "13") {//keyCode=13是回车键
                    $($form.find("input[name='page']")[0]).val(1);
                }
            });
        });
    </script>
{% endmacro %}

{# 新增按钮 #}
{% macro btnAdd(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增</a>
{% endmacro %}
{# 栏目按钮 #}
{% macro btnCategory(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增栏目</a>
{% endmacro %}
{# 单页按钮 #}
{% macro btnSingle(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增单页</a>
{% endmacro %}
{# 链接按钮 #}
{% macro btnLink(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增链接</a>
{% endmacro %}
{# 查找按钮 #}
{% macro btnSearch(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>查找</a>
{% endmacro %}
{# 编辑按钮 #}
{% macro btnEdit(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true">编辑</span></a>
{% endmacro %}
{# 审核按钮 #}
{% macro btnAudit(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-check" aria-hidden="true">审核</span></a>
{% endmacro %}
{# 审核通过按钮 #}
{% macro btnAuditPass(href) %}
    <a href="{{href}}" type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok" aria-hidden="true">通过</span></a>
{% endmacro %}
{# 审核驳回按钮 #}
{% macro btnAuditReject(href) %}
    <a href="{{href}}" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true">驳回</span></a>
{% endmacro %}
{# 删除按钮 #}
{% macro btnDel(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true">删除</span></a>
{% endmacro %}
{# 详情按钮 #}
{% macro btnDetails(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-list-alt" aria-hidden="true">详情</span></a>
{% endmacro %}
{# 提交按钮 #}
{% macro btnSave() %}
    <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-saved"  aria-hidden="true">提交</span></button>
{% endmacro %}
{# 授权按钮 #}
{% macro btnAuthority(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-user" aria-hidden="true">授权</span></a>
{% endmacro %}
{# 部门按钮 #}
{% macro btnGroup(href) %}
    <a href="{{href}}" type="button" class="btn btn-default"><span class="glyphicon glyphicon-user" aria-hidden="true">部门</span></a>
{% endmacro %}
{# 返回按钮 #}
{% macro btnGoback(href) %}
    <a href="{{href}}" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true">返回</span></a>
{% endmacro %}
{# 全选树节点按钮 #}
{% macro btnCheckAll(treeDivId) %}
    <button type="button" class="btn btn-default" onclick="treeCheckAll('{{ treeDivId }}');"><span class="glyphicon glyphicon-check"  aria-hidden="true">全选</span></button>
{% endmacro %}
{% macro btnUncheckAll(treeDivId) %}
    <button type="button" class="btn btn-default" onclick="treeUncheckAll('{{ treeDivId }}');"><span class="glyphicon glyphicon-unchecked"  aria-hidden="true">清空</span></button>
{% endmacro %}
{# 禁用按钮 #}
{% macro btnDisable(href) %}
    <a href='javascript:if(confirm("确定要禁用吗?"))location="{{href}}"' class="btn btn-danger"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true">禁用</span></a>
{% endmacro %}
{# 启用按钮 #}
{% macro btnEnabled(href) %}
    <a href='javascript:if(confirm("确定要启用吗?"))location="{{href}}"' class="btn btn-success"><span class="glyphicon glyphicon-ok-circle" aria-hidden="true">启用</span></a>
{% endmacro %}
{% macro noDataPanel() %}
    <div class="panel panel-default">
        <div class="panel-body" align="center" style="color:#777">
            很抱歉，没有您要找的对象，不如买条狗吧，您看这条狗就很......  Σ( ° △ °|||)︴
        </div>
    </div>
{% endmacro %}
