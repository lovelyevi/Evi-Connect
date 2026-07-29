/**
 * EviConnect — Main JavaScript
 * Handles: navbar, auth toggle, vendor data, rendering, filtering, modal
 */

/* ============================================================
   NAVBAR — Sticky shadow + Mobile hamburger
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Add shadow on scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Toggle mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger lines into X
      hamburger.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }
})();


/* ============================================================
   AUTH PAGE — Toggle between Customer / Vendor forms
   ============================================================ */

/**
 * Switch between customer and vendor auth forms.
 * @param {'customer'|'vendor'} role
 */
function switchRole(role) {
  const customerForm  = document.getElementById('customerForm');
  const vendorForm    = document.getElementById('vendorForm');
  const customerBtn   = document.getElementById('customerTabBtn');
  const vendorBtn     = document.getElementById('vendorTabBtn');
  const authTitle     = document.getElementById('authTitle');
  const authSubtitle  = document.getElementById('authSubtitle');

  if (!customerForm || !vendorForm) return; // Not on auth page

  if (role === 'customer') {
    customerForm.classList.remove('hidden');
    vendorForm.classList.add('hidden');
    customerBtn.classList.add('active');
    vendorBtn.classList.remove('active');
    authTitle.textContent   = 'Welcome back';
    authSubtitle.textContent = 'Log in to your customer account';
  } else {
    vendorForm.classList.remove('hidden');
    customerForm.classList.add('hidden');
    vendorBtn.classList.add('active');
    customerBtn.classList.remove('active');
    authTitle.textContent   = 'Join as a vendor';
    authSubtitle.textContent = 'Create your vendor profile and start earning';
  }
}

/** Simulate customer login */
function handleLogin() {
  const email = document.getElementById('custEmail')?.value.trim();
  const pass  = document.getElementById('custPassword')?.value.trim();

  if (!email || !pass) {
    showToast('Please enter your email/phone and password.', 'error');
    return;
  }
  showToast('Logging you in…', 'success');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
}

/** Simulate vendor signup */
function handleVendorSignup() {
  const name     = document.getElementById('vendName')?.value.trim();
  const service  = document.getElementById('vendService')?.value;
  const location = document.getElementById('vendLocation')?.value.trim();
  const password = document.getElementById('vendPassword')?.value.trim();

  if (!name || !service || !location || !password) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (password.length < 8) {
    showToast('Password must be at least 8 characters.', 'error');
    return;
  }
  showToast('Account created! Welcome to EviConnect 🎉', 'success');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1400);
}

/** Handle file upload label update */
function handleFileUpload(event) {
  const file  = event.target.files[0];
  const label = document.getElementById('fileLabel');
  if (file && label) {
    label.textContent = `✓ ${file.name}`;
  }
}

/** Availability toggle label */
(function initAvailabilityToggle() {
  const toggle = document.getElementById('vendAvailability');
  const label  = document.getElementById('availabilityLabel');
  if (!toggle || !label) return;

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      label.textContent = 'Available now';
      label.className   = 'availability-label available';
    } else {
      label.textContent = 'Not available';
      label.className   = 'availability-label unavailable';
    }
  });
})();


/* ============================================================
   VENDOR DATA — Simulated vendor array
   ============================================================ */
