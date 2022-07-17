/**
* @file Context menu (type:type) interaction: Get User
* @author Felix
* @since 1.0.0
*/
const { ref, get, getDatabase } = require('firebase/database')
module.exports = {
  data: {
    name: 'Get User',
    type: 3
    // 2 is for user context menus
    // 3 is for message context menus
  },
  /**
* @description Executes when the context menu with ID Get User is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    const msgid = JSON.stringify(await get(ref(db, id + '/anonym/messages/' + interaction.targetMessage.id))).slice(1).slice(0, -1)
    const adminRole = interaction.guild.roles.cache.get(`${JSON.stringify(await get(ref(db, id + '/anonym/config/adminRole'))).slice(2).slice(0, -1)}`)
    let admin = adminRole.members.random()
    while (admin !== interaction.member) {
      admin = adminRole.members.random()
    }
    interaction.reply({ content: `Dein Teil lautet:\n${msgid.slice(0, Math.floor(msgid.length / 2))}\n\nBitte warte bis dir der zweite Teil der ID mitgeteilt wird`, ephemeral: true })
    admin.send({ content: `${interaction.user} möchte die User ID von folgender Nachricht erhalten:\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.targetId}}\n\nDein Teil lautet:\n${msgid.slice(Math.floor(msgid.length / 2), msgid.length)}`, ephemeral: true })
  }
}
