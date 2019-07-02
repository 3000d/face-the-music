const dotenv = require('dotenv');
dotenv.config();

const midiConverter = new (require('./midi-converter'))();
const apiConsumer = new (require('./api-consumer'))(midiConverter.trigger);
