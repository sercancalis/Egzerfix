/**
 * Theese routes dont require auth
 * @type {string[]}
 */
export const publicRoutes = ["/", "/about", "/blogs", "/services", "/contact"];

/**
 * Theese routes will redirect logged in Users or other routes
 * @type {string[]}
 */
export const authRoutes = ["/login"]
/**
 * Theese routes will redirect logged in Users or other routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Theese routes will redirect logged in Users or other routes
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";