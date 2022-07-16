/**
 * @file Select menu interaction: devselectmenu
 * @author Felix
 * @since 1.0.0
 */
module.exports = {
  id: 'devselectmenu',
  /**
   * @description Executes when the select menu with ID devselectmenu is called.
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
