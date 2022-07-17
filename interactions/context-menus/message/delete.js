/**
* @file Context menu (type:type) interaction: Delete Message
* @author Felix
* @since 1.0.0
*/
const { ref, get, getDatabase } = require('firebase/database')
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
      const db = getDatabase()
      const id = interaction.guild.id
      if (JSON.stringify(await get(ref(db, id + '/anonym/messages/' + interaction.targetMessage.id))).slice(1).slice(0, -1) === interaction.member.id || interaction.member.id === interaction.targetMessage.author.id) {
        interaction.targetMessage.delete()
        interaction.reply({
          content: 'Done',
          ephemeral: true
        })
      } else {
        return interaction.reply({
          content: 'Diese Nachricht gehört dir nicht',
          ephemeral: true
        })
      }
    }
  }
}
