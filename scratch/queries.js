const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

//GET notes with search
notes.filter('cats', (err, list) => {
    if (err) {
        console.error(err);
    }
    console.log(list);
});

// GET notes by ID
notes.find(1005, (err, item) => {
    if (err) {
        console.error(err);
    }
    if (item) {
        console.log(item);
    } else {
        console.log('not found');
    }
});

//PUT (update) notes by ID
const updateObj = {
    title: 'New title', 
    content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
    if (err) {
        console.error(err);
    }
    if (item) {
        console.log(item);
    } else {
        console.log('not found')
    }
});

notes.update(1005, {title: 'alsdfjalfjalfa', content: 'i hate fjaldfalfaljfafasdfaasdfafa'})

notes.find(1005);