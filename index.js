document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('main');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let direction = true;
  
    function draw(e) {
      if (!isDrawing) return;
      ctx.strokeStyle = getColor();
      ctx.lineWidth = getBrushSize();
  
      ctx.beginPath();
      // start from
      ctx.moveTo(lastX, lastY);
      // go to
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  
    function getColor() {
      return document.querySelector('.active').id;
    }
  
    function getBrushSize() {
      return document.getElementById('slider').value;
    }
  
    document.querySelectorAll('.btn-action').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.btn-action').forEach(btn => btn.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    document.getElementById('new').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    document.getElementById('erase').addEventListener('click', () => {
      ctx.strokeStyle = '#FFFFFF'; // White color for eraser
    });
  
    document.getElementById('slider').addEventListener('input', () => {
      document.getElementById('brushSize').textContent = document.getElementById('slider').value;
    });
  
  });
  