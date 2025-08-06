const qrInput = document.getElementById('QR-input');
const GenerateBtn = document.getElementById('generate-btn');
const DownloadBtn = document.getElementById('download-btn');
const ResetBtn = document.getElementById('reset-btn');
const qrCodeDiv = document.getElementById('qr-code');
const canvas = document.createElement('canvas');
const DefaultContent = qrCodeDiv.innerHTML;
    
    function Generateqr(){
     QRCode.toCanvas(canvas, qrInput.value,{
        width: 450,
        margin: 7,
        errorCorrectionLevel: 'H',
        color:{
             dark: '#008000',   // foreground
             light: '#302f2f'   // background 
        }
     } ,(error) => {
     if(error) return console.error(error);
     qrInput.value = ""
     qrInput.style.display = "none";
     GenerateBtn.style.display = "none";
     DownloadBtn.style.display = "block";
     ResetBtn.style.display = "block";
     qrCodeDiv.innerHTML = '';
     qrCodeDiv.appendChild(canvas);
    })}
    function DownloadQR() {
        const link = document.createElement('a');
        link.download = "qr-code.png";
        link.href = canvas.toDataURL();
        link.click();
    }
    function Reset(){
        qrCodeDiv.innerHTML = DefaultContent;
        qrInput.style.display = "block";
        GenerateBtn.style.display = "block";
        DownloadBtn.style.display = "none";
        ResetBtn.style.display = "none";
    }
GenerateBtn.addEventListener('click', Generateqr);
DownloadBtn.addEventListener('click', DownloadQR);
ResetBtn.addEventListener('click', Reset);
