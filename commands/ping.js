const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Botun gecikme süresini gösterir.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const ping = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("🏓 Pong!")
      .setDescription(`Botun ping değeri: **${ping} ms**`)
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
  },
};