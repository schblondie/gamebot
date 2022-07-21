/**
* @file Button interaction: configempfangsteamrollenremove
* @author Felix
* @since 1.0.0
*/
const { getDatabase, onValue, ref, get, remove } = require('firebase/database')
const { EmbedBuilder } = require('discord.js')
const prev = require('./configempfangsteamrollen')
module.exports = {
  id: 'configempfangsteamrollenremove',
  /**
  * @description Executes when the button with ID configempfangsteamrollenremove is called.
  * @author Felix
  * @param {Object} interaction The Interaction Object of the command.
  */
  async execute(interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    function collect() {
      const msgFilter = (m) => m.author.id === interaction.member.id
      const msg = interaction.channel.awaitMessages({ filter: msgFilter, max: 1 })
      return msg
    }
    interaction.reply({
      content: 'Bitte erwähne die Rolle, die entfernt werden soll.',
      ephemeral: true
    })
    await collect().then(async (m) => {
      const role = m.first().content.slice(3).slice(0, -1)
      const roleId = interaction.guild.roles.cache.get(role)
      if (roleId === undefined) {
        interaction.editReply({
          content: 'Diese Rolle existiert nicht.',
        })
      } else {
        const roles = JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/roles')))
        if (roles.includes(roleId.id)) {
          await remove(ref(db, id + '/einwohnermeldeamt/config/roles/' + roleId.id))
          interaction.editReply({
            content: 'Rolle entfernt.',
          })
        } else {
          interaction.editReply({
            content: 'Diese Rolle ist nicht in der Liste.',
          })
        }
      }
      m.first().delete()
      const roleEmbed = new EmbedBuilder()
        .setTitle('Role config')
      const roles = ref(db, id + '/einwohnermeldeamt/config/roles')
      onValue(roles, async (snapshot) => {
        const roles = snapshot.val()
        for (let i = 0; i < Object.keys(roles).length; i++) {
          const role = ref(db, id + '/einwohnermeldeamt/config/roles/' + Object.keys(roles)[i])
          onValue(role, async (snapshot) => {
            const o = snapshot.val()
            const r = interaction.guild.roles.cache.get(Object.values(o)[0])
            roleEmbed.addFields(
              { name: r.name, value: `Custom Nachricht:\n${Object.values(o)[1]}` }
            )
          })
        }
      })
    })
  }
}
