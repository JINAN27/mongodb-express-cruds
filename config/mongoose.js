const moongse = require('mongoose');
mongoose.connect('mongodb://berkuasa:1234567@localhost:27017/eduwork-moongse?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log ('server terhubung') );
