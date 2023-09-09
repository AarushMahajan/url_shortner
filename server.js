const app = require("./src/app");
const db = require("./src/db/db");
const port = process.env.PORT;
const zookeeperConnect = require("./zookeeper").zookeeperConnect;

// Start the server

app.listen(port, async () => {
  await db();
  await zookeeperConnect();
  console.log(`Server is running on http://localhost:${port}`);
});
