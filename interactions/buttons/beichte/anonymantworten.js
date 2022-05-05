/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
  id: 'anonymantworten',

  /**
   * @description Executes when the button with ID "vorschlag" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction, client) {
    async function run() {
      const row3 = new MessageActionRow().addComponents(new MessageButton().setLabel('Anonym antworten').setCustomId('anonymantworten').setStyle('SECONDARY'))
      const fetch = await interaction.channel.messages.fetch({ limit: 10 })
      var fetchfiltered = fetch.filter(function (list) {
        return list.content == 'Anonym antworten'
      })
      var id = fetchfiltered.map(function (list) {
        return list.id
      })
      if (id.length != 0) {
        interaction.channel.messages
          .fetch(id.toString())
          .then((message) => {
            message.delete()
          })
          .catch({})
      }
      interaction.channel.send({
        content: `Anonym antworten`,
        components: [row3],
      })
    }
    const row2 = new MessageActionRow().addComponents(new MessageButton().setLabel('Abbrechen').setCustomId('cancelvorschlag').setStyle('DANGER'))
    interaction.reply({
      content: "**Schau in deine DM's**\nWenn du keine Nachricht erhalte hast überprüfe ob du Nachrichten von Servermitgliedern erlaubst",
      ephemeral: true,
    })
    let channel = interaction.user.dmChannel
    if (!channel) channel = await interaction.user.createDM()
    var embedmsg = await channel.send({
      content: 'Bitte sende deine Antwort!',
    })
    let filter = (m) => m.author.id === interaction.user.id
    const collector = channel.createMessageCollector({ filter, time: 300000, max: 1 })
    var title = []
    title.push('Stop')
    collector.on('collect', (m) => {
      title.pop()
      title.push(m.content)
      embedmsg.edit({
        content: `**Deine Antwort:**\n\n${m.content}`,
      })
    })
    collector.on('end', (collected) => {
      if (title.includes('Stop')) {
        embedmsg.edit({
          content: 'Timeout',
          embeds: [],
          components: [],
        })
      } else {
        channel.send({
          content: 'Done',
        })
        interaction.editReply({
          content: 'Done',
          ephemeral: true,
        })
        const title1 = title.toString()
        interaction.channel.send({
          content: `${title1}`,
        })
        run()
      }
    })
  },
}
