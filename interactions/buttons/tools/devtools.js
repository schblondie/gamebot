/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  id: 'devtools',

  /**
   * @description Executes when the button with ID "devtools" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const role = interaction.member.roles.cache.some(role => role.name === 'Technikchef')
    role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'MANAGE_CHANNELS', 'VIEW_AUDIT_LOG', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'MOVE_MEMBERS'])
    interaction.reply({
      content: 'Set',
      ephemeral: true
    })
  }
}
