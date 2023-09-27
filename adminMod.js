import { listaEmpleados, diaSemana, mesAnio } from "./data.js";
import { clearElement } from "./utilComponent.js";

export function createViewAdminModule () {
    const aside = document.getElementById('sidelong');
    crearVistaAside(aside);
    const mainCont = document.getElementById('maincontent');
    crearVistaControlVacaciones(mainCont, null);
}

function crearVistaAside (root) {
    clearElement(root);
    const header = document.createElement('header');
    root.appendChild(header);
    const h1 = document.createElement('h1');
    h1.className = 'logo';
    h1.textContent = 'Admin Module';
    header.appendChild(h1);
    const nav = document.createElement('nav');
    root.appendChild(nav);
    const ul = document.createElement('ul');
    ul.className = 'menu-nav';
    nav.appendChild(ul);
    const liRV = document.createElement('li');
    ul.appendChild(liRV);
    const btnNavRV = document.createElement('button');
    const iconRV = document.createElement('i');
    iconRV.className = 'bi bi-journal-check';
    btnNavRV.id = 'menuNavRegistro';
    btnNavRV.addEventListener('click', ((ev) => changeNav(ev)));
    liRV.appendChild(btnNavRV);
    btnNavRV.className = 'btn-menu-nav active';
    btnNavRV.textContent = 'Registro de Vacaciones';
    btnNavRV.appendChild(iconRV);
    const liVR = document.createElement('li');
    ul.appendChild(liVR);
    const btnNavVR = document.createElement('button');
    const iconVR = document.createElement('i');
    iconVR.className = 'bi bi-file-earmark-text-fill';
    btnNavVR.id = 'menuNavReportes';
    btnNavVR.addEventListener('click', ((ev) => changeNav(ev)));
    liVR.appendChild(btnNavVR);
    btnNavVR.className = 'btn-menu-nav';
    btnNavVR.textContent = 'Reportes';
    btnNavVR.appendChild(iconVR);
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
    if (event.srcElement.id === 'menuNavRegistro') {
        event.srcElement.className = 'btn-menu-nav active';
        document
        .getElementById('menuNavReportes').className = 'btn-menu-nav';
        document
        .getElementById('menuNavLogOut').className = 'btn-menu-nav';
        const mainCont = document.getElementById('maincontent');
        crearVistaControlVacaciones(mainCont, null);
    } else if (event.srcElement.id === 'menuNavReportes') {
        event.srcElement.className = 'btn-menu-nav active';
        document
        .getElementById('menuNavRegistro').className = 'btn-menu-nav';
        document
        .getElementById('menuNavLogOut').className = 'btn-menu-nav';
        const mainCont = document.getElementById('maincontent');
        crearVistaReportes(mainCont);
    } else if (event.srcElement.id === 'menuNavLogOut') {
        event.srcElement.className = 'btn-menu-nav active';
        document
        .getElementById('menuNavRegistro').className = 'btn-menu-nav';
        document
        .getElementById('menuNavReportes').className = 'btn-menu-nav';
        logOut();
    }
}

