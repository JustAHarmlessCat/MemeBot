const { SlashCommandBuilder } = require('discord.js');
const convert = require('color-convert');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrole')
        .setDescription('Erstellt eine benutzerdefinierte Rolle')
        .addStringOption(option => option.setName('name').setDescription('Name der Rolle').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('Farbe der Rolle').setRequired(true))
        .addBooleanOption(option => option.setName('mentionable').setDescription('Ob die Rolle erwähnbar ist').setRequired(false)),
    /**
     * Executes the createRole command.
     * @param {Interaction} interaction - The interaction object.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const color = interaction.options.getString('color');

        // Convert the color string to an RGB array
        const rgbArray = convert.keyword.rgb(color);

        // Create a Discord.js ColorResolvable object
        const discordColor = (rgbArray[0] << 16) + (rgbArray[1] << 8) + rgbArray[2];

        const mentionable = interaction.options.getBoolean('mentionable') || false;

        // Get the guild from the interaction
        const guild = interaction.guild;

        // Create the role
        const role = await guild.roles.create({
            name: name,
            color: discordColor,
            mentionable: mentionable
        });
        interaction.reply(`Die Rolle ${role} wurde erstellt.`);
    },
};