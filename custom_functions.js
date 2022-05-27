exports.welcomeMessage = function (member) {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get(config.welcomeUserSettings.channelIdForReactMessage).send(welcomeMessage);
}




/*
add your custom functions here


example of realisation of bot responses, this functions will be called by bot.config.js if the bot should react on a command
exports.hello = function (msg) {
    msg.reply("Hi!")
}

exports.cheerUp = function (msg) {
    const encouragements = [
        "Cheer up!",
        "I believe in you!",
        "You can do all what you dreaming of!",
        "If you can´t do it who else could?",
        "It would be sad here without you!",
        "Stay strong friend!"
    ]
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    msg.reply(encouragement)
}
*/