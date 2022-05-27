# DiscordBot
 simple but powerfull discord bot template

![](https://github.com/MichiMich/FilesForInstructions/blob/main/DiscordBot/discordBotInstruction.gif)



## setup

### 1. Discord developer settings
Head over to the discord developer settings at [discord developers](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications) and login to your server.
Create a new Application

### 2. Adapt token
Go to Bot->copy your Token and insert it at the .env file, so it looks like this
```
TOKEN="YourCreatedToken"
```
![grafik](https://user-images.githubusercontent.com/31065571/170682421-bb609cd8-703c-406a-b734-35cc4b66ceef.png)

### 3. setup 
setup your wanted configuration at bot.config.js

Here is an example configuration of a botCommand you could use for the first steps. Using this example your bot will react if you send the message "hello" in your discord channel:

```
botCommands: [

        {
            command: "hello",
            needsToBeExactCommand: true, //true=only will be executed if given command is identical string, false=will be fired, if the given command is found anywhere in string
            //true=match with delimiter(exact string), false=match with any string
            description: "says hi",
            definedFunction: function (msg) { customFunctions.hello(msg) } //function called by bot (initiated by discordBot.js)
        }
    ],
```

### 4. add the bot to your server

add the bot to your server by going to the OAuth2->URL Generator

![grafik](https://user-images.githubusercontent.com/31065571/170683390-206365e6-20ca-4aac-8812-a548a97eea76.png)

choose the wanted permissions:
![grafik](https://user-images.githubusercontent.com/31065571/170683693-4d8b89ea-08f1-481e-b4ef-5f44e36e2b38.png)

and copy the generated URL. Paste the url in your browser, choose a server and go on.
![grafik](https://user-images.githubusercontent.com/31065571/170683928-3572e369-e8f1-4f5e-b0ee-d64fed50d355.png)
 The bot should now appear in your discord server.


### 5. add bot at discord channel
Allow the bot on discord access the channel on which it should be used


### 6. bot config
adapt the bot.config.js to your needs

create your functions at custom_functions.js and link them with your config at bot.config.js see the example given in the gif




