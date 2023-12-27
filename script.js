const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const span0 = document.getElementById('span0');
const rotatingImg1 = document.getElementById('rotatingImg1');

// Setting Canvas to FullScreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("mousemove", (e) => {
    rotateElement(e, rotatingImg1);
});

function rotateElement(event, element) {
    const x = event.clientX;
    const y = event.clientY;
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 45;
    const offsetY = ((y - middleY) / middleY) * 45;

    element.style.setProperty("--rotateX", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY", offsetX + "deg");


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



    this.update = function () {

        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= .2;
    };



    this.draw = function () {
        context.save();
        // context.filter = 'blur(2px)';

        //    const color = getRandomColor(); 
        let gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, 'black'); // inner color

        gradient.addColorStop(1, "transparent"); // outer color
        context.fillStyle = gradient;


        // context.fillStyle = `black`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
    };

    // function getRandomColor() {
    //     // Define your two colors.
    //     let color1 = "rgba(255, 102, 255, 0.5)";
    //     let color2 = "rgba(155, 204, 255, 0.5)";

    //     // Use Math.random() to get a random number between 0 and 1.
    //     // If the number is less than 0.5, return color1. Otherwise, return color2.
    //     return (Math.random() < 0.5) ? color1 : color2;
    // }

}



canvas.addEventListener('mousemove', (e) => {
    mousePosition.x = e.x;
    mousePosition.y = e.y;
    for (let i = 0; i < 5; i++) {
        particlesArr.push(new Particles());
    }
});

const circle1 = { x: 600, y: 600, radius: 250, xDelta: -2, yDelta: -2, blurRadius: 100 };
const circle2 = { x: 300, y: 300, radius: 350, xDelta: 2, yDelta: 2, blurRadius: 100 };

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
    context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    updateAndRender();


    requestAnimationFrame(animate);
}

animate();
