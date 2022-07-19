/**
 * @file Sample help command with slash command.
 * @author Felix, Mezo
 * @since 1.0.0
 */

// https://gist.github. com/GeneralSadaf/42d91a2b6a93a7db7a39208f2d8b53ad
const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

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
        .addChoices(
          // {name:'akword', value:'879863881349087252'},
          { name: 'betrayal', value: '773336526917861400' },
          { name: 'blazing8s', value: '832025144389533716' },
          { name: 'bobble-league', value: '947957217959759964' },
          { name: 'checkers', value: '832013003968348200' },
          { name: 'chess', value: '832012774040141894' },
          // {name:'decoders', value:'891001866073296967'},
          { name: 'doodlecrew', value: '878067389634314250' },
          { name: 'fishing', value: '814288819477020702' },
          // {name:'iframe', value:'88055924547140816'},
          { name: 'land-io', value: '903769130790969345' },
          { name: 'letterleague', value: '879863686565621790' },
          { name: 'pokernight', value: '755827207812677713' },
          { name: 'puttparty', value: '945737671223947305' },
          { name: 'sketchheads', value: '902271654783242291' },
          // {name:'sketchyartist', value:'879864070101172255'},
          { name: 'spellcast', value: '852509694341283871' },
          { name: 'wordsnack', value: '879863976006127627' },
          { name: 'youtube', value: '880218394199220334' }
        )
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix, Mezo
   * @param {*} interaction The interaction object of the command.
   */

  async execute (interaction) {
    if (!interaction.guild) {
      await interaction.reply({
        content: 'Sorry, but this command only works in servers!',
        ephemeral: true
      })
      return
    }

    // Identify voice channel
    if (
      !interaction.client.guilds.cache
        .get(interaction.guildId)
        .members.cache.get(interaction.member.user.id).voice.channel ||
      interaction.client.guilds.cache
        .get(interaction.guildId)
        .members.cache.get(interaction.member.user.id).voice.channel.type ===
        'GUILD_STAGE_VOICE'
    ) {
      await interaction.reply({
        content: "You're not in a voice channel!",
        ephemeral: true
      })
      return
    }

    // Get ID of activity
    const activityID = interaction.options.getString('activity')
    // Create invite for activity
    const invite = await interaction.client.guilds.cache
      .get(interaction.guildId)
      .members.cache.get(interaction.member.user.id)
      .voice.channel.createInvite({
        maxAge: 604799, // 1 week
        maxUses: 100,
        targetType: 2,
        targetApplication: activityID
      })
    const embed = new EmbedBuilder().setDescription(
      'https://discord.gg/' + invite
    )
    if (invite) {
      await interaction.reply({
        embeds: [embed]
      })
    }
  }
}
