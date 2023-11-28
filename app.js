//CHECKBOX

function checkbox() {
  let numberOfCheckedBox = 0;
  let activeAccordionIndex = 0;
  const shopifyAccordions = document.querySelectorAll('.shopify-accordion');
  const selectBoxes = document.querySelectorAll('.tick');
  const progressCount = document.querySelector('#progress-count');
  const percentageDiv = document.querySelector('.progress-bar2');


  //SUBSECTION ACCORDION TOGGLE

  function toggleSubSection(singleAccordionDiv, idxOfAccDiv) {
     const theSubNote = singleAccordionDiv.querySelector('.sub-note');
    theSubNote.addEventListener('click', () => {
        if (!singleAccordionDiv.classList.contains('shopify-accordion-open')) {
          singleAccordionDiv.classList.add('shopify-accordion-open');
           activeAccordionIndex = idxOfAccDiv;
        } else {
            singleAccordionDiv.classList.remove('shopify-accordion-open');
            activeSubSectionIndex = -1
        }
    });
}

//OPEN UNCHECKED ACCORDION

  function openUnChecked() {
    for (let index = 0; index < shopifyAccordions.length; index++) {
        const shopifyAccordion = shopifyAccordions[index]; 
        const getCheckBox = shopifyAccordion.querySelector('.tick');
      if (!getCheckBox.classList.contains('checked')) {
          shopifyAccordion.classList.add('shopify-accordion-open');
            doHelpMeClosedAlreadyOpenSubsection(index)
            break;
        }
    }
  }


//CLOSE OPENED ACCORDION

  function doHelpMeClosedAlreadyOpenSubsection(newIdx) {
      // check if any is open already and close it
      if (activeAccordionIndex > - 1) {
          shopifyAccordions[activeAccordionIndex].classList.remove('shopify-accordion-open')
      }
      activeAccordionIndex = newIdx;
  }

//PROGRESS BAR UPDATE

  function updateProgressBarAndCount(numberOfCheckedBoxParams) {
      progressCount.innerHTML = numberOfCheckedBoxParams;
      const percentage = (numberOfCheckedBoxParams / selectBoxes.length) * 100;
      percentageDiv.style.width = `${percentage}%`;
  }

//CHECKBOX 

  function eventHelpForCheckBox(tickButton) {
    tickButton.addEventListener('click', () => {
          const emptyCheck = tickButton.querySelector('.empty');
          const loading = tickButton.querySelector('.loader');
          const loaded = tickButton.querySelector('.loaded');
          if (tickButton.classList.contains('checked')) {
              loading.style.display = 'block';
              loaded.style.display = 'none';
              setTimeout(() => {
                  loading.style.display = 'none';
                  emptyCheck.style.display = 'block';
              }, 150);
            numberOfCheckedBox = --numberOfCheckedBox;
            tickButton.classList.remove('checked')
          } else {
              emptyCheck.style.display = 'none';
              loading.style.display = 'block';
              setTimeout(() => {
                  loading.style.display = 'none';
                loaded.style.display = 'block';
                // this is animation:: do move to css
                  loaded.animate(
                      [
                          { transform: "scale(1.5)" },
                          { transform: "scale(1)" },
                      ],
                      {
                          duration: 50,
                          iterations: 1,
                      }
                  )
              }, 150); 
            numberOfCheckedBox = ++numberOfCheckedBox;
            tickButton.classList.add('checked')
              openUnChecked();
          }
          // do update
          updateProgressBarAndCount(numberOfCheckedBox)
      });
  }

//CHECKBOX TOGGLE EVENT

  function helpMeAddEventToTheCheckBoxes(singleAccordionDiv, indexOfAccordionDiv) {
    const getCheckBoxButton = singleAccordionDiv.querySelector('.tick');
    eventHelpForCheckBox(getCheckBoxButton);
    toggleSubSection(singleAccordionDiv, indexOfAccordionDiv);
  }

  for (let index = 0; index < shopifyAccordions.length; index++) {
    const shopifyAccordion = shopifyAccordions[index];
      helpMeAddEventToTheCheckBoxes(shopifyAccordion, index);
  }
  shopifyAccordions[activeAccordionIndex].classList.add('shopify-accordion-open');
}


//OTHER FUNCTIONALITIES

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

//SELECT PLAN EVENT
  
  const planContent = document.querySelector('.shopify-plans');
  const planBtn = document.querySelector('.plan-close-icon');

      planBtn.addEventListener('click', e =>{

      planContent.style.display ="none";

    });

//  KEYBOARD EVENT,MOUSE EVENTS

   function handleMenuItemArrowKeyPress(
    event,
     menuItemIndex,
    allMenuItems
  ) {

    const isLastMenuItem =
      menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(
      menuItemIndex + 1
    );
    const previousMenuItem = allMenuItems.item(
      menuItemIndex - 1
    );

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

// OPEN MENU

  function closeMenu(menuTrigger) {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

//  CLOSE MENU

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

//  TOGGLE MENU

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

//  PROFILE/NOTIFICATION TOGGLE
  
  profileDrop.addEventListener("click", () =>
    toggleMenu(profileDrop, profileDropdown, profileMenuItems, SHOW_PROFILE)
  ); 
  notificationButton.addEventListener("click", () =>
    toggleMenu(notificationButton, notificationDropdown, null, SHOW_NOTIFICATION)
  );


//   MAIN ACCORDION EVENT

  const accordionDropdown = document.querySelector('.accordion-dropdown');
  const accordionStep = document.querySelector('.accordion-step');
  accordionDropdown.addEventListener("click", () => {
    if(accordionDropdown.classList.contains('open')) {
      accordionStep.style.display = 'none';
      accordionDropdown.classList.remove('open')
    } else {
      accordionStep.style.display = 'flex';
      accordionDropdown.classList.add('open')
    }
    
  });


  // ckeckbox operation
  checkbox();


}

app();