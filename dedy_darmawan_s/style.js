fetch('https://equran.id/api/v2/surat') // Mengakses API menggunakan fetch
  .then((response) => response.json()) // Mendapatkan response dalam format JSON
  .then((res) => {
    const data = res.data; // Dari objek res disimpan ke dalam variabel data
    surahData(data);
  });

const surahData = (data) => {
  const container = document.querySelector('.container');
  container.innerText = '';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';

  // Mengambil data dari API menggunakan perulangan
  data.forEach((data) => {
    console.log(data);
    // Membuat div pembungkus nomor nama dan nama latin surat
    const surahElement = document.createElement('div');
    surahElement.classList.add("element-surah");
    surahElement.classList.add("surahElement");

    const namaArab = document.createElement('p');
    namaArab.classList.add("p");
    namaArab.classList.add("nama-surah");

    const numberSurah = document.createElement("p");
    numberSurah.classList.add("p");

    const namaLatin = document.createElement("p");
    namaLatin.classList.add("p");
    namaLatin.classList.add("nama-latin");

    const arti = document.createElement("p");
    arti.classList.add("p");
    arti.classList.add("arti-surah");

    const jumlahAyat = document.createElement("p");
    jumlahAyat.classList.add("p");
    jumlahAyat.classList.add("jumlah-ayat");

    // Membuat nomor surah, nama surah latin dan nama surah 
    arti.textContent = data.arti;
    numberSurah.textContent = data.nomor + ". ";
    namaArab.textContent = data.nama;
    jumlahAyat.textContent = data.jumlahAyat + " ayat";
    namaLatin.textContent = data.namaLatin;

    surahElement.style.border = "1px solid white";

    // Memasukkan isi dari API ke dalam let dan div surahElement
    surahElement.appendChild(numberSurah);
    surahElement.appendChild(namaLatin);
    surahElement.appendChild(arti);
    surahElement.appendChild(jumlahAyat);
    surahElement.appendChild(namaArab);
    container.appendChild(surahElement);

    // Tambah event listener
    surahElement.addEventListener("click", () => {
      fetchSurahData(data.nomor);
    });
  });
};

const fetchSurahData = (surahNumber) => {
  fetch(`https://equran.id/api/v2/surat/${surahNumber}`)
    .then((response) => response.json())
    .then((surahData) => {
      const container = document.querySelector('.container');
      container.innerText = "";

      const wrapper = document.createElement("div");
      wrapper.classList.add("title");

      const nameSurah = document.createElement("p");
      nameSurah.classList.add("nama-surah");
      nameSurah.textContent = surahData.data.nama;

      const arti = document.createElement("p");
      arti.classList.add("artii");
      arti.textContent = surahData.data.arti;

      const jumlahAyat = document.createElement("p");
      jumlahAyat.classList.add("ayat-jumlah");
      jumlahAyat.textContent = "Jumlah Ayat : " + surahData.data.jumlahAyat;

      const tempatTurun = document.createElement("p");
      tempatTurun.classList.add("tempat-turun");
      tempatTurun.textContent = "Golongan : " + surahData.data.tempatTurun;

      wrapper.appendChild(nameSurah);
      wrapper.appendChild(arti);
      wrapper.appendChild(jumlahAyat);
      wrapper.appendChild(tempatTurun);
      container.appendChild(wrapper);

      // Menambahkan elemen-ayat untuk setiap ayat dalam surah
      surahData.data.ayat.forEach((ayah, index) => {
        const ayahContainer = document.createElement("div");
        ayahContainer.classList = "ayah-container";
        container.appendChild(ayahContainer);

        const text = document.createElement("p");
        text.classList = "no";
        text.textContent = "Ayat ke - " + ayah.nomorAyat;
        ayahContainer.appendChild(text);
        text.style.right = "end";

        container.style.flexDirection = "column";

        const textArabic = document.createElement("p");
        textArabic.classList = "ayat";
        textArabic.textContent = ayah.teksArab;
        ayahContainer.appendChild(textArabic);

        const audioPlayer = document.createElement("audio");
        audioPlayer.controls = true; //Menambahkan Kontrol ke Pemutar Audio
        audioPlayer.classList.add("audio-player");
        const audioLink = ayah.audio["03"];
        if (audioLink) {
          audioPlayer.src = audioLink;
          ayahContainer.appendChild(audioPlayer);

          audioPlayer.addEventListener("play", () => {  //Menambahkan event listener yang akan dijalankan ketika audio diputar.
            if (activeAudio && activeAudio !== audioPlayer) {
              activeAudio.pause(); //Menjeda audio yang sedang aktif.
            }
            activeAudio = audioPlayer; // Mengatur elemen audio yang sedang diputar sebagai activeAudio
          });
        }

        //teks terjemahan ayat
        const textIndonesia = document.createElement("p");
        textIndonesia.classList = "ayat-indonesia";
        textIndonesia.textContent = ayah.teksIndonesia;
        ayahContainer.appendChild(textIndonesia);
      });
    });
};
