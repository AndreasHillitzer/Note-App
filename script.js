let titles = [];
let notes = [];
let trashTitles = [];
let trashNotes = [];
load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += mainSection();

    for(let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const title = titles[i];
        const mynotes = document.getElementById('mynotes');
    
        mynotes.innerHTML += notesSection(note, title, i);
    }
}


function mainSection() {
    return /*html*/`   
        <section class="main-section">        
            <div class="note-window">
                <input id="title" type="text" placeholder="Titel">
                <textarea name="" id="note" placeholder="Notiz schreiben..." oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
            </div>
            <img class="add-note-button" onclick="addNote()" src="./img/add.png">        
        </section>

        <section class="input-section">
            <div class="mynotes" id="mynotes"></div>
        </section>
        `;
}

function notesSection(note, title, i) {
    return /*html*/`
        <div class="post">
            <b>${title}</b><br><br>
            ${note}
            <img onclick="deleteNote(${i})" class="x-cross" src="./img/x-cross.png">
        </div>
        `;
}


function renderTrash() {
    let trashContent = document.getElementById('trash-content');
    trashContent.innerHTML = '';
    trashContent.innerHTML += inputSectionTrash();

    for(let i = 0; i < trashNotes.length; i++) {
        const note = trashNotes[i];
        const title = trashTitles[i];
        const mynotes = document.getElementById('mynotes');

        mynotes.innerHTML += notesSectionTrash(note, title, i);
    }
}

function inputSectionTrash() {
    return /*html*/`
    <section class="input-section-trash">
        <div class="mynotes" id="mynotes"></div>
    </section>
    `;
}

function notesSectionTrash(note, title, i) {
    return  /*html*/`
    <div class="post">
        <b>${title}</b><br><br>
        ${note}
        <img onclick="restoreNote(${i})" class="restore-img" src="./img/restore.png">
        <img onclick="deleteNoteForever(${i})" class="x-cross" src="./img/x-cross.png">
    </div>
    `;
}

function addNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    if(note == '') {
        return;
    } else {
        titles.push(title);
        notes.push(note);
        render();
        save();
        }
}

function deleteNote(i) {
    trashTitles.push(titles[i]);
    trashNotes.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();
}

function deleteNoteForever(i) {
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();
}

function restoreNote(i) {
    titles.push(trashTitles[i]);
    notes.push(trashNotes[i]);

    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();
}

function save() {
    let titleAsText = JSON.stringify(titles);
    let noteAsText = JSON.stringify(notes);
    let trashTitlesAsText = JSON.stringify(trashTitles);
    let trashNotesAsText = JSON.stringify(trashNotes);

    localStorage.setItem('titles', titleAsText);
    localStorage.setItem('notes', noteAsText);
    localStorage.setItem('trashTitles', trashTitlesAsText);
    localStorage.setItem('trashNotes', trashNotesAsText);
}

function load() {
    let titleAsText = localStorage.getItem('titles');
    let noteAsText = localStorage.getItem('notes');
    let trashTitlesAsText = localStorage.getItem('trashTitles');
    let trashNotesAsText = localStorage.getItem('trashNotes');

    if (titleAsText && noteAsText) {
        titles = JSON.parse(titleAsText);
        notes = JSON.parse(noteAsText);
    }

    if (trashTitlesAsText && trashNotesAsText) {
        trashTitles = JSON.parse(trashTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

