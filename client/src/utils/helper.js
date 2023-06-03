/**
 * Creates an artificial delay.
 * @param {number} delay in milliseconds
 */
export const sleep = (delay) => new Promise((r) => setTimeout(r, delay));
