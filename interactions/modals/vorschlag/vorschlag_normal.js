/**
 * @file Sample button interaction
 * @author Felix
 * @since 2.0.0
 */
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
  id: 'vorschlag_normal',

  /**
   * @description Executes when the modal with ID "vorschlag_normal" is called.
   * @author Felix
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
    const embed = new MessageEmbed()
      .setTitle(titel)
      .setDescription(beschreibung)
      .setAuthor({
        name: `${interaction.member.displayName}'s Vorschlag`,
        iconURL: interaction.member.displayAvatarURL({
          dynamic: true
        })
      })
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
      const row1 = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('Vorschlag')
          .setCustomId('vorschlag_normal')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setLabel('Anonym')
          .setCustomId('vorschlag_anonym')
          .setStyle('SECONDARY'),
        new MessageButton()
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
    const api = process.env.trello_api
    const token = process.env.trello_token
    const Trello = require('trello-node-api')(api, token)
    const data = {
      name: titel,
      desc: beschreibung,
      pos: 'top',
      idList: '62016b6b6686ac1c549a0ed6'
    }
    Trello.card.create(data).then().catch()
    interaction.reply({
      content:
        '**Vorschlag eingereicht!**\nDu kannst diese Nachricht jetzt verwerfen',
      ephemeral: true
    })
  }
}
