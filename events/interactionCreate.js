module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.find(cmd => cmd.name === interaction.commandName);
  if (!command) return;

  try {
    await command.run(client, interaction);
  } catch (err) {
    console.error(err);
    if (!interaction.replied && !interaction.deferred) {
      interaction.reply({ content: "❌ Komut çalıştırılırken bir hata oluştu.", ephemeral: true });
    }
  }
};
