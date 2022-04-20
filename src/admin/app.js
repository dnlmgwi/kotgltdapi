import AuthLogo from '/src/extensions/auth_logo.png';
import MenuLogo from '/src/extensions/logo.png';
// import favicon from './extensions/favicon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    // Replace the favicon
    // head: {
    //     favicon: favicon,
    // },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {

    },
    // Disable video tutorials
    tutorials: true,
    // Disable notifications about new Strapi releases
    notifications: { release: false },
  },

  bootstrap(app) {
    console.log(app);
  },
};