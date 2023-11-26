function app() {

  const SHOW_PROFILE = 'profile-dropdown-show';
  const SHOW_NOTIFICATION = 'notification-dropdown-show';

  const notificationButton = document.querySelector('.notification-button')
  const notificationDropdown = document.querySelector('.notification-dropdown')

  const profileDrop = document.querySelector('#profile-drop')

  const profileDropdown = document.querySelector('.profile-dropdown');

  const profileMenuItems = profileDropdown.querySelectorAll(
    '[role="menuitem"]'
  );

   function handleMenuItemArrowKeyPress(
    event,
     menuItemIndex,
    allMenuItems
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

  function handleMenuEscapeKeypress(event) {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  function closeMenu(menuTrigger) {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }
  function openMenu(menuTrigger, menu, allMenuItems = null) {
    menuTrigger.ariaExpanded = "true";

    menu.addEventListener(
      "keyup",
      handleMenuEscapeKeypress
    );

    // for each menu item, register an event listener for the keyup event
    if (allMenuItems) {
      allMenuItems.item(0).focus();

      allMenuItems.forEach(function (
        menuItem,
        menuItemIndex
      ) {
        menuItem.addEventListener("keyup", function (event) {
            handleMenuItemArrowKeyPress(event, menuItemIndex, allMenuItems);
          });
      });
      
    }
    
  }

  function toggleMenu(menuTrigger, menu, menuItems, activeClass) {
      const isExpanded =
        menuTrigger.attributes["aria-expanded"].value ===
        "true";
    // help clear class irrespective
    switch (activeClass) {
      case SHOW_PROFILE:
        notificationDropdown.classList.remove(SHOW_NOTIFICATION)
        break;
      case SHOW_NOTIFICATION:
        profileDropdown.classList.remove(SHOW_PROFILE)
        break;
    
      default:
        break;
    }
    

      menu.classList.toggle(activeClass);

      if (isExpanded) {
        closeMenu(menuTrigger);
      } else {
        openMenu(menuTrigger, menu, menuItems);
      }
  }

  
  profileDrop.addEventListener("click", () =>
    toggleMenu(profileDrop, profileDropdown, profileMenuItems, SHOW_PROFILE)
  ); 
  notificationButton.addEventListener("click", () =>
    toggleMenu(notificationButton, notificationDropdown, null, SHOW_NOTIFICATION)
  );



}

app();


