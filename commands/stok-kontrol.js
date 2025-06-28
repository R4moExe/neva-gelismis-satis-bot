const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "stok-kontrol",
  description: "Belirtilen ürünün stok verisi sayısını gösterir.",
  type: 1,
  options: [
    {
      name: "ürün",
      description: "Stok durumu kontrol edilecek ürün",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const isim = interaction.options.getString("ürün").toLowerCase();

    const urunler = db.get("urunler") || [];
    const urun = urunler.find(u => u.isim === isim);

    if (!urun) {
      return interaction.reply({
        content: "❌ Bu isimde bir ürün bulunamadı.",
        ephemeral: true,
      });
    }

    const stok = db.get(`stok_${isim}`) || [];

    const embed = new EmbedBuilder()
      .setTitle("📦 Stok Durumu")
      .setDescription(`**${isim}** adlı ürünün stok adedi: **${stok.length}**`)
      .setColor(stok.length > 0 ? "Green" : "Red");

    interaction.reply({ embeds: [embed] });
  },
};