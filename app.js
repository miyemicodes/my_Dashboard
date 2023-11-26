
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


  const notificationButton = document.querySelector('.notification-button')
  const notificationDropdown = document.querySelector('.notification-dropdown')

  const profileDrop = document.querySelector('#profile-drop')

  const profileDropdown = document.querySelector('.profile-dropdown')
  
 
  function myDropDown(menu, menuTrigger, activeClass) {
    
    const allMenuItems = menu.querySelectorAll(
      '[role="menuitem"]'
    );

    function closeMenu() {
      menuTrigger.ariaExpanded = "false";
      menuTrigger.focus();
    }


    function handleMenuEscapeKeypress(event) {
      // if user pressed escape key
      if (event.key === "Escape") {
        toggleMenu();
      }
    }

    function handleMenuItemArrowKeyPress(
      event,
      menuItemIndex
    ) {
      // create some helpful variables : isLastMenuItem, isFirstMenuItem
      const isLastMenuItem =
        menuItemIndex === allMenuItems.length - 1;
      const isFirstMenuItem = menuItemIndex === 0;

      const nextMenuItem = allMenuItems.item(
        menuItemIndex + 1
      );
      const previousMenuItem = allMenuItems.item(
        menuItemIndex - 1
      );

      // if the user pressed arrow right or arrow down
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        // if user is on last item, focus on first menuitem
        if (isLastMenuItem) {
          allMenuItems.item(0).focus();

          return;
        }
        // then focus on next menu item
        nextMenuItem.focus();
      }

      // if the user pressed arrow up or arrow left
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        if (isFirstMenuItem) {
          allMenuItems.item(allMenuItems.length - 1).focus();
          return;
        }

        previousMenuItem.focus();
      }
      // then focus on the previous menu item
      // if the user is on first menu item, focus on last menuitem
    }

    function openMenu() {
      menuTrigger.ariaExpanded = "true";
      allMenuItems.item(0).focus();

      menu.addEventListener(
        "keyup",
        handleMenuEscapeKeypress
      );

      // for each menu item, register an event listener for the keyup event
      allMenuItems.forEach(function (
        menuItem,
        menuItemIndex
      ) {
        menuItem.addEventListener("keyup", function (event) {
          handleMenuItemArrowKeyPress(event, menuItemIndex);
        });
      });
    }

    function toggleMenu() {
      const isExpanded =
        menuTrigger.attributes["aria-expanded"].value ===
        "true";
      menu.classList.toggle(activeClass);

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
      // check and close
      if (profileDropdown.classList.contains('profile-dropdown-show')){
        profileDropdown.classList.remove('profile-dropdown-show');
      }
    }

    menuTrigger.addEventListener("click", toggleMenu);
  }

    myDropDown(profileDropdown, profileDrop, 'profile-dropdown-show')


  // TODO! need to fiinish on this
    notificationButton.addEventListener("click", e => {
      console.log('clickin')
      notificationDropdown.classList.toggle('notification-dropdown-show');
      if (profileDropdown.classList.contains('profile-dropdown-show')){
        profileDropdown.classList.remove('profile-dropdown-show');
      }
  }); 

  
  /* profileDrop.addEventListener("click",e =>{
    profileDropdown.classList.toggle('profile-dropdown-show');
    console.log
    if (notificationDropdown.classList.contains('notification-dropdown-show')){
      notificationDropdown.classList.remove('notification-dropdown-show');
    }
  }); */


  /*const plansBtn = document.querySelector(".plan-close-icon");
  const plansSection = document.querySelector(".shopify-plans");
  const profileMenuBtn = document.querySelector("#profile-drop");
  const profileMenuContent = document.querySelector(".profile-dropdown");
  const profileMenuItems = document.querySelectorAll(".p-menu");
  

  plansBtn.addEventListener("click",e =>{
    console.log('here');
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

  profileMenuBtn.addEventListener("click", toggleProfileMenu); */

  







}

app();


