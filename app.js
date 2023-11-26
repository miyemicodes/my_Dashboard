
/*
const item = document.querySelector(".accordion-dropdown");
function toggleAccordion(){
  const itemToggle = this.getAttribute("aria-expanded");
  item.setAttribute("aria-expanded", "false");

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
   item.addEventListener("click", toggleAccordion);
}
*/

const accBtn = document.querySelectorAll(".tick button");
const panel = document.querySelectorAll(".acc-drop-panel");

for (let i = 0; i < accBtn.length; i++) {
  accBtn[i].addEventListener("click",() => {
      this.classList.toggle("active");

      if (panel.style.display === "block") {
        panel.style.display = "none";
      }else{
        panel.style.display = "block";

      }
  });
  
}