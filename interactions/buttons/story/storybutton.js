/**
 * @file Sample button interaction

 * @since 1.0.0
 */
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
module.exports = {
  id: 'story',

  /**
   * @description Executes when the button with ID "vorschlag" is clicked.

   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Satz hinzufügen')
        .setCustomId('story')
        .setStyle('PRIMARY')
    )
    row.components[0].setDisabled(true)
    interaction.message.edit({
      components: [row]
    })
    const story =
      interaction.member.guild.channels.cache.find(
        (channel) => channel.name === 'story'
      ) || interaction.member.guild.channels.cache.get('951237838295416892')
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Satz hinzufügen')
        .setCustomId('story')
        .setStyle('PRIMARY')
    )
    interaction.reply({
      content:
        'Bitte sende einen Satz für die Story!\n\nDu hast 60s Zeit dafür.',
      ephemeral: true
    })
    const channel = interaction.channel
    const filter = (m) => m.author.id === interaction.user.id
    const collector = channel.createMessageCollector({
      filter,
      time: 60000,
      max: 1
    })
    const stopit = []
    stopit.push('Stop')
    collector.on('collect', (m) => {
      channel.send({
        content: m.content,
        components: [row1]
      })
      m.delete()
      story.send({
        content: m.content
      })
      interaction.message.delete()
      stopit.pop()
    })
    collector.on('end', () => {
      if (stopit.includes('Stop')) {
        interaction.editReply({
          content: 'Timeout',
          embeds: [],
          components: []
        })
        interaction.message.edit({
          components: [row1]
        })
      } else {
        interaction.editReply({
          content: 'Done',
          ephemeral: true
        })
      }
    })
  }
}
