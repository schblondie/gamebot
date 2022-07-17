/**
* @file Select menu interaction: configanonym
* @author Felix
* @since 1.0.0
*/
const { set, ref, get, getDatabase } = require('firebase/database')
const prev = require('./config')
const { MessageEmbed } = require('discord.js')
module.exports = {
  id: 'configanonym',
  /**
* @description Executes when the select menu with ID configanonym is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const db = getDatabase()
    const id = interaction.guild.id
    function collect () {
      const msgFilter = (m) => m.author.id === interaction.member.id
      const msg = interaction.channel.awaitMessages({ filter: msgFilter, max: 1 })
      return msg
    }
    prev.prev.interaction.editReply({
      components: [prev.prev.configRow]
    })
    if (interaction.values.includes('enabled')) {
      const enabled = JSON.stringify(await get(ref(db, id + '/anonym/config/enabled'))).slice(1).slice(0, -1)
      if (enabled === 'false') {
        await set(ref(db, id + '/anonym/config/enabled'), 'true')
        interaction.reply({ content: 'Module enabled.', ephemeral: true })
      } else {
        await set(ref(db, id + '/anonym/config/enabled'), 'false')
        interaction.reply({ content: 'Module disabled.', ephemeral: true })
      }
    }
    if (interaction.values.includes('adminrole')) {
      interaction.reply({
        content: 'Please mention the admin role where the second half of a user ID will be send to.',
        ephemeral: true
      })
      await collect().then(async (m) => {
        await set(ref(db, id + '/anonym/config/adminRole'), m.first().content.slice(2).slice(0, -1))
        const adminRole = interaction.guild.roles.cache.get(`${JSON.stringify(await get(ref(db, id + '/anonym/config/adminRole'))).slice(2).slice(0, -1)}`)
        interaction.editReply({ content: `IDs will be sent to ${adminRole}` })
        m.first().delete()
      })
    }
    //* ###########################################
    let enabled = JSON.stringify(await get(ref(db, id + '/anonym/config/enabled'))).slice(1).slice(0, -1)
    if (enabled === 'ul') {
      await set(ref(db, id + '/anonym/config/enabled'), 'false')
      enabled = 'false'
    }
    const adminRole = interaction.guild.roles.cache.get(`${JSON.stringify(await get(ref(db, id + '/anonym/config/adminRole'))).slice(2).slice(0, -1)}`)
    // ###########################################
    const anonymEmbed = new MessageEmbed()
      .setTitle('Einwohnermeldeamt Einstellungen')
      .addFields(
        { name: 'Modul aktiviert', value: enabled },
        { name: 'Admin Rolle', value: String(adminRole) }
      )
    //! ###########################################
    prev.prev.interaction.editReply({ embeds: [anonymEmbed] })
  }
}
