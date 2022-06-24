/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.
const Levels = require('discord-xp')
require('dotenv').config()
Levels.setURL(process.env.mongo)
const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('VoiceXP leaderboard'),

  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute (interaction) {

    const run = async function () {

      const rawLeaderboard = await Levels.fetchLeaderboard(
        interaction.guild.id,
        10
      ) // We grab top 10 users with most xp in the current server.

      if (rawLeaderboard.length < 1) {

        return interaction.reply({
          content: "Nobody's in leaderboard yet.",
          ephemeral: true
        })

}

      const leaderboard = await Levels.computeLeaderboard(
        interaction.client,
        rawLeaderboard,
        true
      ) // We process the leaderboard.

      const lb = leaderboard.map(
        (e) =>
          `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
            e.level
          }\nXP: ${e.xp.toLocaleString()}`
      ) // We map the outputs.
      const embed = new MessageEmbed()
        .setTitle('Leaderboard')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`${lb.join('\n\n')}`)
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      })

}
    run()

}
}
