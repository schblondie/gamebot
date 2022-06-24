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

    if (
      interaction.member.roles.cache.some(
        (role) => role.name === 'Technikchef'
      ) ||
      interaction.member.roles.cache.some(
        (role) => role.name === 'Stadtsekretär:in'
      )
    ) {

      for (var i = 0; i < interaction.targetMessage.embeds.length; i++) {

        const thread = interaction.channel.threads.cache.find(
          (x) => x.name === interaction.targetMessage.embeds[i].title
        )
        await thread.delete()

      }
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