function crearVistaControlVacaciones ( root, data ) {
    clearElement(root);
    data = data === null ? listaEmpleados : data;
    const h2 = document.createElement('h2');
    h2.className = 'titulo-principal';
    h2.textContent = 'Control de Vacaciones';
    root.appendChild(h2);
    const divLista = document.createElement('div');
    divLista.id = 'listEmp';
    divLista.className = 'contenedor-empleados';
    root.appendChild(divLista);
    data.forEach(element => {
        const divEmp = document.createElement('div');
        divEmp.id = `${element.idEmpleado}Emp`;
        divLista.appendChild(divEmp);
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
        const pBirthDate = document.createElement('p');
        const birthDateD = new Date(element.birthDate);
        pBirthDate.textContent = `Birthdate: ${diaSemana[birthDateD.getDay()]}, ${birthDateD.getDate()} de 
        ${mesAnio[birthDateD.getMonth()]} de ${birthDateD.getFullYear()}`;
        divEmpD.appendChild(pBirthDate);
        const pIngreso = document.createElement('p');
        const ingresoD = new Date(element.ingreso);
        pIngreso.textContent = `Ingreso: ${diaSemana[ingresoD.getDay()]}, ${ingresoD.getDate()} de 
        ${mesAnio[ingresoD.getMonth()]} de ${ingresoD.getFullYear()}`;
        divEmpD.appendChild(pIngreso);
        const btnRegistro = document.createElement('button');
        btnRegistro.id = `${element.idEmpleado}`;
        btnRegistro.textContent = `Registrar`;
        btnRegistro.className = 'btn-edit';
        btnRegistro.addEventListener('click'
        , ((ev) => genViewregistrarVacaciones(ev)));
        btnRegistro.setAttribute('data-bs-toggle','modal');
        btnRegistro.setAttribute('data-bs-target','#staticBackdrop');
        divEmpD.appendChild(btnRegistro);
    });
}

function crearVistaReportes (root) {
    clearElement(root);const h2 = document.createElement('h2');
    h2.className = 'titulo-principal';
    h2.textContent = 'Generador de reportes';
    root.appendChild(h2);
    const nav = document.createElement('nav');
    root.appendChild(nav);
    const ul = document.createElement('ul');
    ul.className = 'menu-report';
    nav.appendChild(ul);
    const liReportVacation = document.createElement('li');
    ul.appendChild(liReportVacation);
    const btnReportVacation = document.createElement('button');
    const iconReportVacation = document.createElement('i');
    iconReportVacation.className = 'bi bi-file-earmark-text-fill';
    btnReportVacation.id = 'reportVacation';
    btnReportVacation.addEventListener('click', ((ev) => genReport(ev)));
    liReportVacation.appendChild(btnReportVacation);
    btnReportVacation.className = 'btn-report';
    btnReportVacation.textContent = 'Registro de Vacaciones';
    btnReportVacation.appendChild(iconReportVacation);    
}

function logOut () {
    window.localStorage.removeItem('user');
    window.location.pathname = '/login.html';
}

function genViewregistrarVacaciones(event) {
    var temp = null;
    listaEmpleados.forEach((value) => {
        if(event.srcElement.id === value.idEmpleado) {
            temp = value;
        }
    });
    genViewModal(temp);
}

function genViewModal ( emp ) {
    document.getElementById('staticBackdropLabel')
    .textContent = 'Registro de vacaciones';
    /* FRONT BODY MODAL */
    const divMB = document.getElementById('modalBody');
    clearElement(divMB);
    const pFullName = document.createElement('p');
    pFullName.textContent = `${emp.names} ${emp.firstLastName} 
    ${emp.secondLastName}`;
    divMB.appendChild(pFullName);
    const div = document.createElement('div');
    div.className = 'row justify-content-center';
    divMB.appendChild(div);
    const divFD = document.createElement('div');
    divFD.className = 'col-sm-12 col-md-6 col-lg-6 col-xl-6';
    div.appendChild(divFD);
    const divSD = document.createElement('div');
    divSD.className = 'col-sm-12 col-md-6 col-lg-6 col-xl-6';
    div.appendChild(divSD);
    const pFD = document.createElement('p');
    pFD.textContent = `Día inicial:`;
    divFD.appendChild(pFD);
    const pSD = document.createElement('p');
    pSD.textContent = `Día final:`;
    divSD.appendChild(pSD);
    const iFD = document.createElement('input');
    iFD.type = 'date';
    iFD.id = 'firstDate';
    divFD.appendChild(iFD);
    const iSD = document.createElement('input');
    iSD.type = 'date';
    iSD.id = 'secondDate';
    divSD.appendChild(iSD);
    window.localStorage.setItem('empSel', emp.idEmpleado);

    /* FRONT FOOTER MODAL*/
    const divMF = document.getElementById('modalFoot');
    clearElement(divMF);
    const btnRegistrar = document.createElement('button');
    btnRegistrar.className = 'btn btn-primary';
    btnRegistrar.textContent = 'Registrar';
    btnRegistrar.addEventListener('click', ((ev) => registrarVacaciones(ev)) );
    divMF.appendChild(btnRegistrar);
    const btnCerrar = document.createElement('button');
    btnCerrar.className = 'btn btn-secondary';
    btnCerrar.setAttribute('data-bs-dismiss', 'modal');
    btnCerrar.textContent = 'Cerrar';
    divMF.appendChild(btnCerrar);
    
    //console.log(emp.names);
}

