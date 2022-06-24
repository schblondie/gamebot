/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require('@discordjs/builders')
const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

module.exports = {
    // The data needed to register slash commands to Discord.
    data: new SlashCommandBuilder()
        .setName('mention')
        .setDescription('Jemanden erwähnen')
        .addUserOption((option) =>
            option.setName('user').setDescription('User').setRequired(true)
        ),
    /**
     * @description Executes when the interaction is called by interaction handler.
     * @author Felix
     * @param {*} interaction The interaction object of the command.
     */

    async execute(interaction) {
        if (
            interaction.member.roles.cache.some(
                (role) => role.name === 'Technikchef'
            ) ||
            interaction.member.roles.cache.some(
                (role) => role.name === 'Stadtsekretär:in'
            )
        ) {
            let member = interaction.options.getUser('user')
            interaction.reply({
                content: member.toString(),
                ephemeral: true,
            })
        } else {
            return interaction.reply({
                content: 'No permissions',
                ephemeral: true,
            })
        }
    },
}
