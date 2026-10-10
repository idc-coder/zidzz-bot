const axios = require('axios');

module.exports = async (sock, from, m, command, q) => {
    if (!q && !['freefire', 'mlbb'].includes(command)) {
        return sock.sendMessage(from, { text: `❌ Masukkan parameter teks!` }, { quoted: m });
    }

    try {
        if (command === 'twitterqc' || command === 'tqc') {
            const api = `https://podspace.my.id{encodeURIComponent(m.pushName)}&username=${encodeURIComponent(m.pushName)}&text=${encodeURIComponent(q)}&avatar=https://ibb.co`;
            await sock.sendMessage(from, { image: { url: api }, caption: 'Nih tweet palsu lu jadi!' }, { quoted: m });
        }
        else if (command === 'whatsappqc' || command === 'waqc') {
            const api = `https://podspace.my.id{encodeURIComponent(m.pushName)}&text=${encodeURIComponent(q)}`;
            await sock.sendMessage(from, { image: { url: api } }, { quoted: m });
        }
        else if (command === 'mediaplayerqc' || command === 'mpqc') {
            const api = `https://podspace.my.id{encodeURIComponent(q)}&artist=${m.pushName}`;
            await sock.sendMessage(from, { image: { url: api } }, { quoted: m });
        }
        else if (command === 'meme' || command === 'smeme') {
            const teks = q.split('|');
            const api = `https://podspace.my.id{encodeURIComponent(teks[0] || ' ')}&bottom=${encodeURIComponent(teks[1] || ' ')}&img=https://ibb.co`;
            await sock.sendMessage(from, { image: { url: api }, caption: 'Meme selesai!' }, { quoted: m });
        }
        else if (command === 'freefire' || command === 'mlbb') {
            await sock.sendMessage(from, { text: `🎮 *MAKER PROFILE ${command.toUpperCase()}*\n• Fitur mock profile generator dinonaktifkan.` }, { quoted: m });
        }
    } catch {
        await sock.sendMessage(from, { text: '❌ Gagal memproses gambar.' }, { quoted: m });
    }
};

