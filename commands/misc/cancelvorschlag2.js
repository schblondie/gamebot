/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 */
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	name: "cancelvorschlag",

	/** You need to uncomment below properties if you need them. */
	//description: 'Ping!',
	//usage: 'put usage here',
	//permissions: 'SEND_MESSAGES',
	//guildOnly: true,

	/**
	 * @description Executes when the command is called by command handler.
	 * @author Naman Vrati
	 * @param {Object} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	execute: async (message, args) => {
		message.delete()
		const row1 = new MessageActionRow()
            .addComponents(
				new MessageButton()
				.setLabel("Vorschlag")
				.setCustomId('vorschlag')
				.setStyle("PRIMARY"),
                new MessageButton()
                .setLabel("Anonym")
                .setCustomId('anonym')
                .setStyle("SECONDARY")
            )
			const fetch = await message.channel.messages.fetch({ limit: 10});
			var fetchfiltered = fetch.filter(function (list) {
				return list.content == "Drücke hier um einen Vorschlag einzureichen"
			})
			var id = fetchfiltered.map(function (list){
				return list.id
			})
			const delthis= message.channel.messages.fetch(id.toString()).then((message) => {
				message.delete()
			})
            message.channel.send({
                content: "Drücke hier um einen Vorschlag einzureichen",
                components: [row1],
            })
	},
};
