let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  var tableSvc = azure.createTableService('fwiotstorage', process.env["TableStorageAccessKey"]);
  var uniqueID = uuidv4();
  var entity = {
    PartitionKey: { '_': '1' },
    RowKey: uniqueID,
    DeviceID: context.req.body.end_device_ids.device_id,
    Value: context.req.body.uplink_message.frm_payload  //JSON.stringify(context.req.body.uplink_message.frm_payload)
  };
  tableSvc.insertEntity('SensorValues', entity, function (error, result, response) {
    if (!error) {
      // Entity inserted
    }
  });
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Inserted!"
  };
}