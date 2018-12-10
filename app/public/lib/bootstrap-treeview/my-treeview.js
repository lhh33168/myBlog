//全选
function treeCheckAll(divId){
    $('#'+divId).treeview('checkAll', { silent: true });
}
//取消
function treeUncheckAll(divId){
    $('#'+divId).treeview('uncheckAll', { silent: true });
}
//获取选中的节点id
function treeGetChecked(divId){
    var ids = $('#'+divId).treeview('getChecked');
    var idsText = '';
    for(i in ids){
        idsText += ids[i].nodeId + ",";
    }
    idsText = idsText.substring(0, idsText.length-1);
    return idsText;
}
//获取选中的节点id
function treeGetCheckedId(divId){
    var ids = $('#'+divId).treeview('getChecked');
    var idsText = '';
    for(i in ids){
        if(ids[i].id){
            idsText += ids[i].id + ",";
        }
    }
    idsText = idsText.substring(0, idsText.length-1);
    return idsText;
}
//获取节点下的所有子节点
function treeGetChildNodeIdArr(node) {
    var ts = [];
    if (node.nodes) {
        for (x in node.nodes) {
            ts.push(node.nodes[x].nodeId);
            if (node.nodes[x].nodes) {
                var getNodeDieDai = treeGetChildNodeIdArr(node.nodes[x]);
                for (j in getNodeDieDai) {
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    } else {
        ts.push(node.nodeId);
    }
    return ts;
}
//选中父节点
function treeSetParentNodeCheck(node, tree) {
    var parentNode = tree.treeview("getNode", node.parentId);
    if (parentNode.nodes) {
        var uncheckedCount = 0;
        for (x in parentNode.nodes) {
            if (!parentNode.nodes[x].state.checked) {
                uncheckedCount ++;
            } else {
                break;
            }
        }
        if (uncheckedCount === parentNode.nodes.length) {
            tree.treeview("uncheckNode", [parentNode.nodeId, { silent: true }] );
            tree.treeview("unselectNode", [parentNode.nodeId,{ silent: true }]);
        } else {
            tree.treeview("checkNode", [parentNode.nodeId, { silent: true }] );
            tree.treeview("selectNode", [parentNode.nodeId,{ silent: true }]);
        }
        treeSetParentNodeCheck(parentNode, tree);
    }
}


//初始化树结构
function treeInit(divId, data){
    var tree = $('#'+divId);
    tree.treeview({
        data: data,
        showCheckbox: true,
        multiSelect: true,
        showBorder: true,
        highlightSelected: false,
        showTags: true,
        onNodeChecked: function (event, node) {
            tree.treeview("selectNode", [node.nodeId,{ silent: true }]);
            var selectNodes = treeGetChildNodeIdArr(node); //获取所有子节点  
            if (selectNodes) { //子节点不为空，则选中所有子节点  
                tree.treeview('checkNode', [selectNodes, { silent: true }]);
                tree.treeview("selectNode", [selectNodes,{ silent: true }]);  
            }  
            var parentNode = tree.treeview("getNode", node.parentId);  
            treeSetParentNodeCheck(node, tree);
        },
        onNodeUnchecked: function(event, node) { //取消选中节点  
            tree.treeview("unselectNode", [node.nodeId,{ silent: true }]);
            var selectNodes = treeGetChildNodeIdArr(node); //获取所有子节点  
            if (selectNodes) { //子节点不为空，则取消选中所有子节点  
                tree.treeview('uncheckNode', [selectNodes, { silent: true }]);
                tree.treeview("unselectNode", [selectNodes,{ silent: true }]);  
            }
            var parentNode = tree.treeview("getNode", node.parentId);  
            treeSetParentNodeCheck(node, tree);
        },
        onNodeSelected: function (event, node) {
            tree.treeview("checkNode", [node.nodeId] );
        },
        onNodeUnselected : function (event, node) {
            tree.treeview("uncheckNode", [node.nodeId] );
        }
    });
}
