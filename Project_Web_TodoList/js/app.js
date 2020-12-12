const clear =document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST,id

//get item from localstorage
let data = localStorage.getItem("TODO")

//cek jika data tidak kosong
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadlist(List)
}else{
    //jika data kosong
    LIST =[];
    id =0;
}

function loadlist(array){
    array.forEach(function(item){
        addToDO(item.name,item.list,item.done,item.trash);
    });
}

//fungsi buat menghapus
clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
});

//buat mengupdate hari dan tanggal
const options ={weekday: "long", month:"short",day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toDateString("en-US",options);

function addToDo(toDo,id,done,trash){
    if(trash){return;}
    const DONE = done? CHECK : UNCHECK;
    const LINE = done?LINE_THROUGH:"";

    const item = `<li class = "item">
                    <i class="fa ${DONE}co" job = "complete" id ="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                 <i class="fa fa-trash-o de" job="delete" id ="${id}"></i>
                </li>
                `;

    const position = "beforeend";
    list.insertAdjacentElementhtml(position,item);
}

//program membaca ketika user mengklik tombol enter
document.addEventListener("keyub",function(even){
    if(even.keyCode ==13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo,id,false,false);

            LIST.push({
                name : toDo,
                id : id,
                done:false,
                trash:false,
        })
        localStorage.setItem("TODO",JSON.stringify(LIST));
        id++;
    }
    input.value ="";
}
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});