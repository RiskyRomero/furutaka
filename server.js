const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Declare Colors
var rolesColors = [
  "White",
  "Silver",
  "Gray",
  "Black",
  "Red",
  "Maroon",
  "Yellow",
  "Brown",
  "Olive",
  "Lime",
  "Green",
  "Aqua",
  "Teal",
  "Blue",
  "Navy",
  "Magenta",
  "Purple",
  "Orange",
  "Mint",
  "Beige",
  "Lavender",
  "Pink"
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
  var colorLog = color;
  var logText = text;
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
      ".iam | for help",
      `Serving ${client.users.size} users`,
      `I love Ryumin!`,
      `.iam list | Colors List`,
      `I love Kotori!`,
      `Am I a slave?`
      ];


  client.user.setStatus('idle');
  client.user.setActivity('Starting Bot...', {type: 'PLAYING'});
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
  client.user.setActivity(`Meow | Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`.iam | Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // Ignore bots, DMs and group messages.
  if (message.author.bot || !message.guild) return;


    // Ignore any message that does not start with our prefix,
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "iam") {
    let color = args[0].toLowerCase();
    let member = message.member;
    
    if (message.channel.id !== "587622206163517441") {
      return message.channel.send(message.author + ", command can only be used in <#587622206163517441>")
    }

    // IF ARG ARE NOT THERE
    if(!color || color === "help") {

      message.channel.send({
    "embed": {
    "description": "\n __**Change your Discord color**__\n`.iam <color>`\n__**Reset Color to the default**__\n`.iam reset`",
    "color": 1472601,
    "timestamp": new Date(),
    "thumbnail": {
      "url": "https://media.discordapp.net/attachments/554302408537276416/554305908528775169/ryumin.gif?width=393&height=393"
    },
    "author": {
      "name": "Ryumin#6263 (Owner)",
      "icon_url": "https://media.discordapp.net/attachments/554302408537276416/554305908528775169/ryumin.gif?width=393&height=393"
    },
    "fields": [
      {
        "name": "Colors",
        "value": "```\nwhite\nsilver\ngray\nblack\nred\nmaroon\nyellow\nbrown\nolive\nlime\ngreen\naqua\nteal\nblue\nnavy\nmagenta\npurple\norange\nmint\nbeige\nlavender\npink```"
      }
    ]
  }
});

};

// CONFIG | ADD ROLES TO SERVER
if(color === "list") {
  message.reply(`https://media.discordapp.net/attachments/587622206163517441/587625334237823009/caf-colors.png?width=473&height=473`);
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
      message.reply(`color changed to ${color}.`);
    }

    // SILVER
    if(color === "silver") {
      //let role = message.guild.roles.find("name", rolesColors[1]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[1]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // GRAY
    if(color === "gray") {
      //let role = message.guild.roles.find("name", rolesColors[2]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[2]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // BLACK
    if(color === "black") {
      //let role = message.guild.roles.find("name", rolesColors[3]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[3]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // RED
    if(color === "red") {
      //let role = message.guild.roles.find("name", rolesColors[4]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[4]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // MAROON
    if(color === "maroon") {
      //let role = message.guild.roles.find("name", rolesColors[5]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[5]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // YELLOW
    if(color === "yellow") {
      //let role = message.guild.roles.find("name", rolesColors[6]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[6]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // BROWN
    if(color === "brown") {
      //let role = message.guild.roles.find("name", rolesColors[7]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[7]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // OLIVE
    if(color === "olive") {
      //let role = message.guild.roles.find("name", rolesColors[8]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[8]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // LIME
    if(color === "lime") {
      //let role = message.guild.roles.find("name", rolesColors[9]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[9]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // GREEN
    if(color === "green") {
      //let role = message.guild.roles.find("name", rolesColors[10]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[10]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // AQUA
    if(color === "aqua") {
      //let role = message.guild.roles.find("name", rolesColors[11]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[11]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // TEAL
    if(color === "teal") {
      //let role = message.guild.roles.find("name", rolesColors[12]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[12]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // BLUE
    if(color === "blue") {
      //let role = message.guild.roles.find("name", rolesColors[13]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[13]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // NAVY
    if(color === "navy") {
      //let role = message.guild.roles.find("name", rolesColors[14]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[14]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // MAGENTA
    if(color === "magenta") {
      //let role = message.guild.roles.find("name", rolesColors[15]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[15]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // PURPLE
    if(color === "purple") {
      //let role = message.guild.roles.find("name", rolesColors[16]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[16]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // ORANGE
    if(color === "orange") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[17]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // MINT
    if(color === "mint") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[18]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // BEIGE
    if(color === "beige") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[19]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // LAVENDER
    if(color === "lavender") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[20]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }

    // PINK
    if(color === "pink") {
      //let role = message.guild.roles.find("name", rolesColors[17]);
      var roleArray = message.guild.roles.find(role => role.name === rolesColors[21]);
      resetColor(message, member);
      // Add the role & tell the user his color changed.
      member.addRole(roleArray).catch(console.error);
      message.reply(`color changed to ${color}.`);
    }
  }


});

client.login(process.env.TOKEN);