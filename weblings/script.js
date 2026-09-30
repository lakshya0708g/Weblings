// ==========================================================
// HERO SECTION: mouse-tracking parallax
// Background graphic moves WITH the cursor,
// floating cards move OPPOSITE to the cursor.
// ==========================================================
const heroSection = document.querySelector('.hero');
const parallaxItems = document.querySelectorAll('.floating-card, .hero-bg-graphic');
 
heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  // cursor position relative to center of the hero section, normalized -1 to 1
  const offsetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
  const offsetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
 
  parallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.depth) || 15;
    const direction = parseFloat(item.dataset.direction) || -1;
    const moveX = offsetX * depth * direction;
    const moveY = offsetY * depth * direction;
    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
 
heroSection.addEventListener('mouseleave', () => {
  parallaxItems.forEach((item) => {
    item.style.transform = 'translate(0px, 0px)';
  });
});
 
 
// ==========================================================
// INDUSTRIES CAROUSEL: infinite auto-slide
// ==========================================================
const carouselViewport = document.querySelector('.carousel-viewport');
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
 
const VISIBLE_ITEMS_DESKTOP = 5;
const VISIBLE_ITEMS_TABLET = 3;
const VISIBLE_ITEMS_MOBILE = 2;
const ORIGINAL_COUNT = 6;     // number of unique items before cloning
const SLIDE_INTERVAL = 2900;  // ms between slides (pause + transition)
const TRANSITION_MS = 600;    // must match the CSS transition duration below
 
let itemWidth = 0;
let currentIndex = 0;
 
function getVisibleCount() {
  const w = window.innerWidth;
  if (w <= 600) return VISIBLE_ITEMS_MOBILE;
  if (w <= 980) return VISIBLE_ITEMS_TABLET;
  return VISIBLE_ITEMS_DESKTOP;
}
 
function setItemWidths() {
  itemWidth = carouselViewport.clientWidth / getVisibleCount();
  carouselItems.forEach((item) => {
    item.style.width = itemWidth + 'px';
  });
}
 
function goToIndex(index, animate = true) {
  carouselTrack.style.transition = animate
    ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0.05, 0.36, 1)`
    : 'none';
  carouselTrack.style.transform = `translateX(-${index * itemWidth}px)`;
}
 
function slideNext() {
  currentIndex++;
  goToIndex(currentIndex, true);
 
  // once we've slid past all original items, snap back invisibly (clones make this seamless)
  if (currentIndex === ORIGINAL_COUNT) {
    setTimeout(() => {
      currentIndex = 0;
      goToIndex(currentIndex, false);
    }, TRANSITION_MS);
  }
}
 
setItemWidths();
goToIndex(0, false);
setInterval(slideNext, SLIDE_INTERVAL);
 
window.addEventListener('resize', () => {
  setItemWidths();
  goToIndex(currentIndex, false);
});
 
