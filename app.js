const defaultLogo = 'logo.png';
const logoImage = new Image();
logoImage.src = defaultLogo;

logoImage.onload = () => {
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: document.getElementById("qr-input").value,
    image: defaultLogo,
    dotsOptions: {
      color: document.getElementById("dots-color").value,
      type: document.getElementById("dots-type").value
    },
    backgroundOptions: {
      color: document.getElementById("bg-color").value
    },
    cornersSquareOptions: {
      type: document.getElementById("corners-square-type").value,
      color: document.getElementById("corners-color").value
    },
    cornersDotOptions: {
      type: document.getElementById("corners-dot-type").value,
      color: document.getElementById("corners-dot-color").value
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5
    }
  });

  const qrCodeContainer = document.getElementById("qr-code");
  qrCode.append(qrCodeContainer);

  function updateQRCode(imageUrl) {
    const data = document.getElementById("qr-input").value;
    const dotsColor = document.getElementById("dots-color").value;
    const bgColor = document.getElementById("bg-color").value;
    const logoUrl = imageUrl || document.getElementById("logo-url").value || defaultLogo;
    const dotsType = document.getElementById("dots-type").value;
    const cornersSquareType = document.getElementById("corners-square-type").value;
    const cornersDotType = document.getElementById("corners-dot-type").value;
    const cornersColor = document.getElementById("corners-color").value;
    const cornersDotColor = document.getElementById("corners-dot-color").value;

    qrCode.update({
      data: data,
      dotsOptions: { color: dotsColor, type: dotsType },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: cornersSquareType, color: cornersColor },
      cornersDotOptions: { type: cornersDotType, color: cornersDotColor },
      image: logoUrl
    });
  }

  document.getElementById("generate-btn").addEventListener("click", () => updateQRCode());

  document.getElementById("download-btn").addEventListener("click", function() {
    qrCode.download({ extension: "png" });
  });

  ["qr-input", "dots-color", "bg-color", "logo-url", "dots-type", "corners-square-type", "corners-dot-type", "corners-color", "corners-dot-color"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => updateQRCode());
  });

  document.getElementById("logo-upload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      updateQRCode(evt.target.result);
    };
    reader.readAsDataURL(file);
  });

  // Initial QR code generation with default value
  updateQRCode();
};