// SHOWING ADDITION FORM 
let countPersonal = 1;
let countBusiness = 1;
let countOthers = 1;
document.querySelector("i").addEventListener("click", function () {
    document.querySelector(".addForm").classList.add("active");
    document.querySelector(".addArea").classList.add("Disappear");
    document.querySelector(".tasks").classList.add("Disappear");
    document.querySelector(".container").classList.add("background-change");
});

// FIELD LEVEL VERIFICATION

let getInputFields = document.getElementsByTagName("input");
let checked = [false, false, false, false];
for (let i = 0; i < getInputFields.length - 1; i++) {
    getInputFields[i].addEventListener("keyup", (e) => {
        if (e.currentTarget.value == "") {
            checked[i] = false;
        } else checked[i] = true;
        // console.log(checked[i] + " " + i);
        if (checked[1] == true && checked[2] == true && checked[3] == true && checked[4] == true) {
            // console.log("all filled");
            document.querySelector(".save-btn button").classList.add("enable");
        } else {
            document.querySelector(".save-btn button").classList.remove("enable");
            // console.log("not all filled");
        }
    })
}

// SHOWING THE SELECTED TASKS LIST 

let personalTasks = document.querySelector(".personalDetails");
let businessTasks = document.querySelector(".businessDetails");
let otherTasks = document.querySelector(".otherDetails");
function selectedOption() {
    let e = document.getElementById("select");
    console.log(e.value);
    if (e.value == "Personal") {
        personalTasks.style.display = "block";
        businessTasks.style.display = "none";
        otherTasks.style.display = "none";
        document.querySelector(".col1 span").innerText = countPersonal + " items left";
    } else if (e.value == "Business") {
        businessTasks.style.display = "block";
        otherTasks.style.display = "none";
        personalTasks.style.display = "none";
        document.querySelector(".col1 span").innerText = countBusiness + " items left";
    } else if (e.value == "Other") {
        otherTasks.style.display = "block";
        businessTasks.style.display = "none";
        personalTasks.style.display = "none";
        document.querySelector(".col1 span").innerText = countOthers + " items left";
    }
}
//MODIFY LEFT ITEMS
function changeCount() {
    let e = document.getElementById("select");
    if (e.value == "Personal")
        document.querySelector(".col1 span").innerText = countPersonal + " items left";
    else if (e.value == "Business")
        document.querySelector(".col1 span").innerText = countBusiness + " items left";
    else
        document.querySelector(".col1 span").innerText = countOthers + " items left";

}

//  ADDING THE NEW TASK
function getDateTime() {
    let userDateString = document.getElementById("date").value;
    let userTimeString = document.getElementById("time").value;
    let [day, month, year] = userDateString.split('/').map(Number);
    let [hour, min, sec] = userTimeString.split(':').map(Number);
    const userDateTime = new Date(year, month - 1, day, hour, min, sec);
    var currentDate = new Date();
    var timeDiff = userDateTime - currentDate;
    return timeDiff;
}

document.querySelector(".save-btn button").addEventListener("click", function () {

    if (checked[1] == false || checked[2] == false || checked[3] == false || checked[4] == false) {
        alert("Fill all the fields!");
    } else if (getDateTime() < 0) {
        alert('Entered date or time is already passed! Please re-enter');
    } else if (isNaN(getDateTime())) {
        alert("Entered Date or Time is not in the given format! please re-enter ");
        console.log(getDateTime());
    }
    else {
        let taskName = document.getElementById("addTask").value;
        let taskDescription = document.getElementById("description").value;
        let additionbInfo = document.querySelector('input[name="additionalInfo"]:checked').value;
        var timeDiff = getDateTime();
        // console.log(timeDiff);
        const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursDifference = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // console.log(daysDifference + " " + hoursDifference);

        if (additionbInfo == "Personal") {
            countPersonal++;
            personalTasks.innerHTML += `<div class="task-details">
                    <div class="select-btn">
                        <h1>T</h1>
                        <img src="/Assets/Images/green-tick.png" alt="">
                    </div>
                    <div class="taskNo-desc">
                        <span class="taskNo">${taskName}</span>
                        <p class="description">${taskDescription}</p>
                    </div>
                    <div class="deadline">
                        <span>${daysDifference} days ${hoursDifference} hours to go</span>
                    </div>
                    <div class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div> `;
        } else if (additionbInfo == "Business") {
            countBusiness++;
            businessTasks.innerHTML += `<div class="task-details">
                    <div class="select-btn">
                        <h1>T</h1>
                        <img src="/Assets/Images/green-tick.png" alt="">
                    </div>
                    <div class="taskNo-desc">
                        <span class="taskNo">${taskName}</span>
                        <p class="description">${taskDescription}</p>
                    </div>
                    <div class="deadline">
                        
                    <span>${daysDifference} days ${hoursDifference} hours to go</span>
                    </div>
                    <div class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div> `;
        } else if (additionbInfo == "Others") {
            countOthers++;
            otherTasks.innerHTML += `<div class="task-details">
                    <div class="select-btn" >
                        <h1>T</h1>
                        <img src="/Assets/Images/green-tick.png" alt="">
                    </div>
                    <div class="taskNo-desc">
                        <span class="taskNo">${taskName}</span>
                        <p class="description">${taskDescription}</p>
                    </div>
                    <div class="deadline">
                      
                    <span>${daysDifference} days ${hoursDifference} hours to go</span>
                    </div>
                    <div class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div> `;
        }
        document.querySelector(".addForm").classList.remove("active");
        document.querySelector(".addArea").classList.remove("Disappear");
        document.querySelector(".tasks").classList.remove("Disappear");
        document.querySelector(".container").classList.remove("background-change");
        changeCount();

    }
});


