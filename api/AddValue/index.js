let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  var tableSvc = azure.createTableService('fwiotstorage', process.env["TableStorageAccessKey"]);
  var uniqueID = uuidv4();

  var t = context.req.body.uplink_message.frm_payload;
  var t2 = new Buffer(t,'base64').toString('hex');
  var t3 = parseInt(t2,16);

  var insert_entity = {
    PartitionKey: { '_': '1' },
    RowKey: uniqueID,
    DeviceID: context.req.body.end_device_ids.device_id,
    Value: t3   //JSON.stringify(context.req.body.uplink_message.frm_payload)
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
    update_entity.Value._ = t3;

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