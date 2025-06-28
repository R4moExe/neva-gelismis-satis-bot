const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "istatistik",
  description: "Botun temel istatistiklerini gösterir.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const urunler = db.get("urunler") || [];
    const siparisler = db.get("siparisler") || [];

    const embed = new EmbedBuilder()
      .setTitle("📊 Bot İstatistikleri")
      .addFields(
        { name: "📦 Toplam Ürün Sayısı", value: `${urunler.length}`, inline: true },
        { name: "🛒 Toplam Sipariş Sayısı", value: `${siparisler.length}`, inline: true },
        { name: "🤖 Bot Kullanıcı Sayısı", value: `${client.users.cache.size}`, inline: true },
      )
      .setColor("Blue")
      .setFooter({ text: `İstatistikler güncellendi: ${new Date().toLocaleString("tr-TR")}` });

    interaction.reply({ embeds: [embed]});
  },
};