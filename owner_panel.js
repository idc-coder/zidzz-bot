const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

module.exports = async (sock, input, question) => {
    // Membaca database lokal JSON untuk VIP/VVIP
    let db = { vip: [], vvip: [], jadibot_slots: 5 };
    try {
        db = JSON.parse(fs.readFileSync('./user_db.json'));
    } catch (e) {
        fs.writeFileSync('./user_db.json', JSON.stringify(db));
    }

    switch (input) {
        // PERINTAH 1: BROADCAST ALL GROUPS
        case '1':
            const msgBc = await question(chalk.yellow("Isi Pesan Broadcast: "));
            if (!msgBc) return console.log(chalk.red("Pesan tidak boleh kosong."));
            try {
                console.log(chalk.gray("Menghimpun data grup..."));
                const getGroups = await sock.groupFetchAllParticipating();
                const groups = Object.values(getGroups).map(v => v.id);
                console.log(chalk.gray(`Mengirim ke ${groups.length} grup...`));
                for (let id of groups) {
                    await sock.sendMessage(id, { text: `📢 *[ BROADCAST UTAMA OWNER ]*\n\n${msgBc}` });
                }
                console.log(chalk.green("✔ Broadcast sukses dikirim!"));
            } catch (e) {
                console.log(chalk.red("❌ Gagal mengirim broadcast."));
            }
            break;

        // PERINTAH 2: DIAGNOSTIK RAM
        case '2':
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
            console.log(chalk.cyan(`\n📊 [ DIAGNOSTIK SYSTEM ]`));
            console.log(`• RAM Sisa : ${freeMem} MB / ${totalMem} MB`);
            console.log(`• Platform : ${os.platform()} (${os.arch()})`);
            console.log(`• Uptime   : ${(os.uptime() / 60).toFixed(1)} Menit`);
            break;

        // PERINTAH 5: HAPUS SESSION CACHE
        case '5':
            console.log(chalk.red("\n⌛ Menghapus folder session_zidzz..."));
            try {
                fs.rmSync('session_zidzz', { recursive: true, force: true });
                console.log(chalk.green("✔ Berhasil dihapus! Sistem akan keluar. Silakan start ulang."));
                process.exit(0);
            } catch (e) {
                console.log(chalk.red("Gagal menghapus folder. Hapus manual via 'rm -rf'"));
            }
            break;

        // PERINTAH 8: TAMBAH VIP
        case '8':
            let targetV = await question(chalk.yellow("Masukkan Nomor Jadi VIP (628xxx): "));
            targetV = targetV.replace(/[^0-9]/g, '');
            if (!targetV) return console.log(chalk.red("Nomor tidak valid."));
            if (!db.vip.includes(targetV)) {
                db.vip.push(targetV);
                fs.writeFileSync('./user_db.json', JSON.stringify(db));
                console.log(chalk.green(`✔ Nomor ${targetV} Berhasil jadi VIP!`));
            } else {
                console.log(chalk.yellow("Nomor tersebut sudah VIP."));
            }
            break;

        // PERINTAH 9: TAMBAH VVIP
        case '9':
            let targetVV = await question(chalk.yellow("Masukkan Nomor Jadi VVIP (628xxx): "));
            targetVV = targetVV.replace(/[^0-9]/g, '');
            if (!targetVV) return console.log(chalk.red("Nomor tidak valid."));
            if (!db.vvip.includes(targetVV)) {
                db.vvip.push(targetVV);
                fs.writeFileSync('./user_db.json', JSON.stringify(db));
                console.log(chalk.green(`✔ Nomor ${targetVV} Berhasil jadi VVIP!`));
            } else {
                console.log(chalk.yellow("Nomor tersebut sudah VVIP."));
            }
            break;

        // PERINTAH 10: ATUR SLOT JADIBOT
        case '10':
            let slot = await question(chalk.yellow("Atur Slot Limit Jadibot: "));
            db.jadibot_slots = parseInt(slot) || 0;
            fs.writeFileSync('./user_db.json', JSON.stringify(db));
            console.log(chalk.green(`✔ Maksimal Slot Sewa Diubah ke: ${slot} Perangkat`));
            break;
    }
};

