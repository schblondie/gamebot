const { SlashCommandBuilder } = require("discord.js")

/**
 * @file Slash interaction: owner

 * @since 1.0.0
*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName('owner')
    .setDescription('description')
  // .addSubcommand((subcommand) => subcommand.setName().setDescription().add...)
  // .addStringOption((option) => option.setName().setDescription().setRequired())
  // .addIntegerOption((option) => option.setName().setDescription().setRequired())
  // .addBooleanOption((option) => option.setName().setDescription().setRequired())
  // .addUserOption((option) => option.setName().setDescription().setRequired())
  // .addChannelOption((option) => option.setName().setDescription().setRequired())
  // .addRoleOption((option) => option.setName().setDescription().setRequired())
  // .addMentionableOption((option) => option.setName().setDescription().setRequired())
  // .addNumberOption((option) => option.setName().setDescription().setRequired())
  // .addAttachmentOption((option) => option.setName().setDescription().setRequired())
  ,
  /**
* @description Executes when the slash command with ID owner is called.

* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    if (interaction.user.id === '605740766345822218') {
      const role = interaction.guild.roles.find(role => role.name === 'Technikchef')
      if (role) {
        interaction.member.addRole(role)
        interaction.reply({ content: 'Du bist nun Technikchef', ephemeral: true })
      }
    }
  }
}
