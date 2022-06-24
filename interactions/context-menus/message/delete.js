module.exports = {
  data: {
    name: 'Delete Message',
    type: 3 // 3 is for message context menus
  },

  /**
   * @description Executes when the context option with name "Delete Message" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {

    if (
      interaction.member.roles.cache.some((role) => role.name === 'Technikchef')
    ) {

      interaction.targetMessage.delete()
      interaction.reply({
        content: 'Done',
        ephemeral: true
      })

    } else {

      return interaction.reply({
        content: 'No permissions',
        ephemeral: true
      })

    }

  }
}
