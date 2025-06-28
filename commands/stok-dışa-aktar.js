const { AttachmentBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
const fs = require("fs");

module.exports = {
  name: "stok-dışa-aktar",
  description: "Belirtilen ürünün stok verilerini .txt olarak dışa aktarır.",
  type: 1,
  options: [
    {
      name: "ürün",
      description: "Dışa aktarılacak stok verisinin ait olduğu ürün adı.",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: "❌ Bu komutu kullanmak için yönetici iznine sahip olmalısınız.",
        ephemeral: true,
      });
    }

    const isim = interaction.options.getString("ürün").toLowerCase();
    const stok = db.get(`stok_${isim}`) || [];

    if (stok.length === 0) {
      return interaction.reply({
        content: "❌ Bu ürünün stok verisi bulunamadı.",
        ephemeral: true,
      });
    }

    const filePath = `./temp/stok-${isim}.txt`;

    if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");

    fs.writeFileSync(filePath, stok.join("\n"), "utf8");

    const file = new AttachmentBuilder(filePath);
    const embed = new EmbedBuilder()
      .setTitle("📄 Stok Verisi Dışa Aktarıldı")
      .setDescription(`**${isim}** ürününün teslim edilecek verileri aşağıda.`)
      .setColor("Blue");

    await interaction.reply({ embeds: [embed], files: [file] });

    setTimeout(() => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }, 5000);
  },
};