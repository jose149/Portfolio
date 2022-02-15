'use strict'

// const app = new Vue({
//     el: '#app',
//     store: store,
//     data: {
        
//     },
//     methods:{ 
//     },
//     computed:{

//     }
// })

history.scrollRestoration = "manual";
window.onbeforeunload = function(){
    window.scrollTo(0,0);
};

//Navbar
const navbar = {items: document.querySelectorAll('.nav-bar__item'),
                links: document.querySelectorAll('.nav-bar__link'),
                buttons: document.querySelector('.nav-bar__button')};

const navigation = document.querySelector('#navigation');
const sections = {  name:["home", "skills", "projects", "about me", "contact"],
                    element: document.querySelectorAll('.section')};

const content = {name: [[],["technologies", "btn", "features"],["projects", "btn"],["aboutMe"],[]],
                 element:[[],[document.querySelector('.skills__technologies'), document.querySelector('.skills__btn'), document.querySelector('.skills__features')],[document.querySelector('.projects__projects'), document.querySelector('.projects__btn')],[document.querySelector('.about-me__content')],[]]};

const menu = {  element: document.querySelector('.menu'),
                open: document.querySelector('.nav-bar__button'),
                list: document.querySelector('.nav-menu'),
                links: document.querySelectorAll('.nav-menu__link')};

const headers = document.querySelectorAll('.heading-2');

const features = {  header: document.querySelectorAll('.feature__header'),
                    description: document.querySelectorAll('.feature__text')};
const biography = document.querySelectorAll('.biography__text');
const profileDetails = {header: document.querySelectorAll('.detail__header'),
                        listItem: document.querySelectorAll('.detail__item')};
const modalDescription = document.querySelectorAll('.modal__description');
const btns = document.querySelectorAll('.btn')
const headings = document.querySelectorAll('.heading-2')
const startpage = document.querySelector('.logo-overlay');
const technologyHeading = document.querySelectorAll(".technology__heading");


// contentName:,
// contentElement: ]

// Crea un objeto con el nombre y el elemento de las secciones y los escribe en el navbar
for (let i = 0 ; i<navbar.links.length; i++){
    navbar.links[i].innerHTML = sections.name[i];
}

// Modifica la barra de navegacion cuando se sale del home
const navHeight = navigation.getBoundingClientRect().height;

const CallbackNavEffect = function(entries){
    const [entry] = entries;
    if (!entry.isIntersecting){
        navigation.classList.add('white');
    }
    else{
        navigation.classList.remove('white');
    }
};
const OptionsNavEffect = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
};
const homeObserver = new IntersectionObserver(CallbackNavEffect, OptionsNavEffect);
homeObserver.observe(sections.element[0]);

// Animaciones del menu
// Usar para modo night en el futuro
// document.documentElement.style.setProperty('--color-primary', 'red')
var menuOpened = 0;
menu.open.addEventListener("click", function(e){
    console.log("He pulsado el menu");
    console.log(menuOpened);
    if(menuOpened==0){
        menu.list.classList.remove("hide-list");
        menu.element.classList.add("reveal");
        const menuListTimeout = setTimeout(function(){
            menu.list.classList.add("reveal-list");
        }, 100);
        menuOpened=1;
    }
    else{
        menu.element.classList.remove("reveal");
        
        const menuListTimeout = setTimeout(function(){
            menu.list.classList.remove("reveal-list");
        }, 100);
        menuOpened=0;
    }
});
            // Link menu
for (let i=0; i<menu.links.length; i++){
    menu.links[i].addEventListener("click", function(e){
        menu.element.classList.remove("reveal");
        menu.list.classList.remove("reveal-list");
        menu.list.classList.add("hide-list");
        menuOpened=0;
    });
}

// Efecto inicio de cada sección y header. Activación de las secciones del navbar
var currSection = 0;
var lastSection = 4;

