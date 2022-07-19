/**
 * @file Sample help command with slash command.
 * @author Felix, Mezo
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('newstory')
    .setDescription('Neue Story beginnen'),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix, Mezo
   * @param {*} interaction The interaction object of the command.
   */

  async execute (interaction) {
    if (
      interaction.member.roles.cache.some((role) => role.name === 'Developer')
    ) {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Satz hinzufügen')
          .setCustomId('story')
          .setStyle(ButtonStyle.Primary)
      )
      interaction.reply({
        content: 'Beginne eine neue Story!',
        components: [row]
      })
    } else {
      return interaction.reply({
        content: 'No permissions',
        ephemeral: true
      })
    }
  }
}
