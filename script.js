//DOM Elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#new-task");
const submit = document.querySelector("#add-task");
const list = document.querySelector("#tasks");

// GET and create DOM
    const getTasks = async () => {
        const response = [];
        const data = await getData();
        response.push(data);
        response.forEach(task => {
            task.forEach((task)=>{
                createDOM(task.description);
                
            })
        }) 
    }
getTasks();

//Post new task to the DOM
const postNewTask = () => {
    form.addEventListener("submit", async () => {
        const newTask = taskInput.value;
        const post = await postTask(newTask);
    })
}
postNewTask();

//Pair ID and task name from the response to the image tag and the check-box
 async function getIdAndName () {
        const response = await getData();
        const result = [];
        const nameArray = [];
        response.map((element) => {
            const id = element._id;
            const name = element.description;
            result.push(id);
            nameArray.push(name);
        })
        const trashCan = document.querySelectorAll("i");
        const checkbox = document.querySelectorAll(".checkbox");
        const label = document.querySelectorAll(".my-label");
        for (i=0; i<result.length; i++) {
            trashCan[i].id = result[i];
            checkbox[i].id = result[i];
            label[i].id = result[i];
        }
        for (i=0; i<nameArray.length; i++) {
            checkbox[i].name = nameArray[i];
        } 
    }
 getIdAndName();

//Create DOM elements
const createDOM = (task) => {
    const toDoTask = document.createElement("div");
    toDoTask.classList.add("task");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "";
    checkbox.classList = "checkbox";
    const label = document.createElement("label");
    label.htmlFor = "check-box";
    label.classList = "my-label";
    const trashCan = document.createElement("i");
    trashCan.classList = "trash-can";
    trashCan.classList.add("fa-solid","fa-trash-can");
   
    label.appendChild(document.createTextNode(task));
     
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    toDoTask.appendChild(wrapper);
    toDoTask.appendChild(trashCan);
    list.appendChild(toDoTask); 
    }

//Delete task from API
const deleteTask = () => {
    document.getElementById("tasks").addEventListener("click", async (e) => {
        if (e.target && e.target.matches("i.trash-can")) {
            await deletPost(e.target.id);
            window.location.reload();
            }
            })    
    }  
deleteTask();

// Update the status of the tasks in the API
const updateTask = () => {
    document.getElementById("tasks").addEventListener("change", async (e) => {
        const label = document.querySelectorAll(".my-label");
        if (e.target && e.target.matches("input.checkbox")) {
            label.forEach((element) => {
                if (e.target.checked === true && e.target.id == element.id) {
                    element.classList.add("cross-out");
                    doneRequest(element.id);
                }
                else if (e.target.checked === false && e.target.id == element.id) {
                    unDoneRequest(element.id);
                }  
                
            })
        }
     })
}
updateTask();