const activeSection = function(entries, observer){
    const [entry] = entries;
    // Si intersecta con la sección (Puede haber más de una section intersectada)
    if (entry.isIntersecting) {
    // Actualiza la seccion anterior
        lastSection = currSection;
        for(let i = 0; i<sections.element.length; i++){ 
            if (entry.target.id == sections.element[i].id){   
                currSection = i
                navbar.items[currSection].classList.add("nav-bar__item--active");
            }
            else{
    // Se podria eliminar solo la anterior pero esto es una fuente de errores, por lo tanto elimina la clase de todos los elementos diferentes
                navbar.items[i].classList.remove("nav-bar__item--active");
            }
        }
    }
    else {
        for(let i = 0; i<sections.element.length; i++){
            if ((entry.target.id == sections.element[i].id)&&(i==currSection)){  
                navbar.items[currSection].classList.remove("nav-bar__item--active");
                navbar.items[lastSection].classList.add("nav-bar__item--active");
                // Actualiza la seccion actual a la anterior
                currSection = lastSection;
            }
        }
    } 
}

const sectionObserver = new IntersectionObserver(activeSection, {
    root: null,
    threshold: 0.05,
    rootMargin: `-50px`,
});

sections.element.forEach(function(section){
    sectionObserver.observe(section);
});






// Efecto inicio de cada bloque
var currentElement
const activeContent = function(entries, observer){
    const [entry] = entries;
    if (entry.isIntersecting) {
        for(let j = 0; j < content.element.length; j++){
            for(let i=0; i<content.element[j].length; i++){
                if (entry.target == content.element[j][i]){
                    currentElement = [j,i];
                }
            }
        }
        content.element[currentElement[0]][currentElement[1]].classList.add("fadeinup");
    };
};

const skillsObserver = new IntersectionObserver(activeContent, {
    root: null,
    threshold: 0.00,
    rootMargin: `200px`,
});
for (let j=0; j<content.name.length; j++){
    for(let i=0; i<content.name[j].length; i++){
        skillsObserver.observe(content.element[j][i]);
    };
};



const languages = document.querySelectorAll(".lang-bar__flag");

const trnslSections = { esp:["Inicio", "Habilidades", "Proyectos", "Sobre mí", "Contacto"],
                        eng:["Home", "Skills", "Projects", "About me", "Contact"]};
const trnslbtn = {      esp:["Contactemos","Descargar CV", "Ver más", "Ver más", "Ver más", "Ver más", "Ver más", "Más proyectos"],
                        eng:["Start meeting", "Download CV", "Watch it","Watch it","Watch it","Watch it","Watch it", "More proyects"]};  
const trnslskills= {esp:["Front End", "Back End", "Otros"],
                    eng:["Front End", "Back End", "Others"]};
const trnslfeatures = { headingEsp:["Rapidez", "Intuitivo", "Responsive", "Dinámico"],
                        headingEng:["Fast", "Intuitive", "Responsive", "Dynamic"],
                        descriptionEsp:["Tiempos cortos de carga y libres de lag son mi mayor prioridad ", "Preferencia por la facilidad de uso, UX/UI intuitivos", "Mis interfaces trabajarán en cualquier dispositivo, grande o pequeño", "Las páginas web no deben ser estáticas. Me encanta hacer que las páginas cobren vida"],
                        descriptionEng:["Fast load times and lag free interaction, my highest priority", "Strong preference for easy to use, intuitive UX/UI", "My layouts will work on any device, big or small", "Websites don't have to be static, I love making pages come to life"]}
