const axios = require('axios');

module.exports = async (sock, from, m, command, q) => {
    const pilih = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Bank data cadangan lokal jika API internet mati/error
    const listTruth = [
        "Siapa orang yang diam-diam kamu sukai di grup ini?",
        "Kapan terakhir kali kamu berbohong demi kebaikan diri sendiri?",
        "Apa rahasia terbesar yang belum pernah kamu ceritakan ke siapapun?",
        "Hal paling memalukan apa yang pernah kamu lakukan di depan umum?",
        "Kalau kamu bisa bertukar nasib dengan seseorang, siapa orang itu?"
    ];

    const listDare = [
        "Kirim pesan teks acak berisi kata 'Aku sayang kamu' ke kontak paling atas di WA-mu lalu kirim SS-nya!",
        "Ganti status WhatsApp kamu menjadi 'Aku wibu akut' selama 1 jam ke depan.",
        "Kirim pesan suara (VN) menyanyikan reff lagu favoritmu ke grup ini!",
        "Kirim emoji '🦄' ke room chat admin/owner bot tanpa konteks apapun.",
        "Sebutkan 3 kekurangan terbesar dari owner bot ini secara jujur!"
    ];

    try {
        if (command === 'ai') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan pertanyaan setelah command!' }, { quoted: m });
            const res = await axios.get(`https://itzpire.site{encodeURIComponent(q)}`);
            await sock.sendMessage(from, { text: res.data.data }, { quoted: m });
            
        } else if (command === 'apakah') {
            await sock.sendMessage(from, { text: `? Apakah ${q}\n\n🤖 Jawaban: ${pilih(['Iya', 'Tidak', 'Mungkin saja', 'Bisa jadi', 'Sangat tidak mungkin'])}` }, { quoted: m });
            
        } else if (command === 'kapankah') {
            await sock.sendMessage(from, { text: `📅 Kapan ${q}\n\n🤖 Jawaban: ${pilih(['1 Tahun lagi', '2 Bulan lagi', 'Esok hari', 'Gak akan pernah', '10 Tahun lagi'])}` }, { quoted: m });
            
        } else if (command === 'cekcek') {
            await sock.sendMessage(from, { text: `🔍 *Analisis Kadar ${q.toUpperCase()}* Anda adalah *${Math.floor(Math.random() * 101)}%*!` }, { quoted: m });
            
        } else if (command === 'truth' || command === 'dare') {
            try {
                // Memperbaiki endpoint path API Itzpire yang benar
                const res = await axios.get(`https://itzpire.site{command}`);
                if (res.data && res.data.data) {
                    await sock.sendMessage(from, { text: `*🎲 [ ${command.toUpperCase()} ]*\n\n${res.data.data}` }, { quoted: m });
                } else {
                    throw new Error("Respons API kosong");
                }
            } catch (apiErr) {
                // FALLBACK: Menggunakan data lokal jika server internet bermasalah
                const dataLokal = command === 'truth' ? pilih(listTruth) : pilih(listDare);
                await sock.sendMessage(from, { text: `*🎲 [ ${command.toUpperCase()} - LOCAL ]*\n\n${dataLokal}` }, { quoted: m });
            }
        }
    } catch (e) {
        sock.sendMessage(from, { text: '❌ Terjadi kesalahan sistem internal.' }, { quoted: m });
    }
};


