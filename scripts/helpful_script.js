exports.isBotAllowed = function (msg) {
    for (var i = 0; i < channelIdsForBot.length; i++) {
        if (msg.channel.id === channelIdsForBot[i]) {
            return (true);
        }
    }
}

exports.containsWord = function (data, wantedWord) {
    if (data.toLowerCase().match(wantedWord)) {
        return (true)
    }
}

exports.hasExactString = function (data, wantedWord) {
    if (data.toLowerCase().search("^" + wantedWord + "$") >= 0) {
        return (true)
    }
}

exports.isBotAllowed = function (channelId, allowedChannels) {
    if (typeof allowedChannels != typeof []) {
        console.log("allowedChannels type invalid, array expected");
        return;
    }
    for (var i = 0; i < allowedChannels.length; i++) {
        if (channelId === allowedChannels[i]) {
            return (true);
        }
    }
}

//returns the value of the found index, -1=not found
exports.isBotAllowedExtended = function (channelId, allowedChannels, msgType, allowedMsgTypes) {
    //data validation
    if (typeof allowedChannels != typeof [] && allowedMsgTypes != typeof []) {
        //one of them needs to be an array
        console.log("invalid input, array expected");
        return;
    }

    if (typeof allowedChannels != typeof []) {
        console.log("searching for allowed channelId")
        for (var i = 0; i < allowedChannels.length; i++) {
            if (channelId !== undefined && channelId === allowedChannels[i]) {
                return (i);
            }
        }
    }

    //if not allowed at given channelId, further check if channel type would be allowed
    if (allowedMsgTypes != typeof []) {
        console.log("searching for allowed message type: ", msgType)
        //search for types as well
        for (var i = 0; i < allowedMsgTypes.length; i++) {
            console.log("search for type: ", allowedMsgTypes[i])
            if (msgType == allowedMsgTypes[i]) {
                return (i);
            }
        }
    }
    //nothing found, not allowed
    return (-1);
}



exports.createHelpCommand = function (botCommands) {
    if (typeof botCommands != typeof []) {
        console.log("botCommands type invalid, array expected");
        return;
    }
    var helpText = "";
    for (var i = 0; i < botCommands.length; i++) {
        helpText += "**" + botCommands[i].command + "**" + " - " + botCommands[i].description + "\n";
    }
    return helpText;
}

