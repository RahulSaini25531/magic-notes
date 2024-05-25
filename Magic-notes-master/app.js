console.log("Welcome to magic Notes")
showNotes()

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function(){
    let addtitle = document.getElementById('addtitle');
    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    if (notes == null && title == null) {
        titleObj = [];
        notesObj = [];
    }
    else{
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }

    titleObj.push(addtitle.value);
    notesObj.push(addtxt.value);
    localStorage.setItem('title', JSON.stringify(titleObj))
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addtitle.value = "";
    addtxt.value = "";

    showNotes();
})

function showNotes(){
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    if (notes == null && title == null) {
        titleObj = [];  
        notesObj = [];
    }
    else{
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }

    let html = "";
    for (let i = 0; i < titleObj.length; i++) {
        html += `<div class="card my-2 mx-2 notecard" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title" class="textarea" id="${i}" onclick="changeTitle(this.id)">${titleObj[i]}</h5>
      <p class="card-text" class="textarea" id="${i}" onclick="changebody(this.id)">${notesObj[i]}</p>
      <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
    </div>
  </div>`;
    }

    let note = document.getElementById('notes');
    if (titleObj.length != 0 && notesObj.length != 0) {
        note.innerHTML = html;
    }
    else{
        note.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`
    }
}

function deleteNote(index){
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    if (notes == null && title == null) {
        titleObj = [];
        notesObj = [];
    }
    else{
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }

    titleObj.splice(index, 1);
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('title', JSON.stringify(titleObj))
    showNotes();
}

function changeTitle(index){
    obj = document.getElementById(index)
    let notextarea = document.getElementsByClassName('textarea').length;
    if (notextarea == 0) {
        html = obj.innerText;
        obj.innerHTML = `<textarea class="form-control textarea" id="textarea" rows="1">${html}</textarea>`
    }

    let textarea = document.getElementById('textarea');
    textarea.addEventListener('blur', function(){
        obj.innerText = textarea.value;
        titleObj = JSON.parse(localStorage.getItem('title'))
        titleObj[index] = textarea.value;
        localStorage.setItem('title',JSON.stringify(titleObj))
    })
}

function changebody(index){
    obj = document.getElementsByTagName('p')[index];
    let notextarea = document.getElementsByClassName('textarea').length;
    if (notextarea == 0) {
        html = obj.innerText;
        obj.innerHTML = `<textarea class="form-control textarea" id="textarea" rows="2">${html}</textarea>`
    }

    let textarea = document.getElementById('textarea');
    textarea.addEventListener('blur', function(){
        obj.innerText = textarea.value;
        noteObj = JSON.parse(localStorage.getItem('notes'))
        noteObj[index] = textarea.value;
        localStorage.setItem('notes',JSON.stringify(noteObj))
    })
}

let search = document.getElementById('searchtxt');
search.addEventListener('input', function(){
    let searchtext = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard')
    Array.from(notecard).forEach(function(element){
        let cardtext = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (cardtext.includes(searchtext)) {
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none'
        }
    })
})