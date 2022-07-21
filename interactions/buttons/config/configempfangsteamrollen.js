/**
* @file Button interaction: configempfangsteamrollen
* @author Felix
* @since 1.0.0
*/
const { getDatabase, ref, onValue } = require('firebase/database')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
  id: 'configempfangsteamrollen',
  /**
  * @description Executes when the button with ID configempfangsteamrollen is called.
  * @author Felix
  * @param {Object} interaction The Interaction Object of the command.
  */
  async execute(interaction) {
    module.exports.prevCER = 'configempfangsteamrollen'
    const db = getDatabase()
    const id = interaction.guild.id
    const roles = ref(db, id + '/einwohnermeldeamt/config/roles')
    const roleEmbed = new EmbedBuilder()
      .setTitle('Role config')
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
      const addRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('configempfangsteamrollenadd')
            .setLabel('Add Role')
            .setStyle(ButtonStyle.Primary), // Primary, Secondary, Success, Danger, Link
          // .setEmoji('EMOJI') // If you want to use an emoji
          new ButtonBuilder()
            .setCustomId('configempfangsteamrollenremove')
            .setLabel('Remove Role')
            .setStyle(ButtonStyle.Danger) // Primary, Secondary, Success, Danger, Link
          // .setEmoji('EMOJI') // If you want to use an emoji
        )
      await interaction.reply({
        embeds: [roleEmbed],
        components: [addRow],
        ephemeral: true
      })

    })

  },
}
