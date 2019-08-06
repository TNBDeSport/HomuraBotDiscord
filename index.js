const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
// const DBL = require("dblapi.js");
// const dbl = new DBL(process.env.DBLTOKEN, client);
require('./utils/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. `);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on("guildMemberAdd", async member => {
   let welcomechannel = member.guild.channels.find("name", "bienvenue")
  if (!welcomechannel) return
  console.log(`${member.id} joined the server.`)
  
  
  let welcomeembed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Bienvenue, ${member} sur ${member.guild.name}`)
  welcomechannel.send(welcomeembed);
});

bot.on("guildCreate", async guild => {
    let channels = guild.channels;
    var BreakException = {};

    try {
        channels.forEach(function(element) {
            if(element.type === "text") {
                let channel = client.channels.get(element.id);
                channel.createInvite({
                    maxAge: 0
                }).then(invite => {
                    const embed = new Discord.RichEmbed()
                        .setColor('#3333cc')
                        .setAuthor('~ Nouveau Serveur ~', guild.iconURL)
                        .addField('ID :', `${guild.id}`, true)
                        .addField('Nom :', `${guild.name}`, true)
                        .addField('Créateur :', `<@!${guild.owner.id}>`, true)
                        .addField('\u200B', '\u200B', true)
                        .addField('Membres :', `${guild.memberCount}`, true)
                        .addField('Invitation', `${invite.url}`, true)
                        .setTimestamp();
                    client.channels.get("559125047395090432").send(embed)
                });
                throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
 
client.login(process.env.JACK);
