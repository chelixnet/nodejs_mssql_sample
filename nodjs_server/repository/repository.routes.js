const _queryRepository = require('./db_query/query.repository.js');
const _procRepository = require('./db_proc/proc.repository.js');

const dbContext = require('../database/dbContext');

module.exports = function (router) {
    //QUERY1---------------------------------------------
    const query1 = _queryRepository(dbContext);
    router.route('/db_check')
    .get(query1.getAll);
    
    
    router.use('/db_check/date', query1.intercept);

    router.route('/db_check/date')
        .get(query1.get);

    //QUERY2---------------------------------------------
    const query2Repository = _queryRepository(dbContext);

    router.route('/query2')
        .get(query2Repository.getAll)
        .post(query2Repository.post);
        
    
    router.use('/query2/id/:CODE', query2Repository.intercept);

    router.route('/query2/id/:CODE')
        .get(query2Repository.get)
        .put(query2Repository.put)
        .delete(query2Repository.delete);
        
    //PROC---------------------------------------------
    const procRepository = _procRepository(dbContext);

    router.use('/proc/id/:TARGET_SP/:CODE', procRepository.intercept);
    router.use('/proc/gid/:TARGET_SP/:GID/:CODE', procRepository.intercept);
    
    router.route('/proc/id/:TARGET_SP/:CODE').get(procRepository.get);
    router.route('/proc/gid/:TARGET_SP/:GID/:CODE').get(procRepository.get);

}