function registrarVacaciones (event) {
    var a = document.getElementById('firstDate').value === null
    || document.getElementById('firstDate').value === '';
    var b = document.getElementById('secondDate').value === null
    || document.getElementById('secondDate').value === ''; 
    var c = document.getElementById('firstDate').value !== null 
    && document.getElementById('secondDate').value !== null;
    if (a) {
        alert('Falta capturar el día inicial');
    } else if (b) {
        alert('Falta capturar el día final');        
    } else if (c) {
        if (window.localStorage.getItem('empSel')) {
            var periodo = {
                inicio: document.getElementById('firstDate').value,
                final: document.getElementById('secondDate').value
            };
            var tmp = null, pos = null;
            listaEmpleados.forEach( (el, po, arr) => {
               if (window.localStorage.getItem('empSel') === 
               el.idEmpleado) {
                    tmp = el;
                    pos = po;
               } 
            });
            listaEmpleados.splice(pos, 1);
            tmp.vacaciones.push(periodo);
            listaEmpleados.push(tmp);
            window.localStorage.removeItem('empSel');
            var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
            modal.hide();
        }        
    }
}

function genReport (event) {
    if (event.srcElement.id === 'reportVacation') {
        var doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Reporte de Empleados con vacaciones registradas:', 20, 10);
        var pR = 20;
        doc.setFontSize(16);
        listaEmpleados.forEach( (element) => {
            if ( element.vacaciones !== null && element.vacaciones.length > 0 ) {
                doc.text(`Número de Empleado: ${element.idEmpleado}`, 10, pR);
                pR+= 10;
                doc.text(`Nombre Completo: ${element.names} ${element.firstLastName} ${element.secondLastName}`, 10, pR);
                pR+= 10;
                var birthDateD = new Date(element.birthDate);
                doc.text(`Birthdate: ${diaSemana[birthDateD.getDay()]}, ${birthDateD.getDate()} de `
                + `${mesAnio[birthDateD.getMonth()]} de ${birthDateD.getFullYear()}`, 10, pR);
                pR+= 10;
                var ingresoD = new Date(element.ingreso);
                doc.text(`Ingreso: ${diaSemana[ingresoD.getDay()]}, ${ingresoD.getDate()} de `
                + `${mesAnio[ingresoD.getMonth()]} de ${ingresoD.getFullYear()}`, 10, pR);
                pR+= 10;
                doc.text(`Periodo(s) de vacaciones:`, 10, pR); 
                pR+= 10;
                console.log(element.vacaciones);
                element.vacaciones.forEach( periodo => {
                    var inicio = new Date(periodo.inicio);
                    var final = new Date(periodo.final);
                    doc.text(`del ${diaSemana[inicio.getDay()]}, ${inicio.getDate()} de `
                    + `${mesAnio[inicio.getMonth()]} de ${inicio.getFullYear()}`, 10, pR);
                    pR+= 10;
                    doc.text(`al ${diaSemana[final.getDay()]}, ${final.getDate()} de ${mesAnio[final.getMonth()]} `
                    + `de ${final.getFullYear()}`, 10, pR);
                });
                pR+= 10;
            }
        });
        doc.save('ReporteVacaciones.pdf');
    }
}