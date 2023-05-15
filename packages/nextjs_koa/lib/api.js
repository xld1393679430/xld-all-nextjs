const axios = require("axios");
const { isServer, github_base_url } = require("../utils");

async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers,
  });
}

async function request({ method = "GET", url, data = {}, headers }, req, res) {
  if (!url) {
    throw Error("url needed");
  }
  if (isServer) {
    const session = req.session;
    const githubAuth = session.githubAuth || {};
    const headers = {};
    if (githubAuth.access_token) {
      headers[
        "Authorization"
      ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
    }
    return await requestGithub(method, url, data, headers);
  } else {
    return await axios({
      method,
      url: `/github${url}`,
      data,
    });
  }
}

module.exports = {
  request,
  requestGithub,
};
