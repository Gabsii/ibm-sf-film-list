const devices = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const breakpoints = {
  mobileS: `(min-width: ${devices.mobileS})`,
  mobileM: `(min-width: ${devices.mobileM})`,
  mobileL: `(min-width: ${devices.mobileL})`,
  tablet: `(min-width: ${devices.tablet})`,
  laptop: `(min-width: ${devices.laptop})`,
  laptopL: `(min-width: ${devices.laptopL})`,
  desktop: `(min-width: ${devices.desktop})`,
  desktopL: `(min-width: ${devices.desktop})`,
};

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#0070f3',
    navBackground: '#0070f3',
    heading: '#ffffff',
    text: '#ffffff',
    link: '#ffb101',
    background: '#efefef',
    primaryFont: '#a67a4d',
  },
  breakpoints,
};

export default theme;
