const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes...'
}

// List function for service
// 1.Add note
const addNote = (title, body) => {
    const note = findByTitle(title)
    if (!note) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note is added'))
    } else {
        console.log(chalk.bgRed('Note title is existed!'))
    }
}

// 2.Remove note
const removeNote = (title) => {
    const notes = loadNotes()
    const note = findByTitle(title)
    if (note) {
        const indexOfNote = notes.findIndex(note => note.title === title)
        notes.splice(indexOfNote, 1)
        saveNotes(notes)
        console.log(chalk.bgGreen('Note is removed successfully!'));
    } else {
        console.log(chalk.bgRed('Note does not exist!'));
    }
}

// 3.List notes
const listNote = () => {
    console.log(chalk.bgGreen('List notes:'))
    loadNotes().forEach(note => console.log(`${note.title}: ${note.body}`))
}

// 4.Edit a note
const editNote = (title, body) => {
    const notes = loadNotes();
    const note = findByTitle(title)
    if (note) {
        note.body = body
        notes.splice(notes.findIndex(note => note.title === title), 1)
        notes.push(note)
        saveNotes(notes)
        console.log(chalk.bgGreen('Edit success!'));
    } else{
        return console.log(chalk.bgRed('Note title not exist!'));
    }
}

const findByTitle = (title) => {
    return loadNotes().find(note => note.title === title)
}
// Bien object thanh kieu JSON va luu vao file luu tru, neu chua co no se tu tao
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Read JSON file if it exists then covert into array of object Or return empty array if file doesn't exist
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    } 
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    editNote: editNote
}