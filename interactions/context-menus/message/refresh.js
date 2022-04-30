// const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
// module.exports = {
//   data: {
//     name: 'Refresh Story',
//     type: 3, // 3 is for message context menus
//   },

//   /**
//    * @description Executes when the context option with name "Delete Message" is clicked.
//    * @author Felix
//    * @param {Object} interaction The Interaction Object of the command.
//    */

//   async execute(interaction, client) {
//     if (interaction.member.roles.cache.some((role) => role.name === 'Developer')) {
//       const row = new MessageActionRow().addComponents(new MessageButton().setLabel('Satz hinzufügen').setCustomId('story').setStyle('PRIMARY'))
//       interaction.targetMessage.edit({
//         components: [row],
//       })
//       interaction.reply({
//         content: 'Done',
//         ephemeral: true,
//       })
//     } else {
//       return interaction.reply({
//         content: 'No permissions',
//         ephemeral: true,
//       })
//     }
//   },
// }
