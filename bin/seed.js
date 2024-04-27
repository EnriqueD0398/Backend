const mongoose = require('mongoose');
const events = require('../models/Evento.model');
const eventsWithJSON = require('../data/events.json');

require('../config/db.config');

mongoose.connection.once('open', () => {

    mongoose.connection.dropCollection('events')
    .then(() => {
        console.log('database cleared')

        return events.create(eventsWithJSON)
    })

    .then(newEvents => {
        newEvents.forEach((event) => {
            console.log(`${event.NombreDelDeporte} has been created`)
        })
        console.log(`${newEvents.length} books have been created`);
    })
    .catch(err => console.error(err))
    .finally(() => {
        mongoose.connection.close()
            .then(() => console.log('Connection closed'))
            .catch(err => console.log('Error disconnectiong:', err))
            .finally(() => process.exit(0))
    })

})