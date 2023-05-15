const GITHUB_OAUTG_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const client_id = "f63b0a7e349f8dbd0e93";

module.exports = {
  GITHUB_OAUTG_URL,
  OAUTH_URL: `${GITHUB_OAUTG_URL}?client_id=${client_id}&scope=${SCOPE}`,
  github: {
    client_id,
    client_secret: "451eb4c52627ebc6f298fd6c1654119a77c2d3b1",
    request_token_url: "https://github.com/login/oauth/access_token",
  },
  url:
    "https://github.com/login/oauth/authorize?client_id=f63b0a7e349f8dbd0e93&scope=user,repo",
  code: "5f40f0d298bbee638118",
};
