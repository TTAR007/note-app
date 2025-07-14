const createBtnEl = document.getElementById("create-btn");
const noteBoxEl = document.getElementById("note_box");

//when page refresh I want to get the previous local storage and display it
const localNotes = JSON.parse(localStorage.getItem("notes")); //This is an array of note text from local

//add note but add the text content to pEl also
if (localNotes != null) {
    localNotes.forEach(function(note) {
        //craete section element
        const noteBodyEl = document.createElement("section");
        noteBodyEl.className = "note_body";

        //create p element and set contenteditable
        const pEl = document.createElement("p");
        pEl.setAttribute("contenteditable", "true");
        pEl.textContent = note; // **add the note text from local to p element**

        //create delete button element
        const deleteBtnEl = document.createElement("button");
        deleteBtnEl.type = "button";
        deleteBtnEl.className = "delete-btn";
        deleteBtnEl.textContent = "delete";

        //append note body to note box in html
        noteBoxEl.appendChild(noteBodyEl);
        //append pEl and deleteEl to note body
        noteBodyEl.appendChild(pEl);
        noteBodyEl.appendChild(deleteBtnEl);

        saveLocal();
    })
}

// add note(empty noteBox) if click
createBtnEl.addEventListener("click", function() {
    //craete section element
    const noteBodyEl = document.createElement("section");
    noteBodyEl.className = "note_body";

    //create p element and set contenteditable
    const pEl = document.createElement("p");
    pEl.setAttribute("contenteditable", "true");

    //create delete button element
    const deleteBtnEl = document.createElement("button");
    deleteBtnEl.type = "button";
    deleteBtnEl.className = "delete-btn";
    deleteBtnEl.textContent = "delete";

    //append note body to note box in html
    noteBoxEl.appendChild(noteBodyEl);
    //append pEl and deleteEl to note body
    noteBodyEl.appendChild(pEl);
    noteBodyEl.appendChild(deleteBtnEl);

    saveLocal();
})

//delete note
noteBoxEl.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        let parentElement = e.target.parentElement;
        parentElement.remove(); //delete noteBody
        saveLocal();
    }
})

//save to local if user finish typing
noteBoxEl.addEventListener("focusout", function(e) {
    if (e.target.tagName === "P") {
        saveLocal();
    }
})

// to save notes to local storage
// 1.get all p element
// 2.using foreach and store each p's text note using textContent to an Array
// 3.save that array to local storage by using JSON to convert array to string
function saveLocal() {
    const allnotes = document.querySelectorAll(".note_body p"); //get NodeList of pEl
    let myNotes = [];

    if (allnotes.length === 0) {
        localStorage.removeItem("notes");
        return;
    }

    allnotes.forEach(function(note) {
        myNotes.push(note.textContent);
    })
    localStorage.setItem("notes", JSON.stringify(myNotes)); //save array of note text in local (overwrite previous one)
}