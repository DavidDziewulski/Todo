

// Function save our notes in Local Storage and change Object to 'String'
const saveNote = function (notes) {
  
    localStorage.setItem('notes', JSON.stringify(notes))
  };
  
  
  // Function Changes our notes to an object and return array
  const getSavedNotes= function () {
  
  
    const notesJSON = localStorage.getItem('notes')
  
    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
  };
  
  
  
  //Function Remove Task 
  const removeTodo = function(id){
    const remove = notes.findIndex(function(note){
        return note.id === id
    })
    
    if(remove > -1){
      notes.splice(remove,1)
        
       
    }
  };
  
  // Function ADD Border Done 
  const doneTodo= function(e){
    !e.done ? e.done = true : e.done = false;
    
  };
  
  
  
  
  
  // Function CreatTask - Container
  const createTask = function(note,rendering){
  
      const renderNote = note.filter(function(e){
         return e.title.toLowerCase().includes(rendering.title.toLowerCase())
      });
      
      // Clear the content 
      document.querySelector('.content').innerHTML = '';
      
      renderNote.forEach(function(e){
          
          createElement(e);
              
          });
         
      };
      
  //  Create Task(element)
  const createElement = function(e){
      // Create Div - Task 
      const container = document.createElement('div');
      container.classList.add('task');
      
  
      // Create Title task 
      const title = document.createElement('h2');
      title.classList.add('task__title');
      title.textContent = e.title;
      // Create Description Task 
      const description = document.createElement('p');
      description.classList.add('task__description');
      description.textContent = e.description;
      // Create Time Task 
      const time = document.createElement('time');
      time.classList.add('task__time');
      time.setAttribute('datetime',`${e.time}`);
      time.textContent = e.time;
  
      // Create Check Done (label)
      const taskDone = document.createElement('label');
      taskDone.classList.add('task__check-label', 'task__check-label--done');
      taskDone.setAttribute('for',`${e.id.substring(0,4)}`);
  
      // Create Check Remove (label)
      const taskRemove = document.createElement('label');
      taskRemove.classList.add('task__check-label', 'task__check-label--remove');
      taskRemove.setAttribute('for',`${e.id.substring(0,4) + 1}`);
  
  
      // Create Check Input for (task-done)
      const taskDoneInput = document.createElement('input');
      taskDoneInput.classList.add('task__check-input');
      taskDoneInput.id = `${e.id.substring(0,4)}`;
      taskDoneInput.setAttribute("type","checkbox");
  
      // Create Check Input for (task-remove)
      const taskRemoveInput = document.createElement('input');
      taskRemoveInput.classList.add('task__check-input');
      taskRemoveInput.id = `${e.id.substring(0,4) + 1}`;
      taskRemoveInput.setAttribute("type","submit");
  
  
      // Create Check Icon 
      const taskDoneIcon = document.createElement('i');
      taskDoneIcon.classList.add('fas', 'fa-check' , 'task__check-icon');
  
      // Create Check Icon (remove)
      const taskRemoveIcon = document.createElement('i');
      taskRemoveIcon.classList.add('fas', 'fa-times' , 'task__check-icon','task__check-icon--remove');
  
  
  
      // Add task
      document.querySelector('.content').appendChild(container);
  
      // Add element to task
      document.querySelectorAll('.task').forEach(function(e){
        e.appendChild(title);
        e.appendChild(description);
        e.appendChild(time);
        e.appendChild(taskDone);
        e.appendChild(taskRemove);
        
        
      });
      
      // Add to Label (done)
      document.querySelectorAll('.task__check-label--done').forEach(function(e){
        e.appendChild(taskDoneInput);
        e.appendChild(taskDoneIcon);
      });
      // Add to Label (remove)
      document.querySelectorAll('.task__check-label--remove').forEach(function(e){
          e.appendChild(taskRemoveInput);
          e.appendChild(taskRemoveIcon);
        });
  
        
        
        
  
      // ADD BORDER COMPLITED
        if(e.done){
          container.classList.add('task--complited') ;
          title.classList.add('text-done');
          description.classList.add('text-done');
          time.classList.add('text-done');
        }
        taskDoneInput.addEventListener('click',function(){
        
        doneTodo(e)
        saveNote(notes);
        createTask(notes,rendering);
        })
       
  
        // Remove Task
        taskRemoveInput.addEventListener('click',function(){
          removeTodo(e.id)
          
         
          saveNote(notes);
          createTask(notes,rendering);
        })
  
        
  
  
        
  
  
  
  };
  
  
  
  
  // Function Date
  
  const currentDate = function(){
    // Date - Day
  document.querySelector('.header__day-number').dateTime = moment().format("dddd,  Do YYYY,");
  document.querySelector('.header__day-number').textContent= moment().format("D");
  
  // // Date - Month
  document.querySelector('.header__month').dateTime = moment().format("MMM YYYY")
  document.querySelector('.header__month').textContent= moment().format("MMMM")
  
  
  // Date -- Year
  document.querySelector('.header__year').dateTime = moment().format("MMM YYYY")
  document.querySelector('.header__year').textContent= moment().format("YYYY")
  // Date - Day
  document.querySelector('.header__day').dateTime = moment().format("dddd,  Do YYYY,");
  document.querySelector('.header__day').textContent = moment().format("dddd"); 
  };
  
  
  
// ------- Function-End 
  
  
  
  // All Task is here 
let notes = getSavedNotes();
// Rendering our notes. 
const rendering = {title: ''};


// Function which Create our task
createTask(notes,rendering);


//   -----------  FORM -----------
document.querySelector('.form').addEventListener('submit',function(e){
    e.preventDefault();


    
// Add Data to notes. 
    notes.push({title:e.target.title.value,
                description:e.target.description.value,
                time:e.target.time.value,
                done: false,
                id: uuidv4()});


 //  Save Date in Local Storage
    saveNote(notes);



// Reset input data
    e.target.title.value = null;
    e.target.description.value = null;
    e.target.time.value = null;
    createTask(notes,rendering);

});

//   -----------  FORM - Cancle Task-----------

document.querySelector('#cancel-task').addEventListener('click',function(e){
    
    
    document.querySelector('.form').classList.add('form--hidden')
    document.querySelector('.container').classList.remove('container--hidden');
      
    
    });


// Page Settings 
// ---------Open Window with Form ----------
document.querySelector('#create-task').addEventListener('click',function(e){
    document.querySelector('.form').classList.remove('form--hidden');
    document.querySelector('.container').classList.add('container--hidden');
      
    
    });

//----------  SEARCH TITLE--------
document.querySelector('#search').addEventListener('input', function(e){
    rendering.title = e.target.value
    createTask(notes,rendering)
})


// -------------- Date Aplication----------------
currentDate();

  
  
  
  
  
  
  
  
  
  