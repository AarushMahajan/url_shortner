const Promise = require("bluebird");
const zooKeeper = require("node-zookeeper-client");
const zkClient = require("../../zookeeper").zkClient;

const createNode = (znodePath, data) => {
  zkClient.create(znodePath, Buffer.from(data), (err, path) => {
    if (err) {
      console.error(`Error creating znode: ${err}`);
    } else {
      console.log(`Znode created at path: ${path}`);
    }
  });
};

const getNodeData = (znodePath) => {
  return new Promise((resolve, reject) => {
    zkClient.getData(znodePath, null, (error, data, stat) => {
      if (error) {
        console.error(`Error getting data: ${error}`);
        return reject(new Error(`Error getting data: ${error}`));
      } else {
        // Data is returned as a Buffer, so you can convert it to a string
        const znodeData = data.toString("utf8");
        console.log(`Data from znode ('/test): ${znodeData}`);
        console.log(`Data version: ${stat.version}`);
        return resolve({ version: stat.version, data: znodeData });
      }
    });
  });
};

const updateNodeData = async (znodePath, data) => {
  const zNode = await getNodeData(znodePath);
  const updatedData = Buffer.from(data);
  return new Promise((resolve, reject) => {
    zkClient.setData(
      znodePath,
      updatedData,
      zNode.version,
      (updateError, updateStat) => {
        if (updateError) {
          if (updateError.getCode() === zooKeeper.Exception.BADVERSION) {
            console.error(
              "Update failed due to version mismatch. Another client may have updated the znode."
            );
            return reject();
          } else {
            console.error(`Error updating znode: ${updateError}`);
            return reject();
          }
        } else {
          console.log("Znode updated successfully.");
          return resolve();
        }
      }
    );
  });
};

module.exports = {
  createNode,
  getNodeData,
  updateNodeData,
};
