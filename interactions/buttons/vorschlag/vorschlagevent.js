/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
  id: 'event',

  /**
   * @description Executes when the button with ID "vorschlag" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction, client) {
    async function run() {
      const row1 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('Vorschlag').setCustomId('vorschlag').setStyle('PRIMARY'),
        new MessageButton().setLabel('Anonym').setCustomId('anonym').setStyle('SECONDARY'),
        new MessageButton().setLabel('Event').setCustomId('event').setStyle('SECONDARY'),
      )
      const fetch = await interaction.channel.messages.fetch({ limit: 10 })
      var fetchfiltered = fetch.filter(function (list) {
        return list.content == 'Drücke hier um einen Vorschlag einzureichen'
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
        content: 'Drücke hier um einen Vorschlag einzureichen',
        components: [row1],
      })
    }
    const row2 = new MessageActionRow().addComponents(new MessageButton().setLabel('Abbrechen').setCustomId('cancelvorschlag').setStyle('DANGER'))
    const embed = new MessageEmbed().setAuthor('Event Vorschlag').setTitle(`None`).setDescription(`None`).setColor('DARK_ORANGE')
    var v = 1
    interaction.reply({
      content: "**Schau in deine DM's**\nWenn du keine Nachricht erhalte hast überprüfe ob du Nachrichten von Servermitgliedern erlaubst",
      ephemeral: true,
    })
    let channel = interaction.user.dmChannel
    if (!channel) channel = await interaction.user.createDM()
    var embedmsg = await channel.send({
      content: 'Bitte sende zunächst einen Titel für deinen Vorschlag!\nDanach kannst du noch eine Beschreibung senden!',
      embeds: [embed],
    })
    let filter = (m) => m.author.id === interaction.user.id
    const collector = channel.createMessageCollector({ filter, time: 300000, max: 2 })
    var title = []
    title.push('Stop')
    var desc = []
    desc.push('Stop')
    collector.on('collect', (m) => {
      if (v === 1) {
        embed.setTitle(m.content)
        title.pop()
        title.push(m.content)
        v += 1
        embedmsg.edit({
          embeds: [embed],
        })
      } else {
        embed.setDescription(m.content)
        desc.pop()
        desc.push(m.content)
        embedmsg.edit({
          embeds: [embed],
        })
      }
    })
    collector.on('end', (collected) => {
      if (title.includes('Stop') || desc.includes('Stop')) {
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
        var title1 = title.toString()
        const desc1 = desc.toString()
        interaction.channel
          .send({
            embeds: [embed],
            components: [],
          })
          .then(function (message) {
            message.react('👍')
            message.react('👎')
            message.startThread({
              name: `${title}`,
              autoArchiveDuration: 1440 * 7,
              type: 'GUILD_PUBLIC_THREAD',
            })
          })
        require('dotenv').config()
        var api = process.env.trello_api
        var token = process.env.trello_token
        var Trello = require('trello-node-api')(api, token)
        var data = {
          name: title1,
          desc: desc1,
          pos: 'top',
          idList: '62016b6b6686ac1c549a0ed6',
        }
        Trello.card
          .create(data)
          .then(function (response) {})
          .catch(function (error) {
            console.log('error', error)
          })
        run().then().catch(console.error)
      }
    })
  },
}
