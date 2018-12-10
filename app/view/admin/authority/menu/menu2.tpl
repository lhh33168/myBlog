{% import "../../common/template.tpl" as template %}
{% extends "../../common/base.tpl" %} 
{% block body %} 
    {{ template.menu('/admin/authority/menu',ctx) }} 
    <div class="container" style="margin-top:70px; margin-bottom:20px;">
        <ol class="breadcrumb">
            <li class="active">系统设置</li>
            <li class="active">菜单功能管理</li>
			<li><a href="/admin/authority/menu/export" type="button" class="btn btn-default" target="_blank"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>导出菜单目录</a></li>
			<li><a type="button"  class="btn btn-default" data-toggle="modal" data-target="#myModal3">导入菜单</a></li>
		
        </ol>
		<ul class="nav nav-tabs nav-justified">
			<li role="presentation" {{ "class=active" if 1==params.syscode else "" }}><a href="/admin/authority/menu?syscode=1">EE快聘</a></li>
			<li role="presentation" {{ "class=active" if 2==params.syscode else "" }}><a href="/admin/authority/menu?syscode=2">精英易</a></li>
			<li role="presentation" {{ "class=active" if 3==params.syscode else "" }}><a href="/admin/authority/menu?syscode=3">聘得易</a></li>
			<li role="presentation" {{ "class=active" if 4==params.syscode else "" }}><a href="/admin/authority/menu?syscode=4">权限系统</a></li>
		</ul>
		<div class="panel panel-default" style="border-top:0px;margin-top:-2px;">
			<div class="panel-body">
				<button class="btn btn-default btn-xs" onClick="onAddFirstBtn();"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
				<ul id="treeDemo" class="ztree"></ul>
			</div>
		</div>
    </div>

<div id="myModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">			
			<form  method='POST' id="formId">
				<input type="hidden" name="id" id='currutId' value="">
				<input type="hidden" name="syscode" id='syscode' value="{{params.syscode}}">
				<input type="hidden" id="go">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="gridSystemModalLabel"></h4>
				</div>
				<div class="modal-body">
					<input type="hidden" name="parent_id" id="parentId">
					<div class="form-group">
						<label for="title">父级名称</label>
						<input type="text" class="form-control" id="parentTitle" disabled>
					</div>
					<div class="form-group">
						<label for="title">名称</label>
						<input type="text" class="form-control" name="title" id="title" placeholder="请输入名称">
						<span class="tips">{{status.data.errors.title}}</span>
					</div>
					<div class="form-group">
						<label for="type">类型</label>
						<select name="type" class="form-control" id="type">
							<option value='1' {{ "selected" if "1"==status.data.type else "" }}>菜单</option>
							<option value='2' {{ "selected" if "2"==status.data.type else "" }}>功能</option>
						</select>
						<span class="tips">{{status.data.errors.type}}</span>
					</div>
					<div class="form-group">
						<label for="url">URL地址</label>
						<input type="text" class="form-control" name="url" id="url" placeholder="请输入URL地址" value="{{status.data.url}}">
						<span class="tips">{{status.data.errors.url}}</span>
					</div>
					<div class="form-group">
						<label for="link_urls">相关联URL地址（多个地址用英文逗号','隔开）</label>
						<input type="text" class="form-control" name="link_urls" id="link_urls" placeholder="请输入相关联URL地址" value="{{status.data.link_urls}}">
						<span class="tips">{{status.data.errors.link_urls}}</span>
					</div>
					<div class="form-group">
						<label for="seq">顺序</label>
						<input type="number" class="form-control" name="seq" id="seq" placeholder="请输入顺序" value="{{status.data.seq}}">
						<span class="tips">{{status.data.errors.seq}}</span>
					</div>
					<div class="form-group">
						<label for="remark">备注</label>
						<input type="text" class="form-control" name="remark" id="remark" placeholder="请输入备注" value="{{status.data.remark}}">
						<span class="tips">{{status.data.errors.remark}}</span>
					</div>
					<div class="form-group">
						<label for="status">状态</label>
						<select class="form-control" id="status" name="status">
							<option value=1 {{ "selected" if 1==status.data.status else "" }}>启用</option>
							<option value=2 {{ "selected" if 2==status.data.status else "" }}>禁用</option>
						</select>
						<span class="tips">{{status.data.errors.status}}</span>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onClick="onSave();">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" >
					提示：
				</h4>
			</div>
			<div class="modal-body">
				<h5 class="tips" id="desc"></h5>
				<input type="hidden"  id="delId">
				<input type="hidden" id ="parentId">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">返回
				</button>
				<button type="button" class="btn btn-primary" onClick="onDel();">
					确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<a href="/admin/authority/menu/download" target="_blank"><span>下载模板</span></a>
      </div>
      <div class="modal-body">
	  	<form action="/admin/authority/menu/import?_csrf={{ ctx.csrf | safe }}" method="post" enctype="multipart/form-data" accept-charset="utf-8" id='form0'>
			<input type="file" id="data" name="data" />
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" onClick="uploadFile()";>提交</button>
      </div>
    </div>
  </div>
