// Rotation angles for each testimonial block
const rotations = ['-2deg', '2deg', '-3deg', '3deg', '-4deg'];

// Index to track which testimonial is currently being shown
let currentIndex = 0;
let observerInitialized = false;

function revealNextTestimonial() {
  const testimonials = document.querySelectorAll('.testimonial-block');

  if (currentIndex >= testimonials.length) return; // Stop if all testimonials are visible

  // Get the current testimonial to reveal
  const testimonial = testimonials[currentIndex];

  // Apply a rotation from the pre-defined list
  testimonial.style.setProperty('--rotation-angle', rotations[currentIndex % rotations.length]);

  // Add the 'visible' class to make the block appear
  testimonial.classList.add('visible');
  
  // Increment the index to the next testimonial for the next scroll event
  currentIndex++;
}

// Use IntersectionObserver to trigger testimonials when section enters the viewport
function createObserver() {
  const section = document.querySelector('.testimonials-section');
  
  const observerOptions = {
    root: null, // null means it'll use the viewport
    threshold: 0.1 // Trigger when 10% of the section is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observerInitialized) {
        // Once the section is in the viewport, reveal testimonials
        observerInitialized = true;
        
        // Show each testimonial one by one with delay
        const revealInterval = setInterval(() => {
          if (currentIndex >= document.querySelectorAll('.testimonial-block').length) {
            clearInterval(revealInterval); // Stop the interval if all testimonials are shown
          } else {
            revealNextTestimonial();
          }
        }, 500); // Adjust delay between each testimonial
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(section); // Start observing the testimonials section
}

// Start the observer when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', createObserver);


// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load a 3D model
const loader = new THREE.GLTFLoader();
loader.load('path/to/your/model.glb', function(gltf) {
    scene.add(gltf.scene);
});

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
