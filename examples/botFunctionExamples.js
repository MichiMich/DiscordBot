//Send a welcome message to a user
exports.welcomeMessage = function (member) {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get(config.welcomeUserSettings.channelIdForReactMessage).send(welcomeMessage);
}

//reply to a message


//send dm to user