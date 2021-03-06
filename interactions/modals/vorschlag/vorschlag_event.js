/**
 * @file Sample button interaction

 * @since 2.0.0
*/
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder
} = require('discord.js')
module.exports = {
  id: 'vorschlag_event',

  /**
   * @description Executes when the modal with ID "vorschlag_event" is called.

   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const titel = interaction.fields.getTextInputValue('titel')
    const beschreibung = interaction.fields.getTextInputValue('beschreibung')
    if (titel === '' || beschreibung === '') {
      return interaction.reply({
        content: '**Vorschlag unvollständig!**',
        ephemeral: true
      })
    }
    const embed = new EmbedBuilder()
      .setTitle(titel)
      .setDescription(beschreibung)
      .setColor('#6fe4c7')
      .setAuthor({ name: 'Event' })
    interaction.channel
      .send({
        embeds: [embed],
        components: []
      })
      .then(function (message) {
        message.react('👍')
        message.react('👎')
        message.startThread({
          name: `${titel}`,
          autoArchiveDuration: 1440 * 7,
          type: 'GUILD_PUBLIC_THREAD'
        })
      })
      .catch()
    async function run () {
      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Vorschlag')
          .setCustomId('vorschlag_normal')
          .setStyle('PRIMARY'),
        new ButtonBuilder()
          .setLabel('Anonym')
          .setCustomId('vorschlag_anonym')
          .setStyle('SECONDARY'),
        new ButtonBuilder()
          .setLabel('Event')
          .setCustomId('vorschlag_event')
          .setStyle('SECONDARY')
      )
      const fetch = await interaction.channel.messages.fetch({
        limit: 10
      })
      const fetchfiltered = fetch.filter(function (list) {
        return list.content === 'Drücke hier um einen Vorschlag einzureichen'
      })
      const id = fetchfiltered.map(function (list) {
        return list.id
      })
      if (id.length !== 0) {
        interaction.channel.messages
          .fetch(id.toString())
          .then((message) => {
            message.delete()
          })
          .catch({})
      }
      interaction.channel.send({
        content: 'Drücke hier um einen Vorschlag einzureichen',
        components: [row1]
      })
    }
    run().then().catch()
    require('dotenv').config()
    const api = process.env.trelloApi
    const token = process.env.trelloToken
    const Trello = require('trello-node-api')(api, token)
    const data = {
      name: titel,
      desc: beschreibung,
      pos: 'top',
      idList: '62250267d4625f0f591cd04f'
    }
    Trello.card
      .create(data)
      .then()
      .catch()
    interaction.reply({
      content:
        '**Vorschlag eingereicht!**\nDu kannst diese Nachricht jetzt verwerfen',
      ephemeral: true
    })
  }
}
