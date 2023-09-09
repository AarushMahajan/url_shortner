const Promise = require("bluebird");
const urlDb = require("../db/model");
const base62 = require("base62");
const zkUtils = require("../controller/zookeeper.utils");
const port = process.env.PORT;

const zNodePath = "/test";

const makeUrlShort = async (req, res) => {
  const url = req.params.url;

  try {
    const { data } = await zkUtils.getNodeData(zNodePath);
    const incrementZKNode = (+data + 1).toString();

    console.log("incrementZKNode :: ", incrementZKNode);

    await zkUtils.updateNodeData(zNodePath, incrementZKNode);

    const shortUrl = base62.encode(+incrementZKNode);

    const obj = {
      id: 1,
      longUrl: "http://localhost",
      shortUrl: shortUrl,
    };

    const dbUrl = urlDb.getModel("url", obj);
    await dbUrl.save();
    console.log("save successfully");
    res.send(
      `Save url: ${url} into db: with zNode Id: ${incrementZKNode} and port: ${port}`
    );
  } catch (error) {
    console.error("Error while saving in db:", error);
  }
};

module.exports = {
  makeUrlShort,
};
