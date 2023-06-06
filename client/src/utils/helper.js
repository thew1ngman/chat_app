/**
 * Creates an artificial delay.
 * @param {number} delay in milliseconds
 */
export const sleep = (delay) => new Promise((r) => setTimeout(r, delay));

/**
 * Get cookie value.
 * @param {string} name 
 */
export const getCookie = (name) => {
    const cookie = document.cookie
        .split(';')
        .find(c => c.includes(name))
        .split('=')[1];

    return cookie;
}