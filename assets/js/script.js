// AOS
AOS.init();

lightbox.option({
  alwaysShowNavOnTouchDevices: true,
  wrapAround: true,
});

// music
var music = "";
audio = document.querySelector(".audio");
if (music) {
  audio.src = music;
}

// door mulai
function mulai() {
  // back to top
  window.scrollTo(0, 0);

  var audioDoor = document.getElementById("doorSound");
  audioDoor.play();

  var doorSection = $("#door-section");
  var doors = document.querySelectorAll(".door");
  doors.forEach(function (door, index) {
    var direction = index === 0 ? -1 : 1;
    door.style.transform = "rotateY(" + 70 * direction + "deg)";
  });

  setTimeout(function () {
    // music
    audio.play();
    doorSection.css("transform", "scale(6)");
  }, 600);

  setTimeout(function () {
    doorSection.css("opacity", 0);
    $("body").removeClass("overflow-hidden");
    $("body").addClass("transition");
    doorSection.css("display", "none");
  }, 2000);
}

// button music
var isPlaying = true;

function toggleMusic(event) {
  event.preventDefault();

  const musicButton = document.getElementById("musicButton");
  const audioElement = document.querySelector(".audio");

  if (isPlaying) {
    musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
    musicButton.classList.remove("rotate");
    musicButton.style.transform = "translateY(0)";
    audioElement.pause();
  } else {
    musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
    musicButton.classList.add("rotate");
    audioElement.play();
  }

  isPlaying = !isPlaying;
}

// date counter
var countDownDate = new Date("01 January, 2025 00:00:00").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown-wedding").innerHTML = `
		<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Days</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Hours</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Minutes</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5> Seconds</div></div>
	`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-wedding").innerHTML =
      "<span class='text-center p-3 rounded text-light m-2'><h2>PUMP IT</h2></span>";
  }
}, 1000);

// get url to pronoun and name
const urlParams = new URLSearchParams(window.location.search);
// const pronoun = urlParams.get('p')
const name = urlParams.get("to");
const namaSambutan = document.querySelector("#namaSambutan");
namaSambutan.innerText = ` ${name},`;

// copy text
function copyText(el) {
  var content = jQuery(el)
    .siblings("div.card-container")
    .find("div.card-number")
    .text()
    .trim();

  var temp = document.createElement("textarea");
  document.body.appendChild(temp);
  temp.value = content.replace(/\s+/g, "");
  temp.select();
  document.execCommand("Succes");
  document.body.removeChild(temp);

  jQuery(el).text("Success");

  setTimeout(function () {
    jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`);
  }, 1000);
}

function copyToClipboard(button, text) {
  // Buat elemen textarea untuk menyalin teks
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  // Pilih teks dan salin ke clipboard
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  // Ubah teks dalam tombol untuk notifikasi
  const originalText = button.innerText;
  button.innerText = "Copied!";
  button.classList.add("copied"); // Tambahkan kelas untuk gaya notifikasi

  // Kembalikan teks tombol setelah 2 detik
  setTimeout(() => {
    button.innerText = originalText;
    button.classList.remove("copied");
  }, 2000);
}
