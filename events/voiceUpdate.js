const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");
Levels.setURL("mongodb+srv://admin:afrasankt2@cluster0.lbtnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
module.exports = {
	name: "voiceStateUpdate",

	/**
	 * @description Executes when an user voice state is updated.
	 * @author Felix
	 * @param {Object} oldtstate Main Application Client
     * @param {Object} newstate Main Application Client
	 */

	async execute(oldstate, newstate) {
        var member = newstate.guild.members.cache.get(newstate.id)
        var member2 = newstate.guild.members.cache.get(newstate.id)
        var mv = member.voice
        var oldmv=member2.voice
        continues = []
        afktimer = []
        continues.push(1)
        var refreshIntervalId = setInterval(function(){
            if (mv.channelId === oldmv.channelId) {
                if (mv.selfMute || mv.selfDeaf || mv.serverDeaf || mv.serverMute ) {
                    continues.pop()
                    clearInterval(refreshIntervalId)
                    }
                else{
                    if (mv.channelId !== null) {
                        continues.pop()
                        continues.push(1)
                    }
                    else {
                        continues.pop()
                        clearInterval(refreshIntervalId)
                    }
                }
            }
            else{
                continues.pop()
                clearInterval(refreshIntervalId)  
            }
        }, 1)
        var refreshIntervalId2 = setInterval(function(){
            if (continues.toString() === "1") {
                let run = async function() {
                const user1 = await Levels.fetch(newstate.id, newstate.guild.id);
                await Levels.appendXp(newstate.id, newstate.guild.id, 1)
                const user2 = await Levels.fetch(newstate.id, newstate.guild.id);
                const target = newstate.guild.members.cache.get(newstate.id);
                const log = newstate.guild.channels.cache.find(channel => channel.name === "rank-log") || newstate.guild.channels.cache.get("891799846095319110")
                if (user1.level != user2.level) {
                    if (user2.level > 1){
                        var role = member.guild.roles.cache.find(role => role.name === "Mitglieder (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "BronzeNewbie (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        })  
                    }
                    if (user2.level > 4){
                        var role = member.guild.roles.cache.find(role => role.name === "BronzeNewbie (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        }) 
                    }
                    if (user2.level > 9){
                        var role = member.guild.roles.cache.find(role => role.name === "SilverBaby (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "BronzeNewbie (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        }) 
                    }
                    if (user2.level > 19){
                        var role = member.guild.roles.cache.find(role => role.name === "GoldenDiva (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "SilverBaby (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        })  
                    }
                    if (user2.level > 29){
                        var role = member.guild.roles.cache.find(role => role.name === "Diamond (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "GoldenDiva (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        }) 
                    }
                    if (user2.level > 39){
                        var role = member.guild.roles.cache.find(role => role.name === "Master (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "Diamond (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        }) 
                    }
                    if (user2.level > 49){
                        var role = member.guild.roles.cache.find(role => role.name === "Grandmaster (Vc)");
                        var role2 = member.guild.roles.cache.find(role => role.name === "Master (Vc)");
                        const embed = new MessageEmbed()
                        .setAuthor(`${target.user.tag} hat eine neue Rolle bekommen!` , member.displayAvatarURL({dynamic: true}))    
                        .setDescription(`${role}`)
                        target.roles.add(role)
                        target.roles.remove(role2)
                        log.send({
                            content: `${target.user}`,
                            embeds: [embed]
                        }) 
                    }
                    else{
                        var role = member.guild.roles.cache.find(role => role.name === "Mitglieder (Vc)");
                        target.roles.remove(role)
                    }
                      
                }
                };
                run()
                afktimer.push(1)
                if(afktimer.length > 59) {
                    member.send({
                        content: "Du bist jetzt AFK, mute und entmute dich um den Status aufzuheben"
                    })
                    clearInterval(refreshIntervalId2)
                }
                }
            else{
                clearInterval(refreshIntervalId2)
            }
        }, 60000)
	},
};
