const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // MySQL kullanıcı adın
    password: '',  // Şifren (eğer varsa)
    database: 'ders_programi'
});

db.connect(err => {
    if (err) {
        console.error('MySQL bağlantı hatası:', err);
        return;
    }
    console.log('MySQL bağlantısı başarılı!');
});

module.exports = db;
