import { login } from "./login.js";
import { createViewAdminModule } from "./adminMod.js";
import { createDiningRoomMod } from "./diningRoomMod.js";

if(window.location.pathname === '/login.html') {
    document.getElementById('btnLogin').onclick = login;
    console.log('entra login');
} else if(window.localStorage.getItem('user') !== null 
        && window.localStorage.getItem('user') === 'admin'
        && window.location.pathname === '/index.html' ) {
    createViewAdminModule();
} else if (window.localStorage.getItem('user') !== null
    && window.localStorage.getItem('user') === 'comedor'
    && window.location.pathname === '/index.html') {
    createDiningRoomMod();
} else {
    window.location.pathname = '/login.html';
}