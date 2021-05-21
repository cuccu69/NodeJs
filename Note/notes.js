const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

// List function for service
// 1.Add note
const addNote = function(title, body) {
    const notes = loadNotes()
    const isDuplicateNotes = notes.some(note => note.title === title)
    if (!isDuplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note is added');
    } else {
        console.log('Note title is existed!')
    }
}

// 2.Remove note
const removeNote = function(title) {
    const notes = loadNotes()
    const isExist = notes.some(note => note.title === title)
    if (isExist) {
        const findingNote = (note) => note.title === title
        const indexOfNote = notes.findIndex(findingNote)
        notes.splice(indexOfNote, 1)
        saveNotes(notes)
        console.log('Note is removed successfully!');
    } else {
        console.log('Note does not exist!');
    }
}

// Bien object thanh kieu JSON va luu vao file luu tru, neu chua co no se tu tao
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Read JSON file if it exists then covert into array of object Or return empty array if file doesn't exist
const loadNotes = function () {
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
    removeNote: removeNote
}