const translations = {
    'en': {
        'nav_platform': 'Platform', 'nav_catalog': 'Catalog',
        'hero_title': 'Infrastructure for the <br><em>Creative Economy</em>',
        'hero_subtitle': 'Scale. Monetize. Connect. Your professional backstage pass.',
        'join_btn': 'Join the Network', 'catalog_title': 'Creator Catalog',
        'search_placeholder': 'Search...', 'auth_title': 'Welcome to ACE', 'login_btn': 'Login'
    },
    'ru': {
        'nav_platform': 'Платформа', 'nav_catalog': 'Каталог',
        'hero_title': 'Инфраструктура для <br><em>Экономики Креаторов</em>',
        'hero_subtitle': 'Масштабируй. Монетизируй. Связывайся. Твой профессиональный backstage-пасс.',
        'join_btn': 'Присоединиться', 'catalog_title': 'Каталог Креаторов',
        'search_placeholder': 'Поиск...', 'auth_title': 'Добро пожаловать', 'login_btn': 'Войти'
    }
};



// --- Управление языком ---
function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
        if (el.tagName === 'INPUT') el.placeholder = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
}

// --- Каталог ---
function displayCreators(data) {
    const list = document.getElementById('creatorList');
    list.innerHTML = data.map((item, index) => `
        <div class="card">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.followers}</p>
            <button class="btn-small" onclick="openProfile(${index})" style="cursor:pointer; border:none; padding:8px 15px; border-radius:15px;">View Profile</button>
        </div>
    `).join('');
}

function filterCreators() {
    const term = document.getElementById('creatorSearch').value.toLowerCase();
    const filtered = creators.filter(c => c.name.toLowerCase().includes(term));
    displayCreators(filtered);
}

// --- Модальные окна ---
function openModal(id) {
    const m = document.getElementById(id);
    m.style.display = "block";
    setTimeout(() => m.classList.add('active'), 10);
}

function closeModal(id) {
    const m = document.getElementById(id);
    m.classList.remove('active');
    setTimeout(() => m.style.display = "none", 400);
}

// Привязка событий
document.getElementById('joinBtn').onclick = () => openModal('authModal');

function openProfile(index) {
    const p = creators[index];
    document.getElementById('profileData').innerHTML = `
        <h2 style="font-family:'Playfair Display'">${p.name}</h2>
        <p><strong>Bio:</strong> ${p.bio}</p>
        <p><strong>Viral Factor:</strong> ${p.whyPopular}</p>
        <button class="btn-main" style="width:100%; margin-top:15px;">Message Manager</button>
    `;
    openModal('profileModal');
}

// --- Вход (Adrianasarn / adriana123) ---
document.getElementById('loginBtn').onclick = () => {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === "Adrianasarn" && p === "adriana123") {
        closeModal('authModal');
        showPlatform(); // Сразу переходим в личный кабинет
    } else {
        document.getElementById('message').innerText = "Wrong credentials!";
        document.getElementById('message').style.color = "red";
    }
};

