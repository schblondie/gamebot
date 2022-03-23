/**
 * @file Usertools Select-Menu interaction
 * @author Felix
 * @since 1.0.0
 */

const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js')
const moment = require('moment')
const imp = require('../../buttons/tools/empfangtools')
module.exports = {
  id: 'empfangselect',

  /**
   * @description Executes when a select menu option with ID "empfangselectmenu" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute(interaction, client) {
    const target = imp.prev.targetMember
    const prev = imp.prev
    const empfangslog = prev.member.guild.channels.cache.find((channel) => channel.name === 'e-log') || prev.member.guild.channels.cache.get('265121467421818881')
    if (interaction.values.includes('probemitglieder')) {
      var role = prev.member.guild.roles.cache.find((role) => role.name === 'Probemitglieder')
      if (target.roles.cache.some((role) => role.name === 'Probemitglieder')) {
        target.roles.remove(role)
        interaction.reply({
          content: '`Probemitglieder` entfernt',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Probemitglieder\` entfernt`,
        })
      } else {
        target.roles.add(role)
        interaction.reply({
          content: '`Probemitglieder` hinzugefügt',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Probemitglieder\` hinzugefügt`,
        })
      }
    }
    if (interaction.values.includes('mitglieder')) {
      var role = prev.member.guild.roles.cache.find((role) => role.name === 'Mitglieder')
      var role2 = prev.member.guild.roles.cache.find((role) => role.name === 'Probemitglieder')
      if (target.roles.cache.some((role) => role.name === 'Mitglieder')) {
        target.roles.remove(role)
        target.roles.remove(role2)
        interaction.reply({
          content: '`Probemitglieder & Mitglieder` entfernt',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Probemitglieder & Mitglieder\` entfernt`,
        })
      } else {
        target.roles.add(role)
        target.roles.add(role2)
        interaction.reply({
          content: '`Probemitglieder & Mitglieder` hinzugefügt',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Probemitglieder & Mitglieder\` hinzugefügt`,
        })
      }
    }
    if (interaction.values.includes('ve2')) {
      const ve2log = prev.member.guild.channels.cache.find((channel) => channel.name === 've2-log') || prev.member.guild.channels.cache.get('927308551569932289')
      var role = prev.member.guild.roles.cache.find((role) => role.name === 'Verifizierungsebene 2')
      if (target.roles.cache.some((role) => role.name === 'Verifizierungsebene 2')) {
        target.roles.remove(role)
        interaction.reply({
          content: '`Verifizierungsebene 2` entfernt',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` entfernt`,
        })
      } else {
        target.roles.add(role)
        interaction.reply({
          content: '`Verifizierungsebene 2` hinzugefügt\n\nBitte denke daran in ' + ve2log.toString() + ' zu dokumentieren!',
          ephemeral: true,
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` hinzugefügt`,
        })
        const fetch = await interaction.channel.messages.fetch({ limit: 10 })
        var fetchfiltered = fetch.filter(function (list) {
          return list.author.id === target.id
        })
        var lastmsgs = fetchfiltered.map(function (list) {
          return list.content
        })
        var lastmsgs = lastmsgs.reverse()
        const embed = new MessageEmbed()
          .setAuthor(target.displayName + `'s letzte Nachrichten`, target.displayAvatarURL({ dynamic: true }))
          .setDescription(lastmsgs.join(`\n\n`))
          .setFooter(interaction.member.displayName, interaction.member.displayAvatarURL({ dynamic: true }))
        ve2log.send({
          content: target.toString(),
          embeds: [embed],
        })
        const wartezimmer = prev.member.guild.channels.cache.find((channel) => channel.name === 'wartezimmer') || prev.member.guild.channels.cache.get('897164924994854992')
        const ServerIcon2021 = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'ServerIcon2021')
        const QCocktail = interaction.guild.emojis.cache.find((emoji) => emoji.name === 'QCocktail')
        target.user.send({
          content: `**Hallo ${target.user} wie du vielleicht mitbekommen hast, ist der Vorstellungsprozess noch nicht ganz beendet.**

					Wir laden dich hiermit herzlich zu einem Gespräch mit dem Supportteam ein. Damit wir einen gemeinsamen Termin finden, bitten wir dich um ein paar Terminvorschläge.
					Du kannst die Terminvorschläge einfach in ${wartezimmer.toString()} senden.

					Sobald wir einen passenden Termin gefunden haben werden wir uns bei dir erneut melden.

					Liebe Grüße
					Dein QueerCity Serverteam ${ServerIcon2021} ${QCocktail}`,
        })
      }
    }
  },
}
