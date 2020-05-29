// host link for development mode:
const dev = 'http://localhost:5000';

// host link for production:
const prod = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');

export const host_link = process.env.NODE_ENV === "development" ? dev : prod;

export const fontSizeMenu = "20px"
export const fontSizeMenuLarge = "30px"

export const fontSize = "14px"
export const fontSizeLarge = "18px"
export const fontSizeTitle = "22px"
export const fontSizeTitleLarge = "25px"

export const blue_button_style={backgroundColor:"#1890FF", color:"#ffffff"}
export const black_font = {color:"#000000"}
export const blue_color="#1890FF"

export const dateFormat = 'DD/MM/YYYY'

export const refresh_time = 55 * 60 * 1000 //55 min
export const username_secret = "!D45f3qXnU6$fh%"
export const password_secret = "AXVr#46$3G6$fvT"

