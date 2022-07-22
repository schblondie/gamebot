/**
* @file Button interaction: sendoptionalve2

* @since 1.0.0
*/
const prev1 = require('../../select-menus/empfangtools/empfangselectmenu')
module.exports = {
  id: 'sendoptionalve2',
  /**
* @description Executes when the button with ID sendoptionalve2 is called.

* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const target = prev1.prev.prev4
    try {
      target.user.send({
        embeds: interaction.message.embeds
      })
    } catch (e) {
      console.log(e)
      interaction.reply({
        content: 'User akzeptiert keine Nachricht',
        ephemeral: true
      })
    }
  }
}
