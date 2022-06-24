/* eslint-disable no-console */
/**
 * @file Main File of the bot, responsible for registering events, commands, interactions etc.
 * @author Felix Limbach
 * @version 1.0.0
 */

// Declare constants which will be used throughout the bot.

const fs = require('fs')
const { Client, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
require('dotenv').config()

/**
 * From v13, specifying the intents is compulsory.
 * @type {Object}
 * @description Main Application Client */
const Discord = require('discord.js')
const client = new Client({
  intents: new Discord.Intents(98303)
})
module.exports = client
// const config = require('./config.json')
// client.config = config
const token = process.env.token
const client_id = process.env.client_id
const test_guild_id = process.env.test_guild_id

/**********************************************************************/
// Below we will be making an event handler!

/**
 * @description All event files of the event handler.
 * @type {String[]}
 */

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'))

// Loop through all files and execute the event when it is actually emmited.
for (const file of eventFiles) {

  const event = require(`./events/${file}`)
  if (event.once) {

    client.once(event.name, (...args) => event.execute(...args, client))

} else {

    client.on(
      event.name,
      async (...args) => await event.execute(...args, client)
    )

}

}

/**********************************************************************/
// Define Collection of Commands, Slash Commands and cooldowns

client.commands = new Collection()
client.slashCommands = new Collection()
client.buttonCommands = new Collection()
client.modalCommands = new Collection()
client.selectCommands = new Collection()
client.contextCommands = new Collection()
client.cooldowns = new Collection()
client.triggers = new Collection()

/**********************************************************************/
// Registration of Message-Based Commands

/**
 * @type {String[]}
 * @description All command categories aka folders.
 */

const commandFolders = fs.readdirSync('./commands')

// Loop through all files and store commands in commands collection.

for (const folder of commandFolders) {

  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {

    const command = require(`./commands/${folder}/${file}`)
    client.commands.set(command.name, command)

}

}

/**********************************************************************/
// Registration of Slash-Command Interactions.

/**
 * @type {String[]}
 * @description All slash commands.
 */

const slashCommands = fs.readdirSync('./interactions/slash')

// Loop through all files and store slash-commands in slashCommands collection.

for (const module of slashCommands) {

  const commandFiles = fs
    .readdirSync(`./interactions/slash/${module}`)
    .filter((file) => file.endsWith('.js'))

  for (const commandFile of commandFiles) {

    const command = require(`./interactions/slash/${module}/${commandFile}`)
    client.slashCommands.set(command.data.name, command)

}

}

/**********************************************************************/
// Registration of Context-Menu Interactions

/**
 * @type {String[]}
 * @description All Context Menu commands.
 */

const contextMenus = fs.readdirSync('./interactions/context-menus')

// Loop through all files and store slash-commands in slashCommands collection.

for (const folder of contextMenus) {

  const files = fs
    .readdirSync(`./interactions/context-menus/${folder}`)
    .filter((file) => file.endsWith('.js'))
  for (const file of files) {

    const menu = require(`./interactions/context-menus/${folder}/${file}`)
    const keyName = `${folder.toUpperCase()} ${menu.data.name}`
    client.contextCommands.set(keyName, menu)

}

}

/**********************************************************************/
// Registration of Button-Command Interactions.

/**
 * @type {String[]}
 * @description All button commands.
 */

const buttonCommands = fs.readdirSync('./interactions/buttons')

// Loop through all files and store button-commands in buttonCommands collection.

for (const module of buttonCommands) {

  const commandFiles = fs
    .readdirSync(`./interactions/buttons/${module}`)
    .filter((file) => file.endsWith('.js'))

  for (const commandFile of commandFiles) {

    const command = require(`./interactions/buttons/${module}/${commandFile}`)
    client.buttonCommands.set(command.id, command)

}

}
const modalCommands = fs.readdirSync('./interactions/modals')

// Loop through all files and store modal-commands in ModalCommands collection.
for (const module of modalCommands) {

  const commandFiles = fs
    .readdirSync(`./interactions/modals/${module}`)
    .filter((file) => file.endsWith('.js'))

  for (const commandFile of commandFiles) {

    const command = require(`./interactions/modals/${module}/${commandFile}`)
    client.modalCommands.set(command.id, command)

}

}
/**********************************************************************/
// Registration of select-menus Interactions

/**
 * @type {String[]}
 * @description All Select Menu commands.
 */

const selectMenus = fs.readdirSync('./interactions/select-menus')

// Loop through all files and store select-menus in slashCommands collection.

for (const module of selectMenus) {

  const commandFiles = fs
    .readdirSync(`./interactions/select-menus/${module}`)
    .filter((file) => file.endsWith('.js'))
  for (const commandFile of commandFiles) {

    const command = require(`./interactions/select-menus/${module}/${commandFile}`)
    client.selectCommands.set(command.id, command)

}

}

/**********************************************************************/
// Registration of Slash-Commands in Discord API

const rest = new REST({ version: '9' }).setToken(token)

const commandJsonData = [
  ...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
  ...Array.from(client.contextCommands.values()).map((c) => c.data)
]

;(async () => {

  try {

    console.log('Started refreshing application (/) commands.')

    await rest.put(
      Routes.applicationGuildCommands(client_id, test_guild_id),
      { body: commandJsonData }
    )

    console.log('Successfully reloaded application (/) commands.')

} catch (error) {

    console.error(error)

}

})()

/**********************************************************************/
// Registration of Message Based Chat Triggers

/**
 * @type {String[]}
 * @description All trigger categories aka folders.
 */

const triggerFolders = fs.readdirSync('./triggers')

// Loop through all files and store commands in commands collection.

for (const folder of triggerFolders) {

  const triggerFiles = fs
    .readdirSync(`./triggers/${folder}`)
    .filter((file) => file.endsWith('.js'))
  for (const file of triggerFiles) {

    const trigger = require(`./triggers/${folder}/${file}`)
    client.triggers.set(trigger.name, trigger)

}

}

// Login into your client application with bot's token.
module.exports = {
  client
}
client.login(token)

// Login to firebase
// const { initializeApp } = require('firebase/app');
// const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
// };
// const app = initializeApp(firebaseConfig);
// const database = getFirestore(app);

// database.ref('customPath').set(obj, function (error) {
//   if (error) {
//     // The write failed...
//     console.log('Failed with error: ' + error);
//   } else {
//     // The write was successful...
//     console.log('success');
//   }
// });
