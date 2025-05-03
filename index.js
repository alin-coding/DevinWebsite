// Toggle mobile menu
const menuBtn = document.querySelector('.mobile-menu-btn');
const header = document.querySelector('.header-main');

menuBtn.addEventListener('click', function (e) {
  e.stopPropagation(); // Prevent click from bubbling to document
  header.classList.toggle('open');
});

// Close dropdown if clicked outside
document.addEventListener('click', function (e) {
  // If the click is outside the header AND not on the menu button
  if (!header.contains(e.target)) {
    header.classList.remove('open');
  }
});

// FAQ Drop Down

const arrows = document.querySelectorAll('.faq-arrow');
const questions = document.querySelectorAll('.faq-question');

// Handle clicks on both questions and arrows
function toggleFAQ(faqItem) {
  // Toggle active class
  faqItem.classList.toggle('active');
  
  // Get the answer element
  const answer = faqItem.querySelector('.faq-answer');
  
  // Set height based on active state
  if (faqItem.classList.contains('active')) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    answer.style.maxHeight = "0";
  }
}

// Add click handlers to questions
questions.forEach(question => {
  question.addEventListener('click', function() {
    const faqItem = this.closest('.faq-item');
    toggleFAQ(faqItem);
  });
});

// Add click handlers to arrows
arrows.forEach(arrow => {
  arrow.addEventListener('click', function(e) {
    e.stopPropagation();
    const faqItem = this.closest('.faq-item');
    toggleFAQ(faqItem);
  });
});

// READ MORE FEATURE

document.addEventListener('DOMContentLoaded', function() {
  const readMoreButtons = document.querySelectorAll('.books-read-more');

  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const booksItem = this.closest('.books-item');
      const dropDownText = booksItem.querySelector('.books-drop-down-text');
      const arrow = this.querySelector('.books-arrow');

      const isActive = booksItem.classList.toggle('active');

      if (isActive) {
        dropDownText.style.maxHeight = dropDownText.scrollHeight + "px";
        arrow.style.transform = 'rotate(180deg)';
      } else {
        dropDownText.style.maxHeight = "0";
        arrow.style.transform = 'rotate(0)';
      }
    });
  });

  // Optional: make "Read Less" clickable to collapse
  const readLessToggles = document.querySelectorAll('.read-less-toggle');
  readLessToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const booksItem = this.closest('.books-item');
      const dropDownText = booksItem.querySelector('.books-drop-down-text');
      const arrow = booksItem.querySelector('.books-read-more .books-arrow');

      booksItem.classList.remove('active');
      dropDownText.style.maxHeight = "0";
      arrow.style.transform = 'rotate(0)';
    });
  });
});

// SCROLL WHEEL 

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-items');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  // Start with the middle item active
  const positions = ['item-left-2', 'item-left-1', 'item-center', 'item-right-1', 'item-right-2'];
  
  // Track if this is the first interaction
  let firstInteraction = true;
  
  // Find the white image (now should be the 3rd element or index 2)
  const whiteImage = document.querySelector('.carousel-item.white-image') || items[2];
  
  // Initialize carousel
  function initCarousel() {
      // Since the white image is now positioned as the 3rd element (index 2),
      // we don't need to rearrange the items, but we'll verify it's centered
      
      items.forEach((item, index) => {
          // Set initial positions
          item.className = 'carousel-item';
          
          // Add white-image class if it's the designated white image
          if (item === whiteImage) {
              item.classList.add('white-image');
          }
          
          // Apply position class
          item.classList.add(positions[index]);
          
          // Store the original index for dot tracking
          item.dataset.index = index;
      });
      
      // Set the active dot to the middle (white image should be at index 2)
      updateDots(2);
  }
  
  // Update the dots to show the active item
  function updateDots(activeIndex) {
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeIndex);
      });
  }
  
  // Rotate carousel to the right (next)
  function rotateNext() {
      // Check if this is the first rotation
      if (firstInteraction) {
          // Add a smooth initial transition
          carousel.classList.add('smooth-transition');
          firstInteraction = false;
      }
      
      // Take the first item and move it to the last position
      const firstItem = items.shift();
      items.push(firstItem);
      
      // Update the positions and visuals
      updatePositions();
      
      // Update dots based on centered item's original index
      const centerItemIndex = parseInt(items[2].dataset.index);
      updateDots(centerItemIndex);
  }
  
  // Rotate carousel to the left (prev)
  function rotatePrev() {
      // Check if this is the first rotation
      if (firstInteraction) {
          // Add a smooth initial transition
          carousel.classList.add('smooth-transition');
          firstInteraction = false;
      }
      
      // Take the last item and move it to the first position
      const lastItem = items.pop();
      items.unshift(lastItem);
      
      // Update the positions and visuals
      updatePositions();
      
      // Update dots based on centered item's original index
      const centerItemIndex = parseInt(items[2].dataset.index);
      updateDots(centerItemIndex);
  }
  
  // Update positions of items in the carousel
  function updatePositions() {
      items.forEach((item, index) => {
          // Reset classes but preserve white-image class if present
          const isWhiteImage = item.classList.contains('white-image');
          item.className = 'carousel-item';
          if (isWhiteImage) {
              item.classList.add('white-image');
          }
          
          // Apply position class
          if (index < positions.length) {
              item.classList.add(positions[index]);
          } else {
              // Hide items that are too far from current view
              item.style.opacity = isWhiteImage ? '1' : '0';
              item.style.transform = 'translateX(150%)';
              item.style.zIndex = '1';
          }
      });
  }
  
  // Initialize
  initCarousel();
  
  // Next button click
  nextBtn.addEventListener('click', rotateNext);
  
  // Previous button click
  prevBtn.addEventListener('click', rotatePrev);
  
  // Dot click
  dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
          // Check if this is the first interaction
          if (firstInteraction) {
              carousel.classList.add('smooth-transition');
              firstInteraction = false;
          }
          
          // Find which item is currently in center
          const centerItemIndex = parseInt(items[2].dataset.index);
          
          // Calculate how many rotations needed
          let rotations = dotIndex - centerItemIndex;
          
          // Apply rotations
          if (rotations > 0) {
              for (let i = 0; i < rotations; i++) {
                  rotateNext();
              }
          } else if (rotations < 0) {
              for (let i = 0; i < Math.abs(rotations); i++) {
                  rotatePrev();
              }
          }
      });
  });
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left (next)
          rotateNext();
      } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right (prev)
          rotatePrev();
      }
  }
  
  // Mouse drag functionality
  let isDragging = false;
  let startPos = 0;
  
  carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startPos = e.clientX;
      e.preventDefault();
  });
  
  document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      
      isDragging = false;
      const movedBy = e.clientX - startPos;
      
      if (Math.abs(movedBy) > 50) {
          if (movedBy < 0) {
              rotateNext();
          } else {
              rotatePrev();
          }
      }
  });
  
  document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      // Could add real-time dragging effect here if desired
  });
});