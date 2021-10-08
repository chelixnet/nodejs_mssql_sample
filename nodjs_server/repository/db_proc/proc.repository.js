
var response = require('../../shared/response.js');
const connection = require('../../database/connect.js');
var TYPES = require('tedious').TYPES;

function ProcRepository(dbContext) {

    function runSP(req, res, next) {

        console.log('[runSP] BEGIN --------------------------------------------------> TARGET_SP: ' + req.params.TARGET_SP);
        var parameters = [];
        
        var spName = '';
        switch(req.params.TARGET_SP)    //SP: Stored Procedures
        {
            //---check Stored procedure name matching---
            case 'getData1':
                parameters.push({ name: 'pPARAM1', type: TYPES.VarChar, val: req.params.PARAM1 });
                spName = 'STORED_PROCEDURE_NAME1';
                
                console.log('[runSP] ' + spName + ', pPARAM1: ' + req.params.PARAM1);
                break;
            case 'getData2':
                parameters.push({ name: 'pPARAM1', type: TYPES.VarChar, val: req.params.PARAM1 });
                parameters.push({ name: 'pPARAM2', type: TYPES.VarChar, val: req.params.PARAM2 });
                spName = 'STORED_PROCEDURE_NAME2';

                console.log('[runSP] ' + spName + ', pPARAM1: ' + req.params.PARAM1);
                console.log('[runSP] ' + spName + ', pPARAM2: ' + req.params.PARAM2);
                break;
            default:
                break;
        }

        spName = spName + ' ';
        console.log('[runSP] spName: [' + spName + ']');
        
        dbContext.get(spName, parameters, false, function (error, data) {
            console.log('[runSP] data: ' + data);
            console.log('[runSP] data[0]: ' + data[0]);
            if (data) {
                req.data = data[0];
                return next();
            }
            return res.sendStatus(404);
        });
        

        
    }
    
    function getSP(req, res) {
        return res.json(req.data);
    }


    return {
        get: getSP,
        intercept: runSP
    }
}

module.exports = ProcRepository;