const Discord = require('discord.js');
exports.run = (client, message) => {

 

    let args = message.content.split(" ").slice(1);
  
    var embed = new Discord.RichEmbed()
    .setColor("#3C2A66")
    .setDescription('(site 1) https://discordbots.org/bot/500699327262359574/vote\r(site 2) https://divinediscordbots.com/bots/500699327262359574/vote\rAucune récompense pour l\'instant.')
    message.channel.send(embed)

 
};
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 0
    };

    exports.help = {
      name: 'vote',
      description: 'Vote pour le BOT',
      usage: 'vote'
    }
