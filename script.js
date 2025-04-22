// Typing effect function
const text = "Hello World";
let i = 0;
const speed = 150; // Delay between each character

function typeWriter() {
  if (i < text.length) {
    document.getElementById("hello-world-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// Display the text immediately when page loads (before typing effect)
document.getElementById("hello-world-text").innerHTML = "";

document.addEventListener("DOMContentLoaded", function() {
  // Start typing effect once the page content is loaded
  typeWriter();
});

// Change text size on hover
document.body.addEventListener("mousemove", function(event) {
  const scaleValue = 1 + (event.clientX + event.clientY) / 1000;
  document.getElementById("hello-world-text").style.transform = `scale(${scaleValue})`;
});
