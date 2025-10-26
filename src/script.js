document.addEventListener('DOMContentLoaded', function() {
  // Variabel global untuk tracking state
  let currentAlertTimeout = null;
  let isAlertVisible = false;

  // Toggle menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const menuIcon = document.getElementById('menu-icon');

  menuToggle.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');

    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('-translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      overlay.classList.remove('hidden');
      menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      hideAlert();
    }
  });

  // Toggle dropdown category di mobile dengan animasi lebih lama
  const categoryToggle = document.getElementById('category-toggle');
  const categoryDropdown = document.getElementById('category-dropdown');
  const categoryIcon = document.getElementById('category-icon');

  categoryToggle.addEventListener('click', function() {
    const isExpanded = categoryDropdown.classList.contains('hidden');

    if (isExpanded) {
      // Buka dropdown dengan animasi
      categoryDropdown.classList.remove('hidden');
      categoryIcon.classList.add('rotate-180');
      
      // Trigger reflow untuk memastikan animasi berjalan
      void categoryDropdown.offsetWidth;
      
      // Tambahkan class untuk animasi
      categoryDropdown.classList.remove('opacity-0', 'scale-95', 'mt-2');
      categoryDropdown.classList.add('opacity-100', 'scale-100', 'mt-3');
    } else {
      // Tutup dropdown dengan animasi
      categoryDropdown.classList.remove('opacity-100', 'scale-100', 'mt-3');
      categoryDropdown.classList.add('opacity-0', 'scale-95', 'mt-2');
      categoryIcon.classList.remove('rotate-180');
      
      // Tunggu animasi selesai sebelum menyembunyikan
      setTimeout(() => {
        categoryDropdown.classList.add('hidden');
      }, 30); // Sesuai dengan duration CSS
    }
  });

  // Toggle search box mobile
  const searchToggle = document.getElementById('search-toggle');
  const searchBox = document.getElementById('search-box');

  searchToggle.addEventListener('click', function() {
    searchBox.classList.toggle('hidden');
    hideAlert();
  });

  // Toggle search box desktop
  const desktopSearchToggle = document.getElementById('desktop-search-toggle');
  const desktopSearchBox = document.getElementById('desktop-search-box');

  desktopSearchToggle.addEventListener('click', function() {
    desktopSearchBox.classList.toggle('hidden');
    hideAlert();
  });

  // Tutup menu saat klik overlay
  overlay.addEventListener('click', closeMobileMenu);

  function closeMobileMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
  }

  // Fungsi menampilkan alert
  function showAlert(message, type = 'info', duration = 500) {
    const alert = document.getElementById('search-alert');
    const alertMessage = document.getElementById('alert-message');

    if (currentAlertTimeout) {
      clearTimeout(currentAlertTimeout);
    }

    alertMessage.textContent = message;

    const borderColors = {
      success: 'border-green-600',
      warning: 'border-yellow-500',
      error: 'border-red-600',
      info: 'border-purple-600'
    };

    alert.classList.remove('border-green-600', 'border-yellow-500', 'border-red-600', 'border-purple-600');
    alert.classList.add(borderColors[type] || 'border-purple-600');

    alert.classList.remove('hidden');
    setTimeout(() => {
      alert.classList.remove('translate-x-full');
      alert.classList.add('translate-x-0');
    }, 300);

    isAlertVisible = true;

    currentAlertTimeout = setTimeout(() => {
      hideAlert();
    }, duration);
  }

  function hideAlert() {
    const alert = document.getElementById('search-alert');
    if (!isAlertVisible) return;

    alert.classList.remove('translate-x-0');
    alert.classList.add('translate-x-full');

    setTimeout(() => {
      alert.classList.add('hidden');
      isAlertVisible = false;
    }, 3000);

    if (currentAlertTimeout) {
      clearTimeout(currentAlertTimeout);
      currentAlertTimeout = null;
    }
  }

  document.getElementById('close-alert').addEventListener('click', hideAlert);

  menuToggle.addEventListener('click', hideAlert);
  searchToggle.addEventListener('click', hideAlert);
  desktopSearchToggle.addEventListener('click', hideAlert);

  // Optimasi event scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideAlert, 1000);
  });

  document.addEventListener('click', function(event) {
    const alert = document.getElementById('search-alert');
    if (!alert) return;
    
    const isClickInsideAlert = alert.contains(event.target);
    const isClickOnSearchInput =
      event.target.matches('input[type="text"]') ||
      event.target.closest('input[type="text"]');

    if (!isClickInsideAlert && !isClickOnSearchInput && isAlertVisible) {
      hideAlert();
    }
  });

  // Fungsi pencarian
  function handleSearch(searchInput, searchType) {
    const searchTerm = searchInput.value.trim();

    if (searchType === 'mobile') {
      searchBox.classList.add('hidden');
    }

    if (searchType === 'small-desktop') {
      desktopSearchBox.classList.add('hidden');
    }

    if (searchTerm === '') {
      showAlert('Silakan masukkan kata kunci pencarian.', 'warning', 3000);
      return;
    }

    if (searchTerm.length < 2) {
      showAlert('Kata kunci pencarian harus minimal 2 karakter.', 'warning', 3000);
      return;
    }

    showAlert(`Sedang mencari "${searchTerm}"...`, 'info', 4000);

    setTimeout(() => {
      const foods = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad', 'Steak', 'Ramen', 'Tacos', 'Nasi Goreng', 'Mie Ayam'];
      const found = foods.filter(food =>
        food.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (found.length > 0) {
        const results = found.slice(0, 3);
        const moreCount = found.length - 3;
        const moreText = moreCount > 0 ? ` dan ${moreCount} lainnya` : '';
        showAlert(`Ditemukan ${found.length} hasil untuk "${searchTerm}": ${results.join(', ')}${moreText}`, 'success', 7000);
      } else {
        showAlert(`Maaf, tidak ditemukan hasil untuk "${searchTerm}". Coba kata kunci lain.`, 'error', 7000);
      }
    }, 2500);
  }

  // Event listener untuk pencarian mobile
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchButton = document.getElementById('mobile-search-button');

  mobileSearchButton.addEventListener('click', function() {
    handleSearch(mobileSearchInput, 'mobile');
  });

  mobileSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch(mobileSearchInput, 'mobile');
    }
  });

  // Pencarian desktop kecil
  const smallDesktopSearchInput = document.getElementById('small-desktop-search-input');
  const smallDesktopSearchButton = document.getElementById('small-desktop-search-button');

  smallDesktopSearchButton.addEventListener('click', function() {
    handleSearch(smallDesktopSearchInput, 'small-desktop');
  });

  smallDesktopSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch(smallDesktopSearchInput, 'small-desktop');
    }
  });

  // Pencarian desktop besar
  const desktopSearchInput = document.getElementById('desktop-search');
  const desktopSearchButton = document.getElementById('desktop-search-button');

  desktopSearchButton.addEventListener('click', function() {
    handleSearch(desktopSearchInput, 'desktop');
  });

  desktopSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch(desktopSearchInput, 'desktop');
    }
  });

});
const button = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');
    const locationText = document.getElementById('selectedLocation');
    const options = menu.querySelectorAll('button');

    // Toggle dropdown
    button.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Pilih lokasi
    options.forEach(option => {
      option.addEventListener('click', () => {
        locationText.textContent = option.textContent;
        menu.classList.add('hidden');
      });
    });
 

      
    