const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const { loadData, saveData } = require("../utils.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delroles')
        .setDescription('Delete all custom roles from the server (admin only)'),
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

            // Parse the JSON data to get the role IDs
            const roleIds = loadData().map(role => role.id);

            // Loop through the role IDs and delete each role
            roleIds.forEach(roleId => {
                const role = interaction.guild.roles.cache.get(roleId);
                
                if (role) {
                    interaction.guild.roles.delete(role);
                }
            });

            // Clear the roles.json file
            saveData([])
            interaction.reply({ content: 'Deleted all custom roles.', ephemeral: true });
        
    },
};

