/**
 * @file User menu interaction: Einwohnermeldeamt
 * @since 1.0.0
*/
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js')
const { ref, get, getDatabase } = require('firebase/database')
module.exports = {
  data: {
    name: 'Einwohnermeldeamt',
    type: 2 // 2 is for user context menus
  },

  /**
   * @description Executes when the context option with name "Einwohnermeldeamt" is clicked.

   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    if (JSON.stringify(await get(ref(getDatabase(), interaction.guild.id + '/einwohnermeldeamt/config/enabled'))).slice(1).slice(0, -1) === 'true') {
      const target = interaction.targetMember
      const row1 = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId('empfangselect')
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Tourist',
              value: 'tourist'
            },
            {
              label: 'Einwohner:in',
              description: 'Ändert auch Tourist',
              value: 'einwohner'
            },
            {
              label: 'Verifizierungsebene',
              value: 've2'
            }
          ])
          .setMinValues(1)
          .setMaxValues(1)
      )
      const addthis = []
      if (target.roles.cache.some((role) => role.name === 'Tourist')) {
        addthis.push('Tourist')
      }
      if (target.roles.cache.some((role) => role.name === 'Einwohner:in')) {
        addthis.push('Einwohner:in')
      }
      if (
        target.roles.cache.some((role) => role.name === 'Verifizierungsebene 2')
      ) {
        addthis.push('Verifizierungsebene 2')
      }
      await interaction.reply({
        content: `**${target.user.tag}** hat folgende Rollen: \n\`${addthis.join(
          ' | '
        )}\`\n\nWähle eine Rolle aus um sie zu ändern:`,
        components: [row1],
        ephemeral: true
      })
      module.exports.prev = { interaction, row1 }
    } else {
      interaction.reply({
        content: 'Dieser Befehl ist deaktiviert',
        ephemeral: true
      })
    }
  }
}
