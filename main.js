// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// all variabals

let task_input = document.querySelector(".task_input input"),
task_box = document.querySelector(".ul_task"),
cleatAll = document.querySelector(".Clear_btn"),
filters =  document.querySelectorAll(".controls_child span");

let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId ;
let isEditedTask = false;
// todos.sort();
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++









// filters 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

filters.forEach(btn =>{
    btn.addEventListener("click" , ()=>{
        document.querySelector("span.active").classList.remove("active")
        btn.classList.add("active")
        creatTodo(btn.id)
    })
}

)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++










// creat li 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function creatTodo(filter){
    // task_box.innerHTML = ""
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
        // console.log(todo )
        let iscomplete = todo.status =="completed" ? "checked" : "";
        if(filter == todo.status || filter == "all"){
            li += `
            <li class="task_li" id="${id}">
             <div>
             <label for="${id}" class="label">
             
             <input class="input_check" onclick="update(this)" type="checkbox" id="${id}" ${iscomplete}>
             <p class="task_para ${iscomplete}">${todo.name}</p>
                 </label>

                 </div>
             <div class="settings">
             <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
             <ul class="nested_ul">
                     <li onclick="edit(${id}, '${todo.name}')" class="settings_nested"><i class="uil uil-pen">Edit</i></li>
                     <li onclick="dlete(${id})" class="settings_nested"><i class="uil uil-trash">Delete</i></li>
         
                 </ul>

                 </div>
          </li>
         `
         
     
        }       
        });
    }
        task_box.innerHTML = li;
    }
creatTodo("all")
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// let date =new Date().getMinutes();
// console.log(date)









// show menu function
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function showMenu(slectedTask){
    let taskMenu = slectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show")
    document.addEventListener("click" , e =>{
        if(e.target.tagName != "I" || e.target != slectedTask){
            taskMenu.classList.remove("show")
            
        }
    })
    // document.querySelector("fa-solid").addEventListener("click" , e => {
        //     if(e)
        // })
    }
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    













    // edit task from nested list 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function edit(taskId , taskName){
    editId = taskId
    task_input.value = taskName
    isEditedTask = true;

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







    // delte task from nested menu
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function dlete(deletTask){
    todos.splice(deletTask, 1);
    // localStorage.removeItem(deletTask)
    localStorage.setItem("todo-list" , JSON.stringify(todos))
    creatTodo("all")
    
    
    
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// clear all section 
cleatAll.addEventListener("click", ()=>{

    todos.splice(0, todos.length);
    // localStorage.removeItem(deletTask)
    localStorage.setItem("todo-list" , JSON.stringify(todos))
    creatTodo("all")
    
})






// list update 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function update(slected){
    // console.log(slected)
    let tastname = slected.parentElement.lastElementChild;
    if(slected.checked){
        tastname.classList.add("checked")
        // complete status definging 
        todos[slected.id].status ="completed";
        // console.log(todos[slected.id])
    }else{
        tastname.classList.remove("checked")
            // panding status definging 
            todos[slected.id].status ="panding";
            
        }
        localStorage.setItem("todo-list" , JSON.stringify(todos))
    }
    // update()
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++










    




// task main eventlistener 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
task_input.addEventListener("keyup", 
e =>{
    
    
    let user_get = task_input.value.trim()
    if(e.key == "Enter" && user_get){
        if(!isEditedTask){

            // let loacalStorege = JSON.parse(localStorage.getItem("todo-list"));
               if(!todos){
                todos = []
                
            }
            let task_info = {name : user_get , status: "panding"}
            todos.push(task_info);
        } else{
            isEditedTask = false
            todos[editId].name = user_get;
        }
        
    task_input.value = ""
    localStorage.setItem("todo-list" , JSON.stringify(todos))
     creatTodo("all")
    }
    
}


)




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


