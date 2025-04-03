const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // MySQL bağlantısı için

const app = express();

app.use(express.json());
app.use(cors());

// MySQL Bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yeni_sifren', // Buraya kendi şifreni yaz!
    database: 'ders_programi'
});

db.connect(err => {
    if (err) {
        console.error('MySQL bağlantı hatası:', err);
        return;
    }
    console.log('MySQL bağlantısı başarılı');
});

// Ders ekleme
app.post('/dersler', (req, res) => {
    const { isim, gun, saat, derslik, ogretmen } = req.body;
    const sql = 'INSERT INTO dersler (isim, gun, saat, derslik, ogretmen) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [isim, gun, saat, derslik, ogretmen], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, isim, gun, saat, derslik, ogretmen });
    });
});

// Tüm dersleri alma
app.get('/dersler', (req, res) => {
    db.query('SELECT * FROM dersler', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Ders silme
app.delete('/dersler/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM dersler WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ders silindi' });
    });
});

// Ders güncelleme
app.put('/dersler/:id', (req, res) => {
    const id = req.params.id;
    const { isim, gun, saat, derslik, ogretmen } = req.body;
    const sql = 'UPDATE dersler SET isim=?, gun=?, saat=?, derslik=?, ogretmen=? WHERE id=?';

    db.query(sql, [isim, gun, saat, derslik, ogretmen, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, isim, gun, saat, derslik, ogretmen });
    });
});

app.listen(3001, () => console.log('Server 3001 portunda çalışıyor'));
