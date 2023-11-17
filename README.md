# MemeBot

This is a Discord bot that can execute certain commands when they are sent in a Discord server.

## Files

- `index.js`: This is the main file that starts the bot. It loads the commands from the `commands` directory, registers them, and listens for interactions. It also handles message creation events and checks for bad words or specified names in the messages.

- `commands/createrole.js`: This file exports a command that creates a new role in the Discord server. The role's name, color, and whether it's mentionable are provided by the user when they use the command.

- `commands/randommeme.js`: This file exports a command that sends a random meme in the Discord server when the command is used.

- `commands/...`: Other command files go here. Each file exports a command that the bot can execute.