// Seletores
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const lengthInput = document.getElementById("length");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const themeBtn = document.getElementById("theme-toggle");

// Funções para gerar caracteres
function getUppercase() { return String.fromCharCode(Math.floor(Math.random() * 26) + 65); }
function getLowercase() { return String.fromCharCode(Math.floor(Math.random() * 26) + 97); }
function getNumber() { return String.fromCharCode(Math.floor(Math.random() * 10) + 48); }
function getSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Geração de senha
function generatePassword() {
  const length = lengthInput.value;
  let generatedPassword = "";
  const typesArr = [];

  if (uppercaseCheck.checked) typesArr.push(getUppercase);
  if (lowercaseCheck.checked) typesArr.push(getLowercase);
  if (numbersCheck.checked) typesArr.push(getNumber);
  if (symbolsCheck.checked) typesArr.push(getSymbol);

  if (typesArr.length === 0) {
    alert("Selecione pelo menos uma opção!");
    return "";
  }

  for (let i = 0; i < length; i++) {
    const randomFunc = typesArr[Math.floor(Math.random() * typesArr.length)];
    generatedPassword += randomFunc();
  }

  passwordInput.value = generatedPassword;
  checkStrength(generatedPassword);
}

// Indicador de força
function checkStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;

  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");

  switch(strength) {
    case 0:
    case 1:
      strengthBar.style.width = "25%";
      strengthBar.style.background = "red";
      strengthText.textContent = "Força: Fraca";
      break;
    case 2:
      strengthBar.style.width = "50%";
      strengthBar.style.background = "orange";
      strengthText.textContent = "Força: Média";
      break;
    case 3:
      strengthBar.style.width = "75%";
      strengthBar.style.background = "yellow";
      strengthText.textContent = "Força: Boa";
      break;
    case 4:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "green";
      strengthText.textContent = "Força: Forte";
      break;
  }
}

// Copiar para área de transferência
copyBtn.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    alert("Senha copiada! 🔐");
  }
});

// Gerar senha ao clicar no botão
generateBtn.addEventListener("click", generatePassword);

// Alternar tema claro/escuro
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
