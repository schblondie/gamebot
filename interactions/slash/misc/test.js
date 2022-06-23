const { SlashCommandBuilder } = require('@discordjs/builders');
/**
 * @file Slash interaction: test
 * @author Felix
 * @since 1.0.0
 */
module.exports = {
  data: new SlashCommandBuilder().setName('test').setDescription('Test forum channel'),
  // .addSubcommand((subcommand) => subcommand.setName().setDescription().add...)
  // .addStringOption((option) => option.setName().setDescription().setRequired())
  // .addIntegerOption((option) => option.setName().setDescription().setRequired())
  // .addBooleanption((option) => option.setName().setDescription().setRequired())
  // .addUserOption((option) => option.setName().setDescription().setRequired())
  // .addChannelOption((option) => option.setName().setDescription().setRequired())
  // .addRoleOption((option) => option.setName().setDescription().setRequired())
  // .addMentionableOption((option) => option.setName().setDescription().setRequired())
  // .addNumberOption((option) => option.setName().setDescription().setRequired())
  // .addAttachmentOption((option) => option.setName().setDescription().setRequired())
  /**
   * @description Executes when the slash command with ID test is called.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */
  async execute(interaction) {
    interaction.guild.channels.create('new-voice', {
      type: '15',
    });
  },
};
