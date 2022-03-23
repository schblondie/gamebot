/**
 * @file Sample help command with slash command.
 * @author Felix
 * @since 1.0.0
 */

// Deconstructed the constants we need in this file.
const Levels = require('discord-xp')
require('dotenv').config()
Levels.setURL(process.env.mongo)
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions, MessageEmbed } = require('discord.js')
function delay(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, milisec)
  })
}
module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName('changexp')
    .setDescription('Change VoiceXP XP')
    .addUserOption((option) => option.setName('user').setDescription('Welcher User?').setRequired(true))
    .addStringOption((option) =>
      option.setName('option').setDescription('add/remove/set?').setRequired(true).addChoice('add', 'add').addChoice('remove', 'remove').addChoice('set', 'set'),
    )
    .addNumberOption((option) => option.setName('amount').setDescription('Wie viel').setRequired(true)),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author Felix
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    let run2 = async function () {
      await delay(2000)
      const user2 = await Levels.fetch(target.id, interaction.guild.id)
      const log = interaction.guild.channels.cache.find((channel) => channel.name === 'rank-log') || newstate.guild.channels.cache.get('891799846095319110')
      // 2 5 10 20 30 40 50
      var role2 = interaction.guild.roles.cache.find((role) => role.name === 'Mitglieder (Vc)')
      var role5 = interaction.guild.roles.cache.find((role) => role.name === 'BronzeNewbie (Vc)')
      var role10 = interaction.guild.roles.cache.find((role) => role.name === 'SilverBaby (Vc)')
      var role20 = interaction.guild.roles.cache.find((role) => role.name === 'GoldenDiva (Vc)')
      var role30 = interaction.guild.roles.cache.find((role) => role.name === 'Diamond (Vc)')
      var role40 = interaction.guild.roles.cache.find((role) => role.name === 'Master (Vc)')
      var role50 = interaction.guild.roles.cache.find((role) => role.name === 'Grandmaster (Vc)')

      if (user2.level > 1 && user2.level < 5) {
        if (target.roles.cache.some((r) => r.name === role2.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role2}`)

          target.roles.add(role2)
          target.roles.remove(role5)
          target.roles.remove(role10)
          target.roles.remove(role20)
          target.roles.remove(role30)
          target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 4 && user2.level < 10) {
        if (target.roles.cache.some((r) => r.name === role5.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role5}`)

          target.roles.add(role5)
          //target.roles.remove(role5)
          target.roles.remove(role10)
          target.roles.remove(role20)
          target.roles.remove(role30)
          target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 9 && user2.level < 20) {
        if (target.roles.cache.some((r) => r.name === role10.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role10}`)

          target.roles.add(role10)
          target.roles.remove(role5)
          //target.roles.remove(role10)
          target.roles.remove(role20)
          target.roles.remove(role30)
          target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 19 && user2.level < 30) {
        if (target.roles.cache.some((r) => r.name === role20.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role20}`)

          target.roles.add(role20)
          target.roles.remove(role5)
          target.roles.remove(role10)
          //target.roles.remove(role20)
          target.roles.remove(role30)
          target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 29 && user2.level < 40) {
        if (target.roles.cache.some((r) => r.name === role30.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role30}`)

          target.roles.add(role30)
          target.roles.remove(role5)
          target.roles.remove(role10)
          target.roles.remove(role20)
          //target.roles.remove(role30)
          target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 39 && user2.level < 50) {
        if (target.roles.cache.some((r) => r.name === role40.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role40}`)

          target.roles.add(role40)
          target.roles.remove(role5)
          target.roles.remove(role10)
          target.roles.remove(role20)
          target.roles.remove(role30)
          //target.roles.remove(role40)
          target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      }
      if (user2.level > 49) {
        if (target.roles.cache.some((r) => r.name === role50.toString())) {
          return
        } else {
          const embed = new MessageEmbed().setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!`, member.displayAvatarURL({ dynamic: true })).setDescription(`${role50}`)

          target.roles.add(role50)
          target.roles.remove(role5)
          target.roles.remove(role10)
          target.roles.remove(role20)
          target.roles.remove(role30)
          target.roles.remove(role40)
          //target.roles.remove(role50)
          log.send({
            content: `${target.user}`,
            embeds: [embed],
          })
        }
      } else {
        target.roles.remove(role5)
        target.roles.remove(role10)
        target.roles.remove(role20)
        target.roles.remove(role30)
        target.roles.remove(role40)
        target.roles.remove(role50)
      }
    }
    let member = interaction.options.getUser('user')
    const target = interaction.guild.members.cache.get(member.id)
    let option = interaction.options.getString('option')
    let amount = interaction.options.getNumber('amount')
    let run = async function () {
      var user1 = await Levels.fetch(target.id, interaction.guild.id) // Selects the target from the database.
      if (!user1) {
        Levels.createUser(target.id, interaction.guild.id)
      }
      if (option === 'add') {
        Levels.appendXp(target.id, interaction.guild.id, amount)
        interaction.reply({
          content: `Added ${amount}XP`,
          ephemeral: true,
        })
      }
      if (option === 'remove') {
        if (amount > parseInt(user.xp.toString())) {
          let amount = parseInt(user.xp.toString())
          if (amount === 0) {
            interaction.reply({
              content: `Removed no XP, due to missing XP`,
              ephemeral: true,
            })
          } else {
            Levels.subtractXp(target.id, interaction.guild.id, amount)
            interaction.reply({
              content: `Removed ${amount}XP, due to missing XP`,
              ephemeral: true,
            })
          }
        } else {
          Levels.subtractXp(target.id, interaction.guild.id, amount)
          interaction.reply({
            content: `Removed ${amount}XP`,
            ephemeral: true,
          })
        }
      }
      if (option === 'set') {
        if (amount === 0) {
          Levels.setXp(target.id, interaction.guild.id, 1)
        } else {
          Levels.setXp(target.id, interaction.guild.id, amount)
        }
        interaction.reply({
          content: `Set XP to ${amount}`,
          ephemeral: true,
        })
      }
      run2()
    }
    run()
  },
}
