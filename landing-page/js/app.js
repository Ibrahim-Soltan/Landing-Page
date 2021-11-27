//Global Variables
//The sections Variable stores a list of all HTML elements with type section
const sections = document.querySelectorAll("section");

//The navbarList stores the ul element that contains the links
const navbarList = document.getElementById("navbar__list");

//The topEl stores the first h1 element that reads Landing Page 
//Note: topEl element will be used later to decide whether to display the go up button or not
const topEl = document.querySelector("h1");

//The navbarFragment will contain the section links
//It is used to avoid the repetitive reflow & repaint
const navbarFragment = document.createDocumentFragment();

//The goTop stores the button created to scroll to the top of the page
const goTop = document.getElementById("GoTopBtn");

//The screeHeight variable stores the height of the screen
//Note: screenHeight will be used later to identify the active section
const screenHeight = window.innerHeight;


//The loop that creates the navbar:


/*
The following forEach loop will:
1- iterate over the sections in the HTML.
2- Create an li element for each section.
3- Create an event listener for each li element.
*/
sections.forEach(function(section,sectionNum){
    //Creating an li element
    const sectionButton = document.createElement("li");


    //Setting the text content of each li element to "Section" followed by its index+1
    sectionButton.textContent = "Section "+(sectionNum+1);

    //Adding menu__link to the class list of each li element (So that the font color and backgroud color changes when the user hovers over it)
    sectionButton.classList.add("menu__link");

    //Adding secLink class to the links to be able to access them later with querySelectorAll
    sectionButton.classList.add("secLink");

    //Adding an event lister to each li element so that when any one of them is clicked the correct section is scrolled into view
    sectionButton.addEventListener("click",function(){

           section.scrollIntoView({behavior:"smooth"}); 
        });

    //Appending each li element to the document fragement
    navbarFragment.appendChild(sectionButton);
});

//Adding all links to navbar in one go (Costing one reflow and one repaint)
navbarList.appendChild(navbarFragment);

//links store the li elements in the navbar
const links = document.querySelectorAll(".secLink");



//functions:

//hasCSSActiveClass checks if your-active-class css class is applied to the section which is passed as a parameter
function hasCSSActiveClass(section){
    return section.classList.contains("your-active-class");
}

//hasCSSActiveLinkClass checks if activeLink css class is applied to the section link which is passed as a parameter
function hasCSSActiveLinkClass(link){
    return link.classList.contains("activeLink");
}




//isActive returns a boolean indicating if the user is viewing the section
function isActive(section){
    let rect = section.getBoundingClientRect();
    let top = rect.top;
    let bot = rect.bottom;

    /*
    if the top of the section is 200 pixels or more above the screen viewport and the bottom of the section is beyond half the screen
    then the section is active
    */
    return (top<200 && bot>(screenHeight/2));
}


/*
Each time the user scrolls the script checks for two things:
1- What is the current active section?
2- Should the go to the top button be displayed?
*/
document.addEventListener("scroll",function(){
    //244 is the position of the topEl element when the user is viewing the top of the webpage.
    if(topEl.getBoundingClientRect().top === 224 ){
        /*
        If the user is viewing the very top of the page
        the disappear class will hide the button
        */
        goTop.classList.add("disappear");
    }
    else{
        goTop.classList.remove("disappear");
    }

    for(let i=0;i<sections.length;i++){
        if( (isActive(sections[i]) && !hasCSSActiveClass(sections[i])) || (!isActive(sections[i]) && hasCSSActiveClass(sections[i])) ){
            sections[i].classList.toggle("your-active-class");
        }
        //if the element is active the li element link will change font color and background
        if( (isActive(sections[i]) && !hasCSSActiveLinkClass(links[i])) || (!isActive(sections[i]) && hasCSSActiveLinkClass(links[i])) ){
            links[i].classList.toggle("activeLink");
        }

    }
});




//The following event listener scrolls to the top of the page whenever the go the top button is clicked
goTop.addEventListener("click",function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



















