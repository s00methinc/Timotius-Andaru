
// NAMA : Timotius Andaru DjatmikoJati
// NIM : 1710624146
// Kelas - Jurusan : D - Bisnis Digtial 
// Matkul : Web Development


//  Jelaskan Kodingan ini apa : Memastikan kode Javascript bisa dijalankan setelah seluruh struktur HTML selesai diproses browser.
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Jelaskan Kodingan ini apa : Untuk meng-inisialisasi varibel (const) untuk mengambil elemen-eleme dari DOM (Layar, Gambar, Tombol).
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Jelaskan Kodingan ini apa : Untuk menyimpan string asset gambar URL, untuk tampilan visual status kalkulator.
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Jelaskan Kodingan ini apa : Mengubah gambar status dari kalkulator. Jika status "success" gambar jadi hijau, jika "error" jadi merah.
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Jelaskan Kodingan ini apa : Untuk mengatur kondisi default kalkuklator, pengatur reset gambar kembali mode normal saat statusnya bukan "success" atau "error".
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Jelaskan Kodingan ini apa : Mengosongkan input display dan mereset gambat ke normal, fungsi untuk fitur tombol "C" (Clear).
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Jelaskan Kodingan ini apa : Untuk fitur "DEL" dengan metode manipulasi string menghapus satu katakter terakhir dari yang ada di layar.
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Jelaskan Kodingan ini apa : Menambahkan angka / operator yang diklik pengguna ke bagian paling akhir dari teks yang sedang tampil dari layar.
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Jelaskan Kodingan ini apa : Memproses hitungan matematika dari rumus yang tertulis di layar saat tombol "=" ditekan.
             */
            function calculateResult() {
                //  Jelaskan Kodingan ini apa : Untuk pengecekan validasi perhitunga. Jika layar masih kosong tapi pengguna menekan "=" maka sistem akan menganggapnya kesalahan dan menampilkan statuts error.
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Jelaskan Kodingan ini apa : Untuk pengaturan timer otomatis, memberi delay 1,5 ddetik, setelah itu sistem otomatis memanggil clearDisplay guna menghapus pesan error dari layar.
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Jelaskan Kodingan ini apa : Menggunakan fungsi eval() untuk menghitung string matematika yang ada di layar. Mmeberikan jawaban akhir dari perhitung, contohnya "2+2" menjadia angka "4".
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa : mengganti simbol persen (%) menjadi pembagian 100 (/100) sebelum dihitung, karena javascript membaca "%" sebagai sisa bagi (modulo).
                    ); 
                    
                    //  Jelaskan Kodingan ini apa : Memeriksa apakah hasil hitungan adalah angka yang valid dan terbatas (bukan Infinity atau Nan, misalnya akibat pembagian dengan nol).
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  Jelaskan Kodingan ini apa : Mengubah gambar indikator menjadi tampilan "sukses" berwarna hijau karena perhitungan berhasil dilakukan.
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Jelaskan Kodingan ini apa : Mengubah gamabr idikator menjadi tampilan "error" berwarna merah karena terjdi kesalahan pada rumus.
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Jelaskan Kodingan ini apa : Melakukan perulangan (looping) untuk mengambil setiap tombol kalkulator satu per satu dan memasang "pendengar klik" (click listener).
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Jelaskan Kodingan ini apa : Menentukan tindakan yang harus dilakukan berdasarkan tombol spesifik yang ditekan ("C","DEL","=", atau angka).
                    switch(value) {
                        case 'C':
                            //  Jelaskan Kodingan ini apa : Memberi fungsi mereset calculator / menghilangkan perhitungan jika di tekan tombol "C".
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Jelaskan Kodingan ini apa : Memberi fungsi menghapus satu angka paling depan jika memencet tombol "DEL".
                            deleteLastChar();
                            break;
                        case '=':
                            //  Jelaskan Kodingan ini apa : Memberi fungsi berupa hasil dari perhitungan yang ada jika diklik tombol "=".
                            calculateResult();
                            break;
                        default:
                            //  Jelaskan Kodingan ini apa : Mereset layar seblum menampilkan pesan suskes / error, jika tombol yang ditekan bukan tombol fungsi yang ada di kalkulator.
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //  Jelaskan Kodingan ini apa : Menambahkan fitur tambahan agar kalkulator bisa dioperasikan menggunakan keyboard PC, Laptop, atau device lainnya (Input angka, Enter, Backspace, DLL) tidak hanya lewat klik mouse.
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });