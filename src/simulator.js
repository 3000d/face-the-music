const dotenv = require('dotenv');
dotenv.config();

const repl = require('repl');
const data = require('./example-data');
const midiConverter = new (require('./midi-converter'))();

const replServer = repl.start({
  prompt: "bmo > ",
  useColors: true
});

replServer.defineCommand('f', {
  help: 'Fire random match',
  action: () => {
    const match = data[Math.floor(Math.random() * (data.length - 1))];
    midiConverter.trigger(match);
    replServer.displayPrompt();
  }
});
