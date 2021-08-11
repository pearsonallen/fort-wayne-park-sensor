let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    var tableSvc = azure.createTableService('fwiotstorage',process.env["TableStorageAccessKey"]);
    
    var date = new Date();
    date.setHours(date.getHours() - 23);
    var whereClause = ["(DeviceID eq 'frankesensor-1' or DeviceID eq 'frankesensor-2') and Timestamp ge datetime'", date.toISOString(), "'"].join('');
    let query = new azure.TableQuery()
    .where(whereClause);
    let r = await queryEntities(tableSvc, 'SensorValues', query, null);

    let returnObj = r.entries.map(function(item) {
      return {
        Timestamp: item.Timestamp._,
        DeviceID: item.DeviceID._,
        Value: item.Value._
      };
    });

    if (r.entries.length > 0) {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: returnObj,
        headers: {
            'Content-Type': 'application/json'
        }
      };
    }
}

async function queryEntities(tableService, ...args) {
  return new Promise((resolve, reject) => {
      let promiseHandling = (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      };
      args.push(promiseHandling);
      tableService.queryEntities.apply(tableService, args);
  });
};