// === 1. FUNGSI ROUTING  ===
// Fungsi untuk mengambil parameter URL [cite: 265]
function getParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fungsi untuk memuat konten dinamis [cite: 266]
function loadPage(page) {
    fetch(page + ".html")
        .then(response => {
            if (!response.ok) throw new Error("Page not found");
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data; // Memasukkan konten [cite: 266]
            
            // PENTING: Jalankan fungsi interaktif SETELAH konten dimuat
            initFilter();
            initSlider();
            initWhatsApp();
            setActiveMenu(page); // Tandai menu aktif [cite: 267]
        })
        .catch(() => {
            document.getElementById("content").innerHTML = "<h2>Halaman tidak ditemukan</h2>";
        });
}

// Fungsi indikator menu aktif [cite: 267, 268]
function setActiveMenu(page) {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "index.html?p=" + page) {
            link.classList.add("active");
        }
    });
}

// === 2. FUNGSI FITUR INTERAKTIF (DIBUNGKUS ULANG) ===

function initFilter() {
    const filterSelect = document.getElementById("filterCategory");
    const productCards = document.querySelectorAll(".card");
    if (filterSelect) {
        filterSelect.addEventListener("change", function () {
            const selectedValue = this.value;
            productCards.forEach(card => {
                const category = card.getAttribute("data-category");
                card.style.display = (selectedValue === "all" || category === selectedValue) ? "flex" : "none";
            });
        });
    }
}

function initSlider() {
    const track = document.getElementById('sliderTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (track && track.children.length > 0) {
        const slides = Array.from(track.children);
        let currentSlide = 0;
        function update() {
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${width * currentSlide}px)`;
        }
        if (nextBtn) nextBtn.onclick = () => { currentSlide = (currentSlide + 1) % slides.length; update(); };
        if (prevBtn) prevBtn.onclick = () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; update(); };
    }
}

function initWhatsApp() {
    const contactForm = document.getElementById("customForm");
    if (contactForm) {
        contactForm.onsubmit = function (e) {
            e.preventDefault();
            const nama = document.getElementById("nama").value;
            const jenis = document.getElementById("jenis").value;
            const nomorWA = "6281234567890";
            const pesan = `Halo Saribu Furniture,%0A*Nama:* ${nama}%0A*Jenis:* ${jenis}`;
            window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
        };
    }
}

// === 3. EKSEKUSI SAAT LOAD PERTAMA [cite: 269] ===

window.onload = function() {
    let page = getParameter("p") || "home"; // Default 'home' jika parameter kosong [cite: 270]
    loadPage(page);

    // Navbar scroll tetap bisa di luar karena elemen header ada di index.html (bukan dinamis)
    const header = document.querySelector('header');
    window.onscroll = () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgb(45, 7, 7)';
            header.style.padding = '5px 0';
        } else {
            header.style.background = 'rgb(57, 9, 9)';
            header.style.padding = '0';
        }
    };
};