// REMOVING AND SELECTING A SEPECIFIC TASK 

let remove_select_PersonDetail = document.querySelector(".personalDetails");
let remove_select_BusinessDetail = document.querySelector(".businessDetails");
let remove_select_OthersDetail = document.querySelector(".otherDetails");
remove_select_PersonDetail.addEventListener("click", function (e) {
    if (e.target.tagName == "I") {
        e.target.parentElement.parentElement.remove();
        var checkClassName=e.target.parentElement.parentElement.querySelector('.taskNo').className;
        if(checkClassName!="taskNo markDone") {
            countPersonal--;
            changeCount();
        }    
        
    }
    if (e.target.tagName == "H1" || e.target.tagName == "IMG") {
        if (e.target.tagName == "H1") {
            countPersonal--;
        } else {
            countPersonal++;
        }
        let taskName = e.target.parentElement.parentElement.querySelector(".taskNo");
        let taskDesc = e.target.parentElement.parentElement.querySelector(".description");
        let unselected = e.target.parentElement.parentElement.querySelector(".select-btn h1");
        let selected = e.target.parentElement.parentElement.querySelector(".select-btn img");
        taskName.classList.toggle("markDone");
        taskDesc.classList.toggle("markDone");
        unselected.classList.toggle("dispContent");
        selected.classList.toggle("show");
    }
    changeCount();
});
remove_select_BusinessDetail.addEventListener("click", function (e) {
    if (e.target.tagName == "I") {
        e.target.parentElement.parentElement.remove();
        var checkClassName=e.target.parentElement.parentElement.querySelector('.taskNo').className;
        if(checkClassName!="taskNo markDone") {
            countBusiness--;
            changeCount();
        }    
    }
    if (e.target.tagName == "H1" || e.target.tagName == "IMG") {
        if (e.target.tagName == "H1") {
            countBusiness--;
        } else {
            countBusiness++;
        }
        let taskName = e.target.parentElement.parentElement.querySelector(".taskNo");
        let taskDesc = e.target.parentElement.parentElement.querySelector(".description");
        let unselected = e.target.parentElement.parentElement.querySelector(".select-btn h1");
        let selected = e.target.parentElement.parentElement.querySelector(".select-btn img");

        taskName.classList.toggle("markDone");
        taskDesc.classList.toggle("markDone");
        unselected.classList.toggle("dispContent");
        selected.classList.toggle("show");
    }
    changeCount();
});
remove_select_OthersDetail.addEventListener("click", function (e) {
    if (e.target.tagName == "I") {
        e.target.parentElement.parentElement.remove();
        var checkClassName=e.target.parentElement.parentElement.querySelector('.taskNo').className;
        if(checkClassName!="taskNo markDone") {
            countOthers--;
            changeCount();
        }    
    }
    if (e.target.tagName == "H1" || e.target.tagName == "IMG") {
        if (e.target.tagName == "H1") {
            countOthers--;
        } else {
            countOthers++;
        }
        let taskName = e.target.parentElement.parentElement.querySelector(".taskNo");
        let taskDesc = e.target.parentElement.parentElement.querySelector(".description");
        let unselected = e.target.parentElement.parentElement.querySelector(".select-btn h1");
        let selected = e.target.parentElement.parentElement.querySelector(".select-btn img");
        taskName.classList.toggle("markDone");
        taskDesc.classList.toggle("markDone");
        unselected.classList.toggle("dispContent");
        selected.classList.toggle("show");
    }
    changeCount();
});
                        //FORM CLOSE FUNCTION
