// Blog general data (customizable)
export const blogData = {
  linkedinURL: "https://www.linkedin.com/in/jalbertodelgado/",
  githubURL: "https://github.com/JoseAlbDR",
  mainWebURL: "https://www.jadelgadorobles.com",
  blogOwner: "J.A.Delgado",

  // When there is no post yet
  title: "Aún no hay ninguna entrada en el blog, ¡Prueba a escribir algo!",
  bgImg: "compose-bg.jpg",
};

// Post data object
// {
//   postTitle: 'Title',
//   postSubtitle: 'Subtitle',
//   author: 'Author',
//   web: 'https://www.yourweb.com',
//   content: 'Content',
//   bgImg: 'background.jpg',
//   id: 0, -> id number (max postData.length)
//   postDate: 'Tuesday, May 30' -> Generated with an util
// }
export const postData = [];

export const aboutData = {
  bgImg: "about-bg.jpg",
  title: "Sobre Mí.",
  subtitle: "Algunas cosillas sobre mi",
  content:
    "¡Hola! Soy J. Alberto Delgado, un estudiante principiante de desarrollo web. Mi pasión es resolver problemas a través de la programación. Actualmente, me encuentro en un bootcamp de desarrollo web full stack, ampliando mis habilidades en front-end y back-end. Mi meta es crecer como profesional en el desarrollo web y aportar mi conocimiento a proyectos futuros.",
};

export const homeData = {
  bgImg: "home-bg.jpg",
  title: blogData.blogOwner,
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
