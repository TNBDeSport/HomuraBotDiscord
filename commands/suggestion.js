 const Discord = require('discord.js');
exports.run = (client, message, args) => {
  
let msg = args.slice(1).join(' ');
if (msg.length < 1) return message.reply('Utilisation :`h!suggestion <message>`.');
 
  let suggestchan = client.channels.find('id', '557936381834297345');
      const embed = new Discord.RichEmbed()

      .setColor("#3C2A66")
      .setTitle(`${message.author.username}`)
      .setDescription(msg)
      


      suggestchan.send(embed).then( rm => {
        rm.react(client.emojis.find('id', '543783599883681825'));
        rm.react(client.emojis.find('id', '543784274650726403'));
      }
                                   
      suggestchan.send("<@302837596600664065>").then(Message => {
Message.delete()
});
      message.channel.send("<:HBsupport:543117250593554462> Votre suggestion a bien était envoyé.")

      };

    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: ['suggest'],
      permLevel: 0
    };

    exports.help = {
      name: 'suggestion',
      description: 'Une idée d\'ajout pour le bot ?',
      usage: 'suggestion <message>',
      aliase: ['suggest']
    };
