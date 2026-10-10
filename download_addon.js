const axios = require('axios');

module.exports = async (sock, from, m, command, q) => {
    try {
        if (command === 'facebook' || command === 'fb') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan link FB!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            await sock.sendMessage(from, { video: { url: res.data.result.hd }, caption: 'Sukses!' }, { quoted: m });
        }
        else if (command === 'pinterest' || command === 'pin' || command === 'img') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan kata kunci!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            await sock.sendMessage(from, { image: { url: res.data.result }, caption: 'Hasil pin!' }, { quoted: m });
        }
        else if (command === 'play') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan judul lagu!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            await sock.sendMessage(from, { audio: { url: res.data.result.audioUrl }, mimetype: 'audio/mp4' }, { quoted: m });
        }
        else if (command === 'capcut' || command === 'cc') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan link Capcut!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            await sock.sendMessage(from, { video: { url: res.data.result.videoUrl } }, { quoted: m });
        }
        else if (command === 'random' || command === 'r') {
            await sock.sendMessage(from, { image: { url: 'https://podspace.my.id' }, caption: 'Anime Random!' }, { quoted: m });
        }
    } catch {
        await sock.sendMessage(from, { text: '❌ Server unduhan penuh.' }, { quoted: m });
    }
};

