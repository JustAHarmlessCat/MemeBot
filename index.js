const { Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const badwordsObject = require('badwords/object');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
            console.log(`[INFO] Loaded command ${command.data.name}`);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    client.application.commands.set(client.commands.map(command => command.data));
    console.log(`[INFO] Registered ${client.commands.size} commands`);
});

client.on('interactionCreate', async (interaction) => {

    const { commandName } = interaction;

    try {
        await client.commands.get(commandName).execute(interaction);
    } catch (error) {
        console.error(error);
    }
});

client.on("messageCreate", async (message) => {
    if (!message.author.bot) {
        let exist = false
        for (let i = 0; i < Object.keys(badwordsObject).length; i ++){
            const word = Object.keys(badwordsObject)[i]
            if (message.content.toLowerCase().includes(word)){
                exist = true
            }
        }
        if (message.content.toLowerCase().includes('floppa')) {
            await message.reply('im better')
            await message.reply('im smarter')
            await message.reply('im stronger')
        }
        if (exist === true){
            if (message.content.toLowerCase().includes("obamna")){
                for (let b = 0; b < 5; b++){
                    await message.reply('du dummer nuttensohn')
                }
            }
            if (message.content.toLowerCase().includes("obama")){
                for (let b = 0; b < 5; b++){
                    await message.reply('du dummer nuttensohn')
                }
            }
        }
    }
});
client.login(process.env.DISCORD_TOKEN);