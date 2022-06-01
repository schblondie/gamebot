/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.
const Levels = require('discord-xp');
require('dotenv').config();
Levels.setURL(process.env.mongo);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('VoiceXP stats')
    .addUserOption((option) => option.setName('user').setDescription('Welcher User?').setRequired(true)),

  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    let member = interaction.options.getUser('user');
    const target = interaction.guild.members.cache.get(member.id);
    let run = async function () {
      const user = await Levels.fetch(target.id, interaction.guild.id); // Selects the target from the database.

      if (!user)
        return interaction.reply({ content: 'Seems like this user has not earned any xp so far.', ephemeral: true });
      var next = Levels.xpFor(user.level + 1);
      var reqxp = next - user.xp;
      const embed = new MessageEmbed()
        .setAuthor(target.displayName + `'s XP und Level`, target.displayAvatarURL({ dynamic: true }))
        .addField('Level', user.level.toString(), true)
        .addField('XP', user.xp.toString(), true)
        .addField('Next level in', `${reqxp.toString()}XP`);
      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    };
    run();
  },
};
