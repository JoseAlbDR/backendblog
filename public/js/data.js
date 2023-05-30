import { getDate } from "./utils.js";
let id = 0;
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
    "Rellena el formulario y me pondré en contacto contigo lo antes posible.",
  content:
    "Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!",
};

export const composeData = {
  bgImg: "compose-bg.jpg",
  title: "Escribe algo.",
  subtitle: "Si estás aqui es porque quieres escribir algo.",
  content: "Es hora de escribir!",
};

export const defaultImg = "compose-bg.jpg";
