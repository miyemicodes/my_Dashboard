function checkbox() {
  let numberOfCheckedBox = 0;
  let activeSubSectionIndex = 0;
  const crdDivs = document.querySelectorAll('.shopify-accordion');
  const selectBoxes = document.querySelectorAll('.tick');
  const progressCount = document.querySelector('#progress-count');
  const percentageDiv = document.querySelector('.progress-bar2');

  function updateProgressBarAndCount(numberOfCheckedBoxParams) {
      progressCount.innerHTML = numberOfCheckedBoxParams;
      const percentage = (numberOfCheckedBoxParams / selectBoxes.length) * 100;
      percentageDiv.style.width = `${percentage}%`;
  }
  
  function eventHelpForCheckBox(thebox) {
      thebox.addEventListener('click', () => {
          const emptyCheck = thebox.querySelector('.empty');
          const loading = thebox.querySelector('.loader');
          const loaded = thebox.querySelector('.loaded');

          if (thebox.classList.contains('select-box-active')) {
              loading.style.display = 'block';
              loaded.style.display = 'none';
              thebox.classList.remove('select-box-active');
              setTimeout(() => {
                  loading.style.display = 'none';
                  emptyCheck.style.display = 'block';
              }, 150);
              numberOfCheckedBox = --numberOfCheckedBox;
          } else {
              emptyCheck.style.display = 'none';
              loading.style.display = 'block';
              setTimeout(() => {
                  loading.style.display = 'none';
                  loaded.style.display = 'block';
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
              thebox.classList.add('select-box-active');
              numberOfCheckedBox = ++numberOfCheckedBox;
              openUnChecked();
          }
          // do update
          updateProgressBarAndCount(numberOfCheckedBox)
      });
  }

  function toggleSubSection(theSubNote, theSubSectionDiv, idxOfCrdDiv) {
      theSubNote.addEventListener('click', () => {
          console.log('activeSubSectionIndex:::', activeSubSectionIndex)
          if (!theSubSectionDiv.classList.contains('subsection-is-open')) {
              doHelpMeClosedAlreadyOpenSubsection(theSubSectionDiv, idxOfCrdDiv)
          } else {
              theSubSectionDiv.classList.remove('subsection-is-open')
              activeSubSectionIndex = -1
          }
      });
  }

  function helpMeAddEventToTheCheckBoxes(singleCrdDiv, indexOfCrdDiv) {

      const getCheckBox = singleCrdDiv.querySelector('.select-box');
      const getSubNote = singleCrdDiv.querySelector('.sub-note');
      const getSubSection = singleCrdDiv.querySelector('.subsection');
      eventHelpForCheckBox(getCheckBox);
      toggleSubSection(getSubNote, getSubSection, indexOfCrdDiv);
  }

  function doHelpMeClosedAlreadyOpenSubsection(theSubSectionDiv, idxOfCrdDiv) {
    theSubSectionDiv.classList.add('subsection-is-open');
      // check if any is open already and close it
      if (activeSubSectionIndex > - 1) {
          crdDivs[activeSubSectionIndex].querySelector('.subsection')
              .classList.remove('subsection-is-open')
          
      }
      activeSubSectionIndex = idxOfCrdDiv;
  }

  function openUnChecked() {
      for (let index = 0; index < crdDivs.length; index++) {
          const crdDiv = crdDivs[index]; 
          const getCheckBox = crdDiv.querySelector('.select-box');
          if (!getCheckBox.classList.contains('select-box-active')) {
              const getSubSection = crdDiv.querySelector('.subsection');
              doHelpMeClosedAlreadyOpenSubsection(getSubSection, index)
              break;
          }
      }
  }

  for (let index = 0; index < crdDivs.length; index++) {
      const crdDiv = crdDivs[index]; 
      helpMeAddEventToTheCheckBoxes(crdDiv, index);
  }
  crdDivs[activeSubSectionIndex].querySelector('.subsection')
                      .classList.add('subsection-is-open')
}


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

  
  const planContent = document.querySelector('.shopify-plans');
  const planBtn = document.querySelector('.plan-close-icon');

      planBtn.addEventListener('click', e =>{

      planContent.style.display ="none";

    });

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