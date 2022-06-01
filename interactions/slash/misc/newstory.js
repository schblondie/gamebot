/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder().setName('newstory').setDescription('Neue Story beginnen'),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    if (interaction.member.roles.cache.some((role) => role.name === 'Developer')) {
      const row = new MessageActionRow().addComponents(
        new MessageButton().setLabel('Satz hinzufügen').setCustomId('story').setStyle('PRIMARY'),
      );
      interaction.reply({
        content: 'Beginne eine neue Story!',
        components: [row],
      });
    } else {
      return interaction.reply({
        content: 'No permissions',
        ephemeral: true,
      });
    }
  },
};
