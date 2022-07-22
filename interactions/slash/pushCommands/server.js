/**
 * @file Slash interaction: label
* @author Felix * @since 1.0.0
*/
const { SlashCommandBuilder, Collection, Client } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
require('dotenv').config()
module.exports = {
  data: new SlashCommandBuilder()
    .setName('global')
    .setDescription('Push command to specific servers.')
    .addIntegerOption((option) =>
      option
        .setName('server')
        .setDescription('Server ID')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('Category')
        .setRequired(true)
        .addChoices(
          { name: 'slash', value: 'slash' },
          { name: 'buttons', value: 'buttons' },
          { name: 'modals', value: 'modals' },
          { name: 'select-menus', value: 'select-menus' },
          { name: 'context-menus', value: 'context-menus' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('module')
        .setDescription('module')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('command')
        .setDescription('command')
        .setRequired(true)
    ),

  /**
* @description Executes when the slash command with ID label is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    const Discord = require('discord.js')
    const client = new Client({
      intents: new Discord.IntentsBitField(1179647)
    })
    client.slashCommands = new Collection()
    client.buttonCommands = new Collection()
    client.modalCommands = new Collection()
    client.selectCommands = new Collection()
    client.contextCommands = new Collection()
    const command = require(`../../../interactions/slash/${interaction.options.getString('module')}/${interaction.options.getString('command')}`)
    if (interaction.options.getString('category') === 'slash') {
      client.slashCommands.set(command.data.name, command)
    } else if (interaction.options.getString('category') === 'buttons') {
      client.buttonCommands.set(command.data.name, command)
    } else if (interaction.options.getString('category') === 'modals') {
      client.modalCommands.set(command.data.name, command)
    } else if (interaction.options.getString('category') === 'select-menus') {
      client.selectCommands.set(command.data.name, command)
    } else if (interaction.options.getString('category') === 'context-menus') {
      client.contextCommands.set(command.data.name, command)
    } else {
      console.log('Error: Category not found!')
    }
    // Registration of Slash-Commands in Discord API

    const rest = new REST({ version: '9' }).setToken(process.env.token)

    const commandJsonData = [
      ...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
      ...Array.from(client.contextCommands.values()).map((c) => c.data)
    ]
    ; (async () => {
      try {
        interaction.deferReply()
        await rest.put(
          Routes.applicationGuildCommands(interaction.client.user.id, interaction.options.getInteger('server')),
          { body: commandJsonData }
        )

        interaction.editReply('Successfully pushed to all servers!')
      } catch (error) {
        interaction.editReply('Error:\n\n' + error)
      }
    })()
  }
}
