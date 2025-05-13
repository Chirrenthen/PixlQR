// Code crafted by Chirrenthen
// PixlQR Javascript 
const input = document.getElementById('qr-input'),
      generateBtn = document.getElementById('generate-btn'),
      qrImg = document.getElementById('qr-img'),
      downloadBtn = document.getElementById('download-btn'),
      toast = document.getElementById('toast');
let lastValue = '';

function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(()=>{
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}

generateBtn.addEventListener('click', async ()=>{
  const val = input.value.trim();
  if(!val || val === lastValue) return;
  lastValue = val;
  
  generateBtn.textContent = 'Generating...';
  generateBtn.disabled = true;
  
  try {
    const apiURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(val)}`;
    const response = await fetch(apiURL);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    
    qrImg.src = objectURL;
    qrImg.onload = () => {
      generateBtn.textContent = 'Generate';
      generateBtn.disabled = false;
      downloadBtn.classList.remove('hidden');
      
      downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = `qr-code-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(objectURL);
      };
      showToast('QR Code Generated!');
    };
  } catch (error) {
    console.error('Error generating QR code:', error);
    generateBtn.textContent = 'Generate';
    generateBtn.disabled = false;
    showToast('Error generating QR code');
  }
});

input.addEventListener('input', ()=>{
  if(!input.value.trim()){
    downloadBtn.classList.add('hidden');
    lastValue = '';
  }
});