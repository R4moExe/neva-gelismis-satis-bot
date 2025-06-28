const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "bakiye-sil",
  description: "Belirtilen kullanıcının bakiyesini sıfırlar.",
  type: 1,
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    {
      name: "kullanıcı",
      description: "Bakiyesi sıfırlanacak kullanıcı",
      type: 6, // USER
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser("kullanıcı");

    db.delete(`bakiye_${user.id}`);

    const embed = new EmbedBuilder()
      .setTitle("💸 Bakiye Sıfırlandı")
      .setDescription(`✅ **${user.tag}** adlı kullanıcının bakiyesi sıfırlandı.`)
      .setColor("Red");

    interaction.reply({ embeds: [embed] });
  },
};