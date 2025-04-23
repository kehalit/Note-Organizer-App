const fs = require('fs');
const readline = require('readline-sync');

const NOTES_FILE = 'notes.json';

// Load notes from file
function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync(NOTES_FILE);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

// Save notes to file
function saveNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

//add note
function addNote(){
    const title = readline.question("Enter note title: ");
    const body = readline.question("Enter note body: ");

    const notes = loadNotes();

    // Check for duplicate titles
    const duplicate = notes.find(note => note.title === title);
    if (duplicate) {
        console.log("❗ A note with this title already exists.");
        return;
    }

    const newNote = {
        title,
        body,
        time_added: new Date().toISOString()
    };

    notes.push(newNote);
    saveNotes(notes);

    console.log("✅ Note added successfully!");
}

// list notes
function listNotes() {
    const notes = loadNotes();

    if (notes.length === 0) {
        console.log("📭 No notes found.");
        return;
    }

    notes.forEach((note, index) => {
        console.log(`
${index + 1}. Title: ${note.title}
   Body: ${note.body}
   Added on: ${note.time_added}
        `);
    });
}

//read a note
function readNote() {
    const title = readline.question("Enter note title: ");
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);

    if (!note) {
        console.log("❌ Note not found.");
        return;
    }

    console.log(`
    Title: ${note.title}
    Body: ${note.body}
    Added on: ${note.time_added}
    `);
}

// delete a note 

function deleteNote() {
    const title = readline.question("Enter note title: ");
    let notes = loadNotes();

    const filteredNotes = notes.filter(note => note.title !== title);

    if (filteredNotes.length === notes.length) {
        console.log("❌ Note not found.");
        return;
    }

    saveNotes(filteredNotes);
    console.log("✅ Note deleted successfully!");
}

// menu
while (true) {
    console.log(`
============================
📒 Note Organizer Menu
1. Add a note
2. List all notes
3. Read a note
4. Delete a note
5. Exit
============================
`);

    const choice = readline.question("Enter your choice: ");

    if (choice === '1') {
        addNote();
    } else if (choice === '2') {
        listNotes();
    } else if (choice === '3') {
        readNote();
    } else if (choice === '4'){
        deleteNote();
    }
    else if (choice === '5') {
        console.log("👋 Exiting...");
        break;
    } else {
        console.log("❌ Invalid choice. Please try again.");
    }
}