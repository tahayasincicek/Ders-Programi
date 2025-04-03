import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DersProgrami.css';

export default function DersProgrami() {
    const [dersler, setDersler] = useState([]);
    const [yeniDers, setYeniDers] = useState({ isim: '', gun: '', saat: '', derslik: '', ogretmen: '' });
    const [duzenlenenDers, setDuzenlenenDers] = useState(null);

    const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const derslikler = ['Amfi-1', '108', '106', '1044 Lab', 'Z054'];

    useEffect(() => {
        axios.get('http://localhost:3001/dersler')
            .then(res => setDersler(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (duzenlenenDers) {
            axios.put(`http://localhost:3001/dersler/${duzenlenenDers.id}`, yeniDers)
                .then(res => {
                    setDersler(dersler.map(ders => ders.id === parseInt(res.data.id) ? res.data : ders));
                    setDuzenlenenDers(null);
                    setYeniDers({ isim: '', gun: '', saat: '', derslik: '', ogretmen: '' });
                })
                .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:3001/dersler', yeniDers)
                .then(res => setDersler([...dersler, res.data]))
                .catch(err => console.error(err));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/dersler/${id}`)
            .then(() => setDersler(dersler.filter(ders => ders.id !== parseInt(id))))
            .catch(err => console.error(err));
    };

    const handleEdit = (ders) => {
        setYeniDers({ ...ders });
        setDuzenlenenDers(ders);
    };

    return (
        <div>
            <h2>Ders Programı</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ders İsmi" value={yeniDers.isim} onChange={(e) => setYeniDers({ ...yeniDers, isim: e.target.value })} />
                <select value={yeniDers.gun} onChange={(e) => setYeniDers({ ...yeniDers, gun: e.target.value })}>
                    <option value="">Gün Seç</option>
                    {gunler.map(gun => <option key={gun} value={gun}>{gun}</option>)}
                </select>
                <input type="time" value={yeniDers.saat} onChange={(e) => setYeniDers({ ...yeniDers, saat: e.target.value })} />
                <select value={yeniDers.derslik} onChange={(e) => setYeniDers({ ...yeniDers, derslik: e.target.value })}>
                    <option value="">Derslik Seç</option>
                    {derslikler.map(derslik => <option key={derslik} value={derslik}>{derslik}</option>)}
                </select>
                <input type="text" placeholder="Öğretmen" value={yeniDers.ogretmen} onChange={(e) => setYeniDers({ ...yeniDers, ogretmen: e.target.value })} />
                <button type="submit">{duzenlenenDers ? 'Güncelle' : 'Ekle'}</button>
            </form>
            <ul>
                {dersler.map(ders => (
                    <li key={ders.id}>
                        {`${ders.isim} - ${ders.gun} - ${ders.saat} - ${ders.derslik} - ${ders.ogretmen}`}
                        <button onClick={() => handleEdit(ders)}>Düzenle</button>
                        <button onClick={() => handleDelete(ders.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
