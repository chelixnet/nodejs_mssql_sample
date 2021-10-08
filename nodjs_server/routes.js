const express = require('express'); 

function eRoutes() {
    const router = express.Router();
    var rots = require('./repository/repository.routes.js')(router);
    return router;
}

module.exports = eRoutes;