const VENDORS = [
  {
    id: 1,
    name: 'Adaeze Okafor',
    service: 'Makeup Artist',
    location: 'Lekki Phase 1, Lagos',
    distance: '0.3 km',
    available: true,
    rating: 4.9,
    reviews: 128,
    priceMin: 8000,
    priceMax: 25000,
    emoji: '💄',
    bio: 'Certified MUA with 6 years of experience in bridal, editorial, and everyday glamour. I bring the studio to you — fully equipped with professional-grade products.'
  },
  {
    id: 2,
    name: 'Emeka Eze',
    service: 'Barber',
    location: 'Surulere, Lagos',
    distance: '0.8 km',
    available: true,
    rating: 4.8,
    reviews: 204,
    priceMin: 3000,
    priceMax: 8000,
    emoji: '✂️',
    bio: 'Precision cuts, clean fades, and expert beard grooming. I carry a full mobile kit and can be at your door within the hour.'
  },
  {
    id: 3,
    name: 'Chidinma Nwosu',
    service: 'Hairdresser',
    location: 'Victoria Island, Lagos',
    distance: '1.2 km',
    available: false,
    rating: 4.7,
    reviews: 89,
    priceMin: 4500,
    priceMax: 20000,
    emoji: '💇‍♀️',
    bio: 'Braiding, wigs, natural hair treatments, and silk press specialist. Neat work, no rush. Available weekdays and weekends.'
  },
  {
    id: 4,
    name: 'Bisi Adeyemi',
    service: 'Nail Technician',
    location: 'Ikeja GRA, Lagos',
    distance: '1.5 km',
    available: true,
    rating: 4.9,
    reviews: 316,
    priceMin: 3500,
    priceMax: 12000,
    emoji: '💅',
    bio: 'Gel nails, acrylic sets, nail art, and pedicures. I bring a full sanitary kit. Clients describe my work as "worth every naira."'
  },
  {
    id: 5,
    name: 'Tunde Balogun',
    service: 'Tattoo Artist',
    location: 'Yaba, Lagos',
    distance: '2.1 km',
    available: true,
    rating: 4.6,
    reviews: 57,
    priceMin: 15000,
    priceMax: 80000,
    emoji: '🎨',
    bio: 'Fine-line, realism, and traditional tattoos. I use hospital-grade sterile equipment for every session. Portfolio available on request.'
  },
  {
    id: 6,
    name: 'Ngozi Uche',
    service: 'Esthetician',
    location: 'Ajah, Lagos',
    distance: '2.4 km',
    available: false,
    rating: 4.8,
    reviews: 142,
    priceMin: 6000,
    priceMax: 18000,
    emoji: '🧖‍♀️',
    bio: 'Facials, waxing, and customised skincare routines. I use dermatologist-approved products and treat every skin type with care.'
  },
  {
    id: 7,
    name: 'Femi Adekunle',
    service: 'Barber',
    location: 'Gbagada, Lagos',
    distance: '3.0 km',
    available: true,
    rating: 4.5,
    reviews: 73,
    priceMin: 3000,
    priceMax: 7000,
    emoji: '✂️',
    bio: 'Classic cuts, taper fades, and hot towel shaves. Friendly, professional, and always on time.'
  },
  {
    id: 8,
    name: 'Favour Okeke',
    service: 'Makeup Artist',
    location: 'Magodo, Lagos',
    distance: '3.5 km',
    available: true,
    rating: 4.7,
    reviews: 94,
    priceMin: 7000,
    priceMax: 20000,
    emoji: '💄',
    bio: 'Soft glam, bold looks, and flawless skin prep. I specialise in Aso-Ebi and wedding-guest makeup that lasts all day.'
  },
  {
    id: 9,
    name: 'Kemi Adesanya',
    service: 'Nail Technician',
    location: 'Maryland, Lagos',
    distance: '3.8 km',
    available: false,
    rating: 4.6,
    reviews: 61,
    priceMin: 3500,
    priceMax: 10000,
    emoji: '💅',
    bio: 'Press-on sets, gel overlays, and detailed nail art. Quick turnaround and immaculate finish every time.'
  },
  {
    id: 10,
    name: 'Amaka Duru',
    service: 'Hairdresser',
    location: 'Isale Eko, Lagos',
    distance: '4.2 km',
    available: true,
    rating: 4.8,
    reviews: 178,
    priceMin: 5000,
    priceMax: 22000,
    emoji: '💇‍♀️',
    bio: 'Specialising in knotless braids, goddess locs, and wig installation. Clean, professional, and thorough with every client.'
  }
];

/* Track currently filtered vendors for modal access */
let _currentVendors = [...VENDORS];


/* ============================================================
   DASHBOARD — Filter + Render
   ============================================================ */

/**
 * Filter vendors based on sidebar + search bar inputs,
 * then re-render the vendor list.
 */
