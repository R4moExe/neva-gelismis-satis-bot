const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "fiyat-güncelle",
  description: "Ürünün fiyatını günceller.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Fiyatı güncellenecek ürünün ismi",
      type: 3, // STRING
      required: true,
    },
    {
      name: "yeni_fiyat",
      description: "Yeni fiyat",
      type: 4, // INTEGER
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "❌ Bu komutu kullanmak için Yönetici iznine sahip olmalısınız.", ephemeral: true });
    }

    const isim = interaction.options.getString("isim").toLowerCase();
    const yeniFiyat = interaction.options.getInteger("yeni_fiyat");

    if (yeniFiyat < 0) {
      return interaction.reply({ content: "❌ Fiyat negatif olamaz.", ephemeral: true });
    }

    const urunler = db.get("urunler") || [];
    const urunIndex = urunler.findIndex(u => u.isim === isim);

    if (urunIndex === -1) {
      return interaction.reply({ content: "❌ Bu isimde ürün bulunamadı.", ephemeral: true });
    }

    urunler[urunIndex].fiyat = yeniFiyat;
    db.set("urunler", urunler);

    const embed = new EmbedBuilder()
      .setTitle("✅ Fiyat Güncellendi")
      .setDescription(`**${isim}** adlı ürünün fiyatı ${yeniFiyat}₺ olarak güncellendi.`)
      .setColor("Green");

    interaction.reply({ embeds: [embed] });
  },
};