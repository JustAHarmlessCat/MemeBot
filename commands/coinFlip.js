const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flipacoin')
        .setDescription("Flip a coin and get heads or tails"),
    async execute(interaction = new CommandInteraction()) {
        interaction.reply(Math.random() % 2 === 0 ? "Heads" : "Tails");
        return;
    },
};