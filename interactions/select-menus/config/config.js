/**
* @file Select menu interaction: config
* @author Felix
* @since 1.0.0
*/
const { getDatabase, ref, set, get } = require("firebase/database")
const { MessageActionRow, MessageSelectMenu } = require("discord.js")
const { MessageEmbed } = require('discord.js')
module.exports = {
  id: 'config',
  /**
* @description Executes when the select menu with ID config is called.
* @author Felix
* @param {Object} interaction The Interaction Object of the command.
*/
  async execute (interaction) {
    function jsonParser (stringValue, key) {
      var string = JSON.stringify(stringValue);
      var objectValue = JSON.parse(string);
      return objectValue[key];
    }
    const db = getDatabase();
    const id = interaction.guild.id;
    if (interaction.values.includes('einwohnermeldeamt')) {
      //* ###########################################
      let enabled = JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/enabled'))).slice(1).slice(0, -1)
      if (!enabled) {
        await set(ref(db, id + '/einwohnermeldeamt/config/enabled'), 'false')
        enabled = 'false'
      }
      let eLogStr
      try {
        const eLog = interaction.member.guild.channels.cache.get(JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/eLog'))).slice(1).slice(0, -1))
        eLogStr = `[#${eLog.name}](https://discord.com/config/${eLog.guild.id}/${eLog.id})`
      } catch (e) {
        eLogStr = 'Nicht gefunden'
      }
      let VE2LogStr
      try {
        const VE2Log = interaction.member.guild.channels.cache.get(JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/ve2Log'))).slice(1).slice(0, -1))
        VE2LogStr = `[#${VE2Log.name}](https://discord.com/config/${VE2Log.guild.id}/${VE2Log.id})`
      } catch (e) {
        VE2LogStr = 'Nicht gefunden'
      }
      let VE2MsgEnabled = JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/VE2MsgEnabled'))).slice(1).slice(0, -1)
      if (!VE2MsgEnabled) {
        await set(ref(db, id + '/einwohnermeldeamt/config/VE2MsgEnabled'), 'false')
        VE2MsgEnabled = 'false'
      }
      let VE2Msg = JSON.stringify(await get(ref(db, id + '/einwohnermeldeamt/config/VE2Msg'))).slice(1).slice(0, -1)
      if (VE2Msg === 'ul') {
        VE2Msg = 'Nicht gefunden'
      }
      VE2Msg = VE2Msg.replaceAll('\\n', '\n')
      // ###########################################
      const empfangsteamEmbed = new MessageEmbed()
        .setTitle('Einwohnermeldeamt Einstellungen')
        .addFields(
          { name: 'Modul aktiviert', value: enabled },
          { name: 'E-Log Channel', value: eLogStr },
          { name: 'VE2-Log Channel', value: VE2LogStr },
          { name: 'VE2-Nachricht aktiviert', value: VE2MsgEnabled },
          { name: 'VE2-Nachricht', value: VE2Msg }
        )
      //! ###########################################
      const configRow = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('configempfangsteam')
            .setPlaceholder('Nothing selected')
            .addOptions([
              {
                label: 'Enable',
                description: 'Aktiviert das Einwohnermeldeamt',
                value: 'enabled'
              },
              {
                label: 'E-Log Channel',
                description: 'Ändere den E-Log Channel',
                value: 'elog'
              },
              {
                label: 'VE2-Log Channel',
                description: 'Ändere den VE2-Log Channel',
                value: 've2log'
              },
              {
                label: 'VE2-Message Enabled',
                description: 'Aktiviere/Deaktiviere die VE2-Nachricht',
                value: 've2msgenabled'
              },
              {
                label: 'VE2-Message',
                description: 'Ändere die VE2-Nachricht',
                value: 've2msg'
              }
            ])
        )
      // Add the row to the message
      interaction.reply({
        content: 'Was magst du anpassen?',
        components: [configRow],
        embeds: [empfangsteamEmbed],
        ephemeral: true,
        attachments: []
      });
      module.exports.prev = { interaction, configRow }
    }
  }
}
