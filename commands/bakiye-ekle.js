const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "bakiye-ekle",
  description: "Belirtilen kullanıcıya bakiye ekler (Yönetici izni gerektirir).",
  type: 1,
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    {
      name: "kullanıcı",
      description: "Bakiye eklenecek kullanıcı",
      type: 6,
      required: true,
    },
    {
      name: "miktar",
      description: "Eklenecek miktar",
      type: 4,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser("kullanıcı");
    const miktar = interaction.options.getInteger("miktar");

    if (miktar <= 0) {
      return interaction.reply({
        content: "❌ Lütfen geçerli bir miktar girin.",
        ephemeral: true,
      });
    }

    db.add(`bakiye_${user.id}`, miktar);

    const embed = new EmbedBuilder()
      .setTitle("💸 Bakiye Eklendi")
      .setDescription(`✅ **${user.tag}** adlı kullanıcıya \`${miktar}₺\` bakiye eklendi.`)
      .setColor("Green");

    interaction.reply({ embeds: [embed] });
  },
};