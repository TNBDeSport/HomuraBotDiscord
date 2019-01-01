const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = function(client, message, args) {
  var distance = client.uptime;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  uptime = days + "d" + hours + "h" + minutes + "m" + seconds + "s";

  const msg = new Discord.RichEmbed()
    .setColor('#FF7AED')
    .setThumbnail(client.avatarURL)
    .setTitle(`Stats de TsukiBot`)
    .setThumbnail(client.avatarURL)
    .addField('Utilisateurs ',`${client.users.size}`, true)
    .addField('Serveurs ',`${client.guilds.size}`, true)
    .addField('Channels',`${client.channels.size}`, true)
    .addField('Uptime', uptime , true)
    .addField('Créateur ',`<@318619541942960128>`, true)
    .addField('Partenaires','`t!partenariat`')
    .setTimestamp()
    message.channel.send(msg)

}

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'stats',
    description: 'Affiche les stats du bot.',
    usage: 'stats',
    aliase: ['Aucun aliase n\'est disponible pour cette commandes.']

  }
