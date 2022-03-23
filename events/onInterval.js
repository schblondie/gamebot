/**
 * @file Ready Event File.
 * @author Felix
 * @since 1.0.0
 */

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {Object} client Main Application Client
	 */
	execute(client) {
		// console.log(`Ready! Logged in as ${client.user.tag}`);
		// client.user.setPresence({ activities: [{ name: '/activity', type: "PLAYING" }] });
	},
};
