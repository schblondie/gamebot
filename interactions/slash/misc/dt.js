/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// https://gist.github.com/GeneralSadaf/42d91a2b6a93a7db7a39208f2d8b53ad
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Starte eine Discord Together App.')
    .addStringOption((option) =>
      option
        .setName('activity')
        .setDescription('Die App die du starten magst')
        .setRequired(true)
        .addChoice('akword', '879863881349087252')
        .addChoice('betrayal', '773336526917861400')
        .addChoice('blazing8s', '832025144389533716')
        .addChoice('bobble-league', '947957217959759964')
        .addChoice('checkers', '832013003968348200')
        .addChoice('chess', '832012774040141894')
        .addChoice('decoders', '891001866073296967')
        .addChoice('doodlecrew', '878067389634314250')
        .addChoice('fishing', '814288819477020702')
        .addChoice('iframe', '88055924547140816')
        .addChoice('land-io', '903769130790969345')
        .addChoice('letterleague', '879863686565621790')
        .addChoice('pokernight', '755827207812677713')
        .addChoice('puttparty', '945737671223947305')
        .addChoice('sketchheads', '902271654783242291')
        .addChoice('sketchyartist', '879864070101172255')
        .addChoice('spellcast', '852509694341283871')
        .addChoice('wordsnack', '879863976006127627')
        .addChoice('youtube', '880218394199220334'),
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    if (!interaction.guild) {
      await interaction.reply({ content: 'Sorry, but this command only works in servers!', ephemeral: true });
      return;
    }

    // Identify voice channel
    if (
      !interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice
        .channel ||
      interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice
        .channel.type == 'GUILD_STAGE_VOICE'
    ) {
      await interaction.reply({ content: "You're not in a voice channel!", ephemeral: true });
      return;
    }

    // Get ID of activity
    const activityID = interaction.options.getString('activity');
    // Create invite for activity
    const invite = await interaction.client.guilds.cache
      .get(interaction.guildId)
      .members.cache.get(interaction.member.user.id)
      .voice.channel.createInvite({
        maxAge: 604799, // 1 week
        maxUses: 100,
        targetType: 2,
        targetApplication: activityID,
      });
    const embed = new MessageEmbed().setDescription('https://discord.gg/' + invite);
    if (invite) {
      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
