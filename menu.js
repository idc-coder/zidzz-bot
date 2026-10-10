const config = require('../config');
module.exports = async (sock, from, m) => {
    let menuMsg = `🤖 *${config.botName.toUpperCase()} ACTIVE* 🤖\n\n`;
    menuMsg += `*👥 GROUP ADMIN*\n ├ ${config.prefix}kick @tag/nomor\n ├ ${config.prefix}close (Mute group)\n └ ${config.prefix}open (Unmute group)\n\n`;
    menuMsg += `*📥 DOWNLOADER*\n ├ ${config.prefix}tiktok [link]\n ├ ${config.prefix}youtube [link]\n └ ${config.prefix}instagram [link]\n\n`;
    menuMsg += `*🎨 STICKER*\n ├ ${config.prefix}sticker (Reply foto)\n └ ${config.prefix}brat [teks stiker]\n\n`;
    menuMsg += `*🧩 INTERACTIVE GAME*\n ├ ${config.prefix}tebakgambar\n ├ ${config.prefix}tebakkata\n ├ ${config.prefix}susunkata\n ├ ${config.prefix}truth\n └ ${config.prefix}dare\n\n`;
    menuMsg += `*🔮 FUN & AI*\n ├ ${config.prefix}ai [tanya apa saja]\n ├ ${config.prefix}apakah [soal]\n ├ ${config.prefix}kapankah [soal]\n └ ${config.prefix}cekcek [nama]`;
    await sock.sendMessage(from, { text: menuMsg }, { quoted: m });
};

