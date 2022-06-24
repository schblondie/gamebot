/**
 * @file Sample button interaction
 * @author Felix
 * @since 1.0.0
 */
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Interaction,
} = require('discord.js')
const imp = require('../../buttons/beichte/anonymantworten.js')
module.exports = {
    id: 'anonym_antworten',

    /**
     * @description Executes when the modal with ID "anonym_antworten" is called.
     * @author Felix
     * @param {Object} interaction The Interaction Object of the command.
     */

    async execute(interaction, client) {
        const botlog =
            interaction.guild.channels.cache.find(
                (channel) => channel.name === 'e-log'
            ) || interaction.guild.channels.cache.get('982358868095021106')
        imp.prev.channel
            .send({ content: interaction.fields.getTextInputValue('text') })
            .then(function (message) {
                console.log(message)
                botlog.send({
                    content: `**Message ID:** ${message.id}\n**Member ID:** ${interaction.member.id}`,
                })
            })
        interaction.reply({
            content:
                '**Antwort eingereicht!**\nDu kannst diese Nachricht jetzt verwerfen',
            ephemeral: true,
        })
    },
}
