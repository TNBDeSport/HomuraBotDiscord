const Discord = require('discord.js');
exports.run = (client, message, args) => {
  
   if (message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR') || message.author.id == 302837596600664065) {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply("<:HBinfo:543117222097453059> Vous devez mentionner quelqu'un pour le ban.").catch(console.error);
 
  

  if (!message.guild.member(user).bannable) return message.reply("<:HBstop:543117234273386516>  Je ne peut pas ban cet utilisateur.");
  message.guild.ban(user, 2);

  

      message.channel.send(`<:HByes:543783599883681825> ${user.tag} ban !`)
   }else{
     message.reply("<:HBconfig:543117201817862145> Vous n'avez pas les permissions requises pour ban un utilisateur");
   };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Ban un utilisateur.',
  usage: 'ban <mention>',
  aliase: ['Aucun aliase n\'est disponible pour cette commande.']
};
