import { listaEmpleados, diaSemana, mesAnio } from "./data.js";
import { clearElement } from "./utilComponent.js";

export function createDiningRoomMod () {
    const aside = document.getElementById('sidelong');
    crearVistaAside(aside);
    const mainCont = document.getElementById('maincontent');
    crearVistaMainBody(mainCont);    
}

function crearVistaAside (root) {
    clearElement(root);
    const header = document.createElement('header');
    root.appendChild(header);
    const h1 = document.createElement('h1');
    h1.className = 'logo';
    h1.textContent = 'Dining Room Module';
    header.appendChild(h1);
    const nav = document.createElement('nav');
    root.appendChild(nav);
    const ul = document.createElement('ul');
    ul.className = 'menu-nav';
    nav.appendChild(ul);
    const liLO = document.createElement('li');
    ul.appendChild(liLO);
    const btnNavLO = document.createElement('button');
    const iconLO = document.createElement('i');
    iconLO.className = 'bi bi-person-x-fill';
    btnNavLO.id = 'menuNavLogOut';
    btnNavLO.addEventListener('click', ((ev) => changeNav(ev)));
    liLO.appendChild(btnNavLO);
    btnNavLO.className = 'btn-menu-nav';
    btnNavLO.textContent = 'LogOut';
    btnNavLO.appendChild(iconLO);
    const footer = document.createElement('footer');
    root.appendChild(footer);
    const pFoo = document.createElement('p');
    pFoo.className = 'texto-footer';
    pFoo.textContent = '© 2023 Ethical Developers';
    footer.appendChild(pFoo);
}

function changeNav (event) {
    if (event.srcElement.id === 'menuNavLogOut') {
        event.srcElement.className = 'btn-menu-nav active';
        logOut();
    }
}

function logOut () {
    window.localStorage.removeItem('user');
    window.location.pathname = '/login.html';
}

function crearVistaMainBody(root) {
    clearElement(root);
    const h2 = document.createElement('h2');
    h2.className = 'titulo-principal';
    h2.textContent = 'Dining Room Check';
    root.appendChild(h2);
    const divR = document.createElement('div');
    divR.className = 'row';
    root.appendChild(divR);
    const divT = document.createElement('div');
    divT.className = 'col col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4';
    divR.appendChild(divT);
    const divI = document.createElement('div');
    divI.className = 'col col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8';
    divR.appendChild(divI);
    const h3 = document.createElement('h3');
    h3.textContent = 'Input employe code:';
    divT.appendChild(h3);
    const inputCode = document.createElement('input');
    inputCode.type = 'text';
    inputCode.className = 'form-control';
    inputCode.id = 'inputCode';
    inputCode.addEventListener('keyup', (ev) => {inputTextCode(ev)});
    divI.appendChild(inputCode);
    const divDR = document.createElement('div');
    divDR.className = 'row';
    root.appendChild(divDR);
    const divDL = document.createElement('div');
    divDL.className = 'col col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2';
    divDR.appendChild(divDL);
    const divDC = document.createElement('div');
    divDC.className = 'col col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8';
    divDR.appendChild(divDC);
    const divDeR = document.createElement('div');
    divDeR.className = 'col col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2';
    divDR.appendChild(divDeR);
    const divDeEmp = document.createElement('div');
    divDeEmp.className = 'detalle-empleado';
    divDeEmp.id = 'detalleEmp';
    divDC.appendChild(divDeEmp);
}

function inputTextCode (event) {
    if (event.keyCode === 13) {
        if (event.srcElement.value.indexOf('MEX') >= 0) {
            var code = event.srcElement.value
            .substring(event.srcElement.value.indexOf('MEX') + 3);
            event.srcElement.value = '';
            const root = document.getElementById('detalleEmp');
            clearElement(root);
            listaEmpleados.forEach( element => {    
                if (element.idEmpleado === code) {
                    const divEmp = document.createElement('div');
                    divEmp.id = `${element.idEmpleado}Emp`;
                    root.appendChild(divEmp);
                    const imgEmp = document.createElement('img');
                    imgEmp.src = `./img/${element.idEmpleado}.JPG`;
                    imgEmp.className = 'emp-img';
                    divEmp.appendChild(imgEmp);
                    const divEmpD = document.createElement('div');
                    divEmpD.className = 'emp-det';
                    divEmp.appendChild(divEmpD);
                    const pIdEmp = document.createElement('p');
                    pIdEmp.textContent = `Número de Empleado: ${element.idEmpleado}`;
                    divEmpD.appendChild(pIdEmp);
                    const pFullName = document.createElement('p');
                    pFullName.textContent = `Nombre Completo: ${element.names} ${element.firstLastName} ${element.secondLastName}`
                    divEmpD.appendChild(pFullName);       
                }            
            });
            setTimeout(() => {limpiaDetalleEmp()}, 2500);
        }
    }
}

function limpiaDetalleEmp () {
    const root = document.getElementById('detalleEmp');
    clearElement(root);
}