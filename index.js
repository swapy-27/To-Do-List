// /* functions we gonna create -->
//         addTodo
//         deleteTodo
//         checkTodo
//         showNotification
//         renderList
// */

let tasks=[];
const tasksList=document.getElementById('list');
 const addTaskInput = document.getElementById('add');
 const taskCounter = document.getElementById('task-counter');




function fetchTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        console.log(response);
        return response.json();})
        .then(function(data)
        { 
            console.log(data);
            tasks=data.slice(0,10);
            renderList();
    }).catch((reject)=>{console.log('some error occur while fetching')})
}

function addTaskToDom(task){
        const li = document.createElement('li');
   
        li.innerHTML=`
            <input type ='checkbox' class='custom-checkbox'  id ='${task.id}' >
            <label  for ='${task.id}'>${task.title}</label>
            <i class='fas fa-trash-alt' id='${task.id}'></i>
        `;
        // document.getElementById(t).className='custom-checkbox';
        tasksList.append(li);
}

function renderList()
{
    tasksList.innerHTML='';
    for ( let i=0 ; i<tasks.length;i++)
    {
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML=tasks.length;


}
function toggleTask(taskID){

  const task =  tasks.filter((task)=>

    { 
          if(task.id==taskID)
         {
        return task;}
    });
    if ( task.length>0)
    {
        const currTask = task[0];

        currTask.completed=!currTask.completed;
        renderList();
        showNotification("Task toggled succesfully");
        return;
    }
    showNotification("Could not Toggle task");
}



function deleteTask(taskId)
{
    const newTasks = tasks.filter((task)=>
    {  
        return task.id != parseInt(taskId);
    });

    tasks=newTasks;
    renderList();
}


function addTask(task)
{
    tasks.push(task);
    console.log(tasks);
    renderList();
 
}

function showNotification(message)
{   

    alert(message);

}




function handleClickListener(e) {
    const target = e.target;
    console.log(target)
    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    } else if (target.className == 'fas fa-trash-alt') {
        const taskId = target.id;
        deleteTask(parseInt(taskId));
        return;
    }
    else if (target.id == 'light') {
        const body = document.getElementsByTagName('body');
        body[0].classList.replace('darker', 'light');
        body[0].classList.replace('standard', 'light')

    }
    else if (target.id == 'dark') {
        console.log(target);
        const body = document.getElementsByTagName('body');
        body[0].classList.replace('light', 'darker');
        body[0].classList.replace('standard', 'darker')
    }
    else if (target.id == 'standard') {
        console.log(target);
        const body = document.getElementsByTagName('body');
        body[0].classList.replace('darker', 'standard');
        body[0].classList.replace('light', 'standard')
    }
    else if (target.className == 'task-submit')
            {   
                var addTaskInput = document.getElementById("add");
                var text=addTaskInput.value;
                console.log('text:',text);
        
                if ( !text)
                {
                    showNotification("text cannot be empty");
                    return;
                }
                const task = {
                    title:text,
                    id:Date.now(),
                    completed:false
                }
                addTaskInput.value='';
                addTask(task);
                showNotification("task has been added");
                return;
            }
    }


function fetchDate() {
    const date = document.getElementById('date');
    var currentdate = new Date();
    var datetime =  currentdate.getDate() + "/" + currentdate.getMonth()+1
        + "/" + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    date.innerHTML = datetime;
}
function initializeApp() {
    fetchDate();
    fetchTodos();
    document.addEventListener('click', handleClickListener);
};

initializeApp();