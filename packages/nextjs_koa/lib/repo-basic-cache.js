import LRU from "lru-cache";

const cache = new LRU({
  maxAge: 1000 * 60 * 60,
});

export function setCache(repo) {
  const full_name = repo.full_name;
  cache.set(full_name, repo);
}

export function getCache(full_name) {
  cache.get(full_name);
}

export function setCacheArray(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach((repo) => setCache(repo));
  }
}
