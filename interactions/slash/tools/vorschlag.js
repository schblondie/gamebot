const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder
} = require('discord.js')
module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('vorschlag')
    .setDescription('Placeholder'),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix, Mezo
   * @param {*} interaction The interaction object of the command.
   */

  async execute (interaction) {
    if (
      interaction.member.roles.cache.some((role) => role.name === 'Technikchef')
    ) {
      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Vorschlag')
          .setCustomId('vorschlag_normal')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setLabel('Anonym')
          .setCustomId('vorschlag_anonym')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setLabel('Event')
          .setCustomId('vorschlag_event')
          .setStyle(ButtonStyle.Secondary)
      )
      interaction.channel.send({
        content: 'Drücke hier um einen Vorschlag einzureichen',
        components: [row1]
      })
    } else {
      return interaction.reply({
        content: 'No permissions',
        ephemeral: true
      })
    }
  }
}
