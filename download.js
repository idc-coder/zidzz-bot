const axios = require('axios');

module.exports = async (sock, from, m, command, q, args) => {
    if (!q) {
        return sock.sendMessage(from, { 
            text: '❌ Masukkan link tautan media sosial setelah perintah!' 
        }, { quoted: m });
    }
    
    const amblAudio = args.includes('--audio') || args.includes('mp3');

    try {
        if (command === 'tiktok' || command === 'tt') {
            await sock.sendMessage(from, { 
                text: '⏳ *[ DOWNLOAD ENGINE ]* Mengambil berkas TikTok...' 
            }, { quoted: m });
            
            // Menggunakan API dari bk9 yang aktif dan stabil
            const res = await axios.get(`https://bk9.fun{encodeURIComponent(q)}`);
            const data = res.data.BK9;
            if (amblAudio) {
                await sock.sendMessage(from, { 
                    audio: { url: data.audio }, 
                    mimetype: 'audio/mp4' 
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { 
                    video: { url: data.video }, 
                    caption: data.title || "Sukses diunduh!" 
                }, { quoted: m });
            }
        } 
        else if (command === 'youtube' || command === 'yt') {
            await sock.sendMessage(from, { 
                text: '⏳ *[ DOWNLOAD ENGINE ]* Memproses konversi YouTube...' 
            }, { quoted: m });
            
            const res = await axios.get(`https://bk9.fun{encodeURIComponent(q)}`);
            const data = res.data.BK9;

            if (amblAudio) {
                await sock.sendMessage(from, { 
                    audio: { url: data.audio.url }, 
                    mimetype: 'audio/mp4' 
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { 
                    video: { url: data.video.url }, 
                    caption: data.title || 'Sukses diunduh!' 
                }, { quoted: m });
            }
        } 
        else if (command === 'instagram' || command === 'ig') {
            await sock.sendMessage(from, { 
                text: '⏳ *[ DOWNLOAD ENGINE ]* Menarik data Instagram...' 
            }, { quoted: m });
            
            const res = await axios.get(`https://bk9.fun{encodeURIComponent(q)}`);
            const data = res.data.BK9;
            
            for (let item of data) {
                if (item.type === 'video') {
                    await sock.sendMessage(from, { video: { url: item.url } }, { quoted: m });
                } else {
                    await sock.sendMessage(from, { image: { url: item.url } }, { quoted: m });
                }
            }
        }
    } catch (err) {
        await sock.sendMessage(from, { 
            text: '❌ Berkas gagal diunduh. Server penuh atau tautan salah.' 
        }, { quoted: m });
    }
};




