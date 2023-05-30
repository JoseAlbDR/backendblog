import { getDate } from "./utils.js";
let id = 0;

export const blogData = {
  defaultImg: "compose-bg.jpg",
  linkedinURL: "https://www.linkedin.com/in/jalbertodelgado/",
  githubURL: "https://github.com/JoseAlbDR",
  mainWebURL: "https://www.jadelgadorobles.com",
  blogOwner: "J.A.Delgado",
};

export const postData = [
  {
    postTitle: "Man must explore, and this is exploration at its greatest",
    postSubtitle: "Problems look mighty small from 150 miles up",
    postDate: getDate(),
    id: id++,
    author: "J.Alberto Delgado",
    bgImg: "post-bg.jpg",
    web: "https://www.jadelgadorobles.com",
    content: `<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>`,
  },
];

export const aboutData = {
  bgImg: "about-bg.jpg",
  title: "Sobre Mí.",
  subtitle: "Algunas cosillas sobre mi",
  content:
    "¡Hola! Soy J. Alberto Delgado, un estudiante principiante de desarrollo web. Mi pasión es resolver problemas a través de la programación. Actualmente, me encuentro en un bootcamp de desarrollo web full stack, ampliando mis habilidades en front-end y back-end. Mi meta es crecer como profesional en el desarrollo web y aportar mi conocimiento a proyectos futuros.",
};

export const homeData = {
  bgImg: "home-bg.jpg",
  title: "Blog J.Alberto Delgado",
  subtitle: "Aquí ire dejando dichas mis cositas.",
};

export const contactData = {
  bgImg: "contact-bg.jpg",
  title: "Contacta conmigo.",
  subtitle:
    "A parte de a traves de mis redes sociales puedes usar el siguiente formulario.",
  content:
    "¿Quieres ponerte en contácto? No dudes en rellenar el siguiente formulario y me pondré en contácto contigo lo antes posible.",
};

export const composeData = {
  bgImg: "compose-bg.jpg",
  title: "Escribe algo.",
  subtitle: "Si estás aqui es porque quieres escribir algo.",
  content: "Es hora de escribir!",
};
