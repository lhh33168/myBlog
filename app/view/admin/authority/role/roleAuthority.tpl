{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
    {{ template.menu('/role',ctx) }} 
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li><a href='/admin/authority/role'>角色管理</a></li>
            <li class="active">角色授权</li>
            <li>{{ template.btnGoback("/admin/authority/role") }}</li>
        </ol>
        
        <form action='/admin/authority/role/authority' method='POST' id="formId">
            <input type="hidden" id="id" name="id" value="{{ roleStatus.data.id }}">
            <input type="hidden" id="syscode" name="syscode" value="{{ params.syscode }}">
            <input type="hidden" id="menus" name="menus">

            <p><label>当前角色：</label>{{ roleStatus.data.name }}</p>

            <ul class="nav nav-tabs nav-justified">
                <li role="presentation" {{ "class=active" if 1==params.syscode else "" }}><a href="/admin/authority/role/authority?syscode=1&id={{roleStatus.data.id}}">EE快聘</a></li>
                <li role="presentation" {{ "class=active" if 2==params.syscode else "" }}><a href="/admin/authority/role/authority?syscode=2&id={{roleStatus.data.id}}">精英易</a></li>
                <li role="presentation" {{ "class=active" if 3==params.syscode else "" }}><a href="/admin/authority/role/authority?syscode=3&id={{roleStatus.data.id}}">聘得易</a></li>
                <li role="presentation" {{ "class=active" if 4==params.syscode else "" }}><a href="/admin/authority/role/authority?syscode=4&id={{roleStatus.data.id}}">权限系统</a></li>
            </ul>

            <div id="tree" style="margin-top:20px;"></div>
            <div id="operation">
                {{ template.btnCheckAll('tree') }} &nbsp;&nbsp; 
                {{ template.btnUncheckAll('tree') }} &nbsp;&nbsp; 
                <button type="button" onclick="onFormSubmit();" class="btn btn-default"><span class="glyphicon glyphicon-saved"  aria-hidden="true">保存</span></button>
            </div>

        </form>
    </div>

    <script> 
        $(function(){
            $.get("/admin/authority/rote/getMenuAuthority?id={{roleStatus.data.id}}&syscode={{params.syscode}}", function(data){
                if(data&&data.length>0){
                    treeInit('tree', data);
                } else {
                    $('#tree').html('<p style="text-align:center;color:#c00;">该系统未登记权限数据</p>');
                    $('#operation').hide();
                }
            });
        });
        //提交表单
        function onFormSubmit(){
            var ids = treeGetCheckedId('tree');
            $("#menus").val(ids);
            $("#formId").submit();
        }
    </script>
{% endblock %}

