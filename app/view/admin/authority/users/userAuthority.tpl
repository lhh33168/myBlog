{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
    {{ template.menu('/admin/authority/users',ctx) }} 
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li><a href="/admin/authority/users">账号管理</a></li>
            <li class="active">账号授权</li>
            <li>{{ template.btnGoback("/admin/authority/users") }}</li>
        </ol>
        <div class="panel panel-default">
            <div class="panel-body">
                <form action='/admin/authority/users/authority' method='POST' id="formId">
                    <input type="hidden" id="id" name="id" value="{{ userStatus.data.id }}">
                    <input type="hidden" id="roles" name="roles">

                    <p><label>当前账号：</label>{{ userStatus.data.uname }} &nbsp;&nbsp; <label>手机号码：</label>{{ userStatus.data.phone }}</p>
                    {{ template.btnCheckAll('tree') }} &nbsp;&nbsp; 
                    {{ template.btnUncheckAll('tree') }} &nbsp;&nbsp; 
                    <button type="button" onclick="onFormSubmit();" class="btn btn-default"><span class="glyphicon glyphicon-saved"  aria-hidden="true">保存</span></button>
                    <hr/>
                    <div id="tree">

                    </div>
                    <hr/>
                    {{ template.btnCheckAll('tree') }} &nbsp;&nbsp; 
                    {{ template.btnUncheckAll('tree') }} &nbsp;&nbsp; 
                    <button type="button" onclick="onFormSubmit();" class="btn btn-default"><span class="glyphicon glyphicon-saved"  aria-hidden="true">保存</span></button>
                </form>
            </div>
        </div>
    </div>

    <script> 
        var data = [];
        {% for item in allAuthority %}
            data.push( { id: "{{ item.id }}", icon: 'glyphicon glyphicon-user', text: "{{ item.text }}", tags: ["{{ item.tags }}"],state:{ checked: {{ item.checked }}, selected: {{ item.selected }} } } );
        {% endfor %} 

        $(function(){
            if(0==data.length){
                $('#tree').text('没有角色数据，请先去创建角色。');
            } else {
                treeInit('tree', data);
            }
        });
        //提交表单
        function onFormSubmit(){
            var ids = treeGetCheckedId('tree');
            if('tree'==ids){
                ids = '';
            }
            $("#roles").val(ids);
            $("#formId").submit();
        }
    </script>
{% endblock %}

