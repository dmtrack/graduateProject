const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const BOOKMARKS = "bookmarks";
const CURRENT_USER = "currentUser";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(BOOKMARKS);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function getUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER));
}

export function fetchAllBookmarkedEpisodes() {
  return JSON.parse(localStorage.getItem(BOOKMARKS)) || [];
}

export function setEpisodes(data) {
  localStorage.setItem(BOOKMARKS, JSON.stringify(data));
}

export function removeBookmarks() {
  localStorage.removeItem(BOOKMARKS);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  removeBookmarks,
  setEpisodes,
  fetchAllBookmarkedEpisodes,
};
export default localStorageService;
