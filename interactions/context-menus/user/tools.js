const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require('discord.js')
module.exports = {
  data: {
    name: 'Tools',
    type: 2, // 2 is for user context menus
  },

  /**
   * @description Executes when the context option with name "Tools" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const row1 = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('usertools')
        .setPlaceholder('Nothing selected')
        .addOptions([
          {
            label: 'User avatar',
            description: 'This is a description',
            value: 'user_avatar',
          },
          {
            label: 'User Info',
            description: 'This is also a description',
            value: 'user_info',
          },
          {
            label: 'Ban user',
            description: 'This is also a description',
            value: 'troll',
          },
        ])
    )
    const row2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Empfang')
        .setCustomId('empfangtools')
        .setStyle('PRIMARY')
    )
    const row3 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Dev')
        .setCustomId('devtools')
        .setStyle('PRIMARY')
    )
    const addthis = []
    addthis.push(row1)
    if (
      interaction.member.roles.cache.some(
        (role) => role.name === 'Einwohnermeldeamt'
      ) ||
      interaction.member.roles.cache.some(
        (role) => role.name === 'Stadtsekräter:in'
      )
    ) {
      addthis.push(row2)
    }
    if (
      interaction.member.roles.cache.some((role) => role.name === 'Technikchef')
    ) {
      addthis.push(row3)
    }
    await interaction.reply({
      content: `${interaction.targetMember.user}'s user tools`,
      components: addthis,
      ephemeral: true,
    })
    const prev = interaction
    module.exports.prev = prev
  },
}
