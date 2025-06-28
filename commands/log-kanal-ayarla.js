const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "log-kanal-ayarla",
  description: "Log kanalı ayarlar.",
  type: 1,
  options: [
    {
      name: "kanal",
      description: "Logların gönderileceği kanal",
      type: 7, // CHANNEL
      required: true,
      channel_types: [0], // Sadece metin kanalı
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: "❌ Bu komutu kullanmak için Yönetici iznine sahip olmalısınız.",
        ephemeral: true,
      });
    }

    const kanal = interaction.options.getChannel("kanal");

    if (kanal.type !== 0) { // GUILD_TEXT
      return interaction.reply({
        content: "❌ Lütfen sadece metin kanalı seçiniz.",
        ephemeral: true,
      });
    }

    db.set(`log_kanal_${interaction.guild.id}`, kanal.id);

    const embed = new EmbedBuilder()
      .setTitle("✅ Log Kanalı Ayarlandı")
      .setDescription(`Log kanalı başarıyla ${kanal} olarak ayarlandı.`)
      .setColor("Green");

    return interaction.reply({ embeds: [embed] });
  },
};