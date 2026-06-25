/* ==========================================
   JAVASCRIPT LOGIC - KARNIKA'S BIRTHDAY SCRAPBOOK
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. FLOATING PARTICLES SYSTEM (PETALS & HEARTS)
  // ==========================================
  const particleContainer = document.getElementById('bg-particles');
  const particleEmojis = ['🌸', '✨', '💖', '🎀', '🩺', '🌷', '💕'];
  
  function createParticle() {
    if (!particleContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random emoji, size, starting position, duration, and horizontal sway
    const emoji = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
    const size = Math.random() * 14 + 12; // 12px to 26px
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 6; // 6s to 14s
    const delay = Math.random() * 5;
    
    particle.innerText = emoji;
    particle.style.fontSize = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    // Add custom rotation speed and scale
    particle.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }

  // Create initial particles
  for (let i = 0; i < 25; i++) {
    createParticle();
  }

  // Spawn new particles periodically
  setInterval(createParticle, 500);


  // ==========================================
  // 2. HEART CURSOR TRAIL
  // ==========================================
  const cursorTrail = document.getElementById('cursor-trail');
  let lastMouseX = 0;
  let lastMouseY = 0;
  let moveDistance = 0;

  window.addEventListener('mousemove', (e) => {
    // Calculate distance moved to rate-limit spawning
    const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
    moveDistance += dist;
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    if (moveDistance > 25) { // Spawn every 25px moved
      spawnTrailHeart(e.clientX, e.clientY);
      moveDistance = 0;
    }
  });

  function spawnTrailHeart(x, y) {
    if (!cursorTrail) return;
    
    const heart = document.createElement('span');
    heart.className = 'trail-heart';
    
    // Randomize trail symbols (mostly hearts, some sparkles/flowers)
    const symbols = ['💖', '💕', '✨', '🌸', '🩺'];
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Position with a slight offset
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    
    heart.style.left = `${x + offsetX}px`;
    heart.style.top = `${y + offsetY}px`;
    
    cursorTrail.appendChild(heart);
    
    // Cleanup
    setTimeout(() => {
      heart.remove();
    }, 800);
  }


  // ==========================================
  // 3. COUNTDOWN CLOCK (Removed per request)
  // ==========================================


  // ==========================================
  // 4. LETTERS / POPUP SURPRISE MODAL
  // ==========================================
  const letterModal = document.getElementById('letter-modal');
  const openSurpriseTriggers = document.querySelectorAll('.open-surprise-trigger');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  function openLetter() {
    if (letterModal) {
      letterModal.classList.add('active');
      showToast('Opening Shubhay\'s letter... ✉💝');
    }
  }

  function closeLetter() {
    if (letterModal) {
      letterModal.classList.remove('active');
    }
  }

  openSurpriseTriggers.forEach(trigger => {
    trigger.addEventListener('click', openLetter);
  });

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', closeLetter);
  }

  // Close modals when clicking overlay background
  window.addEventListener('click', (e) => {
    if (e.target === letterModal) {
      closeLetter();
    }
  });


  // ==========================================
  // 5. MEMORIES SCROLL REVEAL EFFECT
  // ==========================================
  const scrollRevealItems = document.querySelectorAll('.reveal-on-scroll');

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    scrollRevealItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Trigger once on load to show elements already in view


  // ==========================================
  // 6. ROTATING QUOTES CAROUSEL
  // ==========================================
  const quotes = [
    "Some people choose a profession, but you were born to heal. 💖 So proud of you, always! 💕",
    "“You make every single moment beautiful, Karnika.” ✨💖",
    "“Healing hearts is your superpower. Future Doctor. Forever Special.” 🩺🎀",
    "“Some people become home, and you are my favorite home.” 🌸🏠💗",
    "“The world is so incredibly lucky to have you. Shine bright!” 🌟🩺✨"
  ];

  let currentQuoteIndex = 0;
  const quoteTextEl = document.getElementById('quote-text');
  const quoteDots = document.querySelectorAll('.quote-dot');

  function changeQuote(index) {
    if (!quoteTextEl) return;
    
    quoteTextEl.style.opacity = '0';
    
    setTimeout(() => {
      currentQuoteIndex = index;
      quoteTextEl.innerText = quotes[currentQuoteIndex];
      quoteTextEl.style.opacity = '1';
      
      quoteDots.forEach(dot => dot.classList.remove('active'));
      quoteDots[currentQuoteIndex].classList.add('active');
    }, 500);
  }

  quoteDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      changeQuote(idx);
    });
  });

  // Auto rotate quotes every 5 seconds
  setInterval(() => {
    let nextIndex = (currentQuoteIndex + 1) % quotes.length;
    changeQuote(nextIndex);
  }, 5500);


  // ==========================================
  // 7. TOAST NOTIFICATIONS FOR ACTIVITIES
  // ==========================================
  const toastNotification = document.getElementById('toast-notif');
  
  function showToast(message) {
    if (!toastNotification) return;
    
    toastNotification.innerText = message;
    toastNotification.classList.add('show');
    
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  const activityItems = document.querySelectorAll('.activity-item');
  activityItems.forEach(item => {
    item.addEventListener('click', () => {
      const toastMessage = item.getAttribute('data-toast');
      showToast(toastMessage);
    });
  });


  // ==========================================
  // 8. INTERACTIVE MUSIC PLAYER
  // ==========================================
  const audioEl = document.getElementById('bg-audio');
  const vinylDisc = document.getElementById('vinyl-disc');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('progress-container');
  const currentTimeEl = document.getElementById('current-time');
  const playSongHeroBtn = document.getElementById('play-song-hero-btn');

  // Local audio file
  const musicTracks = [
    "ninna_notavu.mp3"
  ];
  let currentTrackIdx = 0;

  const totalTimeEl = document.getElementById('total-time');

  if (audioEl) {
    audioEl.src = musicTracks[currentTrackIdx];
    
    // Automatically update total duration when audio metadata loads
    audioEl.addEventListener('loadedmetadata', () => {
      const min = Math.floor(audioEl.duration / 60);
      const sec = Math.floor(audioEl.duration % 60);
      if (totalTimeEl) {
        totalTimeEl.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      }
    });
  }

  let synthInterval = null;
  let synthTime = 0;
  let isSynthesizing = false;
  let audioCtx = null;

  // PREMIUM OPTION: A beautiful fallback JS synthesized soft acoustic piano lofi loop 
  // so the music player is 100% reliable even offline or with blocked network requests!
  function playSynthMusic() {
    if (audioCtx) return;
    isSynthesizing = true;
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Soft piano chords loop (I-V-vi-IV in G major: G - D - Em - C)
    const chords = [
      [196.00, 246.94, 293.66, 392.00], // G Maj
      [146.83, 220.00, 293.66, 369.99], // D Maj
      [164.81, 196.00, 246.94, 329.63], // E Min
      [130.81, 261.63, 329.63, 392.00]  // C Maj
    ];
    
    let chordIdx = 0;
    
    function playChord() {
      if (!isSynthesizing) return;
      const notes = chords[chordIdx];
      const now = audioCtx.currentTime;
      
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle'; // Soft warm sound
        osc.frequency.value = freq;
        
        // Gentle filter to make it sound vintage and cozy
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800; 
        
        // Soft volume envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.04 + (i * 0.01), now + 0.1); // low volume background
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3.8);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 4);
      });
      
      chordIdx = (chordIdx + 1) % chords.length;
    }
    
    playChord();
    synthInterval = setInterval(playChord, 4000);
    
    // Progress bar runner for synthesized audio
    synthTime = 0;
    setInterval(() => {
      if (!isSynthesizing) return;
      synthTime += 1;
      const progressPercent = (synthTime % 225) / 225 * 100; // loop progress at 3:45 (225s)
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      
      const min = Math.floor((synthTime % 225) / 60);
      const sec = Math.floor((synthTime % 225) % 60);
      if (currentTimeEl) currentTimeEl.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }, 1000);
  }

  function stopSynthMusic() {
    isSynthesizing = false;
    if (synthInterval) clearInterval(synthInterval);
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
  }

  function togglePlay() {
    if (!audioEl) return;

    if (audioEl.paused && !isSynthesizing) {
      // Try playing mp3 stream
      audioEl.play()
        .then(() => {
          onPlayerStart();
        })
        .catch(err => {
          console.log("Network MP3 audio failed, using offline synthesized warm lofi chords fallback:", err);
          playSynthMusic();
          onPlayerStart();
        });
    } else {
      audioEl.pause();
      stopSynthMusic();
      onPlayerStop();
    }
  }

  function onPlayerStart() {
    if (vinylDisc) vinylDisc.style.animationPlayState = 'running';
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';
    if (playSongHeroBtn) playSongHeroBtn.innerText = 'Pause Song ⏸';
    showToast('Enjoying Ninna Notavu 🎧🎀');
  }

  function onPlayerStop() {
    if (vinylDisc) vinylDisc.style.animationPlayState = 'paused';
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playSongHeroBtn) playSongHeroBtn.innerText = 'Play Our Song 🎵';
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  if (playSongHeroBtn) playSongHeroBtn.addEventListener('click', togglePlay);

  // Update track progress if stream is playing
  if (audioEl) {
    audioEl.addEventListener('timeupdate', () => {
      if (isSynthesizing) return;
      const progress = (audioEl.currentTime / audioEl.duration) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;

      const currMin = Math.floor(audioEl.currentTime / 60);
      const currSec = Math.floor(audioEl.currentTime % 60);
      if (currentTimeEl) currentTimeEl.innerText = `${String(currMin).padStart(2, '0')}:${String(currSec).padStart(2, '0')}`;
    });
  }

  // Seek bar click
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      if (isSynthesizing) return;
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audioEl.duration || 225; // default 3:45
      audioEl.currentTime = (clickX / width) * duration;
    });
  }


  // ==========================================
  // 9. BALLOON POP SURPRISE FEATURE (CRITICAL)
  // ==========================================
  const balloonSurpriseContainer = document.getElementById('balloon-surprise-container');
  const popSound = document.getElementById('pop-sound');
  
  const flyingPhotos = [
    document.getElementById('fly-photo-1'),
    document.getElementById('fly-photo-2'),
    document.getElementById('fly-photo-3'),
    document.getElementById('fly-photo-4')
  ];

  // Synth Balloon Pop sound via Web Audio API (extremely robust fallback!)
  function playPopSoundSynth() {
    try {
      const popCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = popCtx.createOscillator();
      const gainNode = popCtx.createGain();
      
      osc.type = 'sine';
      // Fast sweeping frequency for a "pop" sound
      osc.frequency.setValueAtTime(300, popCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, popCtx.currentTime + 0.12);
      
      gainNode.gain.setValueAtTime(0.3, popCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, popCtx.currentTime + 0.12);
      
      osc.connect(gainNode);
      gainNode.connect(popCtx.destination);
      
      osc.start();
      osc.stop(popCtx.currentTime + 0.15);
    } catch(e) {
      console.log('AudioContext blocked or uninitialized for pop synth.');
    }
  }

  let isBalloonSpawningEnabled = true;
  let lastPhotoIndex = -1;
  let lastCornerIndex = -1;
  let photoTimeouts = [null, null, null, null];

  const popPhotoData = [
    { src: 'assets/photo1.jpeg', caption: 'MBBS survival kit: 99% coffee, 1% hope ☕📚' },
    { src: 'assets/photo2.jpeg', caption: 'Chief sanity officer keeping me alive! 👯‍♀️💖' },
    { src: 'assets/photo3.jpeg', caption: 'Practicing doctor prescription scribble 🩺✍️' },
    { src: 'assets/photo4.jpeg', caption: 'Post-anatomy lecture brain cell count: 0 🤯💀' },
    { src: 'assets/photo5.jpeg', caption: 'Conspiring to skip tomorrow\'s 8 AM class 🤫🗓️' },
    { src: 'assets/photo6.jpeg', caption: 'Favorite Drama Queen / Future Cardiologist 🩺👸' },
    { src: 'assets/photo7.jpeg', caption: 'Doctor in progress (Handle with care!) 🏥🌸' }
  ];

  function triggerBalloonPop() {
    // 1. Play sound
    if (popSound) {
      popSound.play().catch(() => {
        playPopSoundSynth();
      });
    } else {
      playPopSoundSynth();
    }

    // 2. Hide floating balloon trigger with a bounce
    if (balloonSurpriseContainer) {
      balloonSurpriseContainer.style.transform = 'scale(0)';
      setTimeout(() => {
        balloonSurpriseContainer.style.display = 'none';
      }, 300);
    }

    // 3. Trigger confetti explosion (rains over the actual page!)
    initConfetti();

    // 4. Choose a random corner and a random photo (ensuring differences)
    let cornerIdx;
    do {
      cornerIdx = Math.floor(Math.random() * flyingPhotos.length);
    } while (cornerIdx === lastCornerIndex && flyingPhotos.length > 1);
    lastCornerIndex = cornerIdx;

    let photoIdx;
    do {
      photoIdx = Math.floor(Math.random() * popPhotoData.length);
    } while (photoIdx === lastPhotoIndex && popPhotoData.length > 1);
    lastPhotoIndex = photoIdx;

    const photo = flyingPhotos[cornerIdx];
    if (photo) {
      const data = popPhotoData[photoIdx];
      const imgEl = photo.querySelector('.polaroid-inner-img img');
      const captionEl = photo.querySelector('.polaroid-caption');
      
      if (imgEl) imgEl.src = data.src;
      if (captionEl) captionEl.innerHTML = `${data.caption} <span class="heart-sticker">💖</span>`;
      
      // Reset position/opacity and apply class to animate in
      photo.classList.remove('fly-in');
      void photo.offsetWidth; // trigger reflow to reset transition
      photo.classList.add('fly-in');
      
      // Clear any existing timer for this specific corner
      if (photoTimeouts[cornerIdx]) {
        clearTimeout(photoTimeouts[cornerIdx]);
      }
      
      // Auto dismiss this photo after 3 seconds
      photoTimeouts[cornerIdx] = setTimeout(() => {
        photo.classList.remove('fly-in');
        photoTimeouts[cornerIdx] = null;
      }, 3000);
      
      showToast("A cute memory popped out! 📸✨");
    }
  }

  if (balloonSurpriseContainer) {
    balloonSurpriseContainer.addEventListener('click', triggerBalloonPop);
  }

  // Dismiss a photo by clicking on it, sending it back to the corner
  flyingPhotos.forEach((photo, idx) => {
    if (photo) {
      photo.addEventListener('click', () => {
        photo.classList.remove('fly-in');
        if (photoTimeouts[idx]) {
          clearTimeout(photoTimeouts[idx]);
          photoTimeouts[idx] = null;
        }
        showToast("Photo hidden! Pop another balloon. 🎈");
      });
    }
  });


  // ==========================================
  // 10. CUSTOM CONFETTI CANVAS PARTICLES
  // ==========================================
  const canvas = document.getElementById('confetti-canvas');
  let ctx = null;
  let confettiParticles = [];
  let confettiInterval = null;

  function initConfetti() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    // Set size to window dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Spawn 150 particles
    confettiParticles = [];
    const colors = ['#ff6b8b', '#e05a86', '#ffa4b6', '#eae0f5', '#fff5f6', '#ffc1cc', '#dca9f7'];
    
    for (let i = 0; i < 160; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2, // explode from center
        y: window.innerHeight / 2,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        // Explosion vectors
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 5,
        gravity: 0.18
      });
    }

    if (confettiInterval) clearInterval(confettiInterval);
    confettiInterval = setInterval(drawConfettiFrame, 18);

    // Stop confetti canvas drawing after 6 seconds to free memory
    setTimeout(() => {
      clearInterval(confettiInterval);
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);
  }

  function drawConfettiFrame() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach((p) => {
      // Physics updates
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98; // drag
      
      p.tiltAngle += p.tiltAngleIncremental;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      
      // Draw confetti shape (circle or ribbon)
      ctx.beginPath();
      ctx.lineWidth = p.r / 2;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    if (canvas && confettiInterval) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // ==========================================
  // 11. AMAZON GIFT SEARCH INTERACTION
  // ==========================================
  const giftSearchInput = document.getElementById('gift-search-input');
  const giftSearchBtn = document.getElementById('gift-search-btn');

  function performGiftSearch() {
    if (!giftSearchInput) return;
    const query = giftSearchInput.value.trim();
    if (query !== "") {
      const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank');
      showToast(`Searching Amazon for "${query}"... 🎁🛒`);
    } else {
      showToast("Please enter a gift item to search! 🔍");
    }
  }

  if (giftSearchBtn) {
    giftSearchBtn.addEventListener('click', performGiftSearch);
  }
  if (giftSearchInput) {
    giftSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performGiftSearch();
      }
    });
  }

  // ==========================================
  // 12. DYNAMIC RISING BALLOONS SYSTEM
  // ==========================================
  const balloonColors = [
    '#ff6b8b', // primary pink
    '#e05a86', // dark pink
    '#ffa4b6', // blush pink
    '#dca9f7', // soft purple
    '#ffc1cc', // light pink
    '#ffd166', // warm yellow/gold
    '#06d6a0', // soft medical teal/green
    '#118ab2'  // soft sky blue
  ];

  function createPopBurst(x, y, color) {
    const numParticles = 12;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'pop-burst-particle';
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 80 + 40;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${Math.random() * 8 + 6}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = color;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 600);
    }
  }

  function spawnRisingBalloon() {
    if (!isBalloonSpawningEnabled) return;
    
    const balloon = document.createElement('div');
    balloon.className = 'rising-balloon';
    
    const balloonBody = document.createElement('div');
    balloonBody.className = 'rising-balloon-body';
    
    const balloonString = document.createElement('div');
    balloonString.className = 'rising-balloon-string';
    
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloonBody.style.background = `radial-gradient(circle at 35% 35%, #fff 0%, ${color} 70%, rgba(0,0,0,0.15) 100%)`;
    balloonBody.style.borderBottomColor = color;
    
    balloon.appendChild(balloonBody);
    balloon.appendChild(balloonString);
    
    const sizeScale = Math.random() * 0.4 + 0.8;
    const startX = Math.random() * (window.innerWidth - 100) + 50;
    const duration = Math.random() * 6 + 7;
    const swayDuration = Math.random() * 2 + 2;
    
    balloon.style.left = `${startX}px`;
    balloon.style.transform = `scale(${sizeScale})`;
    balloon.style.animationName = 'floatUp, swaySideSide';
    balloon.style.animationDuration = `${duration}s, ${swayDuration}s`;
    
    balloon.addEventListener('click', (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      createPopBurst(clickX, clickY, color);
      
      // Popping any rising balloon triggers the photos pop surprise immediately!
      triggerBalloonPop();
      
      balloon.remove();
    });
    
    document.body.appendChild(balloon);
    
    setTimeout(() => {
      balloon.remove();
    }, duration * 1000);
  }

  setInterval(spawnRisingBalloon, 3500);

  setTimeout(spawnRisingBalloon, 800);
  setTimeout(spawnRisingBalloon, 1800);
  setTimeout(spawnRisingBalloon, 2800);

  // ==========================================
  // 13. LOCK SCREEN PASSCODE SECURITY
  // ==========================================
  const lockScreen = document.getElementById('lock-screen');
  const passcodeDotsContainer = document.getElementById('passcode-dots');
  const keyButtons = document.querySelectorAll('.key-btn');
  const clearButton = document.getElementById('key-clear');
  const backspaceButton = document.getElementById('key-back');
  
  const CORRECT_PASSCODE = '2905';
  let enteredPasscode = '';

  function updatePasscodeDots() {
    if (!passcodeDotsContainer) return;
    const dots = passcodeDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index < enteredPasscode.length) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function handlePasscodeEntry(num) {
    if (enteredPasscode.length >= 4) return;
    
    enteredPasscode += num;
    updatePasscodeDots();
    
    if (enteredPasscode.length === 4) {
      setTimeout(() => {
        if (enteredPasscode === CORRECT_PASSCODE) {
          if (lockScreen) {
            lockScreen.classList.add('unlocked');
            document.body.classList.add('unlocked-animation');
            showToast('Welcome to your Birthday Scrapbook! 🩺💖✨');
            playUnlockSoundSynth();
          }
        } else {
          if (passcodeDotsContainer) {
            passcodeDotsContainer.classList.add('error');
            showToast('Incorrect passcode! Please try again. 🔒');
            playErrorSoundSynth();
            
            setTimeout(() => {
              passcodeDotsContainer.classList.remove('error');
              enteredPasscode = '';
              updatePasscodeDots();
            }, 500);
          }
        }
      }, 250);
    }
  }

  function handleBackspace() {
    if (enteredPasscode.length === 0) return;
    enteredPasscode = enteredPasscode.slice(0, -1);
    updatePasscodeDots();
  }

  function handleClear() {
    enteredPasscode = '';
    updatePasscodeDots();
  }

  keyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (val !== null) {
        handlePasscodeEntry(val);
      }
    });
  });

  if (clearButton) clearButton.addEventListener('click', handleClear);
  if (backspaceButton) backspaceButton.addEventListener('click', handleBackspace);

  window.addEventListener('keydown', (e) => {
    if (lockScreen && !lockScreen.classList.contains('unlocked')) {
      if (e.key >= '0' && e.key <= '9') {
        handlePasscodeEntry(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        handleClear();
      }
    }
  });

  function playUnlockSoundSynth() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      const now = audioCtx.currentTime;
      osc1.frequency.setValueAtTime(261.63, now);
      osc1.frequency.setValueAtTime(329.63, now + 0.1);
      osc1.frequency.setValueAtTime(392.00, now + 0.2);
      osc1.frequency.setValueAtTime(523.25, now + 0.3);
      
      osc2.frequency.setValueAtTime(523.25, now + 0.3);
      
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start(now + 0.3);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch(err) {
      console.log("Unlock audio blocked:", err);
    }
  }

  function playErrorSoundSynth() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.25);
      
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(err) {
      console.log("Error audio blocked:", err);
    }
  }

  // ==========================================
  // 14. SECRET SURPRISE MODAL
  // ==========================================
  const secretModal = document.getElementById('secret-modal');
  const secretSurpriseBtn = document.getElementById('secret-surprise-btn');
  const closeSecretBtn = document.getElementById('close-secret-btn');

  function openSecretModal() {
    if (secretModal) {
      secretModal.classList.add('active');
      showToast('Opening the secret funny surprise... 🤪🤫');
    }
  }

  function closeSecretModal() {
    if (secretModal) {
      secretModal.classList.remove('active');
    }
  }

  if (secretSurpriseBtn) {
    secretSurpriseBtn.addEventListener('click', openSecretModal);
  }

  if (closeSecretBtn) {
    closeSecretBtn.addEventListener('click', closeSecretModal);
  }

  // Close when clicking overlay background
  window.addEventListener('click', (e) => {
    if (e.target === secretModal) {
      closeSecretModal();
    }
  });

  // ==========================================
  // 15. MBBS STRESS LEVEL METER WIDGET
  // ==========================================
  let studyHours = 0;
  let stressLevel = 0;
  
  const stressEmoji = document.getElementById('stress-emoji');
  const stressStatus = document.getElementById('stress-status');
  const stressProgressBar = document.getElementById('stress-progress-bar');
  const stressPercentage = document.getElementById('stress-percentage');
  const studyHoursEl = document.getElementById('study-hours');
  const stressJoke = document.getElementById('stress-joke');
  
  const btnStudy1 = document.getElementById('btn-study-1');
  const btnStudy8 = document.getElementById('btn-study-8');
  const btnStressReset = document.getElementById('btn-stress-reset');
  
  const stressStages = [
    { max: 15, emoji: '🌸', status: 'Fresh MBBS Student', joke: '"Stethoscope around the neck, ready to save lives! Feeling motivated."' },
    { max: 40, emoji: '📚', status: 'Coffee Addict', joke: '"Reading the same anatomy page for 2 hours. Caffeine is the only thing keeping me upright."' },
    { max: 70, emoji: '🥴', status: 'Anatomy Victim', joke: '"Can identify 206 bones in my body but cannot remember where I put my house keys."' },
    { max: 90, emoji: '🧟‍♀️', status: 'Pre-Exam Zombie', joke: '"Sleep? Never heard of her. Kdramas? A distant memory. I live inside a library now."' },
    { max: 100, emoji: '💀', status: 'Dead on Arrival', joke: '"I am no longer studying MBBS. MBBS is studying me. Send help, donuts, or a blank prescription."' }
  ];

  function updateStressMeter() {
    if (!stressProgressBar) return;
    
    // Clamp stress
    if (stressLevel > 100) stressLevel = 100;
    if (stressLevel < 0) stressLevel = 0;
    
    stressProgressBar.style.width = `${stressLevel}%`;
    if (stressPercentage) stressPercentage.innerText = `${stressLevel}%`;
    if (studyHoursEl) studyHoursEl.innerText = studyHours;
    
    // Update stage text/emoji
    const stage = stressStages.find(s => stressLevel <= s.max) || stressStages[stressStages.length - 1];
    
    if (stressEmoji) {
      stressEmoji.innerText = stage.emoji;
      stressEmoji.style.transform = 'scale(1.3)';
      setTimeout(() => {
        stressEmoji.style.transform = 'scale(1)';
      }, 200);
    }
    if (stressStatus) stressStatus.innerText = stage.status;
    if (stressJoke) stressJoke.innerText = stage.joke;
    
    if (stressLevel < 30) {
      stressProgressBar.style.background = 'linear-gradient(90deg, #b5e2fa, #85e3ff)';
    } else if (stressLevel < 60) {
      stressProgressBar.style.background = 'linear-gradient(90deg, #ffc8dd, #ffb3c1)';
    } else if (stressLevel < 85) {
      stressProgressBar.style.background = 'linear-gradient(90deg, #ffa6c9, #ff5c8a)';
    } else {
      stressProgressBar.style.background = 'linear-gradient(90deg, #e63946, #d90429)';
    }
  }
  
  if (btnStudy1) {
    btnStudy1.addEventListener('click', () => {
      studyHours += 1;
      stressLevel += 6;
      updateStressMeter();
      showToast('Studied for 1 hour! Stress levels creeping up... 📈');
    });
  }
  
  if (btnStudy8) {
    btnStudy8.addEventListener('click', () => {
      studyHours += 8;
      stressLevel += 35;
      updateStressMeter();
      showToast('8-hour cram session! Warning: Brain cell count depletion! ☕🤯');
    });
  }
  
  if (btnStressReset) {
    btnStressReset.addEventListener('click', () => {
      studyHours = 0;
      stressLevel = 0;
      updateStressMeter();
      showToast('Took a beautiful power nap! Sanity restored! 😴🌸');
    });
  }

  // ==========================================
  // 16. FUNNY DIAGNOSIS GENERATOR LOGIC
  // ==========================================
  const rxModal = document.getElementById('rx-modal');
  const btnGenerateDiagnosis = document.getElementById('btn-generate-diagnosis');
  const closeRxBtn = document.getElementById('close-rx-btn');
  const rxDiagnosis = document.getElementById('rx-diagnosis');
  const rxTreatmentList = document.getElementById('rx-treatment-list');
  
  const funnyDiagnoses = {
    none: {
      title: "Suspiciously Perfect Health 🤨",
      treatment: [
        "Go read an Anatomy chapter immediately.",
        "Eat a slice of birthday cake (mandatory dose).",
        "Drink water and stop pretending you have no stress."
      ]
    },
    anatomy: {
      title: "Bone-Deep Anatomy Exhaustion (Anatomy-itis) 💀☠️",
      treatment: [
        "Close Netter's Anatomy atlas immediately to prevent eye strain.",
        "Take a Kdrama session (1 episode hourly).",
        "Hug a pillow (simulating medical textbook support)."
      ]
    },
    coffee: {
      title: "Acute Espresso Overdosis (Caffeine Running Mode) ☕⚡",
      treatment: [
        "Lie down and listen to lo-fi music for 30 minutes.",
        "Swap coffee for chocolate milkshake.",
        "Close your eyes and pretend you are sleeping."
      ]
    },
    webmd: {
      title: "Medical Student Syndrome (Rare Disease Hypochondria) 🕵️‍♀️🔬",
      treatment: [
        "Stop searching symptoms on Google/WebMD.",
        "Diagnose your family members only with 'extremely good luck'.",
        "Spend 1 hour laughing at memes."
      ]
    },
    sleep: {
      title: "Severe Textbook Pillow Syndrome 😴📖",
      treatment: [
        "Replace textbook with a soft, memory foam pillow.",
        "Inhale exactly 8.5 hours of dreamless sleep.",
        "Apply birthday wishes to forehead twice daily."
      ]
    },
    combo: {
      title: "Extreme MBBS Survival Crisis Mode 🩺🚨",
      treatment: [
        "Unconditional academic amnesty for the next 24 hours.",
        "Consume 2 large slices of chocolate cake.",
        "Kdrama marathon (non-stop bingeing prescribed).",
        "Inhale sleep. Exhale anatomical terminology."
      ]
    }
  };

  if (btnGenerateDiagnosis) {
    btnGenerateDiagnosis.addEventListener('click', () => {
      const checkedSymptoms = document.querySelectorAll('.symptom-check:checked');
      let diagnosisKey = 'none';
      
      if (checkedSymptoms.length === 1) {
        diagnosisKey = checkedSymptoms[0].value;
      } else if (checkedSymptoms.length > 1) {
        diagnosisKey = 'combo';
      }
      
      const selectedDiag = funnyDiagnoses[diagnosisKey];
      
      if (rxDiagnosis) rxDiagnosis.innerText = selectedDiag.title;
      if (rxTreatmentList) {
        rxTreatmentList.innerHTML = '';
        selectedDiag.treatment.forEach(treat => {
          const li = document.createElement('li');
          li.innerText = treat;
          rxTreatmentList.appendChild(li);
        });
      }
      
      if (rxModal) {
        rxModal.classList.add('active');
        showToast('Prescription generated! 📝✨');
      }
    });
  }

  function closeRxModal() {
    if (rxModal) {
      rxModal.classList.remove('active');
    }
  }

  if (closeRxBtn) {
    closeRxBtn.addEventListener('click', closeRxModal);
  }
  
  // Close prescription modal when clicking overlay background
  window.addEventListener('click', (e) => {
    if (e.target === rxModal) {
      closeRxModal();
    }
  });

});
