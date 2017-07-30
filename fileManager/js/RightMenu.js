(function(q){
	"use strict";
	//用于区分但单双击的定时器300毫秒内点击两次代表双击，否则为单击。
	var oneAndDoubleClickTimer = null;
	//单击标识符，默认为false，代表默认是双击
	var oneClickFlag = false;
	var RightMenu = function(){
		
	}
	/**
	 * 根据元素id来创建菜单
	 */
	RightMenu.prototype.createMenuById = function(id){
			
	}
	/**
	 * 禁用html的右键事件
	 */
	RightMenu.prototype.forbidRightEventByHtml = function(){
		document.oncontextmenu = function() {
		    return false;
		}
	}
	/**
	 * 根据className禁用指定元素的右键事件
	 * @param {Object} className 例如：.class
	 */
	RightMenu.prototype.forbidElementRightEventByClass = function(className){
		$(className).bind("contextmenu", function(){
		    return false;
		})
	}
	/**
	 * 给指定className的元素添加统一的右键事件
	 * @param {Object} className 例如：.class
	 */ 
	RightMenu.prototype.addRightEventByClass = function(className){
		$(className).mousedown(function(e) {
			e = e || event;
		    //右键为3
		    if (3 == e.which) {
		    	//创建右键菜单
		    	createRightMenu(e);
		    } else if (1 == e.which) {
		    	oneClickFlag = !oneClickFlag;
	    	    //左键为1
		        clearTimeout(oneAndDoubleClickTimer);
		        oneAndDoubleClickTimer = setTimeout(function() {
					// click 事件的处理 
					if(oneClickFlag){
						//弹出即全屏
						var index = layer.open({
						  	type: 2,
						  	content: 'http://itnoteshare.com',
						  	area: ['100%', '100%'],
						  	maxmin: true
						});
					}else{
						layer.open({
							type: 2,
							content: 'http://itnoteshare.com/course/gotoCourseList.htm',
							area: ['90%', '90%'],
							maxmin: true
						});
					}
					oneClickFlag = false;
				},300);
		    }
		})
	}
	/**
	 * 创建文件/文件夹右键菜单
	 */
	function createRightMenu(e){
		$("#menuDiv").remove();
       	//在鼠标处弹出菜单
        var menuDiv = document.createElement("div");
        menuDiv.id = "menuDiv";
        menuDiv.style.left=e.clientX+"px";  // 指定创建的DIV在文档中距离左侧的位置
       	menuDiv.style.top=e.clientY+"px";  // 指定创建的DIV在文档中距离顶部的位置
       	menuDiv.style.position="absolute"; // 为新创建的DIV指定绝对定位
       	menuDiv.style.border="1px solid #929292"; // 设置边框
      	menuDiv.style.width="200px"; // 指定宽度
       	menuDiv.style.height="200px"; // 指定高度
       	menuDiv.style.backgroundColor = "#F3F3F3";
       	document.body.appendChild(menuDiv);
       	//添加打开菜单
       	var openMenu = document.createElement("div");
       	openMenu.width = "100%";
       	openMenu.height = "35px";
       	openMenu.textContent = "打开";
       	openMenu.textAlign = "center";
       	openMenu.style.margin = "5px";
       	openMenu.style.fontWeight = "bold";
       	openMenu.style.cursor = "pointer";
       	menuDiv.appendChild(openMenu);
       	//创建分割线
       	var line = document.createElement("hr");
       	line.style.border = "1px solid #898989";
       	line.style.margin = "0px";
       	//添加分割线
       	menuDiv.appendChild(line);
       	//添加重命名菜单
       	var renameMenu = document.createElement("div");
       	renameMenu.width = "100%";
       	renameMenu.height = "35px";
       	renameMenu.textContent = "重命名";
       	renameMenu.textAlign = "center";
       	renameMenu.style.margin = "5px";
       	renameMenu.style.cursor = "pointer";
       	menuDiv.appendChild(renameMenu);
       	//添加删除菜单
       	var deleteMenu = document.createElement("div");
       	deleteMenu.width = "100%";
       	deleteMenu.height = "35px";
       	deleteMenu.textContent = "删除";
       	deleteMenu.textAlign = "center";
       	deleteMenu.style.margin = "5px";
       	deleteMenu.style.cursor = "pointer";
       	menuDiv.appendChild(deleteMenu);
       	//添加导出菜单
       	var exportMenu = document.createElement("div");
       	exportMenu.width = "100%";
       	exportMenu.height = "35px";
       	exportMenu.textContent = "导出笔记";
       	exportMenu.textAlign = "center";
       	exportMenu.style.margin = "5px";
       	exportMenu.style.cursor = "pointer";
       	menuDiv.appendChild(exportMenu);
       	//添加分割线
       	var line2 = document.createElement("hr");
       	line2.style.border = "1px solid #898989";
       	line2.style.margin = "0px";
       	menuDiv.appendChild(line2);
       	//添加属性菜单
       	var attrMenu = document.createElement("div");
       	attrMenu.width = "100%";
       	attrMenu.height = "35px";
       	attrMenu.textContent = "属性";
       	attrMenu.textAlign = "center";
       	attrMenu.style.margin = "5px";
       	attrMenu.style.cursor = "pointer";
       	menuDiv.appendChild(attrMenu);
       	//给菜单添加点击事件
       	$("#menuDiv div").mousedown(function(e){
       		e = e || event;
       		layer.alert("我单击了\"" + $(this).text() + "\"菜单");
       	});
       	//点击空白处关闭菜单
       	$("html").mouseup(function(ev){
	    	var ev = ev || event;
	       	if(1 == ev.which){
	       		$("#menuDiv").remove();
	       	}
       	});
	}
	window.RightMenu = RightMenu;
})(window);