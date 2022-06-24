/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const imp = require('../../context-menus/user/tools')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  id: 'empfangtools',

  /**
   * @description Executes when the button with ID "empfangtools" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {

    interaction.update({})
    const target = imp.prev.targetMember
    const prev = imp.prev
    const row1 = new MessageActionRow().addComponents(
      new MessageSelectMenu()
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
    var addthis = []
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
    await prev.editReply({
      content: `**${target.user.tag}** hat folgende Rollen: \n\`${addthis.join(
        ' | '
      )}\`\n\nWähle eine Rolle aus um sie zu ändern:`,
      components: [row1],
      ephemeral: true
    })
    const prev2 = interaction
    module.exports.prev2 = prev2
    module.exports.prev = prev

}
}
