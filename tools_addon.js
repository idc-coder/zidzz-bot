const axios = require('axios');

module.exports = async (sock, from, m, command, q) => {
    try {
        if (command === 'cuaca' || command === 'weather') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan nama kota!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            const w = res.data.result;
            await sock.sendMessage(from, { text: `🌤️ *INFO CUACA ${q.toUpperCase()}*\n• Kondisi: ${w.condition}\n• Suhu: ${w.temperature}°C` }, { quoted: m });
        }
        else if (command === 'translate' || command === 'tr') {
            const teks = q.split('|');
            if (!teks[1]) return sock.sendMessage(from, { text: '❌ Contoh: .translate en|halo pagi' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{teks[0]}&text=${encodeURIComponent(teks[1])}`);
            await sock.sendMessage(from, { text: `🔤 *TERJEMAHAN*\n\n${res.data.result}` }, { quoted: m });
        }
        else if (command === 'jadwalsholat' || command === 'sholat') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan daerah!' }, { quoted: m });
            const res = await axios.get(`https://podspace.my.id{encodeURIComponent(q)}`);
            const s = res.data.result;
            await sock.sendMessage(from, { text: `Subuh: ${s.subuh}\nMaghrib: ${s.maghrib}` }, { quoted: m });
        }
        else if (command === 'attp') {
            await sock.sendMessage(from, { sticker: { url: `https://podspace.my.id{encodeURIComponent(q)}` } }, { quoted: m });
        }
        else if (command === 'ttp') {
            await sock.sendMessage(from, { sticker: { url: `https://podspace.my.id{encodeURIComponent(q)}` } }, { quoted: m });
        }
    } catch {
        await sock.sendMessage(from, { text: '❌ Gagal memproses data utilitas.' }, { quoted: m });
    }
};

