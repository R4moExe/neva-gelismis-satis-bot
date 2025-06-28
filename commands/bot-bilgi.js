const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "bot-bilgi",
  description: "Bot hakkında bilgi verir.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const uptime = process.uptime();
    const saat = Math.floor(uptime / 3600);
    const dakika = Math.floor((uptime % 3600) / 60);
    const saniye = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setTitle("🤖 Bot Bilgisi")
      .addFields(
        { name: "İsim", value: client.user.username, inline: true },
        { name: "ID", value: client.user.id, inline: true },
        { name: "Sunucular", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Kullanıcılar", value: `${client.users.cache.size}`, inline: true },
        { name: "Uptime", value: `${saat} saat, ${dakika} dakika, ${saniye} saniye`, inline: true },
        { name: "Node.js Sürümü", value: process.version, inline: true },
        { name: "Discord.js Sürümü", value: require("discord.js").version, inline: true }
      )
      .setColor("Blue")
      .setFooter({ text: "Bot Bilgi Komutu" });

    interaction.reply({ embeds: [embed]});
  },
};