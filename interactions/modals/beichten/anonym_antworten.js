/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */

const imp = require('../../buttons/beichte/anonymantworten.js')
const { getDatabase, ref, set } = require('firebase/database')
module.exports = {
  id: 'anonym_antworten',

  /**
   * @description Executes when the modal with ID "anonym_antworten" is called.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    imp.prev.channel
      .send({ content: interaction.fields.getTextInputValue('text') })
      .then(function (message) {
        set(ref(getDatabase(), interaction.guild.id + '/anonym/messages/' + message.id), interaction.member.id)
      })
    interaction.reply({
      content:
        '**Antwort eingereicht!**\nDu kannst diese Nachricht jetzt verwerfen',
      ephemeral: true
    })
  }
}
