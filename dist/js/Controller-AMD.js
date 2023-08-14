define(["util-AMD","DAO-AMD"],function(e,t){function a(){e.$(".left").setAttribute("class","left page-active"),e.$(".mid").setAttribute("class","mid page-next"),e.$(".right").setAttribute("class","right page-next-next"),currentScreen=1,I(currentScreen)}function n(){e.$(".left").setAttribute("class","left page-pre"),e.$(".mid").setAttribute("class","mid page-active"),e.$(".right").setAttribute("class","right page-next"),currentScreen=2,I(currentScreen)}function s(){e.$(".left").setAttribute("class","left page-pre-pre"),e.$(".mid").setAttribute("class","mid page-pre"),e.$(".right").setAttribute("class","right page-active"),currentScreen=3,I(currentScreen)}var l=-1,i="AllCate",o=-1,c=function(){r(),v();var a=e.$("#task-list");a.innerHTML=T(t.queryAllTasks()),$(),A(a.getElementsByTagName("li")[0].getAttribute("taskid")),e.addClass(e.$("[taskid]"),"active"),t.listAllStorage();var n=e.$("#listcontent");e.delegateEventBubbleOnce(n,"h2","click",function(){g(this)}),e.delegateEventBubbleOnce(n,"h3","click",function(){g(this)}),e.addClickEvent(e.$("#allTasks"),function(){g(this),A(a.getElementsByTagName("li")[0].getAttribute("taskid"))}),e.delegateEventTrash(n,"i","click","fa fa-trash-o",function(){d(event,this)}),e.addClickEvent(e.$("#addCate"),function(){u()}),e.addClickEvent(e.$("#ok-modal"),function(){k()}),e.addClickEvent(e.$("#cancel-modal"),function(){f()}),e.delegateEventBubbleOnce(e.$("#task-list"),"li","click",function(){m(this)}),e.addClickEvent(e.$("#add-task"),function(){M()})},r=function(){for(var a=t.queryCates(),n="<ul>",s=t.queryChildCatesById(0),l=0;l<a.length;l++){var i="";if(0===a[l].child.length)i="<li><h2 cateid="+a[l].id+'><i class="fa fa-folder-open"></i><span>'+a[l].name+"</span> ("+t.queryTasksLengthByCate(a[l])+')<i class="fa fa-trash-o"></i></h2></li>';else if(0===l)i='<li><h2 cateid=0><i class="fa fa-folder-open"></i><span>'+a[l].name+"</span> ("+t.queryTasksLengthByCate(a[l])+')</h2><ul><li><h3 cateid=0><i class="fa fa-file-o"></i><span>'+s.name+"</span> ("+s.child.length+")</h3></li>";else{i="<li><h2 cateid="+a[l].id+'><i class="fa fa-folder-open"></i><span>'+a[l].name+"</span> ("+t.queryTasksLengthByCate(a[l])+')<i class="fa fa-trash-o"></i></h2><ul>';for(var o=t.queryChildCatesByIdArray(a[l].child),c=0;c<o.length;c++){var r="";r="<li><h3 cateid="+o[c].id+'><i class="fa fa-file-o"></i><span>'+o[c].name+"</span> ("+o[c].child.length+')<i class="fa fa-trash-o"></i></h3></li>',i+=r}i+="</ul></li>"}n+=i}n+="</ul>";var d=e.$("#listcontent");d.innerHTML=n,e.$(".list-title span").innerHTML=t.queryAllTasks().length},d=function(a,n){window.event?window.event.cancelBubble=!0:a.stopPropagation(),console.log("=====del======");var s=n.parentNode;if("h2"===s.tagName.toLowerCase()){console.log("h2"),s.getAttribute("cateid"),console.log(s.getAttribute("cateid"));var l=confirm("Are you sure to delete the category?");l===!0&&t.deleteCate(s.getAttribute("cateid"))}else if("h3"===s.tagName.toLowerCase()){console.log("h3"),console.log(s.getAttribute("cateid"));var i=confirm("Are you sure to delete the category?");i===!0&&t.deleteChildCate(s.getAttribute("cateid"))}r(),v(),e.$("#task-list").innerHTML=T(t.queryAllTasks())},u=function(){console.log("=========clickAddCate===========");var t=e.$(".cover");t.style.display="block"},v=function(){for(var a=t.queryCates(),n='<option value="-1">Add main category</option>',s=1;s<a.length;s++)n+='<option value="'+a[s].id+'">'+a[s].name+"</option>";e.$("#modal-select").innerHTML=n,e.$("#newCateName").value=""},f=function(){e.$(".cover").style.display="none"},k=function(){console.log("----click ok----"),console.log(e.$("#modal-select").value);var a=e.$("#modal-select").value,n=e.$("#newCateName").value;""===n?alert("Please enter a category name"):(-1==a?(console.log("Add main category"),t.addCate(n)):(console.log("Add category"),t.addChildCate(a,n)),r(),e.$(".cover").style.display="none"),v()},g=function(a){console.log("=======clickCate======="),console.log(a);var s=e.$("#task-list");h(a),console.log(a.getAttribute("cateid"));var c=a.getAttribute("cateid");if(-1==c)s.innerHTML=T(t.queryAllTasks()),l=-1,i="AllCate";else if("h2"==a.tagName.toLowerCase()){console.log("main cate--->"+c);var r=T(t.queryTasksByCateId(c));s.innerHTML=r,l=c,i="cate",A(""===r?-2:o)}else{console.log("childCate--->"+c),console.log(t.queryTasksByChildCateId(c));var d=T(t.queryTasksByChildCateId(c));s.innerHTML=d,l=c,i="childCate",A(""===d?-2:o)}b(),e.addClass(e.$("#all-tasks"),"active"),void 0!==e.$("[taskid]")&&e.addClass(e.$("[taskid]"),"active"),n()},h=function(t){y(),e.addClass(t,"active")},y=function(){e.removeClass(e.$("#allTasks"),"active");for(var t=e.$("#listcontent").getElementsByTagName("h2"),a=0;a<t.length;a++)e.removeClass(t[a],"active");for(var n=e.$("#listcontent").getElementsByTagName("h3"),s=0;s<n.length;s++)e.removeClass(n[s],"active")},T=function(e){var t="";if(console.log("dateTasksArr------->"),console.log(e),0===e.length)t="";else{var a=C(e);console.log("dateTasksArr------->"+a);for(var n=0;n<a.length;n++){for(var s="<div>"+a[n].date+"</div><ul>",l=0;l<a[n].tasks.length;l++){var i="";i=a[n].tasks[l].finish?'<li class="task-done" taskid="'+a[n].tasks[l].id+'"><i class="fa fa-check"></i> '+a[n].tasks[l].name+"</li>":'<li taskid="'+a[n].tasks[l].id+'">'+a[n].tasks[l].name+"</li>",s+=i}s+="</ul>",t+=s}}return t},C=function(e){for(var a=[],n=[],s=0;s<e.length;s++)-1==a.indexOf(e[s].date)&&a.push(e[s].date);console.log(a),console.log(e),a=a.sort().reverse();for(var l=0;l<a.length;l++){var i={};i.date=a[l],i.tasks=t.queryTasksByDateInTaskArr(a[l],e),n.push(i)}return o=n[0].tasks[0].id,n},$=function(){e.addClickEvent(e.$("#all-tasks"),function(){console.log("click all tasks"),p(this)}),e.addClickEvent(e.$("#unfinish-tasks"),function(){console.log("click unfinish tasks"),p(this,!1)}),e.addClickEvent(e.$("#finished-tasks"),function(){console.log("click finished-tasks"),p(this,!0)})},p=function(a,n){b(),e.addClass(a,"active");var s=e.$("#task-list");-1==l?s.innerHTML=T(t.queryAllTasks(n)):"cate"==i?s.innerHTML=T(t.queryTasksByCateId(l,n)):(console.log("**************************"),console.log(l),s.innerHTML=T(t.queryTasksByChildCateId(l,n)),console.log("*********** END **********"))},b=function(){e.removeClass(e.$("#all-tasks"),"active"),e.removeClass(e.$("#unfinish-tasks"),"active"),e.removeClass(e.$("#finished-tasks"),"active")},m=function(t){var a=t.getAttribute("taskid");o=a,A(a),L(),e.addClass(t,"active"),s()},A=function(a){var n=e.$(".todo-name"),s=e.$(".task-date span"),l=e.$(".textarea-content"),i=e.$(".manipulate");if(l.setAttribute("readonly","readonly"),l.setAttribute("disabled","disabled"),-2===a)console.log("-----2-2-2-2-2-2-2-2-2-2-2--2-2-2-2-2--2-2-2-2-2-2-2-"),n.innerHTML="none",s.innerHTML="none",l.value="none",i.innerHTML="";else{var o=t.queryTaskById(a),c=e.$(".content");n.innerHTML=o.name,s.innerHTML=o.date,l.value=o.content,c.setAttribute("class","content content-no-button"),e.$(".button-area").style.display="none",o.finish?i.innerHTML="":(i.innerHTML='<a id="checkTaskDone"><i class="fa fa-check-square-o"></i></a><a id="changeTask"><i class="fa fa-pencil-square-o"></i></a>',e.addClickEvent(e.$("#checkTaskDone"),function(){q()}),e.addClickEvent(e.$("#changeTask"),function(){B()}))}},L=function(){for(var t=e.$("#task-list").getElementsByTagName("li"),a=0;a<t.length;a++)e.removeClass(t[a],"active")},M=function(){if(console.log("clickAddTask"),-1!=l&&"cate"==i&&0===t.queryCateById(l).child.length)alert("Please create a subcategory first"),a();else{e.$(".todo-name").innerHTML='<input type="text" class="input-title" placeholder="Please enter a title">',e.$(".manipulate").innerHTML="",e.$(".task-date span").innerHTML='<input type="date" class="input-date">';var n=e.$(".content");n.innerHTML='<textarea class="textarea-content" placeholder="Please enter the task content"></textarea>',n.setAttribute("class","content content-with-button"),e.$(".button-area").innerHTML='<span class="info"></span>                    <button class="save">save</button>                    <button class="cancel-save">give up</button>',e.$(".button-area").style.display="block",H(),s()}},H=function(){e.addClickEvent(e.$(".save"),function(){var a=e.$(".input-title"),n=e.$(".textarea-content"),s=e.$(".input-date"),c=e.$(".info");if(console.log("save"),console.log(l),console.log(i),console.log(n.value),""===a.value)c.innerHTML="The title can not be blank";else if(""===s.value)c.innerHTML="date cannot be empty";else if(""===n.value)c.innerHTML="the content can not be blank";else{var d={};d.finish=!1,d.name=e.changeCode(a.value),d.date=e.changeCode(s.value),d.content=n.value,d.pid="AllCate"===i?0:"cate"===i?t.queryCateById(l).child[0]:l,console.log(d);var u=t.addTask(d);r();var v=e.$("#task-list");v.innerHTML=T("AllCate"===i?t.queryAllTasks():"cate"===i?t.queryTasksByCateId(l):t.queryTasksByChildCateId(l)),o=u,A(u)}}),e.addClickEvent(e.$(".cancel-save"),function(){console.log("cancel save"),n(),window.innerWidth>=770&&A(o)})},q=function(){var a=confirm("Are you sure you want to mark the task as complete?");if(a){console.log(o),t.updateTaskStatusById(o),t.listAllStorage(),console.log(o),A(o),console.log(o);var n=o,s=e.$("#task-list");s.innerHTML=T("AllCate"===i?t.queryAllTasks():"cate"===i?t.queryTasksByCateId(l):t.queryTasksByChildCateId(l)),o=n}},B=function(){var a=t.queryTaskById(o),n=e.$(".content");e.$(".todo-name").innerHTML='<input type="text" class="input-title" placeholder="Please enter a title" value="'+a.name+'">',e.$(".manipulate").innerHTML="",e.$(".task-date span").innerHTML='<input type="date" class="input-date" value="'+a.date+'">',n.innerHTML='<textarea class="textarea-content" placeholder="Please enter the task content">'+a.content+"</textarea>",n.setAttribute("class","content content-with-button"),e.$(".button-area").innerHTML='<span class="info"></span>                    <button class="save">Save changes</button>                    <button class="cancel-save">give up</button>',e.$(".button-area").style.display="block",E()},E=function(){e.addClickEvent(e.$(".save"),function(){var a=e.$(".input-title"),n=e.$(".textarea-content"),s=e.$(".input-date"),c=e.$(".info");if(""===a.value)c.innerHTML="The title can not be blank";else if(""===s.value)c.innerHTML="date cannot be empty";else if(""===n.value)c.innerHTML="the content can not be blank";else{console.log("before save change, check currentTaskId"),console.log(o),t.updateTaskById(o,a.value,s.value,n.value),A(o),console.log(o);var r=o,d=e.$("#task-list");d.innerHTML=T("AllCate"===i?t.queryAllTasks():"cate"===i?t.queryTasksByCateId(l):t.queryTasksByChildCateId(l)),o=r}}),e.addClickEvent(e.$(".cancel-save"),function(){A(o)})},I=function(t){if(window.innerWidth<770){var s=e.$("#backBtn");switch(t){case 1:s.style.display="none";break;case 2:s.style.display="block",e.addClickEvent(s,function(){a()});break;case 3:s.style.display="block",e.addClickEvent(s,function(){n()})}}};return{initAll:c}});