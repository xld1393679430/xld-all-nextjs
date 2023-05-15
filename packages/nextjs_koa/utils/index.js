const moment = require("moment");
const isServer = typeof window === "undefined";
const github_base_url = "https://api.github.com";

function getLastUpdated(time) {
  return moment(time).fromNow();
}

module.exports = {
  isServer,
  github_base_url,
  getLastUpdated,
};