const trnslbiography = {esp:["Me llamo José Crespí",
 "Actualmente estoy aprendiendo diseño y desarrollo de páginas web de forma autónoma. Estoy graduado en ingeniería electrónica, desde que empecé la carrera sentí una gran pasión por la programación y las matemáticas. Mi objetivo es no parar de crecer nunca haciendo un trabajo de calidad.",
 "Anteriormente he trabajado como ingeniero de proyectos, donde he gestionando y planificando la ejecución de más de 150 proyectos de Media y Baja Tensión (MT-BT) en la red de distribución. Además, diseñé e implementé un software que permitía reducir el tiempo en los procesos administrativos.",
 "Decidí salir de ese sector para centrarme en la programación."],
                        eng:["My name is José Crespí.",
 "Currently I am self learning web design and development. I have a degree in electronic engineering, since I started the BD I have had a passion for programming and maths. Mi goal is to never stop growing, doing quality work.",
 "Previously I have worked as a project manager for two years, planning and managing the implementation of more than 150 projects of high and low voltage in the electricity distribution network. In addition, I designed and implemented a software that reduced the time spent in the office work.",
 "I decided to leave the industry to focus on programming."]};    
 const trnslbiographyDetails =  {headingEsp: ["Intereses", "Formación", "Tiempo libre"],
                                headingEng: ["Interests", "Education", "Free time"],
                                itemEsp: ["Desarrollador full stack", "Desarrollador front end", "Desarrollador back end", "Ingeniero de software",
                                            "Carrera ing. electrónica", "Nivel de inglés B2",
                                            "Pádel y calistenia", "Piano", "Programación"],
                                itemEng: ["Full Stack Developer", "Front end developer", "Back end developer", "Software Engineering",
                                            "BD in electronics 2019", "B2 english level",
                                            "Padel and calisthenics", "Piano", "Coding"]};
const trnslProjects = {esp:["(Práctica) Natours consiste en una página web que tiene varias ofertas enfocadas a un segmento de la población a la que le atrae realizar actividades en la naturaleza. Se desarrolló como práctica de un curso enfocado en HTML y CSS avanzado.", 
"Este proyecto es una presentación de mi carrera profesional como desarrollador web enfocada a mostrar mis aptitudes y mi experiencia.",
"Este proyecto consiste en el diseño, desarrollo y evaluación de un dispositivo electro-mecánico capaz de medir distancias en 3D. Participación en el proyecto europeo del SRV de la UIB CP8-GA-2009-233715 \"MINOAS\".",
"(Práctica) Este proyecto consiste en un portal web que ofrece un comparador de destinos de viaje. Se desarrolló como práctica de un curso enfocado en HTML y CSS avanzado.",
"(Práctica) Este proyecto consiste en una página web diseñada como un portal inmobiliario. Se desarrolló como práctica de un curso enfocado en HTML y CSS avanzado."],
                        eng:["(Practice) Natours is a web page that has some offers focused on a population segment that are attracted to outdoor activities. It was developed as a practice of a front development course based on HTML and advanced CSS languages.",
"This project is a presentation of my profesional career as a web developer focused on showing my skills and experience.",
"This project consist in the design, development and the assesment of an electro-mechanic device capable to measure 3D distances. It was an European project participation called CP8-GA-2009-233715 \"MINOAS\" from the UIB SRV laboratory.",
"(As a practice) This project consists in a web gate offering a travel destination comparator. It was developed as a practice of a front development course based on HTML and advanced CSS languages.",
"(As a practice) This project consists in a web page designed as a real estate portal. It was developed as a practice of a front development course based on HTML and advanced CSS languages."]};

