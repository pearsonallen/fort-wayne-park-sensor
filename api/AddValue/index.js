let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  var tableSvc = azure.createTableService('fwiotstorage', process.env["TableStorageAccessKey"]);
  var uniqueID = uuidv4();

  var insert_entity = {
    PartitionKey: { '_': '1' },
    RowKey: uniqueID,
    DeviceID: context.req.body.end_device_ids.device_id,
    Value: context.req.body.uplink_message.decoded_payload.payloadValue //JSON.stringify(context.req.body)
  };

  tableSvc.insertEntity('SensorValues', insert_entity, function (error, result, response) {
    if (!error) {
      // Entity inserted
    }
  });
  let query = new azure.TableQuery()
    .where("RowKey == '" + context.req.body.end_device_ids.device_id + "'");
    let r = await queryEntities(tableSvc, 'CurrentSensorValues', query, null);
    let update_entity = r.entries[0];
    update_entity.Value._ = context.req.body.uplink_message.decoded_payload.payloadValue;

    tableSvc.replaceEntity("CurrentSensorValues",update_entity,function(error,result,response) {
      let t = response;
    })


  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Inserted!"
  };
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