/**
 * @file Ready Event File.
 * @author Felix
 * @since 1.0.0
 */
// const client = require('../bot.js')
// const Dashboard = require('../dashboard/dashboard')
// const dashboard = new Dashboard(client, {
//     port: 4000,
//     clientSecret: process.env.clientSecret,
//     redirectURI: 'http://localhost:4000/auth/discord/callback',
// })
module.exports = {
  name: 'ready',
  once: true,

  /**
   * @description Executes the block of code when client is ready (bot initialization)
   * @param {Object} client Main Application Client
   */

  execute (client) {
    // eslint-disable-next-line no-console
    console.log(`Ready! Logged in as ${client.user.tag}`)
    client.user.setPresence({
      activities: [{ name: '/activity', type: 'PLAYING' }],
    })
    // dashboard.run()
  },
}
