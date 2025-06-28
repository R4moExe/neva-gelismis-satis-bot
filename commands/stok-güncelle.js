const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "stok-güncelle",
  description: "Ürünün stok miktarını günceller.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Stok güncellenecek ürünün ismi",
      type: 3, // STRING
      required: true,
    },
    {
      name: "yeni_stok",
      description: "Yeni stok miktarı",
      type: 4, // INTEGER
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "❌ Bu komutu kullanmak için Yönetici iznine sahip olmalısınız.", ephemeral: true });
    }

    const isim = interaction.options.getString("isim").toLowerCase();
    const yeniStok = interaction.options.getInteger("yeni_stok");

    if (yeniStok < 0) {
      return interaction.reply({ content: "❌ Stok miktarı negatif olamaz.", ephemeral: true });
    }

    const urunler = db.get("urunler") || [];
    const urunIndex = urunler.findIndex(u => u.isim === isim);

    if (urunIndex === -1) {
      return interaction.reply({ content: "❌ Bu isimde ürün bulunamadı.", ephemeral: true });
    }

    urunler[urunIndex].stok = yeniStok;
    db.set("urunler", urunler);

    const embed = new EmbedBuilder()
      .setTitle("✅ Stok Güncellendi")
      .setDescription(`**${isim}** adlı ürünün stok miktarı ${yeniStok} olarak güncellendi.`)
      .setColor("Green");

    interaction.reply({ embeds: [embed] });
  },
};