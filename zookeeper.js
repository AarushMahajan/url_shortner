const zookeeper = require("node-zookeeper-client");

var zkClient = zookeeper.createClient("localhost:2181");

var zookeeperConnect = () => {
  return new Promise((resolve, reject) => {
    zkClient.connect();
    console.log("Successfully connected to zookeeper");
    return resolve();
  });
};

zkClient.on("error", (error) => {
  console.error(`ZooKeeper error: ${error}`);
});

zkClient.on("disconnected", () => {
  console.log("Disconnected from ZooKeeper");
  // Retry the connection or operation after a delay
  setTimeout(zookeeperConnect, 5000);
});

module.exports = {
  zookeeperConnect,
  zkClient,
};
