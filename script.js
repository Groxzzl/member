// Birthday check functionality
function checkBirthdays() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  
  console.log('Tanggal hari ini:', currentDay, 'Bulan:', currentMonth);
  
  const cards = document.querySelectorAll('.child-card');
  
  cards.forEach(card => {
    const birthdayText = card.querySelector('.child-birthday').textContent;
    const [day, month] = birthdayText.split(' ');
    
    const monthMap = {
      'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3,
      'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7,
      'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };
    
    const birthdayDay = parseInt(day);
    const birthdayMonth = monthMap[month];
    
    console.log('Membaca ulang tahun:', birthdayDay, month, '(', birthdayMonth, ')');
    
    if (birthdayDay === currentDay && birthdayMonth === currentMonth) {
      console.log('Ulang tahun ditemukan untuk:', card.querySelector('.child-name').textContent);
      const nameElement = card.querySelector('.child-name');
      nameElement.style.color = '#ef4444';
      nameElement.style.textShadow = '0 0 8px rgba(239, 68, 68, 0.7)';
      nameElement.style.animation = 'birthdayBlink 1.5s infinite';
    }
  });
}

// Photo slideshow functionality
function initSlideshows() {
  const slideshows = document.querySelectorAll('.photo-slideshow');
  
  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.photo-slide');
    let currentSlide = 0;
    
    function nextSlide() {
      // Remove active class from current slide
      slides[currentSlide].classList.remove('active');
      slides[currentSlide].classList.add('prev');
      
      // Move to next slide
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Add active class to new slide
      slides[currentSlide].classList.remove('prev');
      slides[currentSlide].classList.add('active');
    }
    
    // Start slideshow
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  checkBirthdays();
  initSlideshows();
});

// Run birthday check every minute
setInterval(checkBirthdays, 60000);

// Audio handling
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let isPlaying = false;
    let playAttempted = false;
    
    // Function to play audio with proper state management
    function playAudio() {
        if (isPlaying || playAttempted) return; // Prevent multiple play attempts
        
        playAttempted = true;
        
        audio.play()
            .then(() => {
                isPlaying = true;
                console.log("Audio playing successfully");
            })
            .catch(function(error) {
                console.log("Audio playback failed:", error);
                isPlaying = false;
                playAttempted = false; // Reset attempt flag on error
            });
    }
    
    // Reset flags when audio ends or is paused
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playAttempted = false;
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        playAttempted = false;
    });
    
    // Handle audio errors
    audio.addEventListener('error', (e) => {
        console.log("Audio error:", e);
        isPlaying = false;
        playAttempted = false;
        
        // Try to recover from error after a short delay
        setTimeout(() => {
            if (!isPlaying && !playAttempted) {
                playAudio();
            }
        }, 2000);
    });
    
    // Try to play audio when user interacts with the page
    function handleUserInteraction() {
        playAudio();
        // Remove the event listener after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
    }
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // Preload the audio
    audio.load();
    
    // Try to play audio when page loads (for browsers that allow autoplay)
    if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
        playAudio();
    } else {
        audio.addEventListener('canplay', () => {
            playAudio();
        }, { once: true });
    }
}); 