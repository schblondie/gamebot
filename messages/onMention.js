/**
 * @file Default Bot Mention Command

 * @since 1.0.0
 */
require('dotenv').config()

module.exports = {
  /**
   * @description Executes when the bot is pinged.

   * @param {Object} message The Message Object of the command.
   */

  async execute (message) {
    return message.channel.send(
      `Hi ${message.author}! Bitte benutze Slash Commands oder Apps!`
    )
  }
}
