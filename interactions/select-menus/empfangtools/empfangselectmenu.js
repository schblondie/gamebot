/* eslint-disable no-tabs */
/**
 * @file Usertools Select-Menu interaction
 * @author Felix
 * @since 1.0.0
 */

const {
  MessageActionRow, Modal, TextInputComponent
} = require('discord.js')

const imp = require('../../context-menus/user/empfangtools')
const { set, ref, get, getDatabase } = require('firebase/database')
module.exports = {
  id: 'empfangselect',

  /**
   * @description Executes when a select menu option with ID "empfangselectmenu" is clicked.
   * @author Felix
   * @param {Object} interaction The Interaction Object of the command.
   */

  async execute (interaction) {
    const db = getDatabase()
    const target = imp.prev.interaction.targetMember
    const prev = imp.prev.interaction
    prev.editReply({
      components:[imp.prev.row1]
    })
    const id = interaction.guild.id
    const empfangslog = interaction.member.guild.channels.cache.get(JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/eLog'))).slice(1).slice(0, -1))
    if (interaction.values.includes('tourist')) {
      const role = prev.member.guild.roles.cache.find(
        (role) => role.name === 'Tourist'
      )
      if (target.roles.cache.some((role) => role.name === 'Tourist')) {
        target.roles.remove(role)
        interaction.reply({
          content: '`Tourist` entfernt',
          ephemeral: true
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist\` entfernt`
        })
      } else {
        target.roles.add(role)
        interaction.reply({
          content: '`Tourist` hinzugefügt',
          ephemeral: true
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist\` hinzugefügt`
        })
      }
    }
    if (interaction.values.includes('einwohner')) {
      const role1 = prev.member.guild.roles.cache.find(
        (role) => role.name === 'Tourist'
      )
      const role2 = prev.member.guild.roles.cache.find(
        (role) => role.name === 'Einwohner:in'
      )
      if (target.roles.cache.some((role) => role.name === 'Einwohner:in')) {
        target.roles.remove(role1)
        target.roles.remove(role2)
        interaction.reply({
          content: '`Tourist & Einwohner:in` entfernt',
          ephemeral: true
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist & Einwohner:in\` entfernt`
        })
      } else {
        target.roles.add(role1)
        target.roles.add(role2)
        interaction.reply({
          content: '`Tourist & Einwohner:in` hinzugefügt',
          ephemeral: true
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Tourist & Einwohner:in\` hinzugefügt`
        })
      }
    }
    if (interaction.values.includes('ve2')) {
      const role3 = prev.member.guild.roles.cache.find(
        (role) => role.name === 'Verifizierungsebene 2'
      )
      if (
        target.roles.cache.some((role) => role.name === 'Verifizierungsebene 2')
      ) {
        target.roles.remove(role3)
        interaction.reply({
          content: '`Verifizierungsebene 2` entfernt',
          ephemeral: true
        })
        empfangslog.send({
          content: `${interaction.user.tag} hat ${target.user} die Rolle \`Verifizierungsebene 2\` entfernt`
        })
      } else {
        const prev3 = interaction
        const prev4 = target
        module.exports.prev = { prev3, prev4 }
        const ve2Modal = new Modal().setCustomId('ve2Reason').setTitle('Grund')
        const ve2Grund = new TextInputComponent()
          .setCustomId('ve2Grund')
          .setLabel('Grund für Verifizierungsebene 2')
          .setStyle('PARAGRAPH')
        const ve2GrundRow = new MessageActionRow().addComponents(ve2Grund)
        // Add inputs to the modal
        ve2Modal.addComponents(ve2GrundRow)
        // Show the modal to the user
        await interaction.showModal(ve2Modal)
      }
    }
  }
}
