const signInBtn = document.getElementById("signIn");
const singUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

// 通过点击事件来动态的添加class类名，来改变相应的样式
signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
singUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());