// --- РАЗДЕЛ ПЛАТФОРМА ---
function showPlatform() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="platform-container">
            <h1 style="font-family: var(--font-serif); font-size: 2.5rem;">Adrianasarn's Hub</h1>
            <p>You have <span style="color:var(--accent); font-weight:bold;">1 new contract offer</span> from Prada.</p>
            
            <div class="stats-grid">
                <div class="stat-card"><h4>Monthly Revenue</h4><div class="value">$12,450</div><div style="color:green; font-size:0.8rem;">↑ 12% growth</div></div>
                <div class="stat-card"><h4>Total Followers</h4><div class="value">2,104,300</div><div style="color:green; font-size:0.8rem;">↑ 5k new today</div></div>
                <div class="stat-card"><h4>Active Campaigns</h4><div class="value">4</div><p style="font-size:0.7rem;">Brand: Chanel, Prada, Revolve</p></div>
            </div>

            <h3 style="font-family: var(--font-serif); margin-top:40px;">Pending Offers</h3>
            <div class="stat-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong>Prada - Fall Collection 2026</strong>
                    <p style="font-size:0.8rem; color:#666;">Budget: $45,000 | 3 Reels, 5 Stories</p>
                </div>
                <button class="btn-main" style="padding:10px 25px;">Review Deal</button>
            </div>
        </div>
    `;
}

document.getElementById('platformLink').onclick = (e) => {
    e.preventDefault();
    // В реальности здесь была бы проверка: если залогинен — показать, если нет — открыть вход
    openModal('authModal'); 
};

window.onload = () => { changeLanguage('en'); displayCreators(creators); };
let currentIndex = 1; // Начнем с 1, так как 0 будет клоном
const photos = [
    "ada 2.jpeg",
    "ada3.jpeg",
    "ada4.jpeg"
];

function initTopSlider() {
    const track = document.getElementById('sliderTrack');
    
    // Создаем бесконечный ряд: [Последнее фото] [Фото 1] [Фото 2] [Фото 3] [Первое фото]
    const fullList = [photos[photos.length - 1], ...photos, photos[0]];
    track.innerHTML = fullList.map(url => `<img src="${url}">`).join('');
    
    updateActiveSlide();
    
    // Начальная позиция (пропускаем первый клон)
    track.style.transition = "none";
    track.style.transform = `translateX(-${currentIndex * 450}px)`;
    
    setInterval(nextSlide, 3000); // 3 секунды — идеальное время для восприятия
}

function updateActiveSlide() {
    const imgs = document.querySelectorAll('#sliderTrack img');
    imgs.forEach(img => img.classList.remove('active'));
    if(imgs[currentIndex]) imgs[currentIndex].classList.add('active');
}

function nextSlide() {
    const track = document.getElementById('sliderTrack');
    if (currentIndex >= photos.length + 1) return;

    currentIndex++;
    track.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    track.style.transform = `translateX(-${currentIndex * 450}px)`;
    updateActiveSlide();

    // Бесконечный прыжок вперед
    if (currentIndex === photos.length + 1) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 1;
            track.style.transform = `translateX(-${currentIndex * 450}px)`;
            updateActiveSlide();
        }, 800);
    }
}

function prevSlide() {
    const track = document.getElementById('sliderTrack');
    if (currentIndex <= 0) return;

    currentIndex--;
    track.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    track.style.transform = `translateX(-${currentIndex * 450}px)`;
    updateActiveSlide();

    // Бесконечный прыжок назад
    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = photos.length;
            track.style.transform = `translateX(-${currentIndex * 450}px)`;
            updateActiveSlide();
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', initTopSlider);
let trendsPosition = 0;

function moveTrends(direction) {
    const track = document.getElementById('trendsTrack');
    const cardWidth = document.querySelector('.trend-card').offsetWidth + 20; // ширина + gap
    const maxScroll = track.children.length - 3; // 3 карточки видны одновременно

    trendsPosition += direction;

    // Границы, чтобы слайдер не улетал в пустоту
    if (trendsPosition < 0) trendsPosition = 0;
    if (trendsPosition > maxScroll) trendsPosition = maxScroll;

    track.style.transform = `translateX(-${trendsPosition * cardWidth}px)`;
}

// 1. База данных с индустриями
const creatorsData = [
    { name: "Adriana Sarn", industry: "Fashion", followers: "2.1M", img: "ada 3.jpeg", bio: "Digital architect." },
    { name: "Hayley Baylee", industry: "Lifestyle", followers: "15M", img: "hayley.jpg", bio: "Viral comedy queen." },
    { name: "Alex Riv", industry: "Digital", followers: "800K", img: "nate.jpg", bio: "AI Visionary." },
    { name: "Sasha Glow", industry: "Fashion", followers: "1.2M", img: "SWAG.jpg", bio: "High fashion model." }
];

let currentCategory = 'all';

// 2. Функция переключения разделов
function showCatalog(e) {
    if (e) e.preventDefault(); // Отменяем переход по ссылке #
    
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('catalogSection').style.display = 'block';
    
    // Сбрасываем фильтры и показываем всех
    renderCreators(creatorsData);
    window.scrollTo(0, 0);
}

// 3. Функция отрисовки карточек
function renderCreators(data) {
    const list = document.getElementById('creatorList');
    list.innerHTML = data.map((item, index) => `
        <div class="card" style="background:#fff; padding:20px; border-radius:25px; border:1px solid #eee;">
            <div style="font-size:0.7rem; color:var(--accent); text-transform:uppercase;">${item.industry}</div>
            <img src="${item.img}" style="width:100%; height:200px; object-fit:cover; border-radius:15px; margin:10px 0;">
            <h3 style="font-family:var(--font-serif);">${item.name}</h3>
            <p style="color:#888; font-size:0.8rem;">${item.followers} followers</p>
            <button class="btn-main" onclick="openProfile(${index})" style="width:100%; margin-top:10px; padding:10px;">View Stats</button>
        </div>
    `).join('');
}

// 4. Поиск и Фильтр
function filterCreators() {
    const term = document.getElementById('creatorSearch').value.toLowerCase();
    const filtered = creatorsData.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(term);
        const matchesCat = currentCategory === 'all' || c.industry === currentCategory;
        return matchesSearch && matchesCat;
    });
    renderCreators(filtered);
}

function filterByCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === cat || (cat === 'all' && btn.innerText === 'All'));
    });
    filterCreators();
}

// 5. ГЛАВНОЕ: Связываем твою кнопку из HTML с функцией
document.addEventListener('DOMContentLoaded', () => {
    const catalogLink = document.querySelector('[data-key="nav_catalog"]');
    if (catalogLink) {
        catalogLink.onclick = showCatalog;
    }
    
    
    
});