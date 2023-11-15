const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const badwordsObject = require('badwords/object'); //joinked from github

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

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    commandFiles.forEach(file => {
        const command = require(`./commands/${file}`);
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            console.log(`[INFO] Loaded command ${command.data.name}`);
        }
    });

    client.application.commands.set(client.commands.map(command => command.data));
    console.log(`[INFO] Registered ${client.commands.size} commands`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
});

client.on("messageCreate", async (message) => {
    // Ignore messages from bots or without content
    if (message.author.bot || !message.content) return;

    // Convert the message content to lower case for easier comparison
    const content = message.content.toLowerCase();

    // Check if the message contains any bad words
    const badWords = Object.keys(badwordsObject);
    const hasBadWord = badWords.some(word => content.includes(word));

    // Check if the message contains any of the specified names
    const names = ['obamna', 'obama', 'floppa'];
    const name = names.find(name => content.toLowerCase().includes(name));

    console.log(`Message: ${name}`);

    // If the message contains a bad word or a specified name, handle it
    if (hasBadWord || name) {
        // If the name is 'floppa', reply with these messages
        if (name === 'floppa') {
            ['im better', 'im smarter', 'im stronger'].forEach(m => message.reply(m));
        }
        // If the name is 'obamna' or 'obama', translate the message and check for bad words
        else if (name) {
            console.log("translating")
            const res = await fetch("https://libretranslate.com/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: message.content,
                    source: "de",
                    target: "en",
                    secret: "DG3D9LT",
                    api_key: "",
                }),
                headers: { "Content-Type": "application/json", "Origin": "https://libretranslate.com" },
            });

            const resJson = await res.json();
            const translatedText = resJson.translatedText;

            // If the translated text contains a bad word, reply with this message
            if (translatedText && badWords.some(word => translatedText.toLowerCase().includes(word))) {
                Array(5).fill('du dummer nuttensohn').forEach(m => message.reply(m));
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);