function closeForm(){
    document.querySelector(".addForm").classList.remove("active");
        document.querySelector(".addArea").classList.remove("Disappear");
        document.querySelector(".tasks").classList.remove("Disappear");
        document.querySelector(".container").classList.remove("background-change");
}
console.log(document.querySelectorAll(".taskNo"));
// var flag=false;
var visibility="hidden";
var button=document.querySelectorAll("button");
// console.log(button[0].classList);
function completed(){
    button[0].classList.remove("bottom-selected");
    button[2].classList.remove("bottom-selected");
    button[3].classList.remove("bottom-selected");
    button[1].classList.add("bottom-selected");
    let e = document.getElementById("select");
    if(e.value=="Personal"){
        let getCompeletedTasks=document.querySelectorAll(".personalDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
         if(items.className!="taskNo markDone"){
            items.parentElement.parentElement.style.visibility=visibility;
            items.parentElement.parentElement.style.position="absolute";
        }else{
            items.parentElement.parentElement.style.visibility="visible";
            items.parentElement.parentElement.style.position="relative";
        }
        })
        // var x=document.querySelectorAll(".personalDetails .task-details");
        // console.log(x);
        // if(x.length==0){
        //     console.log("0");
        //     document.querySelector(".personalDetails").innerHTML="<h1>No data</h1>";
        // }else console.log("no zero");
       
    }
    if(e.value=="Business"){
        let getCompeletedTasks=document.querySelectorAll(".businessDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className!="taskNo markDone"){
               items.parentElement.parentElement.style.visibility=visibility;
               items.parentElement.parentElement.style.position="absolute";
           }else{
               items.parentElement.parentElement.style.visibility="visible";
               items.parentElement.parentElement.style.position="relative";
           }
           })
       
    }
    if(e.value=="Other"){
        let getCompeletedTasks=document.querySelectorAll(".otherDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className!="taskNo markDone"){
               items.parentElement.parentElement.style.visibility=visibility;
               items.parentElement.parentElement.style.position="absolute";
           }else{
               items.parentElement.parentElement.style.visibility="visible";
               items.parentElement.parentElement.style.position="relative";
           }
           })
       
    }

}
function active(){
    button[1].classList.remove("bottom-selected");
    button[0].classList.remove("bottom-selected");
    button[3].classList.remove("bottom-selected");
    button[2].classList.add("bottom-selected");
    let e = document.getElementById("select");
    if(e.value=="Personal"){
        let getCompeletedTasks=document.querySelectorAll(".personalDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
         if(items.className=="taskNo markDone"){
            items.parentElement.parentElement.style.visibility=visibility;
            items.parentElement.parentElement.style.position="absolute";

         }else{
            items.parentElement.parentElement.style.visibility="visible";
            items.parentElement.parentElement.style.position="relative";
        }
        })
       
    }
    if(e.value=="Business"){
        let getCompeletedTasks=document.querySelectorAll(".businessDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className=="taskNo markDone"){
               items.parentElement.parentElement.style.visibility=visibility;
               items.parentElement.parentElement.style.position="absolute";
   
            }else{
               items.parentElement.parentElement.style.visibility="visible";
               items.parentElement.parentElement.style.position="relative";
           }
           })
       
    }
    if(e.value=="Other"){
        let getCompeletedTasks=document.querySelectorAll(".otherDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className=="taskNo markDone"){
               items.parentElement.parentElement.style.visibility=visibility;
               items.parentElement.parentElement.style.position="absolute";
   
            }else{
               items.parentElement.parentElement.style.visibility="visible";
               items.parentElement.parentElement.style.position="relative";
           }
           })
    }
}

function clearCompleted(){
    button[1].classList.remove("bottom-selected");
    button[2].classList.remove("bottom-selected");
    button[0].classList.remove("bottom-selected");
    button[3].classList.add("bottom-selected");
    let e = document.getElementById("select");
    if(e.value=="Personal"){
        let getCompeletedTasks=document.querySelectorAll(".personalDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
         if(items.className=="taskNo markDone"){
            items.parentElement.parentElement.remove();
            // items.parentElement.parentElement.style.position="absolute";

         }
        })
       
    }
    if(e.value=="Business"){
        let getCompeletedTasks=document.querySelectorAll(".businessDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className=="taskNo markDone"){
                items.parentElement.parentElement.remove();
           }
           })
       
    }
    if(e.value=="Other"){
        let getCompeletedTasks=document.querySelectorAll(".otherDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            if(items.className=="taskNo markDone"){
                items.parentElement.parentElement.remove();
           }
           })
    }

}
function dispAll(){
    button[1].classList.remove("bottom-selected");
    button[2].classList.remove("bottom-selected");
    button[3].classList.remove("bottom-selected");
    button[0].classList.add("bottom-selected");
    let e = document.getElementById("select");
    if(e.value=="Personal"){
        let getCompeletedTasks=document.querySelectorAll(".personalDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            items.parentElement.parentElement.style.visibility="visible";
            items.parentElement.parentElement.style.position="relative";
            // items.parentElement.parentElement.style.position="absolute";

         
        })
       
    }
    if(e.value=="Business"){
        let getCompeletedTasks=document.querySelectorAll(".businessDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            items.parentElement.parentElement.style.visibility="visible";
            items.parentElement.parentElement.style.position="relative";
           })
       
    }
    if(e.value=="Other"){
        let getCompeletedTasks=document.querySelectorAll(".otherDetails .taskNo");
        getCompeletedTasks.forEach((items)=>{
            items.parentElement.parentElement.style.visibility="visible";
            items.parentElement.parentElement.style.position="relative";
           })
    }
}