var Connection = require('tedious').Connection;


var config = {
    server: '10.10.0.11',
    authentication: {
      type: 'default',
      options: {
        userName: 'USER_ID',
        password: 'USER_PW'
      }
    }
    ,options: {
      debug: {
        packet: true,
        data: true,
        payload: true,
        token: false,
        log: true
      },
      database: 'DB_NAME'
      //,encrypt: true // for Azure users
    }
    
  };

var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('[DB-'+config.server+'] Connected to ' + config.options.database);
    }
});

module.exports = connection;