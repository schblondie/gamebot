/**
 * @file Usertools Select-Menu interaction
 * @author Felix, Mezo
 * @since 1.0.0
 */

const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
const imp = require('../../context-menus/user/tools')
module.exports = {
  id: 'usertools',

  /**
   * @description Executes when a select menu option with ID "usertools" is clicked.
   * @author Felix, Mezo
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const target = imp.prev.targetMember
    if (interaction.values.includes('user_info')) {
      const activities = []
      let customStatus
      for (const activity of target.presence.activities.values()) {
        switch (activity.type) {
          case 'PLAYING':
            activities.push(`Playing **${activity.name}**`)
            break
          case 'LISTENING':
            if (target.user.bot) {
              activities.push(`Listening to **${activity.name}**`)
            } else {
              activities.push(`Listening to **${activity.details}** by **${activity.state}**`
              )
            }
            break
          case 'WATCHING':
            activities.push(`Watching **${activity.name}**`)
            break
          case 'STREAMING':
            activities.push(`Streaming **${activity.name}**`)
            break
          case 'CUSTOM_STATUS':
            customStatus = activity.state
            break
        }
      }
      const uiembed = new EmbedBuilder()
        .setTitle(`${target.displayName}'s Information`)
        .setAuthor(target.user.tag)
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
        .addFields( 'User', target.user.username, true)
        .addFields('Discriminator', `\`#${target.user.discriminator}\``, true)
        .addFields('ID', `\`${target.user.id}\``, true)
        .addFields('Status', target.presence.status, true)
        .addFields('Bot', `\`${target.user.bot}\``, true)
      // .addField('Color Role', target.roles.color || '`None`', true)
      // .addField('Highest Role', target.roles.highest, true)
        .addFields(
          'Joined server on',
          `\`${moment(target.joinedTimestamp).format('MMM DD YYYY')}\``,
          true
        )
        .addFields( {
          name: 'Joined Discord on',
          value:
          `\`${moment(target.user.createdAt).format('MMM DD YYYY')}\``, inline: true
        })
        .setFooter({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor(target.user.accentColor)
      if (activities.length > 0) {
        uiembed.setDescription(activities.join('\n'))
      }
      if (customStatus) {
        uiembed.spliceFields(0, 0, {
          name: 'Custom Status',
          value: customStatus
        })
      }
      interaction.reply({
        embeds: [uiembed],
        ephemeral: true
      })
    }
    if (interaction.values.includes('user_avatar')) {
      const embed = new EmbedBuilder()
        .setTitle(target.user.username + '#' + target.user.discriminator)
        .setImage(target.avatarURL({ dynamic: true }))
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      })
    }
  }
}
