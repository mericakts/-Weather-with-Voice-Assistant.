const url = 'https://api.openweathermap.org/data/2.5';
const key = '136ba67c1ace5aee81610d1a315a1391';
const searchBar = document.getElementById('searchBar');
const speechButton = document.getElementById('speechButton'); // Eklediğimiz sesli okuma butonu

const setQuery = (e) => {
    if (e.key === 'Enter') {
        getResult(searchBar.value);
    }
};

const getResult = (cityName) => {
    let query = `${url}/weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
        .then(weather => weather.json())
        .then(displayResult)
        .catch(error => console.error('Hava durumu verisi alınamadı.', error));
};

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description; // "result.weather" üzerinden doğru özelliğe erişim

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;
    
    // Hava durumu bilgilerini sesli olarak okumak için
    readWeatherDataAloud(`${result.name} şehrinde hava durumu: ${Math.round(result.main.temp)} derece, ${result.weather[0].description}.`);
};

// Metni sesli olarak oku
const readWeatherDataAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
};

searchBar.addEventListener('keypress', setQuery);

// Sesli okuma butonu tıklanınca hava durumu bilgilerini oku
speechButton.addEventListener('click', () => {
    const cityName = searchBar.value;
    if (cityName.trim() !== '') {
        getResult(cityName);
    }
});
