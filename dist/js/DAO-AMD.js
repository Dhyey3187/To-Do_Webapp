/**
 *
 * DAO
 *
 * Data access objects, including various additions, deletions, and modifications of data
 *
 * @file DAO-AMD.js
 * @author Dhyey Shrimankar(dhyeyshrimankar3187@gmail.com)
 *
 */

//*******Database Design************

/**
 *
 * Using the idea of ​​database, build 3 tables.
  * cateJson category
  * childCateJson subcategory
  * taskJson task
 *
 * classification table
  * ----------------------
  * id* | name | child(FK)
  * ----------------------
  *
  * Subcategory table childCate
  * --------------------------------
  * id* | pid(FK) | name | child(FK)
  * --------------------------------
  *
  * task table task
  * ----------------------------------------------
  * id* | pid(FK) | finish | name | date | content
  * ----------------------------------------------
  */

define(['util-AMD'], function(_) {

    /**
     * Initialization data
     * @return {[type]} [description]
     */
    var initDataBase = (function() {
        console.log("立即执行函数");
        if (!localStorage.cate || !localStorage.childCate || !localStorage.task) {
            console.log("Initialize the database");
            var cateJson = [{
                "id": 0,
                "name": "default category",
                "child": [0]
            }];

            var childCateJson = [{
                "id": 0,
                "pid": 0,
                "name": "default subcategory",
                "child": [-1],
            }];

            var taskJson = [{
                "id": -1,
                "pid": 0,
                "finish": true,
                "name": "Instructions for use",
                "date": "2015-06-05",
                "content": "This application is an offline application, and the data will be stored in the local hard disk\n\nThe left side is the category list\nThe middle is the task list under the current category\nThe right side is the task details\n\nYou can add and delete categories, add tasks, Modify tasks, and mark whether the task is completed or not\n\nBy Dhyey Shrimankar\n",}];

            // DataBase init
            localStorage.cate = JSON.stringify(cateJson);
            localStorage.childCate = JSON.stringify(childCateJson);
            localStorage.task = JSON.stringify(taskJson);
        }
    })();

    // *********query*************
    /**
     * Search all categories
     * @return {Array} array of objects
     */
    var queryCates = function() {
        return JSON.parse(localStorage.cate);
    };

    /**
     * Query classification by id, temporarily unused
     * @param  {number} id
     * @return {Object}    a class object
     */
    var queryCateById = function(id) {
        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                return cate[i];
            }
        }
    };

    /**
     * Query the number of tasks according to the main category id
     * @param  {number} id main category id
     * @return {number}    Number of tasks
     */
    var queryTasksLengthByCateId = function(id) {
        var cate = queryCateById(id);
        var result = 0;
        if (cate.child.length !== 0) {
            for (var i = 0; i < cate.child.length; i++) {
                var childCate = queryChildCatesById(cate.child[i]);
                result += childCate.child.length;
            }
        }
        return result;
    };

    /**
     * Query the number of tasks according to the main category
     * @param  {Object} cateObject main taxonomy
     * @return {number}            Number of tasks
     */
    var queryTasksLengthByCate = function(cateObject) {
        var result = 0;
        if (cateObject.child.length !== 0) {
            for (var i = 0; i < cateObject.child.length; i++) {
                var childCate = queryChildCatesById(cateObject.child[i]);
                result += childCate.child.length;
            }
        }
        return result;
    };
    // console.log(queryTasksLengthByCateId(0));
    // console.log(queryTasksLengthByCateId(1));
    // console.log(queryTasksLengthByCateId(2));
    // console.log(queryCateById(1));

    /**
     * Query all subcategories
     * @return {Array} array of subcategory objects
     */
    var queryAllChildCates = function() {
        return JSON.parse(localStorage.childCate);
    };
    /**
     * Find subcategories by id
     * @param  {number} id
     * @return {Object}    a subcategory object
     */
    var queryChildCatesById = function(id) {
        var childCate = JSON.parse(localStorage.childCate);
        for (var i = 0; i < childCate.length; i++) {
            if (childCate[i].id == id) {
                return childCate[i];
            }
        }
    };
    // console.log(queryChildCatesById(0));
    // console.log("queryChildCatesById----->" + queryChildCatesById(0));
    // console.log(queryChildCatesById(0));

    // console.log("queryChildCatesByIdArray---->" + queryChildCatesByIdArray([0, 1]));
    // console.log(queryChildCatesByIdArray([0, 1]));
    /**
     * Query subcategories based on an array of ids
     * @param  {Array} idArr id array
     * @return {Array}       array of subcategory objects
     */
    var queryChildCatesByIdArray = function(idArr) {
        if (_.isArray(idArr)) {
            var cateArr = [];
            for (var i = 0; i < idArr.length; i++) {
                cateArr.push(queryChildCatesById(idArr[i]));
            }
            return cateArr;
        }
    };


    var queryAllTasks = function(status) {
        var tasksArr = JSON.parse(localStorage.task);
        var resultArr = [];
        if (status !== undefined) {
            for (var i = 0; i < tasksArr.length; i++) {
                if (status) {
                    if (tasksArr[i].finish === true) {
                        resultArr.push(tasksArr[i]);
                    }
                } else {
                    if (tasksArr[i].finish === false) {
                        resultArr.push(tasksArr[i]);
                    }
                }
            }
            return resultArr;
        } else {
            return tasksArr;
        }
    };
    // console.log(queryAllTasks(true));

    var queryTasksByDateInTaskArr = function(date, taskArr) {
        var tasks = [];
        // var allTasks = queryAllTasks();
        for (var i = 0; i < taskArr.length; i++) {
            if (taskArr[i].date == date) {
                tasks.push(taskArr[i]);
            }
        }
        return tasks;
    };


    var queryTaskById = function(id) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {
                return allTasks[i];
            }
        }
    };
    // console.log("queryTaskById(3)");
    // console.log(queryTaskById(3));

    var queryTasksByChildCateId = function(id, status) {
        var resultArr = [];
        var tempArr = queryChildCatesById(id).child;
        console.log("Subcategory object child field content ---->" + tempArr);
        for (var i = 0; i < tempArr.length; i++) {
            var task = queryTaskById(tempArr[i]);
            if (status !== undefined) {
                console.log(status);
                if (status) {
                    if (task.finish === true) {
                        resultArr.push(task);
                    }
                } else {
                    if (task.finish === false) {
                        resultArr.push(task);
                    }
                }
            } else {
                resultArr.push(task);
            }
        }
        console.log(resultArr + "----------success");
        return resultArr;

    };


    var queryTasksByCateId = function(id, status) {
        var resultArr = [];
        var cateChild = queryCateById(id).child;
        for (var i = 0; i < cateChild.length; i++) {
            if (status !== undefined) {
                console.log(status);
                resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i], status));
            } else {
                resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i]));
            }
        }
        return resultArr;
    };
    // console.log(queryTasksByCateId(1, true));
    console.log(queryTasksByCateId(0));


    //**********************ADD**************************


    var addCate = function(name) {
        if (!name) {
            console.log("name is undefined");
        } else {
            var cateJsonTemp = JSON.parse(localStorage.cate);
            var newCate = {};
            newCate.id = cateJsonTemp[cateJsonTemp.length - 1].id + 1;
            newCate.name = name;
            newCate.child = [];
            cateJsonTemp.push(newCate);
            localStorage.cate = JSON.stringify(cateJsonTemp);
            console.log(cateJsonTemp);
            console.log(newCate);
        }
    };

    var addChildCate = function(pid, name) {
        if (!pid || !name) {
            console.log("pid or name is undefined");
        } else {
            var childCateJsonTemp = JSON.parse(localStorage.childCate);
            var newChildCate = {};
            newChildCate.id = childCateJsonTemp[childCateJsonTemp.length - 1].id + 1;
            newChildCate.pid = pid;
            newChildCate.name = name;
            newChildCate.child = [];

            childCateJsonTemp.push(newChildCate);
            localStorage.childCate = JSON.stringify(childCateJsonTemp);

            //Also add numbers to the child in the parent category
            updateCateChildByAdd(pid, newChildCate.id);

        }
    };

    var addTask = function(taskObject) {
        var taskArr = queryAllTasks();
        taskObject.id = taskArr[taskArr.length - 1].id + 1; //id 生成
        taskArr.push(taskObject);
        console.log(taskObject);
        console.log(taskArr);

        updateChildCateChildByAdd(taskObject.pid, taskObject.id); //更新子分类的 child 字段
        localStorage.task = JSON.stringify(taskArr);

        return taskObject.id;
    };
    // console.log(queryAllTasks()[queryAllTasks().length-1].id+1);
    // {
    //            "id": 4,
    //            "pid": 2,
    //            "finish": false,
    //            "name": "运维",
    //            "date": "2015-05-31",
    //            "content": "数据库备份",
    //        }
    //*****************UPDATE*******************
    var updateCateChildByAdd = function(id, childId) {

        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                cate[i].child.push(childId);
            }
        }
        localStorage.cate = JSON.stringify(cate);
    };

    var updateCateChildByDelete = function(id, childId) {
        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                for (var j = 0; j < cate[i].child.length; j++) {
                    if (cate[i].child[j] == childId) {
                        cate[i].child = _.deleteInArray(cate[i].child, j);
                    }
                }
            }
        }
        localStorage.cate = JSON.stringify(cate);
    };
    // updateCateChildByAdd(1,3);
    // listAllStorage();
    // console.log("updateCateChildByDelete");
    // updateCateChildByDelete(1, 0);
    // listAllStorage();


    var updateChildCateChildByAdd = function(id, childId) {
        var childCate = queryAllChildCates();
        for (var i = 0; i < childCate.length; i++) {

            if (childCate[i].id == id) {
                childCate[i].child.push(childId);
            }
        }
        localStorage.childCate = JSON.stringify(childCate);
    };
    // updateChildCateChildByAdd(0,1000);
    // listAllStorage();


    var updateTaskStatusById = function(taskId) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == taskId) {
                allTasks[i].finish = true;
            }
        }
        localStorage.task = JSON.stringify(allTasks);
    };
    // updateTaskStatusById(4);
    // listAllStorage();


    var updateTaskById = function(id, name, date, content) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {
                allTasks[i].name = name;
                allTasks[i].date = date;
                allTasks[i].content = content;
            }
        }
        localStorage.task = JSON.stringify(allTasks);
    };

    //**************DELETE*****************


    var deleteCate = function(id) {
        var result = [];
        var cateArr = queryCates();
        for (var i = 0; i < cateArr.length; i++) {
            if (cateArr[i].id == id) {
                result = _.deleteInArray(cateArr, i);
                if (cateArr[i].child.length !== 0) {
                    for (var j = 0; j < cateArr[i].child.length; j++) {
                        deleteChildCate(cateArr[i].child[j]);
                    }
                }
            }
        }
        localStorage.cate = JSON.stringify(result);
    };
    // deleteCate(1);
    // listAllStorage();
    // initCates();

    var deleteChildCate = function(id) {
        var result = [];
        var childCateArr = queryAllChildCates();
        for (var i = 0; i < childCateArr.length; i++) {
            if (childCateArr[i].id == id) {
                result = _.deleteInArray(childCateArr, i);
                updateCateChildByDelete(childCateArr[i].pid, childCateArr[i].id);
                if (childCateArr[i].child.length !== 0) {
                    for (var j = 0; j < childCateArr[i].child.length; j++) {
                        deleteTaskById(childCateArr[i].child[j]);
                    }
                }
            }
        }
        localStorage.childCate = JSON.stringify(result); //save
    };
    // deleteChildCate(0);
    // listAllStorage();
    // initCates();

    var deleteTaskById = function(id) {
        var result = [];
        var allTasksArr = queryAllTasks();
        for (var i = 0; i < allTasksArr.length; i++) {
            if (allTasksArr[i].id == id) {
                result = _.deleteInArray(allTasksArr, i);
            }
        }
        localStorage.task = JSON.stringify(result); //save
    };
    // deleteTaskById(0);
    // listAllStorage();

    var listAllStorage = function() {
        console.log("=============listAllStorage==============");
        for (var i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            var value = localStorage.getItem(name);
            console.log("name----->" + name);
            console.log("value---->" + value);
            console.log("---------------------");
        }
        console.log("======End=======listAllStorage==============");
    };

    return {
        // Initialize the database
        initDataBase: initDataBase,

        // Inquire
        queryCates: queryCates,
        queryCateById: queryCateById,
        queryTasksLengthByCateId: queryTasksLengthByCateId,
        queryTasksLengthByCate: queryTasksLengthByCate,
        queryAllChildCates: queryAllChildCates,
        queryChildCatesById: queryChildCatesById,
        queryChildCatesByIdArray: queryChildCatesByIdArray,
        queryAllTasks: queryAllTasks,
        queryTasksByDateInTaskArr: queryTasksByDateInTaskArr,
        queryTaskById: queryTaskById,
        queryTasksByChildCateId: queryTasksByChildCateId,
        queryTasksByCateId: queryTasksByCateId,

        // Increase
        addCate: addCate,
        addChildCate: addChildCate,
        addTask: addTask,

        // Revise
        updateCateChildByAdd: updateCateChildByAdd,
        updateCateChildByDelete: updateCateChildByDelete,
        updateChildCateChildByAdd: updateChildCateChildByAdd,
        updateTaskStatusById: updateTaskStatusById,
        updateTaskById: updateTaskById,

        // delete
        deleteCate: deleteCate,
        deleteChildCate: deleteChildCate,
        deleteTaskById: deleteTaskById,

        // print database
        listAllStorage: listAllStorage
    };
});