function filterVendors() {
  // Gather filter values
  const serviceSelect   = document.getElementById('searchService');
  const selectedService = serviceSelect ? serviceSelect.value : '';

  const chipActive = document.querySelector('.filter-chip.active');
  const chipService = chipActive ? chipActive.dataset.service : '';

  // Combined service filter (search bar takes priority if set)
  const serviceFilter = selectedService || chipService;

  const availableOnly = document.getElementById('availableOnly')?.checked;
  const minRating     = parseFloat(document.getElementById('ratingFilter')?.value || 0);
  const sortBy        = document.getElementById('sortSelect')?.value || 'distance';

  let results = VENDORS.filter(v => {
    if (serviceFilter && v.service !== serviceFilter) return false;
    if (availableOnly && !v.available) return false;
    if (v.rating < minRating) return false;
    return true;
  });

  // Sort
  results = results.slice().sort((a, b) => {
    if (sortBy === 'rating')   return b.rating - a.rating;
    if (sortBy === 'price')    return a.priceMin - b.priceMin;
    // Default: distance (strip 'km' and parse float)
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  _currentVendors = results;
  renderVendors(results);
}

/**
 * Render vendors into #vendorList.
 * @param {Array} vendors
 */
function renderVendors(vendors) {
  const list  = document.getElementById('vendorList');
  const count = document.getElementById('resultsCount');
  if (!list) return;

  // Update count label
  if (count) {
    count.textContent = vendors.length
      ? `${vendors.length} professional${vendors.length !== 1 ? 's' : ''} found`
      : '';
  }

  if (!vendors.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h4>No vendors found</h4>
        <p>Try adjusting your filters or broadening your search.</p>
      </div>`;
    return;
  }

  list.innerHTML = vendors.map((v, idx) => `
    <div class="vendor-card" data-id="${v.id}" style="animation-delay:${idx * 40}ms">
      <div class="vendor-avatar">${v.emoji}</div>

      <div class="vendor-info">
        <div class="vendor-name">${v.name}</div>
        <span class="vendor-service-tag">${v.service}</span>
        <div class="vendor-meta">
          <span>📍 ${v.location}</span>
          <span>📏 ${v.distance}</span>
          <span>⭐ ${v.rating} (${v.reviews} reviews)</span>
          <span class="availability-dot ${v.available ? 'available' : 'unavailable'}">
            ${v.available ? '● Available now' : '● Unavailable'}
          </span>
        </div>
      </div>

      <div class="vendor-card-actions">
        <div class="vendor-price">
          <span>Starting from</span>
          ₦${v.priceMin.toLocaleString()}
        </div>
        <button class="btn btn-pink btn-sm" onclick="openVendorModal(${v.id})">
          View Profile
        </button>
      </div>
    </div>
  `).join('');
}


/* ============================================================
   SIDEBAR CHIPS — click handler
   ============================================================ */
(function initFilterChips() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Sync with search bar select if present
      const searchService = document.getElementById('searchService');
      if (searchService) {
        searchService.value = chip.dataset.service || '';
      }

      filterVendors();
    });
  });
})();


/* ============================================================
   VENDOR MODAL — Open / Close
   ============================================================ */

/**
 * Open the vendor profile modal.
 * @param {number} vendorId
 */
function openVendorModal(vendorId) {
  const vendor  = VENDORS.find(v => v.id === vendorId);
  const overlay = document.getElementById('modalOverlay');
  if (!vendor || !overlay) return;

  // Populate modal fields
  document.getElementById('modalAvatar').textContent   = vendor.emoji;
  document.getElementById('modalName').textContent     = vendor.name;
  document.getElementById('modalService').textContent  = vendor.service;
  document.getElementById('modalLocation').textContent = `📍 ${vendor.location} · ${vendor.distance}`;
  document.getElementById('modalRating').textContent   = `${vendor.rating}★`;
  document.getElementById('modalReviews').textContent  = vendor.reviews;
  document.getElementById('modalPrice').textContent    = `₦${vendor.priceMin.toLocaleString()}`;
  document.getElementById('modalDistance').textContent = vendor.distance;
  document.getElementById('modalBio').textContent      = vendor.bio;

  // Store current vendor id for booking
  overlay.dataset.vendorId = vendorId;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/** Close modal when overlay background is clicked */
function closeModal(event) {
  const modal = document.getElementById('vendorModal');
  if (event.target === event.currentTarget) {
    closeVendorModal();
  }
}

/** Close the vendor modal */
function closeVendorModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

/** Simulate booking action */
function handleBooking() {
  showToast('Booking request sent! The vendor will confirm shortly. 🎉', 'success');
  closeVendorModal();
}


/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */

/**
 * Show a small toast at the bottom of the screen.
 * @param {string} message
 * @param {'success'|'error'} type
 */
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.ev-toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'ev-toast';
  toast.textContent = message;

  const bg = type === 'error' ? '#E8506A' : '#1DB870';
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '28px',
    left:         '50%',
    transform:    'translateX(-50%) translateY(20px)',
    background:   bg,
    color:        '#fff',
    padding:      '13px 26px',
    borderRadius: '999px',
    fontSize:     '14px',
    fontFamily:   'Poppins, sans-serif',
    fontWeight:   '500',
    boxShadow:    '0 6px 24px rgba(0,0,0,0.2)',
    zIndex:       '9999',
    opacity:      '0',
    transition:   'opacity 0.3s ease, transform 0.3s ease',
    whiteSpace:   'nowrap'
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


/* ============================================================
   INIT — Run on page load
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Dashboard: initial render
  if (document.getElementById('vendorList')) {
    filterVendors();
  }

  // Auth: check URL param ?role=vendor
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('role') === 'vendor') {
    switchRole('vendor');
  }

  // Smooth appear for hero elements (stagger)
  const heroEls = document.querySelectorAll(
    '.hero-badge, .hero-heading, .hero-subtext, .hero-actions, .hero-trust, .hero-visual'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 80 + i * 100);
  });
});
