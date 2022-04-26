const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.ping((err, pong) => {
  if (err) console.log(err);
  console.log(pong);
});

client.on("error", function (err) {
  console.log("error", err);
});

client.on("connected", function (err) {
  console.log("Connected");
});

module.exports = client;
