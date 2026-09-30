// ===============================
// KERANJANG TELUR ASIN
// ===============================

// Ambil data keranjang dari localStorage
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];


// ===============================
// TAMBAH PRODUK KE KERANJANG
// ===============================

function tambahKeranjang(nama, harga) {
    let produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert(nama + " berhasil ditambahkan ke keranjang!");

    tampilkanKeranjang();
}


// ===============================
// TAMPILKAN KERANJANG
// ===============================

function tampilkanKeranjang() {

    let tempatKeranjang = document.getElementById("cartItems");
    let totalHarga = document.getElementById("cartTotal");

    // Kalau bukan halaman keranjang, hentikan
    if (!tempatKeranjang) {
        return;
    }

    tempatKeranjang.innerHTML = "";

    if (keranjang.length === 0) {

        tempatKeranjang.innerHTML = `
            <p>Keranjang masih kosong.</p>
        `;

        if (totalHarga) {
            totalHarga.innerText = "Rp0";
        }

        return;
    }

    let total = 0;

    keranjang.forEach(function(item, index) {

        let subtotal = item.harga * item.jumlah;

        total += subtotal;

        tempatKeranjang.innerHTML += `
            <div class="cart-item">

                <div>
                    <h3>${item.nama}</h3>
                    <p>Harga: Rp${item.harga.toLocaleString("id-ID")}</p>

                    <button onclick="kurangiJumlah(${index})">−</button>

                    <span>${item.jumlah}</span>

                    <button onclick="tambahJumlah(${index})">+</button>

                    <p>
                        Subtotal:
                        Rp${subtotal.toLocaleString("id-ID")}
                    </p>
                </div>

                <button onclick="hapusProduk(${index})">
                    Hapus
                </button>

            </div>
        `;
    });

    if (totalHarga) {
        totalHarga.innerText =
            "Rp" + total.toLocaleString("id-ID");
    }
}


// ===============================
// TAMBAH JUMLAH
// ===============================

function tambahJumlah(index) {

    keranjang[index].jumlah++;

    simpanKeranjang();

    tampilkanKeranjang();
}


// ===============================
// KURANGI JUMLAH
// ===============================

function kurangiJumlah(index) {

    if (keranjang[index].jumlah > 1) {

        keranjang[index].jumlah--;

    } else {

        keranjang.splice(index, 1);

    }

    simpanKeranjang();

    tampilkanKeranjang();
}


// ===============================
// HAPUS PRODUK
// ===============================

function hapusProduk(index) {

    keranjang.splice(index, 1);

    simpanKeranjang();

    tampilkanKeranjang();
}


// ===============================
// SIMPAN KERANJANG
// ===============================

function simpanKeranjang() {

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );
}


// ===============================
// CHECKOUT WHATSAPP
// ===============================

function checkoutWhatsApp() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong.");

        return;
    }

    let pesan = "Halo, saya ingin memesan Telur Asin Sekawan Enem:%0A%0A";

    let total = 0;

    keranjang.forEach(function(item) {

        let subtotal = item.harga * item.jumlah;

        total += subtotal;

        pesan +=
            item.nama +
            " x" +
            item.jumlah +
            " = Rp" +
            subtotal.toLocaleString("id-ID") +
            "%0A";
    });

    pesan +=
        "%0ATotal: Rp" +
        total.toLocaleString("id-ID");

    // GANTI NOMOR INI DENGAN NOMOR WHATSAPP KAMU
    let nomorWhatsApp = "6281234567890";

    let link =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        pesan;

    window.open(link, "_blank");
}


// ===============================
// JALANKAN SAAT HALAMAN DIBUKA
// ===============================

document.addEventListener("DOMContentLoaded", function() {

    tampilkanKeranjang();

});