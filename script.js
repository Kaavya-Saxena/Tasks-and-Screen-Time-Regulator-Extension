// To do list 
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
  };

  var removeSVG = 'Remove';
  var completeSVG = 'Complete';
  
  renderTodoList();
  
  // User clicked on the add button
  // If there is any text inside the item field, add that text to the todo list
  document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
      addItem(value);
    }
  });
  
  document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
      addItem(value);
    }
  });
  
  function addItem (value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';
  
    data.todo.push(value);
    dataObjectUpdated();
  }
  
  function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;
  
    for (var i = 0; i < data.todo.length; i++) {
      var value = data.todo[i];
      addItemToDOM(value);
    }
  
    for (var j = 0; j < data.completed.length; j++) {
      var value = data.completed[j];
      addItemToDOM(value, true);
    }
  }
  
  function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
  }
  
  function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
  
    if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);
    } else {
      data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();
  
    parent.removeChild(item);
  }
  
  function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
  
    if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);
      data.completed.push(value);
    } else {
      data.completed.splice(data.completed.indexOf(value), 1);
      data.todo.push(value);
    }
    dataObjectUpdated();
  
    // Check if the item should be added to the completed list or to re-added to the todo list
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');
  
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
  }
  
  // Adds a new item to the todo list
  function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
  
    var item = document.createElement('li');
    item.innerText = text;
  
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
  
    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
  
    // Add click event for removing the item
    remove.addEventListener('click', removeItem);
  
    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
  
    // Add click event for completing the item
    complete.addEventListener('click', completeItem);
  
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
  
    list.insertBefore(item, list.childNodes[0]);
  }


const countdownEl = document.getElementById("countdown");

document.getElementById("reset").addEventListener("click", reset);

function reset(){
    startingMinutes=20;
    time=startingMinutes*60;
    countdownEl.innerText="20:00";
}

document.getElementById("start").addEventListener("click",runJS);

function runJS(){
    console.log("Timer");
    var startingMinutes=20;
    var alertoccurence=false;

    let time = startingMinutes * 60; //minutes * 60 seconds
    let refreshIntervalId = setInterval(updateCountdown, 1000); //update every 1 second

    function updateCountdown() {
        const minutes = Math.floor(time / 60); // rounds a number DOWN to the nearest integer
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;  
        countdownEl.innerHTML = `${minutes}:${seconds}`;

        time--;

        if (time < 0) { 
            //stop the setInterval whe time = 0 for avoid negative time
            clearInterval(refreshIntervalId);
            callAlert(alertoccurence);
        }
    }

    function callAlert(alertoccurence){
        if(alertoccurence==false){
        alert('its been a while! why dont you take a break!');
        alertoccurence=true;
        }
    }
}





// let time = startingMinutes*60;

// const countdownEl=document.getElementById('countdown');

// function updateCountdown(){
    
//     // leftover minutes
//     const minutes = Math.floor(time/60);
//     // leftover seconds
//     let seconds = time%60;

//     seconds=seconds<10?'0'+seconds:seconds;
//     countdownEl.innerHTML=`${minutes}:${seconds}`
//     time--;
// }

// if (time==0) alert('take a break!');