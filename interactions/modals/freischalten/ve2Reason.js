/**
* @file Modal interaction: ve2Reason
* @author Felix
* @since 1.0.0
*/
const imp = require('../../select-menus/empfangtools/empfangselectmenu')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { ref, get, getDatabase } = require('firebase/database')
module.exports = {
  id: 've2Reason',
  /**
      * @description Executes when the modal with ID ve2Reason is called.
      * @author Felix
      * @param {Object} interaction The Interaction Object of the command.
      */
  async execute (interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    const empfangslog = interaction.member.guild.channels.cache.get(JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/eLog'))).slice(1).slice(0, -1))
    const ve2log = interaction.member.guild.channels.cache.get(JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/ve2Log'))).slice(1).slice(0, -1))
    const role = interaction.member.guild.roles.cache.find(
      (role) => role.name === 'Verifizierungsebene 2'
    )
    const target = imp.prev.prev4
    target.roles.add(role)
    empfangslog.send({
      content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` hinzugefügt`
    })
    const fetch = await interaction.channel.messages.fetch({
      limit: 10
    })
    const fetchfiltered = fetch.filter(function (list) {
      return list.author.id === target.id
    })
    const lastmsgs = fetchfiltered.map(function (list) {
      return list.content
    })
    const lastmsg = lastmsgs.reverse()
    const embed = new EmbedBuilder()
      .setAuthor({ name: target.displayName + "'s letzte Nachrichten", iconURL: target.user.displayAvatarURL() })
      .setDescription(lastmsg.join('\n\n'))
      .setFooter({ text: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
    ve2log.send({
      content: target.toString() + '\n\n' + interaction.fields.getTextInputValue('ve2Grund'),
      embeds: [embed]
    })
    module.exports.prev = target
    const check = JSON.stringify(await get(ref(db, interaction.member.guild.id + '/einwohnermeldeamt/config/VE2MsgEnabled'))).slice(1).slice(0, -1)
    const ve2MsgEmbed = new EmbedBuilder()
      .setDescription(JSON.stringify(await get(ref(db, interaction.member.guild.id + '/einwohnermeldeamt/config/VE2Msg'))).slice(1).slice(0, -1).replaceAll('\\n', '\n') + '\n**Grund:**\n' + interaction.fields.getTextInputValue('ve2Grund'))
    if (check === 'true') {
      try {
        target.user.send({
          content: JSON.stringify(await get(ref(db, interaction.member.guild.id + '/einwohnermeldeamt/config/VE2Msg'))).slice(1).slice(0, -1) + '\n**Grund:**\n' + interaction.fields.getTextInputValue('ve2Grund'),
          embeds: [ve2MsgEmbed]
        })
        interaction.reply({
          content: '`Verifizierungsebene 2` hinzugefügt',
          ephemeral: true
        })
      } catch (e) {
        interaction.reply({
          content: '`Verifizierungsebene 2` hinzugefügt\nUser akzeptiert keine Nachricht',
          ephemeral: true
        })
      }
    } else if (check === 'optional') {
      const optionalRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('sendoptionalve2')
            .setLabel('Senden')
            .setStyle('PRIMARY')
        )
      interaction.reply({
        content: `${'Verifizierungsebene 2'} hinzugefügt\n\n**Möchtest du die VE2-Nachricht an den User senden?**`,
        components: [optionalRow],
        embeds: [ve2MsgEmbed],
        ephemeral: true,
        attachments: []
      })
    }
  }
}
