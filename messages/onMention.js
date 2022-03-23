/**
 * @file Default Bot Mention Command
 * @author Felix
 * @since 1.0.0
 */

const { prefix } = require("../config.json");

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Felix
	 * @param {Object} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`Hi ${message.author}! Bitte benutze Slash Commands oder Apps!`
		);
	},
};
