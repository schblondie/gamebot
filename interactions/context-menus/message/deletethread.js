/**
* @file Context menu (type:type) interaction: Delete Thread
* @author Felix
* @since 1.0.0
*/
const { ref, get, getDatabase } = require('firebase/database')
module.exports = {
  data: {
    name: 'Thread löschen',
    type: 3 // 3 is for message context menus
  },

  /**
   * @description Executes when the context option with name "Vorschlag löschen" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    async function deleteThread () {
      interaction.targetMessage.thread.delete()
      interaction.targetMessage.delete()
      interaction.reply({
        content: 'Done',
        ephemeral: true
      })
    }
    if (
      interaction.member.roles.cache.some(
        (role) => role.name === 'Technikchef'
      ) ||
      interaction.member.roles.cache.some(
        (role) => role.name === 'Stadtsekretär:in'
      )
    ) {
      deleteThread()
    } else {
      const db = getDatabase()
      const id = interaction.guild.id
      if (JSON.stringify(await get(ref(db, id + '/anonym/messages/' + interaction.targetMessage.id))).slice(1).slice(0, -1) === interaction.member.id) {
        deleteThread()
      } else {
        return interaction.reply({
          content: 'Dieser Thread gehört dir nicht',
          ephemeral: true
        })
      }
    }
  }
}
