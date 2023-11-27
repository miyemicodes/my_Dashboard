
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
*/
function app() {
 
  const plansBtn = document.querySelector(".plan-close-icon");
  const plansSection = document.querySelector(".shopify-plans");
  const profileMenuBtn = document.querySelector("#profile-drop");
  const profileMenuContent = document.querySelector("#profile-dropdown");
  const profileMenuItems = document.querySelectorAll(".p-menu");
  

  plansBtn.addEventListener("click",e =>{

    plansSection.style.display = "none";

  });
  console.log(plansSection);

  function closeProfileMenu (){
    profileMenuBtn.ariaExpanded = "false";
    profileMenuBtn.focus();
  }


  function openProfileMenu(){
    profileMenuBtn.ariaExpanded = "true";
    profileMenuItems.item(0).focus();
  }

  function toggleProfileMenu() {

    const profileExpanded =
    profileMenuBtn.attributes["aria-expanded"].value ===
      "true";
    profileMenuContent.classList.toggle("profile-active");

    if (profileExpanded) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  }

  profileMenuBtn.addEventListener("click", toggleProfileMenu);


}

app();


