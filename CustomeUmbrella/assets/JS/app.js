const colors = ["#00a3e0", "#fed141", "#d0006f"];
const colorMap = {
  "#00a3e0": "blue",
  "#fed141": "yellow",
  "#d0006f": "pink",
};

const loadColorsOnHtml = () => {
  let list = colors.reduce((html, color, i) => {
    html += `<li id="${color}" onClick="changeUmbrella('${color}')" class="color ${
      i === 0 ? "active" : ""
    }" data-color="${color}"></li>`;
    return html;
  }, "");

  let ul = document.querySelector(".tool .painter .color-picker");
  ul.innerHTML = list;
  setColors();
};

const setColors = () => {
  const colorPickers = document.querySelectorAll(".color-picker .color");
  colorPickers.forEach((picker) => {
    const bgColor = picker.getAttribute("data-color");
    picker.style.setProperty("--bg-color", bgColor);
    const darkborderColor = darkenColor(bgColor, 0.2, true); // Darken by 20%
    const lightborderColor = darkenColor(bgColor, 0.2, false); // Lighten by 20%

    picker.style.setProperty("--dark-border-color", darkborderColor);
    picker.style.setProperty("--light-border-color", lightborderColor);
  });
};

const darkenColor = (color, percent, isDark) => {
  // make darker
  const rgb = parseInt(color.slice(1), 16);
  const r = isDark
    ? Math.floor((rgb >> 16) * (1 - percent))
    : Math.min(255, Math.floor((rgb >> 16) + 255 * percent));
  const g = isDark
    ? Math.floor(((rgb >> 8) & 0x00ff) * (1 - percent))
    : Math.min(255, Math.floor(((rgb >> 8) & 0x00ff) + 255 * percent));
  const b = isDark
    ? Math.floor((rgb & 0x0000ff) * (1 - percent))
    : Math.min(255, Math.floor((rgb & 0x0000ff) + 255 * percent));

  // make lighter
  // const r = Math.min(255, Math.floor((rgb >> 16) + 255 * percent));
  // const g = Math.min(255, Math.floor(((rgb >> 8) & 0x00FF) + 255 * percent));
  // const b = Math.min(255, Math.floor((rgb & 0x0000FF) + 255 * percent));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const changeUmbrella = (color) => {
  const image = document.getElementById("umbrella_image");

  let src = image.src.substr(0, image.src.lastIndexOf("/") + 1);
  src += colorMap[color] + ".png";
  image.src = src;

  const colorPickers = document.querySelectorAll(".color-picker .color");
  colorPickers.forEach((li) => {
    li.id === color
      ? li.classList.add("active")
      : li.classList.remove("active");
  });
};

const logoInput = document.getElementById("logo_input");
const closeButton = document.getElementById("close-button");
const label = document.getElementById("label_name");
const image = document.getElementById("logo");

const clearInputField = () => {
  logoInput.value = "";
  logoInput.type = "text";
  logoInput.type = "file";
};

const validateFile = (file, extensions = [], size = 5242880) => {
  if (file) {
    // Check the file size (5MB in this case)
    debugger;
    if (file.size > size) {
      alert("The file is too large. Maximum size is 5MB.");
      clearInputField();
      return false;
    } else {
      // Check the file extension
      
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!extensions.includes(fileExtension)) {
        alert("Invalid file type. Only .jpg and .png files are allowed.");
        clearInputField();
        return false;
      } else {
        return true;
      }
    }
  }
};

logoInput.onchange = (e) => {
  const files = e.target.files;
  const isFile = !!files.length;
  if (validateFile(files[0], ["png", "jpg", "jpeg"], 5242880)) {
    label.innerHTML = isFile ? files[0].name : "Upload Logo";
    closeButton.style.opacity = isFile ? 1 : 0;
    image.src = isFile ? URL.createObjectURL(files[0]) : "";
    image.style.opacity = isFile ? 1 : 0;
  }
};

closeButton.onclick = (e) => {
  clearInputField();
  label.innerHTML = "Upload Logo";
  closeButton.style.opacity = 0;
  image.style.opacity = 0;
};

loadColorsOnHtml();