languages[1].addEventListener("click", function(e){
    languages[0].classList.remove('hidden')
    languages[1].classList.add('hidden')
    for(let i=0; i<navbar.links.length; i++){
        navbar.links[i].innerHTML = trnslSections.eng[i];
        menu.links[i].innerHTML=trnslSections.eng[i];
        if(i>0){
            headings[i-1].innerHTML = trnslSections.eng[i];
        }
    };
    for(let i=0; i<btns.length; i++){
        btns[i].innerHTML = trnslbtn.eng[i];
    };
    for(let i=0; i<features.header.length; i++){
        features.header[i].innerHTML = trnslfeatures.headingEng[i];
        features.description[i].innerHTML = trnslfeatures.descriptionEng[i];
    };
    for(let i=0; i<biography.length; i++){
        biography[i].innerHTML = trnslbiography.eng[i];
    };
    for (let i=0; i<profileDetails.header.length; i++){
        profileDetails.header[i].innerHTML = trnslbiographyDetails.headingEng[i];
    };
    for(let i=0; i<profileDetails.listItem.length; i++){
        profileDetails.listItem[i].innerHTML = trnslbiographyDetails.itemEng[i];
    };
    for(let i=0; i<modalDescription.length; i++){
        modalDescription[i].innerHTML = trnslProjects.eng[i];
    };
    for(let i=0; i<technologyHeading.length; i++){
        technologyHeading[i].innerHTML = trnslskills.eng[i];
    };
});
languages[0].addEventListener("click", function(e){
    languages[1].classList.remove('hidden')
    languages[0].classList.add('hidden')
    for(let i=0; i<navbar.links.length; i++){
        navbar.links[i].innerHTML = trnslSections.esp[i];
        menu.links[i].innerHTML=trnslSections.esp[i];
        if(i>0){
            headings[i-1].innerHTML = trnslSections.esp[i];
        }
    };
    for(let i=0; i<btns.length; i++){
        btns[i].innerHTML = trnslbtn.esp[i];
    };
    for(let i=0; i<features.header.length; i++){
        features.header[i].innerHTML = trnslfeatures.headingEsp[i];
        features.description[i].innerHTML = trnslfeatures.descriptionEsp[i];
    };
    for(let i=0; i<biography.length; i++){
        biography[i].innerHTML = trnslbiography.esp[i];
    };
    for (let i=0; i<profileDetails.header.length; i++){
        profileDetails.header[i].innerHTML = trnslbiographyDetails.headingEsp[i];
        for(let i=0; i<profileDetails.listItem.length; i++){
            profileDetails.listItem[i].innerHTML = trnslbiographyDetails.itemEsp[i];
        };
    };
    for(let i=0; i<modalDescription.length; i++){
        modalDescription[i].innerHTML = trnslProjects.esp[i];
    };
    for(let i=0; i<technologyHeading.length; i++){
        technologyHeading[i].innerHTML = trnslskills.esp[i];
    };
});

// Hace el carrousel con los svg de los logos de los lenguajes de programacion
const btnAnimation = document.querySelector(".btn--animated");
const technologies= {   title: ["html", "css" ,"sass", "javascript", "vuejs", "python", "java", "c++"],
                        element: document.querySelectorAll(".carrousel__item")
};

for(let i=0; i<technologies.element.length; i++){ 
    technologies.element[i].classList.add("hidden");  
}           

btnAnimation.addEventListener("animationstart", function(e){
    technologies.element[0].classList.remove("hidden");
},false);

for(let i=0; i<technologies.element.length; i++){
    technologies.element[i].addEventListener("animationiteration", function(e){
        technologies.element[i].classList.add("hidden");
        if(i==(technologies.element.length-1)){
            technologies.element[0].classList.remove("hidden");
        }
        else{
            technologies.element[i+1].classList.remove("hidden");
        }
    }, false);
}

// Abre una ventana modal cuando se hace click en un proyecto

const modal = document.querySelectorAll('.modal');
const modalOverlay = document.querySelectorAll('.modal__overlay');
const btnCloseModal = document.querySelectorAll('.modal__close');
const btnOpenModal = [document.querySelectorAll('.project__image'),
                        document.querySelectorAll('.project__title')];


for (let i = 0; i<btnOpenModal[0].length; i++){
    btnOpenModal[0][i].addEventListener('click',function(){
        modal[i].classList.remove('hidden');
    });
    btnOpenModal[1][i].addEventListener('click',function(){
        modal[i].classList.remove('hidden');
    });
    btnCloseModal[i].addEventListener('click', function(){
        console.log("He pulsado la X");
        modal[i].classList.add('hidden');

    });
    modalOverlay[i].addEventListener('click', function(){
        modal[i].classList.add('hidden');
    });
};