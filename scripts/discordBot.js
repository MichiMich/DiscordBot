require('dotenv').config();

const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
//get in the configuration for this bot

var botConfig = require(process.env.BOT_CONFIG_PATH);//set by user
const helpfulScript = require("./helpful_script.js")


/*
function callCustomFunctions(){
    //validate functions and config
    //handover wanted function which should be called, check if function is there and valid, call it then, otherwise throw error
}
*/


//bot log
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})


client.on('guildMemberAdd', member => {
    botConfig.welcomeUserSettings.welcomeMessage(member);
});

function botResponse(msg, allowedChannelConfig) {
    //is the bot allowed in her with this command
    let channelIdArray = allowedChannelConfig.map(a => a.channelId); //create array of channelIds from object array
    let channelTypeArray = allowedChannelConfig.map(b => b.type);

    let indexOfAllowedElement = helpfulScript.isBotAllowedExtended(msg.channel.id, channelIdArray, msg.channel.type, channelTypeArray);
    if (indexOfAllowedElement != -1) {
        //bot is allowed in this channel
        //get channel, search if msg has allowedCommands in it, if allowed commands array is empty, search in all commands
        //now search what we should respond to
        let botCommands = "";
        if (botConfig.allowedChannels[indexOfAllowedElement].allowedCommands.length === 0) {
            //all commands are allowed
            botCommands = botConfig.botCommands.map(a => a.command);
        }
        else {
            botCommands = botConfig.allowedChannels[indexOfAllowedElement].allowedCommands;
        }
        if (!reactOnCommand(msg, botCommands) && botConfig.reactionSettings.reactOnUnknownCommands) {
            msg.channel.send(botConfig.reactionSettings.reactMessage)
        }
    }
}


function logError(err, msg) {
    if (msg != null) {
        msg.channel.send(err)
    }
}

function reactOnCommand(msg, commands) {
    //check if commands is an array
    //find where command is
    //you are allowed to search msg.content value in the available bot commands and react on them
    var wantedCommand = "";
    for (let i = 0; i < commands.length; i++) {
        if (typeof commands[i] == typeof []) {
            //array given, search if some appears, important: if some is found definedFunction of the commands[i] is fired
            for (j = 0; j < commands[i].length; j++) {
                if (helpfulScript.containsWord(msg.content, commands[i][j])) {
                    //command found
                    wantedCommand = commands[i];
                    break;
                }
            }
        }
        else {
            if (helpfulScript.containsWord(msg.content, commands[i])) {
                //command found
                wantedCommand = commands[i];
                break;
            }
        }
    }

    var indexOfCommand = botConfig.botCommands.findIndex(a => a.command === wantedCommand);
    if (indexOfCommand != -1) {
        //available at config given commands
        if (botConfig.botCommands[indexOfCommand].needsToBeExactCommand) {
            if (helpfulScript.hasExactString(msg.content, botConfig.botCommands[indexOfCommand].command)) {
                if (botConfig.botCommands[indexOfCommand].definedFunction == undefined) {
                    logError("no function defined for this command", msg)
                    return
                }
                else {
                    botConfig.botCommands[indexOfCommand].definedFunction(msg);
                    return (true)
                }
            }
        }
        else {
            botConfig.botCommands[indexOfCommand].definedFunction(msg);
            return (true)
        }
    }
}


//react on messages
client.on("messageCreate", msg => {
    if (msg.author.bot) return //not replying to bot itself
    console.log("recieved message", msg.content)
    botResponse(msg, botConfig.allowedChannels)
})




