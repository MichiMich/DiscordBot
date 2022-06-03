require('dotenv').config();

const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
//get in the configuration for this bot

var globalBotconfig;//set by bot.config.js from user
const helpfulScript = require("./helpful_script.js")


callBotFunctions();
/*
function callCustomFunctions(){
    //validate functions and config
    //handover wanted function which should be called, check if function is there and valid, call it then, otherwise throw error
}
*/

function callBotFunctions() {
    if (globalBotconfig === undefined || globalBotconfig === null) {
        console.log("bot config not found, please create a bot.config.js file in the root of your folder")
        return;
    }
    //else if (globalBotconfig.) //check if given custom functions are valid? what happens if triggered, but no function given?

    /*valid config, available functions here */

    //bot log
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })


    client.on('guildMemberAdd', member => {
        globalBotconfig.welcomeUserSettings.welcomeMessage(member);
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
            if (globalBotconfig.allowedChannels[indexOfAllowedElement].allowedCommands.length === 0) {
                //all commands are allowed
                botCommands = globalBotconfig.botCommands.map(a => a.command);
            }
            else {
                botCommands = globalBotconfig.allowedChannels[indexOfAllowedElement].allowedCommands;
            }
            if (!reactOnCommand(msg, botCommands) && globalBotconfig.reactionSettings.reactOnUnknownCommands) {
                msg.channel.send(globalBotconfig.reactionSettings.reactMessage)
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

        var indexOfCommand = globalBotconfig.botCommands.findIndex(a => a.command === wantedCommand);
        if (indexOfCommand != -1) {
            //available at config given commands
            if (globalBotconfig.botCommands[indexOfCommand].needsToBeExactCommand) {
                if (helpfulScript.hasExactString(msg.content, globalBotconfig.botCommands[indexOfCommand].command)) {
                    if (globalBotconfig.botCommands[indexOfCommand].definedFunction == undefined) {
                        logError("no function defined for this command", msg)
                        return
                    }
                    else {
                        globalBotconfig.botCommands[indexOfCommand].definedFunction(msg);
                        return (true)
                    }
                }
            }
            else {
                globalBotconfig.botCommands[indexOfCommand].definedFunction(msg);
                return (true)
            }
        }
    }


    //react on messages
    client.on("messageCreate", msg => {
        if (msg.author.bot) return //not replying to bot itself
        console.log("recieved message", msg.content)
        botResponse(msg, globalBotconfig.allowedChannels)
    })



}

