const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearcustom')
        .setDescription('Löscht alle Customroles'),
    async execute(interaction = new CommandInteraction()) {
        // Read the contents of the roles.json file
        const roles = JSON.parse(fs.readFileSync('roles.json'));

        // Get the user ID of the user who sent the command
        const userId = interaction.member.user.id;

        // Fetch the member object of the user from the Discord API
        const member = await interaction.guild.members.fetch(userId);

        // Remove all roles from the member object
        for (const role of roles) {
            await member.roles.remove(role.id).catch(error => console.error(`Failed to remove role: ${error}`));
        }

        // Respond with a message indicating that the roles have been deleted
        await interaction.reply('All roles have been deleted.');
        return;
    }
};