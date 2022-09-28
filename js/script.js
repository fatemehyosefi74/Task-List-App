window.addEventListener("load",()=>{
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const inputBtn = document.querySelector("#new-task-submit");
    const inputTask = document.querySelector("#new-task-input")
    inputBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        if(inputTask.value){
            const todo = {
                content:inputTask.value,
                done:false
            }
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            showTaskList();
            inputTask.value = ""
        }else{
            alert('Enter Your Task Please !!')
        }
    })
    showTaskList()
    const selectBox = document.querySelector(".select-box");
    selectBox.addEventListener("click", (e)=>{
        tasksItem = [...tasks.children];
        tasksItem.forEach((task)=>{
            
            if(e.target.value==="All"){
                task.style.display="flex"
            }
            else if(e.target.value==="Completed"){
                const input = task.querySelector('.content input')
                console.log(input)
                if(input.classList.contains("completed")){
                    task.style.display="flex"
                }else{
                    task.style.display="none"
                }
            }
            else if(e.target.value==="Uncompleted"){
                const input = task.querySelector('.content input')
                console.log(input)
                if(!input.classList.contains("completed")){
                    task.style.display="flex"
                }else{
                    task.style.display="none"
                }
            }
        })
            
        
    
    })

    selectBox.addEventListener("blur", (e)=>{
       e.target.value = selectBox.children[0].value
       tasksItem = [...tasks.children];
       tasksItem.forEach((task)=>{
           if(e.target.value){
               task.style.display="flex"
           }
          
       })
    })
})

function showTaskList(){
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const tasks = document.getElementById("tasks");
    tasks.innerHTML="";
    todos.forEach(todo => {
        const taskDiv = document.createElement('div');
        const contentDiv = document.createElement('div');
        const actionsDiv = document.createElement('div');
        const textInput = document.createElement("input");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const checkBtn = document.createElement("button");
        taskDiv.classList.add("task");
        contentDiv.classList.add("content");
        actionsDiv.classList.add("actions");
        textInput.classList.add("text");
        if(todo.done){
            textInput.classList.add("completed");
            checkBtn.innerHTML=`<span><i class="fa fa-check" title="Done"></i></span>`;
            checkBtn.style.backgroundImage = 'linear-gradient(to right, green, green)';
        }else{
            textInput.classList.remove("completed");
            checkBtn.innerHTML=`<span><i class="fa fa-circle-dot" title="Check"></i></span>`;
        }
        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete');
        checkBtn.classList.add('check');
        textInput.type="text";
        textInput.setAttribute('readonly', true);
        textInput.value = todo.content;
        contentDiv.appendChild(textInput);
        editBtn.innerHTML = `<span><i class="fa fa-pen-to-square" title="Edit"></i></span>`;
        deleteBtn.innerHTML = `<span><i class="fa fa-trash-can" title="Delete"></i></span>`;
        
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        actionsDiv.appendChild(checkBtn);
        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(actionsDiv);
        tasks.appendChild(taskDiv);
        editBtn.addEventListener("click", ()=>{
            textInput.removeAttribute("readonly");
            textInput.focus();
            editBtn.innerHTML=`<span><i class="fa-solid fa-check-double" title="Editing..."></i></span>`;
            textInput.addEventListener('blur',(e)=>{
                if(e.target.value){
                    todo.content=e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    showTaskList()
                }else{
                    todos = todos.filter((item)=>item!=todo);
                    localStorage.setItem('todos', JSON.stringify(todos));
                    showTaskList()
                }
            })
        })
        deleteBtn.addEventListener("click", ()=>{
            todos = todos.filter((item)=>item!=todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            showTaskList()
        })
        checkBtn.addEventListener("click", ()=>{
            if(!todo.done){
                textInput.classList.add("completed");
                todo.done=true
            }else{
                textInput.classList.remove("completed");
                todo.done=false
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            showTaskList()
        })

    });
    
        
}


