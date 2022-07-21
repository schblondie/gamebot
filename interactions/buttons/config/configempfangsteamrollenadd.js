/**
* @file Button interaction: configempfangsteamrollenadd
* @author Felix
* @since 1.0.0
*/
const { getDatabase, set, ref, get } = require('firebase/database')
const { EmbedBuilder } = require('discord.js')
const prev = require('./configempfangsteamrollen')
module.exports = {
  id: 'configempfangsteamrollenadd',
  /**
  * @description Executes when the button with ID configempfangsteamrollenadd is called.
  * @author Felix
  * @param {Object} interaction The Interaction Object of the command.
  */
  async execute(interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    const roles = ref(db, id + '/einwohnermeldeamt/config/roles')
    function collect() {
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
            console.log(role)
            if (role.id === roleId.id) {
              interaction.editReply({
                content: 'Diese Rolle ist bereits in der Liste.',
                ephemeral: true
              })
              return
            }
          }
        } catch (e) {
          await set(ref(db, id + '/einwohnermeldeamt/config/roles/' + roleId.id + '/ID'), roleId.id)
          interaction.editReply({
            content: 'Rolle hinzugefügt.',
            ephemeral: true
          })
        }
      }
      m.first().delete()
      const roleEmbed = new EmbedBuilder()
        .setTitle('Role config')

      try {
        for (let i = 0; i < roles.length; i++) {
          const role = interaction.guild.roles.cache.get(roles[i])
          roleEmbed.addFields(
            { name: role.name, value: `[${role.id}](https://discord.com/config/${role.guild.id}/${role.id})` }
          )
        }
      } catch (e) {
        roleEmbed.addFields(
          { name: 'Keine Rolle gefunden', value: 'Keine Rolle gefunden' }
        )
      }
    })
    console.log(prev.prevCER)
  }
}
