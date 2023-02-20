const mongoose = require('mongoose');
//const readLine = require('readLine');

let dbURI = 'mongodb://127.0.0.1:27017/travlr';
if(process.env.NODE_ENV === 'production')
{
  dbURI = process.env.DB_HOST || process.env.MONGODB_URI;
}

//avoid 'current Server Discovery and Monitoring engine is deprecated'
mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }), 1000);
};

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});

if(process.platform === 'win32'){
    //throws error: readline.createInterface is not a function. 
    //compiles without this code though
    // const rl = readLine.createInterface ({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    // rl.on('SIGINT', () => {
    //     process.emit("SIGINT");
    // });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {                         
        console.log(`Mongoose disconnected through ${msg}`);     
        callback();                                              
      });
};

//for nodemon restarts
process.once('SIGUSR2', () => {                        
    gracefulShutdown('nodemon restart', () => { 
      process.kill(process.pid, 'SIGUSR2'); 
    });
  });

//for app termination
process.on('SIGINT', () => {                          
  gracefulShutdown('app termination', () => {         
    process.exit(0);                               
  });
});

//for Heroku app termination
process.on('SIGTERM', () => {                         
    gracefulShutdown('Heroku app shutdown', () => {   
      process.exit(0);                               
    });
  });

connect();

//bring in the Moongoose schema
require('./travlr');
require('./user');