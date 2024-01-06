

let cities = [
  "القاهرة","الإسكندرية","الجيزة",
  "شرم الشيخ","الأقصر","أسوان","الغردقة",
  "بورت غالب","أسيوط","الإسماعيلية","المنصورة",
  "الزقازيق","السويس","طنطا","كفر الشيخ",
  "دمياط","المنيا","أسوان","قنا",
  "بنها","بني سويف","الجيزة","الأقصر",
  "بنها","الفيوم","بورسعيد","دمنهور",
  "العريش","الطور","إدفو"
];
// Function to add cities to the select dropdown
function addCitiesToDropdown() {
  let selectDropdown = document.getElementById('cities-select');
  for (let city of cities) {
    let option = document.createElement('option');
    option.textContent = city;
    selectDropdown.appendChild(option);
  }
}

// Add cities to the select dropdown
addCitiesToDropdown();

// Function to get prayer timings for the selected city
function getPrayerTimings(cityName) {
  let params = {
    country: "EG",
    city: cityName
  };


  axios.get('https://api.aladhan.com/v1/timingsByCity', {
    params: params
  }).then(function (response) {

    let timings = response.data.data.timings;
    
    let alhijaDate = response.data.data.date.hijri.month.number + "/" + response.data.data.date.hijri.year + response.data.data.date.hijri.month.ar;
    
    let currentDatetime = new Date();
   
    let currentTime = currentDatetime.toLocaleTimeString('en-US');
    
    fillTimeforPrayer('fajr-time', timings.Fajr);
    fillTimeforPrayer('sunrise-time', timings.Sunrise);
    fillTimeforPrayer('Dhuhr-time', timings.Dhuhr);
    fillTimeforPrayer('Asr-time', timings.Asr);
    fillTimeforPrayer('Maghrib-time', timings.Maghrib);
    fillTimeforPrayer('Isha-time', timings.Isha);
    document.getElementById('date').innerHTML = response.data.data.date.readable;
    document.getElementById('datehjeri').innerHTML = alhijaDate;
    document.getElementById('timenow').innerHTML = currentTime;
  })
  .catch(function (error) {
    alert("هذا الموقع لا يعمل في الوقت الحالي !!"+error)
  });
}

// Function to update prayer time display
function fillTimeforPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}



// Add event listener for city selection change
let selectBtn = document.getElementById('cities-select');
let countryName = document.getElementById('country-name');

selectBtn.addEventListener('change', function() {
  let selectedCity = this.value;
  countryName.innerHTML = selectedCity;
  getPrayerTimings(selectedCity);
});


// Display prayer times for the initial selected city
let initialCity = selectBtn.value;
countryName.innerHTML = initialCity;
getPrayerTimings(initialCity);
