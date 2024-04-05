const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const span0 = document.getElementById('span0');
const rotatingImg1 = document.getElementById('rotatingImg1');
const rotatingImg2 = document.getElementById('rotatingImg2');
const rotatingImgPre = document.getElementById('rotatingImgPre');



// Setting Canvas to FullScreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const toggleButton = document.getElementById('modeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

});

document.addEventListener("mousemove", (e) => {
    rotateElement(e, rotatingImg1);

});

document.addEventListener("mousemove", (e) => {

    rotateElement2(e, rotatingImg2);
});

document.addEventListener("mousemove", (e) => {
    rotateElementPre(e, rotatingImgPre);
});

// function rotateElement(event, element) {
//     const x = event.clientX;
//     const y = event.clientY;
//     const middleX = window.innerWidth / 2;
//     const middleY = window.innerHeight / 2;

//     const offsetX = ((x - middleX) / middleX) * 20;
//     const offsetY = ((y - middleY) / middleY) * 20;

//     element.style.setProperty("--rotateX", -1 * offsetY + "deg");
//     element.style.setProperty("--rotateY", offsetX + "deg");


// }

function rotateElement(event, element) {
    const rect = element.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(Math.pow(event.clientX - elementCenterX, 2) + Math.pow(event.clientY - elementCenterY, 2));
    const distanceFactor = Math.max(window.innerWidth, window.innerHeight);
    const scale = 1 - Math.min(distance / distanceFactor, 1); // Ensures scale is between 0 and 1

    // Limit the maximum rotation angle
    const maxRotation = 30;
    const offsetX = Math.min(((event.clientX - elementCenterX) / elementCenterX) * maxRotation, maxRotation) * scale;
    const offsetY = Math.min(((event.clientY - elementCenterY) / elementCenterY) * maxRotation, maxRotation) * scale;

    element.style.setProperty("--rotateX", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY", offsetX + "deg");
}

// Repeat similar modifications for rotateElement2

// Repeat similar modifications for rotateElement2


// Repeat similar modifications for rotateElement2


function rotateElement2(event, element) {
    const x = event.clientX;
    const y = event.clientY;
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 20;
    const offsetY = ((y - middleY) / middleY) * 20;

    element.style.setProperty("--rotateX2", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY2", offsetX + "deg");


}


function rotateElementPre(event, element) {
    const x = event.clientX;
    const y = event.clientY;
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 20;
    const offsetY = ((y - middleY) / middleY) * 20;

    element.style.setProperty("--rotateXPre", -1 * offsetY + "deg");
    element.style.setProperty("--rotateYPre", offsetX + "deg");


}

// Resize the canvas size when window size is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mousePosition = {
    x: undefined,
    y: undefined
};

let hueRotate = 0;
let particlesArr = [];

function Particles() {
    this.x = mousePosition.x;
    this.y = mousePosition.y;
    this.size = Math.random() * 25 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;

    // Using light-mode to determine the color of the particle
    this.particleColor = document.body.classList.contains('light-mode') ? 'white' : 'rgba(0,0,0,1)';

    this.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.2;
    };

    this.draw = function () {
        context.save();

        // Create a radial gradient for the particle effect
        let gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.particleColor); // Inner color of the particle
        gradient.addColorStop(1, "transparent"); // Outer color of the particle

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();

        // Add a contrasting stroke to the particle if it's dark
        if (this.particleColor !== 'white') {
            context.strokeStyle = 'rgba(255, 255, 255, 0.2)'; // White border with some transparency for visibility
            context.lineWidth = 2; // Adjust line width as needed
            context.stroke();
        }

        context.restore();
    };
}




canvas.addEventListener('mousemove', (e) => {
    mousePosition.x = e.x;
    mousePosition.y = e.y;
    for (let i = 0; i < 5; i++) {
        particlesArr.push(new Particles());
    }
});

const circle1 = { x: 600, y: 600, radius: 250, xDelta: -4, yDelta: -4, blurRadius: 100 };
const circle2 = { x: 300, y: 300, radius: 350, xDelta: 4, yDelta: 4, blurRadius: 100 };

function drawCircle(circle, color) {
    context.save(); // Save the current state of the context

    context.filter = 'blur(180px)';
    context.antialias = true;

    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();

    context.restore(); // Restore the context to the saved state (without shadow blur)
}

function updateAndRender() {
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].draw();
        particlesArr[i].update();
        if (particlesArr[i].size <= 3) {
            particlesArr.splice(i, 1);
            i--;
        }
    }

    moveAndDrawCircle(circle1, 'rgba(255, 102, 255, 0.9)');
    moveAndDrawCircle(circle2, 'rgba(155, 204, 255, 0.9)');
}

function moveAndDrawCircle(circle, color) {


    circle.x += circle.xDelta;
    circle.y += circle.yDelta;
    const edgeOffset = circle.radius / 5;

    if (circle.x + edgeOffset > canvas.width || circle.x - edgeOffset < 0) {
        circle.xDelta *= -1;
    }
    if (circle.y + edgeOffset > canvas.height || circle.y - edgeOffset < 0) {
        circle.yDelta *= -1;
    }

    drawCircle(circle, color);
}

function animate() {
    this.particleColor = document.body.classList.contains('light-mode') ? 'white' : 'black';

    // context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context.fillStyle = this.particleColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    updateAndRender();


    requestAnimationFrame(animate);
}

animate();


// Event listener for the "Home" link (your name)
document.getElementById('homeLink').addEventListener('click', function(event) {

    // Show the projects content
    document.getElementById('projectsContent').classList.add("visible");
    document.getElementById('projectsContent').classList.remove("hidden");

    // Hide the about me section
    document.getElementById('aboutMeContent').classList.add("hidden");
    document.getElementById('aboutMeContent').classList.remove("visible");
});

// Event listener for the "Projects" link
// Ensure this element exists and has the correct ID in your HTML
document.getElementById('projectsLink').addEventListener('click', function(event) {

    // Toggle visibility
    document.getElementById('projectsContent').classList.add("visible");
    document.getElementById('projectsContent').classList.remove("hidden");
    document.getElementById('aboutMeContent').classList.add("hidden");
    document.getElementById('aboutMeContent').classList.remove("visible");
});

// Event listener for the "About Me" tab
document.getElementById('aboutMeTab').addEventListener('click', function() {
    // Toggle visibility
    document.getElementById('projectsContent').classList.add("hidden");
    document.getElementById('projectsContent').classList.remove("visible");
    document.getElementById('aboutMeContent').classList.add("visible");
    document.getElementById('aboutMeContent').classList.remove("hidden");
});


function copyEmail() {
    var emailText = "xprose7820@gmail.com"; // Replace with your actual email address
    var tempInput = document.createElement("input");
    tempInput.value = emailText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    var tooltip = document.querySelector('.tooltip-text');
    tooltip.textContent = "Copied!";
    setTimeout(function() {
      tooltip.textContent = "Copy Email"; // Reset tooltip text after a delay
    }, 2000);
  }
  
  