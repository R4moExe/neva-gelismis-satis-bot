const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "ürün-ekle",
  description: "Yeni ürün ekler.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Ürün ismi",
      type: 3, // STRING
      required: true,
    },
    {
      name: "fiyat",
      description: "Ürün fiyatı",
      type: 4, // INTEGER
      required: true,
    },
    {
      name: "stok",
      description: "Ürün stok miktarı",
      type: 4, // INTEGER
      required: true,
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "❌ Bu komutu kullanmak için Yönetici iznine sahip olmalısınız.", ephemeral: true });
    }

    const isim = interaction.options.getString("isim").toLowerCase();
    const fiyat = interaction.options.getInteger("fiyat");
    const stok = interaction.options.getInteger("stok");

    if (fiyat < 0 || stok < 0) {
      return interaction.reply({ content: "❌ Fiyat ve stok negatif olamaz.", ephemeral: true });
    }

    const urunler = db.get("urunler") || [];
    if (urunler.find(u => u.isim === isim)) {
      return interaction.reply({ content: "❌ Bu isimde zaten bir ürün mevcut.", ephemeral: true });
    }

    urunler.push({ isim, fiyat, stok });
    db.set("urunler", urunler);

    const embed = new EmbedBuilder()
      .setTitle("✅ Ürün Eklendi")
      .setDescription(`**İsim:** ${isim}\n**Fiyat:** ${fiyat}₺\n**Stok:** ${stok}`)
      .setColor("Green");

    interaction.reply({ embeds: [embed] });
  },
};