/**
 * @file Message Based Commands Handler
 * @author Felix
 * @since 1.0.0
 */

// Declares constants (destructured) to be used in this file.

const { getDatabase, get, remove, ref } = require('firebase/database')
require('dotenv').config()
// Prefix regex, we will use to match in mention prefix.

module.exports = {
  name: 'messageDelete',

  /**
   * @description Executes when a message is created and handle it.
   * @author Felix
   * @param {Object} message The message which was created.
   */
  async execute (message) {
    const db = getDatabase()
    const id = message.guild.id
    const value = JSON.stringify(await get(ref(db, id + '/anonym/messages/' + message.id))).slice(1).slice(0, -1)
    if (value !== null) {
      remove(ref(db, id + '/anonym/messages/' + message.id))
    } else {
      return null
    }
  }
}
