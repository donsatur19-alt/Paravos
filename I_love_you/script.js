document.addEventListener("DOMContentLoaded", () => {
  const heart = document.querySelector(".heart");
  const container = document.getElementById("heartContainer");
  const stroke = document.getElementById("heartStroke");

  const mensajes = [
   "Te quiero mucho ,lo sabes?",
    "I love you,idiot",
    "Tqm,pendejo",
    "Estoy para lo que necesites,bueno?",
    "teamu-"
  ];

  const coloresMensajes = [
    "linear-gradient(135deg, #ff4d6d, #ff8fab)",
    "linear-gradient(135deg, #ff9ff3, #f368e0)",
    "linear-gradient(135deg, #48dbfb, #1dd1a1)",
    "linear-gradient(135deg, #feca57, #ff6b6b)"
  ];
  heart.addEventListener("click", () => {
    heart.style.transition = "transform 0.4s ease";
    heart.style.transform = "scale(1.3)";
    setTimeout(() => heart.style.transform = "scale(1)", 400);

    
    const msg = document.createElement("div");
    msg.className = "message-popup";
    msg.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    msg.style.background = coloresMensajes[Math.floor(Math.random() * coloresMensajes.length)];
    msg.style.top = "20%"; 
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 1600);

    for (let i = 0; i < 10; i++) {
      const tinyHeart = document.createElement("div");
      tinyHeart.className = "flying-heart";
      tinyHeart.textContent = "❤️";

      const angle = (Math.random() * Math.PI) - Math.PI / 2;
      const distance = 120 + Math.random() * 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 20;

      tinyHeart.style.setProperty("--x", `${x}px`);
      tinyHeart.style.setProperty("--y", `${y}px`);
      tinyHeart.style.setProperty("--r", `${Math.random() * 360}deg`);
      tinyHeart.style.fontSize = `${14 + Math.random() * 10}px`;

      container.appendChild(tinyHeart);
      setTimeout(() => tinyHeart.remove(), 1000);
    }
  });
  setInterval(() => {
    stroke.style.animation = 'none';
    void stroke.offsetWidth; 
    stroke.style.animation = 'draw 1.2s ease forwards';
  }, 3500);


  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
    const svg = document.querySelector('svg.heart');

  
    const clone = svg.cloneNode(true);
    const width = 240;
    const height = 240;
    clone.setAttribute("width", width);
    clone.setAttribute("height", height);

  
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);

 
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(blobPNG => {
        const a = document.createElement('a');
        const pngUrl = URL.createObjectURL(blobPNG);
        a.href = pngUrl;
        a.download = 'corazon.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.onerror = () => {
      alert('Error al generar la imagen. Intenta en otro navegador.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
});