</div>

<script>
	var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false
			
		},
		edit:{
			enable: true,
			//editNameSelectAll: true,
			showRemoveBtn: false,
			showRenameBtn: false
		},
		async: { 
			enable: true,
			type: "get",
			url:"/admin/authority/setChildrenMenus2?syscode={{params.syscode}}",
			autoParam:["id"]
		},
			callback: {
			beforeClick: zTreeBeforeClick,
			beforeExpand:zTreeBeforeExpand,
		}
	};

	function zTreeBeforeExpand(reeId,treeNode){
		if (treeNode.children.length>0) return true;
		if (treeNode.child_num == 0) return true;
		$.ajax({
			url:'/admin/authority/setChildrenMenus2?syscode={{params.syscode}}&id='+treeNode.id,
			success:function(data){
				console.log(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				treeObj.addNodes(treeNode,data);
				return true	
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				alert('获取菜单数据出错，请稍后再试。');
			}
		});
	}
	
	function zTreeBeforeClick(reeId, treeNode){
		return treeNode.isParent
	}

	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_"+treeNode.tId).unbind().remove();
		$("#edit2Btn_"+treeNode.tId).unbind().remove();
		$("#remove2Btn_"+treeNode.tId).unbind().remove();
	};

	function addHoverDom(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		if ($("#edit2Btn_"+treeNode.tId).length>0) return;
		if (treeNode.isParent){
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add' onfocus='this.blur();'></span>";
				addStr += "<span class='button edit' id='edit2Btn_" + treeNode.tId + "' title='eidt' onfocus='this.blur();'></span>";
				addStr += "<span class='button remove' id='remove2Btn_" + treeNode.tId + "' title='remove' onfocus='this.blur();'></span>";
		}else{
			var addStr = "<span class='button edit' id='edit2Btn_" + treeNode.tId + "' title='eidt' onfocus='this.blur();'></span>";
				addStr += "<span class='button remove' id='remove2Btn_" + treeNode.tId + "' title='remove' onfocus='this.blur();'></span>";

		}
		sObj.append(addStr);
		var btn = $("#addBtn_"+treeNode.tId);
		if (btn) btn.bind("click", function(){
			$('#formId')[0].reset();
			$("#gridSystemModalLabel").html("新增菜单");
			$('#parentId').val(treeNode.id);
			$('#type').val(1);
			$('#link_urls').parent().hide();
			$("#go").val("add");
			$('#type').attr("disabled",false);
			$("#parentTitle").val(treeNode.name);
			$("#parentTitle").parent().show();
			$('#myModal').modal('show');
			return false;
		});

		var btnE = $("#edit2Btn_"+treeNode.tId);
		if (btnE) btnE.bind("click", function(){
			$.ajax({
				url:'/admin/authority/menu/edit?id='+treeNode.id,
				success:function(res){
					if(0===res.code){
						var data = res.data;
						console.log(treeNode);
						$("#gridSystemModalLabel").html("编辑菜单");
						$("#go").val("edit");
						$("#currutId").val(data.id);
						$("#parentId").val(data.parent_id);
						$("#status").val(data.status);
						if (data.parent_id == 0){
							$("#parentTitle").val("")
						}else{
							$('#parentTitle').val(treeNode.getParentNode().name);
						}
						$('#title').val(data.title);
						$("#type").val(data.type);
						$('#type').attr("disabled",true);
						$('#remark').val(data.remark);
						$('#url').val(data.url);
						$('#link_urls').val(data.link_urls);
						$("#seq").val(data.seq);
						$("#parentTitle").parent().show();
						$('#myModal').modal('show');
					} else {
						if(res.data.errors){
							showTips(res.data.errors);
						} else {
							alert(res.message);
						}
					}
				}
			});
			return false;
		});

		var btnR = $("#remove2Btn_"+treeNode.tId);
		if (btnR) btnR.bind("click", function(){
			if (treeNode.isParent){
				if (treeNode.children.length>0||treeNode.child_num>0){alert("还有功能不能直接删除");return}
			}
			$("#delId").val(treeNode.id);
			$("#parentId").val(treeNode.parent_id);
			$("#desc").html("确定要删除该内容吗?")
			$("#myModal2").modal("show")
			return false;
		});
	};
	function showTips(errors){
		var ids=['title', 'type', 'url', 'seq', 'remark', 'status'];
		for(var i=0,len=ids.length;i<len;i++){
			var key = ids[i];
			$('#'+key).next().text(errors[key]||'');
		}
	}
	// 保存
	function onSave(){
		$.ajax({
			url: "/admin/authority/menu/"+$("#go").val(),
			data: $('#formId').serialize(),
			type: "POST",
			success: function(data, textStatus, jqXHR){
				if(0===data.code){
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					var parentId = $("#parentId").val();	
					var parentNode = zTree.getNodeByParam("id",parentId,null);

					zTree.reAsyncChildNodes(parentNode, "refresh");
					$('#myModal').modal('hide');
					$('#formId')[0].reset();
					
					alert(data.message);
				} else {
					if(data.data.errors){
						showTips(data.data.errors);
					} else {
						alert(data.message);
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('网络繁忙，请稍后再试！');
			}
		});
	}
	// 删除
	function onDel(){
		$.ajax({
			type:"get",
			url:"/admin/authority/menu/del?id="+$("#delId").val(),
			success:function(res){
				$('#myModal2').modal('hide');
				if(0===res.code){
					alert(res.message);

					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					console.log("zTree:",zTree);
					var parentId = $("#parentId").val();	
					var parentNode = zTree.getNodeByParam("id",parentId,null);
					console.log("parentNode:",parentNode)
					zTree.reAsyncChildNodes(parentNode, "refresh",true);
				} else {
					if(res.data.errors){
						showTips(res.data.errors);
					} else {
						alert(res.message);
					}
				}
			},
			error:function(res){
				alert(res.message);
			}
		})
	}
	//新增顶级菜单
	function onAddFirstBtn(){
		$('#formId')[0].reset();
		$("#parentId").val(0);
		$("#gridSystemModalLabel").html("新增顶级菜单");
		$("#go").val("add");
		$('#type').attr("disabled",true);
		$("#parentTitle").parent().hide();
		$('#link_urls').parent().hide();
		$('#myModal').modal('show');
	}
	$(document).ready(function(){
		var treeObj = $.fn.zTree.init($("#treeDemo"), setting);
		$('#type').change(function(){
			if(1==this.value){
				$('#link_urls').parent().hide();
			} else {
				$('#link_urls').parent().show();
			}
		});
	});

	function uploadFile() { 
		var form = document.getElementById('form0');
		var data = document.getElementById("data");
		if (data.files.length==0){
			alert('请上传');
		}else{
			formData = new FormData();
			formData.append("data",data.files[0])
			$.ajax({ 
				url:"/admin/authority/menu/import?_csrf="+`{{ ctx.csrf | safe }}`, 
				type:"post", 
				data:formData, 
				processData:false, 
				contentType:false, 
				success:function(res){ 
					console.log(res);
					if(res){ 
						alert(res);
						$("#data").val("");
						$("#myModal3").modal("hide")
					} 
				}, 
				error:function(err){ 
					alert("网络连接失败,稍后重试",err); 
				} 
				
			})
		}

		

		
		/*
		$.ajax({ 
			url:"https://sscpre.boe.com/v1/medical-console/medical/file/upload", 
			type:"post", 
			data:formData, 
			processData:false, 
			contentType:false, 
			success:function(res){ 
				if(res){ 
				alert("上传成功！"); 
				} 
				console.log(res); 
				$("#pic").val(""); 
				$(".showUrl").html(res); 
				$(".showPic").attr("src",res); 
			}, 
			error:function(err){ 
				alert("网络连接失败,稍后重试",err); 
			} 
			
		})
		*/ 
  	}
</script>

{% endblock %}