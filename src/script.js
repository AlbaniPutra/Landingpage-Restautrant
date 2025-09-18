// script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');
    const overlay = document.getElementById('overlay');
    const categoryToggle = document.getElementById('category-toggle');
    const categoryIcon = document.getElementById('category-icon');
    const categoryDropdown = document.getElementById('category-dropdown');
    const desktopSearchToggle = document.getElementById('desktop-search-toggle');
    const desktopSearchBox = document.getElementById('desktop-search-box');
    const desktopSearchButton = document.getElementById('desktop-search-button');
    const desktopSearchInput = document.getElementById('desktop-search');
    const desktopSearchContainer = document.getElementById('desktop-search-container');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const searchInputMobile = document.querySelector('#search-box input');
    const searchResultsPopup = document.getElementById('search-results-popup');
    const searchResultsContent = document.getElementById('search-results-content');
    const closeResultsPopup = document.getElementById('close-results-popup');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('-translate-x-full');
        
        if (isOpen) {
            mobileMenu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
            menuToggle.classList.remove('menu-open');
            // Tutup dropdown category saat menu ditutup
            if (categoryDropdown) {
                categoryDropdown.classList.add('hidden');
                categoryIcon.classList.remove('rotate-180');
            }
        } else {
            mobileMenu.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            menuToggle.classList.add('menu-open');
            searchBox.classList.add('hidden');
            desktopSearchBox.classList.add('hidden');
            searchResultsPopup.classList.add('hidden');
        }
    });

    // Toggle search box mobile
    searchToggle.addEventListener('click', function() {
        const isSearchOpen = !searchBox.classList.contains('hidden');
        
        if (isSearchOpen) {
            searchBox.classList.add('hidden');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
            searchResultsPopup.classList.add('hidden');
        } else {
            searchBox.classList.remove('hidden');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            mobileMenu.classList.add('-translate-x-full');
            menuToggle.classList.remove('menu-open');
            desktopSearchBox.classList.add('hidden');
            searchResultsPopup.classList.add('hidden');
            setTimeout(() => searchInputMobile.focus(), 100);
        }
    });

    // Toggle search box desktop (untuk layar kecil desktop)
    if (desktopSearchToggle) {
        desktopSearchToggle.addEventListener('click', function() {
            const isSearchOpen = !desktopSearchBox.classList.contains('hidden');
            
            if (isSearchOpen) {
                desktopSearchBox.classList.add('hidden');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            } else {
                desktopSearchBox.classList.remove('hidden');
                overlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                mobileMenu.classList.add('-translate-x-full');
                menuToggle.classList.remove('menu-open');
                searchBox.classList.add('hidden');
                searchResultsPopup.classList.add('hidden');
                setTimeout(() => desktopSearchBox.querySelector('input').focus(), 100);
            }
        });
    }

    // Fungsi pencarian desktop
    if (desktopSearchButton && desktopSearchInput) {
        // Handle klik tombol search
        desktopSearchButton.addEventListener('click', function() {
            performSearch(desktopSearchInput.value);
        });
        
        // Handle tekan Enter di input
        desktopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(desktopSearchInput.value);
            }
        });
    }

    // Handle pencarian mobile
    if (mobileSearchButton && searchInputMobile) {
        mobileSearchButton.addEventListener('click', function() {
            performMobileSearch(searchInputMobile.value);
        });
        
        searchInputMobile.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performMobileSearch(searchInputMobile.value);
            }
        });
    }

    // Fungsi untuk melakukan pencarian
    function performSearch(query) {
        if (query.trim() !== '') {
            alert('Searching for: ' + query); // Ganti dengan fungsi pencarian sebenarnya
            // Contoh: window.location.href = '/search?q=' + encodeURIComponent(query);
        }
    }

    // Fungsi untuk menampilkan hasil pencarian mobile
    function performMobileSearch(query) {
        if (query.trim() !== '') {
            // Sembunyikan keyboard virtual (opsional)
            searchInputMobile.blur();
            
            // Tampilkan loading state
            searchResultsContent.innerHTML = '<div class="text-center py-4">Searching...</div>';
            searchResultsPopup.classList.remove('hidden');
            searchResultsPopup.classList.add('animate-slide-in');
            
            // Simulasi delay pencarian
            setTimeout(() => {
                // Hasil pencarian contoh (ganti dengan hasil sebenarnya dari API)
                const mockResults = [
                    { name: "Spaghetti Carbonara", restaurant: "Italian Bistro", price: "Rp 125.000" },
                    { name: "Chicken Teriyaki", restaurant: "Asian Fusion", price: "Rp 85.000" },
                    { name: "Beef Burger", restaurant: "American Grill", price: "Rp 75.000" },
                    { name: "Nasi Goreng Special", restaurant: "Warung Indonesia", price: "Rp 45.000" },
                    { name: "Sushi Platter", restaurant: "Tokyo Sushi", price: "Rp 150.000" }
                ];
                
                // Kosongkan konten sebelumnya
                searchResultsContent.innerHTML = '';
                
                // Tambahkan hasil pencarian
                if (mockResults.length > 0) {
                    mockResults.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'p-3 border-b border-gray-100 hover:bg-gray-50 rounded search-result-item';
                        resultItem.innerHTML = `
                            <h4 class="font-medium">${item.name}</h4>
                            <div class="flex justify-between text-sm text-gray-500 mt-1">
                                <span>${item.restaurant}</span>
                                <span class="text-[#5A4FCF] font-medium">${item.price}</span>
                            </div>
                        `;
                        searchResultsContent.appendChild(resultItem);
                        
                        // Tambahkan event click untuk item hasil pencarian
                        resultItem.addEventListener('click', function() {
                            alert(`Anda memilih: ${item.name}`);
                            // Bisa diganti dengan navigasi ke halaman detail
                        });
                    });
                } else {
                    searchResultsContent.innerHTML = '<div class="text-center py-4 text-gray-500">Tidak ada hasil ditemukan</div>';
                }
            }, 800);
        }
    }

    // Tutup popup hasil pencarian
    if (closeResultsPopup) {
        closeResultsPopup.addEventListener('click', function() {
            searchResultsPopup.classList.add('hidden');
        });
    }

    // Toggle category dropdown di mobile
    if (categoryToggle) {
        let categoryOpen = false;
        
        categoryToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah event bubbling ke overlay
            categoryOpen = !categoryDropdown.classList.contains('hidden');
            
            if (categoryOpen) {
                categoryDropdown.classList.add('hidden');
                categoryIcon.classList.remove('rotate-180');
            } else {
                categoryDropdown.classList.remove('hidden');
                categoryIcon.classList.add('rotate-180');
            }
            categoryOpen = !categoryOpen;
        });
        
        // Mencegah dropdown menutup saat mengklik item di dalamnya
        categoryDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close all when clicking overlay
    overlay.addEventListener('click', function() {
        mobileMenu.classList.add('-translate-x-full');
        searchBox.classList.add('hidden');
        desktopSearchBox.classList.add('hidden');
        searchResultsPopup.classList.add('hidden');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
        menuToggle.classList.remove('menu-open');
        
        // Tutup dropdown category saat overlay diklik
        if (categoryDropdown) {
            categoryDropdown.classList.add('hidden');
            categoryIcon.classList.remove('rotate-180');
        }
    });

    // Close menu when clicking a link (kecuali link dalam dropdown)
    document.querySelectorAll('#mobile-menu > ul > li > a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Jika yang diklik bukan bagian dari dropdown
            if (!this.closest('li.relative ul')) {
                mobileMenu.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
                menuToggle.classList.remove('menu-open');
            }
        });
    });

    // Tutup popup hasil pencarian saat klik di luar
    document.addEventListener('click', function(e) {
        if (searchResultsPopup && !searchResultsPopup.contains(e.target) && 
            e.target !== mobileSearchButton && 
            e.target !== searchInputMobile &&
            !searchBox.contains(e.target)) {
            searchResultsPopup.classList.add('hidden');
        }
    });
});