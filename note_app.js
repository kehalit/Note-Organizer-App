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

while (true) {
    console.log(`
============================
📒 Note Organizer Menu
1. Add a note
2. List all notes
3. Exit
============================
`);

    const choice = readline.question("Enter your choice: ");

    if (choice === '1') {
        addNote();
    } else if (choice === '2') {
        listNotes();
    } else if (choice === '3') {
        console.log("👋 Exiting...");
        break;
    } else {
        console.log("❌ Invalid choice. Please try again.");
    }
}

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
