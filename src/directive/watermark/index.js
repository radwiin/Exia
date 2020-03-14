export default {
  inserted(el, binding) {
    const text = binding.value.text || "WATERMARK";
    const font = binding.value.font || "12px Microsoft JhengHei";
    const color = binding.value.color || "rgba(180, 180, 180, 0.3)";

    let can = document.createElement("canvas");
    el.appendChild(can);
    can.width = 130;
    can.height = 50;
    can.style.display = "none";

    let cans = can.getContext("2d");
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = font || "12px Microsoft JhengHei";
    cans.fillStyle = color || "rgba(180, 180, 180, 0.3)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle";
    cans.fillText(text, 0, can.height);

    el.style.backgroundImage = `url(${can.toDataURL("image/png")})`;
  }
};
