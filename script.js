const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const fullScreenButton = document.getElementById("fullScreenButton");
canvas.width = 1920;
canvas.height = 1080;
const floor = canvas.height - 450;
let gamespeed = 5;
const speed = document.getElementById("speed");
const speedLabel = document.getElementById("speedLabel");

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch((err) => {
      alert("Error");
    });
  } else {
    document.exitFullscreen();
  }
}
fullScreenButton.addEventListener("click", toggleFullScreen);

speed.onchange = () => {
  speedLabel.innerHTML = speed.value;
  gamespeed = speed.value;
};

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 3840;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(
      this.image,
      this.x + this.width - this.speedModifier * gamespeed,
      this.y
    );
  }
  update() {
    this.x -= this.speedModifier * gamespeed;
    if (this.x < -this.width) this.x = 0;
  }
}

class Mina {
  constructor(image) {
    this.x = 100;
    this.y = floor;
    this.image = image;
    this.frame = 0;
    this.width = 240;
    this.height = 320;
    this.frameInterval = 100;
    this.frameTimer = 0;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frame < 3) {
        this.frame++;
      } else this.frame = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
}

const image1 = document.getElementById("layer1");
const image2 = document.getElementById("layer2");
const image3 = document.getElementById("layer3");
const image4 = document.getElementById("layer4");
const image5 = document.getElementById("mina");

const backgroundImage = new Layer(background, 0);
const layer1 = new Layer(image1, 0.2);
const layer2 = new Layer(image2, 0.4);
const layer3 = new Layer(image3, 0.6);
const layer4 = new Layer(image4, 2);
const mina = new Mina(image5);

const layers = [];
layers.push(backgroundImage, layer1, layer2, layer3, layer4, mina);

let lasTime = 1;
function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaTime = timeStamp - lasTime;
  lasTime = timeStamp;
  layers.forEach((layer) => layer.draw(ctx));
  layers.forEach((layer) => layer.update(deltaTime));

  requestAnimationFrame(animate);
}
animate(0);
