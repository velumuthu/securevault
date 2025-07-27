function encryptFile() {
  const file = document.getElementById('encryptFile').files[0];
  const password = document.getElementById('encryptPassword').value;

  if (!file || !password || password.length < 4) {
    showAlert("⚠️ Choose a file and enter a password (min 4 characters)");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const wordArray = CryptoJS.lib.WordArray.create(reader.result);
    const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
    const blob = new Blob([encrypted], { type: "text/plain" });
    downloadBlob(blob, file.name + ".enc");
  };
  reader.readAsArrayBuffer(file);
}

function decryptFile() {
  const file = document.getElementById('decryptFile').files[0];
  const password = document.getElementById('decryptPassword').value;

  if (!file || !password) {
    showAlert("⚠️ Choose a file and enter a password");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    try {
      const decrypted = CryptoJS.AES.decrypt(reader.result, password);
      if (!decrypted || decrypted.sigBytes <= 0) throw new Error("Invalid decryption");

      const typedArray = convertWordArrayToUint8Array(decrypted);
      const blob = new Blob([typedArray]);
      downloadBlob(blob, file.name.replace(".enc", ""));
    } catch (e) {
      console.error(e);
      showAlert("❌ Decryption failed. Wrong password or corrupted file.");
    }
  };
  reader.readAsText(file);
}

function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function convertWordArrayToUint8Array(wordArray) {
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;
  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return u8;
}

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerText = message;
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 5000);
}
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    });