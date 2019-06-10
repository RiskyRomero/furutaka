const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// Declare Colors
var rolesColors = [
  "dWhite",
  "dSilver",
  "dGray",
  "dBlack",
  "dRed",
  "dMaroon",
  "dYellow",
  "dBrown",
  "dOlive",
  "dLime",
  "dGreen",
  "dAqua",
  "dTeal",
  "dBlue",
  "dNavy",
  "dMagenta",
  "dPurple",
  "dOrange",
  "dMint",
  "dBeige",
  "dLavender",
  "dPink"
];

var cRed = "\x1b[31m";
var cBlue = "\x1b[34m";
var cYellow = "\x1b[33m";
var cGreen = "\x1b[32m";
var cCyan = "\x1b[36m";
var cNormal = "";
var cReset = "\x1b[0m"; // DON'T FORGET RESET FONT

function printLog(text, color) {
  if (color === undefined) color = cNormal;
  var timestamp = "[" + new Date().toLocaleTimeString('en-CA') + "] ";
  colorLog = color;
  logText = text;
  console.log(timestamp + colorLog + text + cReset);
}

function resetColor(message, member){

  var arrayLength = rolesColors.length;
  for (var i = 0; i < arrayLength; i++) {
      //Do something
      //let roleArray = message.guild.roles.find("name", rolesColors[i]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[i]);
      member.removeRole(roleArray).catch(console.error);
    }
}


client.on("ready", () => {
  const activities_list = [
      "+dColors | for help",
      `Serving ${client.users.size} users`,
      `Serving ${client.guilds.size} servers`,
      `+dColors list | Colors List`
      ];


  client.user.setStatus('idle');
  client.user.setActivity('JavaScript while starting...', {type: 'PLAYING'});
  printLog("Bot Starting...",cRed);

  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 10000); // Runs this every 10 seconds.


  printLog('Bot has started, with ' + client.users.size + ' users, in ' + client.channels.size + ' channels of ' + client.guilds.size + ' guilds.', cGreen);
  client.user.setStatus('online');


});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`+dColors | Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`+dColors | Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // Ignore bots, DMs and group messages.
  if (message.author.bot || !message.guild) return;


    // Ignore any message that does not start with our prefix,
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();



  if (command === "dcolors") {
    let color = args[0];
    let member = message.member;

    // IF ARG ARE NOT THERE
    if(!color || color === "help") {

      message.channel.send({
    "embed": {
    "title": "Thanks for using dColors. You can use the following commands",
    "description": "\n __**Change your Discord color**__\n*Use color name instead of <color> (Check below for available colors)* \n`+dcolors <color>`\n__**Reset Color to the default**__\n`+dcolors reset`\n__**Other available commands**__\n`+dcolors ping`\n`+dcolors config (WIP)`\n",
    "color": 1472601,
    "timestamp": new Date(),
    "footer": {
      "text": "Version 0.1 - ISC License - 2018"
    },
    "thumbnail": {
      "url": "http://superdizor.com/img/dcolors.png"
    },
    "author": {
      "name": "dColors - Discord Colors Bot",
      "icon_url": "http://superdizor.com/img/dcolors.png"
    },
    "fields": [
      {
        "name": "Colors",
        "value": "```\nwhite\nsilver\ngray\nblack\nred\nmaroon\nyellow\nbrown\nolive\nlime\ngreen\naqua\nteal\nblue\nnavy\nmagenta\npurple\norange\nmint\nbeige\nlavender\npink```"
      },
      {
        "name": "You like this bot ?",
        "value": "[Invite **dColors** to your server](https://discordapp.com/oauth2/authorize?&client_id=456585537621327882&scope=bot&permissions=0)"
      },
      {
        "name": "GitHub",
        "value": "[Open Source on GitHub](https://github.com/SuperDizor/dColors) \n *This is one of my first JavaScript Project.* \n*Give me constructive feedback* ",
        "inline": true
      },
      {
        "name": "Social",
        "value": "[Twitter](https://twitter.com/SuperDizor)\n",
        "inline": true
      }
    ]
  }
});

};

// CONFIG | ADD ROLES TO SERVER
if(color === "list") {
  message.reply(`Colors currently available: https://www.zupimages.net/up/19/10/p9cl.png`);
}


    // CONFIG | ADD ROLES TO SERVER
    if(color === "config") {
      message.reply(`config is currently WIP`);
    }

    // RESET COLOR TO DEFAULT
    if(color === "reset") {
      // Check if they have one of many roles
      if(message.member.roles.some(r=>rolesColors.includes(r.name)) ) {
        resetColor(message, member);
        message.reply(`color changed to default.`);
      } else {
        // has none of the roles
        message.reply(`you have currently the default color.`);
      }
    }

    // WHITE
    if(color === "white") {
      //let role = message.guild.roles.find("name", rolesColors[0]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[0]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // SILVER
    if(color === "silver") {
      //let role = message.guild.roles.find("name", rolesColors[1]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[1]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // GRAY
    if(color === "gray") {
      //let role = message.guild.roles.find("name", rolesColors[2]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[2]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // BLACK
    if(color === "black") {
      //let role = message.guild.roles.find("name", rolesColors[3]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[3]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // RED
    if(color === "red") {
      //let role = message.guild.roles.find("name", rolesColors[4]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[4]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // MAROON
    if(color === "maroon") {
      //let role = message.guild.roles.find("name", rolesColors[5]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[5]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // YELLOW
    if(color === "yellow") {
      //let role = message.guild.roles.find("name", rolesColors[6]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[6]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // BROWN
    if(color === "brown") {
      //let role = message.guild.roles.find("name", rolesColors[7]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[7]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // OLIVE
    if(color === "olive") {
      //let role = message.guild.roles.find("name", rolesColors[8]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[8]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // LIME
    if(color === "lime") {
      //let role = message.guild.roles.find("name", rolesColors[9]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[9]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // GREEN
    if(color === "green") {
      //let role = message.guild.roles.find("name", rolesColors[10]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[10]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // AQUA
    if(color === "aqua") {
      //let role = message.guild.roles.find("name", rolesColors[11]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[11]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // TEAL
    if(color === "teal") {
      //let role = message.guild.roles.find("name", rolesColors[12]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[12]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // BLUE
    if(color === "blue") {
      //let role = message.guild.roles.find("name", rolesColors[13]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[13]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // NAVY
    if(color === "navy") {
      //let role = message.guild.roles.find("name", rolesColors[14]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[14]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // MAGENTA
    if(color === "magenta") {
      //let role = message.guild.roles.find("name", rolesColors[15]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[15]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // PURPLE
    if(color === "purple") {
      //let role = message.guild.roles.find("name", rolesColors[16]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[16]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // ORANGE
    if(color === "orange") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[17]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // MINT
    if(color === "mint") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[18]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // BEIGE
    if(color === "beige") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[19]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // LAVENDER
    if(color === "lavender") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[20]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // PINK
    if(color === "pink") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[21]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed for ${color}.`);
    }

    // PING
    if(color === "ping") {
      const m = await message.channel.send("Ping?");
      m.edit(`Ping isn't a color but Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
  }


});

client.login(config.token);
