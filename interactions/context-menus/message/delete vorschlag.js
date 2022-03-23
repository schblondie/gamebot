const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = {
	data: {
		name: "Vorschlag löschen",
		type: 3, // 3 is for message context menus
	},

	/**
	 * @description Executes when the context option with name "Vorschlag löschen" is clicked.
	 * @author Felix
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction, client) {
        if (interaction.member.roles.cache.some(role => role.name === "Developer") || interaction.member.roles.cache.some(role => role.name === "Mädchen für Alles")) {
            for(var i = 0; i < interaction.targetMessage.embeds.length; i++) {
                const thread = interaction.channel.threads.cache.find(x => x.name === interaction.targetMessage.embeds[i].title);
                await thread.delete();
            }
            interaction.targetMessage.delete()
            interaction.reply({
                content: "Done",
                ephemeral: true
            })
            var api = "b7af176c29b971b2cf562f52701857c4"
            var token = "7d7a789207289c66adcb02407cb42c8a8608e0a3f8c5e8f5b194afb5c2f65b7a"
            var Trello = require('trello-node-api')(api, token);
            
        }
        else{
            return(interaction.reply({
                content: "No permissions",
                ephemeral: true
            }))
        }
    },
};
