// randomEmail.js
/**
 * Generates a random e-mail address.
 * @returns {string} Generated random email address
 */
export function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    const email = `qa+${randomString}@oneseven.com`;
    return email;
  }