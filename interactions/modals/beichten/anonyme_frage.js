/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js')
const { getDatabase, ref, set } = require('firebase/database')
module.exports = {
  id: 'anonyme_frage',

  /**
   * @description Executes when the modal with ID "anonyme_frage" is called.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const titel = interaction.fields.getTextInputValue('titel')
    const beschreibung = interaction.fields.getTextInputValue('beschreibung')
    const embed = new MessageEmbed()
      .setTitle(titel)
      .setDescription(beschreibung)
      .setColor('DARK_AQUA')
      .setAuthor({ name: 'Frage' })
    interaction.channel
      .send({
        content:
          '*Schau in die angepinnten Nachrichten oder an den Anfang des Threads um anonym zu antworten!*',
        embeds: [embed],
        components: []
      })
      .then(function (message) {
        async function run () {
          const thread = await message.startThread({
            name: `${titel}`,
            autoArchiveDuration: 1440 * 7,
            type: 'GUILD_PUBLIC_THREAD'
          })
          const row3 = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel('Anonym antworten')
              .setCustomId('anonymantworten')
              .setStyle('SECONDARY')
          )
          thread
            .send({
              content: 'Drücke hier um anonym zu antworten',
              components: [row3]
            })
            .then(function (message) {
              message.pin()
            })
        }
        run()
        set(ref(getDatabase(), interaction.guild.id + '/anonym/messages/' + message.id), interaction.member.id)
      })
      .catch()
    async function run () {
      const row1 = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('Frage')
          .setCustomId('anonyme_frage')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setLabel('Beichte')
          .setCustomId('anonyme_beichte')
          .setStyle('SECONDARY')
      )
      const fetch = await interaction.channel.messages.fetch({
        limit: 10
      })
      const fetchfiltered = fetch.filter(function (list) {
        return (
          list.content === 'Drücke hier um einen Beichte oder Frage einzureichen'
        )
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
        content: 'Drücke hier um einen Beichte oder Frage einzureichen',
        components: [row1]
      })
    }
    run().then().catch()
    interaction.reply({
      content:
        '**Frage eingereicht!**\nDu kannst diese Nachricht jetzt verwerfen',
      ephemeral: true
    })
  }
}
