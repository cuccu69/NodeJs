const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes...'
}

// List function for service
// 1.Add note
const addNote = (title, body) => {
    const notes = loadNotes()
    const isDuplicateNotes = notes.some(note => note.title === title)
    if (!isDuplicateNotes) {
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
    const isExist = notes.some(note => note.title === title)
    if (isExist) {
        const indexOfNote = notes.findIndex(note => note.title === title)
        notes.splice(indexOfNote, 1)
        saveNotes(notes)
        console.log(chalk.bgGreen('Note is removed successfully!'));
    } else {
        console.log(chalk.bgRed('Note does not exist!'));
    }
}

// 3.List note
const listNote = () => {
    console.log('List notes:');
    loadNotes().forEach(note => console.log(note));
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
    listNote: listNote
}