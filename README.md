# DiscordBot
 simple but powerfull discord bot template



## setup

1. Head over to the discord developer settings at [discord developers](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications) and login to your server.
Create a new Application

2. Go to Bot->copy your Token and insert it at the .env file
![grafik](https://user-images.githubusercontent.com/31065571/170682421-bb609cd8-703c-406a-b734-35cc4b66ceef.png)
so it looks like this:
```
TOKEN="YourCreatedToken"
```

3. setup your wanted configuration at bot.config.js

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



