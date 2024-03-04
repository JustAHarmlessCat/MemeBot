const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spam')
        .setDescription("Spam some1")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Der User der gepingt werden soll")
                .setRequired(true))
        .addNumberOption((option) =>
            option
                .setName("wieoft")
                .setDescription("Wie oft er gepingt werden soll")
                .setRequired(true)),
    async execute(interaction = new CommandInteraction()) {
        const user = interaction.options.getUser("user");
        const num = interaction.options.getNumber("wieoft");
        interaction.reply({ content: `Spamming ${user} ${num} times`});
        for (let i = 0; i < num; i++) {
            await interaction.channel.send({ content: `${user}`});
        }
        interaction.channel.send({ content: `${user} Imagen getting Pinged`})
        return;
    },
};