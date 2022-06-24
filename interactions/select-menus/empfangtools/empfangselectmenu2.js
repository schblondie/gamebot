/* eslint-disable no-tabs */
/**
 * @file Usertools Select-Menu interaction
 * @author Felix
 * @since 1.0.0
 */

const {
    MessageEmbed
} = require('discord.js')
const imp = require('../../slash/tools/pmg')
module.exports = {
    id: 'empfangselect2',

    /**
   * @description Executes when a select menu option with ID "empfangselectmenu2" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

    async execute (interaction) {

        const member = imp.prev.options.getUser('user')
        const prev = imp.prev
        const target = interaction.guild.members.cache.get(member.id)
        const empfangslog =
      prev.member.guild.channels.cache.find(
          (channel) => channel.name === 'e-log'
      ) || prev.member.guild.channels.cache.get('982358868095021106')
        if (interaction.values.includes('tourist')) {

            var role = prev.member.guild.roles.cache.find(
                (role) => role.name === 'Tourist'
            )
            if (target.roles.cache.some((role) => role.name === 'Tourist')) {

                target.roles.remove(role)
                interaction.reply({
                    content: '`Tourist` entfernt',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist\` entfernt`
                })

            } else {

                target.roles.add(role)
                interaction.reply({
                    content: '`Tourist` hinzugefügt',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist\` hinzugefügt`
                })

            }

        } else if (interaction.values.includes('einwohner')) {

            var role1 = prev.member.guild.roles.cache.find(
                (role) => role.name === 'Tourist'
            )
            const role2 = prev.member.guild.roles.cache.find(
                (role) => role.name === 'Einwohner:in'
            )
            if (target.roles.cache.some((role) => role.name === 'Einwohner:in')) {

                target.roles.remove(role1)
                target.roles.remove(role2)
                interaction.reply({
                    content: '`Tourist & Einwohner:in` entfernt',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist & Einwohner:in\` entfernt`
                })

            } else {

                target.roles.add(role1)
                target.roles.add(role2)
                interaction.reply({
                    content: '`Tourist & Einwohner:in` hinzugefügt',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist & Einwohner:in\` hinzugefügt`
                })

            }

        } else if (interaction.values.includes('ve2')) {

            const ve2log =
        prev.member.guild.channels.cache.find(
            (channel) => channel.name === 've2-log'
        ) || prev.member.guild.channels.cache.get('927308551569932289')
            var role3 = prev.member.guild.roles.cache.find(
                (role) => role.name === 'Verifizierungsebene 2'
            )
            if (
                target.roles.cache.some((role) => role.name === 'Verifizierungsebene 2')
            ) {

                target.roles.remove(role3)
                interaction.reply({
                    content: '`Verifizierungsebene 2` entfernt',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` entfernt`
                })

            } else {

                target.roles.add(role3)
                interaction.reply({
                    content:
            '`Verifizierungsebene 2` hinzugefügt\n\nBitte denke daran in ' +
            ve2log.toString() +
            ' zu dokumentieren!',
                    ephemeral: true
                })
                empfangslog.send({
                    content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` hinzugefügt`
                })
                const fetch = await interaction.channel.messages.fetch({
                    limit: 10
                })
                const fetchfiltered = fetch.filter(function (list) {

                    return list.author.id === target.id

                })
                var lastmsgs = fetchfiltered.map(function (list) {

                    return list.content

                })
                var lastmsg = lastmsgs.reverse()
                const embed = new MessageEmbed()
                    .setAuthor({name: target.displayName + "'s letzte Nachrichten", iconURL: target.user.displayAvatarURL()})
                    .setDescription(lastmsg.join('\n\n'))
                    .setFooter({name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL()})
                ve2log.send({
                    content: target.toString(),
                    embeds: [embed]
                })
                const wartezimmer =
          prev.member.guild.channels.cache.find(
              (channel) => channel.name === 'wartezimmer'
          ) || prev.member.guild.channels.cache.get('897164924994854992')
                const ServerIcon2021 = interaction.guild.emojis.cache.find(
                    (emoji) => emoji.name === 'ServerIcon2021'
                )
                const QCocktail = interaction.guild.emojis.cache.find(
                    (emoji) => emoji.name === 'QCocktail'
                )
                target.user.send({
                    content: `**Hallo ${
                        target.user
                    } wie du vielleicht mitbekommen hast, ist der Vorstellungsprozess noch nicht ganz beendet.**

					Wir laden dich hiermit herzlich zu einem Gespräch mit dem Supportteam ein. Damit wir einen gemeinsamen Termin finden, bitten wir dich um ein paar Terminvorschläge.
					Du kannst die Terminvorschläge einfach in ${wartezimmer.toString()} senden.

					Sobald wir einen passenden Termin gefunden haben werden wir uns bei dir erneut melden.

					Liebe Grüße
					Dein QueerCity Serverteam ${ServerIcon2021} ${QCocktail}`
                })

            }

        }

    }
}
