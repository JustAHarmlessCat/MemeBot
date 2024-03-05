const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('doubleornothing')
        .setDescription("get double social credits or lose them all")
        .addIntegerOption(option => option.setName("amount").setDescription("Amount of social credits to bet").setRequired(true)),
    async execute(interaction = new CommandInteraction()) {
        const amount = interaction.options.getInteger("amount");
        const result = Math.random() % 2 === 0;
        if (result) {
            interaction.reply(`You won ${amount} social credits!`);
        } else {
            interaction.reply(`You lost all your social credits!`);
        }
        return;
    },
};