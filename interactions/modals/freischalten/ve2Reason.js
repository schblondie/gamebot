/**
* @file Modal interaction: ve2Reason
* @author Felix
* @since 1.0.0
*/
const imp = require('../../select-menus/empfangtools/empfangselectmenu')
const { MessageEmbed } = require('discord.js')
module.exports = {
  id: 've2Reason',
  /**
      * @description Executes when the modal with ID ve2Reason is called.
      * @author Felix
      * @param {Object} interaction The Interaction Object of the command.
      */
  async execute (interaction) {
    const empfangslog =
          interaction.member.guild.channels.cache.find(
            (channel) => channel.name === 'e-log'
          ) || interaction.member.guild.channels.cache.get('982358868095021106')
    const ve2log =
          interaction.member.guild.channels.cache.find(
            (channel) => channel.name === 've2-log'
          ) || interaction.member.guild.channels.cache.get('927308551569932289')
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
    const embed = new MessageEmbed()
      .setAuthor({ name: target.displayName + "'s letzte Nachrichten", iconURL: target.user.displayAvatarURL() })
      .setDescription(lastmsg.join('\n\n'))
      .setFooter({ text: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
    ve2log.send({
      content: target.toString() + '\n\n' + interaction.fields.getTextInputValue('ve2Grund'),
      embeds: [embed]
    })
    const wartezimmer =
            interaction.member.guild.channels.cache.find(
              (channel) => channel.name === 'wartezimmer'
            ) || interaction.member.guild.channels.cache.get('897164924994854992')
    const ServerIcon2021 = interaction.guild.emojis.cache.find(
      (emoji) => emoji.name === 'ServerIcon2022'
    )
    const QCocktail = interaction.guild.emojis.cache.find(
      (emoji) => emoji.name === 'QCocktail'
    )
    target.user.send({
      content: `**Hallo ${target.user} wie du vielleicht mitbekommen hast, ist der Vorstellungsprozess noch nicht ganz beendet.**
    Wir laden dich hiermit herzlich zu einem Gespräch mit dem Supportteam ein. 
    Damit wir einen gemeinsamen Termin finden, bitten wir dich um ein paar Terminvorschläge.
    Du kannst die Terminvorschläge einfach in ${wartezimmer.toString()} senden.
    Sobald wir einen passenden Termin gefunden haben werden wir uns bei dir erneut melden.
      
    Liebe Grüße
    Dein QueerCity Serverteam ${ServerIcon2021} ${QCocktail}`
    })
    interaction.reply({
      content: '`Verifizierungsebene 2` hinzugefügt',
      ephemeral: true
    })
  }
}
