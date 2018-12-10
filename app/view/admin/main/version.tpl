{% import "../common/template.tpl" as template %}
{% extends "../common/base.tpl" %}
{% block body %}
{{ template.menu('/admin/main/main',ctx) }}

<div class="container" style="margin-top:70px; margin-bottom:20px;" data-spy="scroll" data-target="#navbar-example" id='body-container'>
    <ol class="breadcrumb">
        <li class="active">首页</li>
    </ol>
    <div class="panel panel-default">
        <div class="panel-body" style="color: #777;">
            欢迎回来!
        </div>
    </div>
</div>

{% endblock %}