const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('pmg')
    .setDescription('Placeholder')
    .addUserOption((option) => option.setName('user').setDescription('Placeholder').setRequired(true)),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    let member = interaction.options.getUser('user');
    const target = interaction.guild.members.cache.get(member.id);
    if (
      interaction.member.roles.cache.some((role) => role.name === 'Einwohnermeldeamt') ||
      interaction.member.roles.cache.some((role) => role.name === 'Stadtsekräter:in')
    ) {
      const row1 = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('empfangselect2')
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Tourist',
              value: 'tourist',
            },
            {
              label: 'Einwohner:in',
              description: 'Ändert auch Tourist',
              value: 'einwohner',
            },
            {
              label: 'Verifizierungsebene',
              value: 've2',
            },
          ]),
      );
      addthis = [];
      if (target.roles.cache.some((role) => role.name === 'Tourist')) {
        addthis.push('Tourist');
      }
      if (target.roles.cache.some((role) => role.name === 'Einwohner:in')) {
        addthis.push('Einwohner:in');
      }
      if (target.roles.cache.some((role) => role.name === 'Verifizierungsebene 2')) {
        addthis.push('Verifizierungsebene 2');
      }
      await interaction.reply({
        content: `**${target.user.tag}** hat folgende Rollen: \n\`${addthis.join(
          ' | ',
        )}\`\n\nWähle eine Rolle aus um sie zu ändern:`,
        components: [row1],
        ephemeral: true,
      });
      const prev = interaction;
      module.exports.prev = prev;
    } else {
      return interaction.reply({
        content: 'No permissions',
        ephemeral: true,
      });
    }
  },
};
