/**
 * @file Button interaction: configempfangsteamrollenadd
 * @since 1.0.0
*/
const { getDatabase, set, ref, onValue } = require('firebase/database')
const { EmbedBuilder } = require('discord.js')
const prev = require('./configempfangsteamrollen')
module.exports = {
  id: 'configempfangsteamrollenadd',
  /**
  * @description Executes when the button with ID configempfangsteamrollenadd is called.

  * @param {Object} interaction The Interaction Object of the command.
  */
  async execute (interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    const roles = ref(db, id + '/einwohnermeldeamt/config/roles')
    function collect () {
      const msgFilter = (m) => m.author.id === interaction.member.id
      const msg = interaction.channel.awaitMessages({ filter: msgFilter, max: 1 })
      return msg
    }
    interaction.reply({
      content: 'Bitte erwähne die Rolle, die hinzugefügt werden soll.',
      ephemeral: true
    })
    await collect().then(async (m) => {
      const role = m.first().content.slice(3).slice(0, -1)
      const roleId = interaction.guild.roles.cache.get(role)
      if (roleId === undefined) {
        interaction.editReply({
          content: 'Diese Rolle existiert nicht.',
          ephemeral: true
        })
      } else {
        try {
          for (let i = 0; i < roles.length; i++) {
            const role = interaction.guild.roles.cache.get(roles[i])
            if (role.id === roleId.id) {
              interaction.editReply({
                content: 'Diese Rolle ist bereits in der Liste.',
                ephemeral: true
              })
              return
            }
          }
        } catch (e) {
          interaction.editReply({
            content: 'There was an error.',
            ephemeral: true
          })
        } finally {
          set(ref(db, id + '/einwohnermeldeamt/config/roles/' + roleId.id + '/ID'), roleId.id)
          interaction.editReply({
            content: 'Rolle hinzugefügt.',
            ephemeral: true
          })
        }
        const roleEmbed = new EmbedBuilder().setTitle('Role config')
        const unsubRoles = onValue(roles, async (snapshot) => {
          const roles = await snapshot.val()
          try {
            for (let i = 0; i < Object.keys(roles).length; i++) {
              const role = ref(
                db,
                id + '/einwohnermeldeamt/config/roles/' + Object.keys(roles)[i]
              )
              const unsubRole = onValue(role, async (snapshot) => {
                const r = interaction.guild.roles.cache.get(Object.values(snapshot.val())[0])
                await roleEmbed.addFields({
                  name: r.name,
                  value: `Custom Nachricht:\n${Object.values(snapshot.val())[1]}`
                })
                unsubRole()
              })
            }
          } catch (e) {
            roleEmbed.addFields({ name: 'None', value: 'None' })
          }

          try {
            await prev.prevCER.editReply({ embeds: [roleEmbed] })
            await m.first().delete()
          } catch (e) {
            console.log(e)
          }
          unsubRoles()
        })
      }
    })
  }
}
