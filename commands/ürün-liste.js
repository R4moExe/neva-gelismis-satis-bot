const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "ürün-liste",
  description: "Tüm ürünleri listeler.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const urunler = db.get("urunler") || [];

    if (urunler.length === 0) {
      return interaction.reply({ content: "❌ Henüz kayıtlı ürün yok.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle("📋 Ürün Listesi")
      .setColor("Blue");

    let description = "";

    urunler.forEach((urun, i) => {
      description += `**${i + 1}. İsim:** ${urun.isim}\n**Fiyat:** ${urun.fiyat}₺\n**Stok:** ${urun.stok}\n\n`;
    });

    embed.setDescription(description);

    interaction.reply({ embeds: [embed] });
  },
};