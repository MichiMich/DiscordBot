const helpfulScript = require("./helpful_script.js")
const customFunctions = require("./custom_functions.js")
const botConfig = {

    botCommands: [
        /*
        add your commands and configuration here

        example of configuration:

        {
            command: "hello",
            needsToBeExactCommand: true, //true=only will be executed if given command is identical string, false=will be fired, if the given command is found anywhere in string
            //true=match with delimiter(exact string), false=match with any string
            description: "says hi",
            definedFunction: function (msg) { customFunctions.hello(msg) } //function called by bot (initiated by discordBot.js)
        },
        {
            command: ["sad", "depressing", "unhappy", "angry", "red market"],
            needsToBeExactCommand: false,
            description: "finding any of these words sends a cheer up message",
            definedFunction: function (msg) { customFunctions.cheerUp(msg) } //function called by bot (initiated by discordBot.js)
        },

        */
    ],
    //allowedCommands: //empty array=all botCommands are allowed in this channel, given array, searching for all which is given
    allowedChannels: [
        {
            channelName: "", //discord channel name, not connected so far
            channelId: "", //discord channel id, bot is only able to react in this channeltype: 
            type: "",//this is the channel type where the bot is also allowed ('DM' for example) to react for direct messages, see: https://discord.com/developers/docs/resources/channel
            allowedCommands: [] //empty array = bot will react on all of commands given at botCommands.command, ["hello"] = bot will only react on ["hello"] command given at botCommands.command
        },
        /*add more allowedChannels here*/

    ],
    welcomeUserSettings: {
        channelIdForReactMessage: "", //discord channelId, where welcome response should be occur
        welcomeMessage: function (member) { customFunctions.welcomeMessage(member) }
    },
    reactionSettings: {
        reactOnUnknownCommands: false, //false=no reaction, true=react on unknown commands by sending a message to the discord channel
        reactMessage: "command not found",
    }

}

module.exports = botConfig;