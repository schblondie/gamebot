const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder().setName('vorschlag').setDescription('Placeholder'),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    if (interaction.member.roles.cache.some((role) => role.name === 'Developer')) {
      const row1 = new MessageActionRow().addComponents(
        new MessageButton().setLabel('Vorschlag').setCustomId('vorschlag').setStyle('PRIMARY'),
        new MessageButton().setLabel('Anonym').setCustomId('anonym').setStyle('SECONDARY'),
        new MessageButton().setLabel('Event').setCustomId('event').setStyle('SECONDARY'),
      )
      interaction.channel.send({
        content: 'Drücke hier um einen Vorschlag einzureichen',
        components: [row1],
      })
    } else {
      return interaction.reply({
        content: 'No permissions',
        ephemeral: true,
      })
    }
  },
}
