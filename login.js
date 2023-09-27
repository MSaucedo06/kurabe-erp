
export function login() {
    if(document.getElementById('typeEmailX').value === 'admin' 
    && document.getElementById('typePasswordX').value === 'admin') {
        window.localStorage.setItem('user', 'admin');
        window.location.pathname = '/index.html';
    } else if(document.getElementById('typeEmailX').value === 'comedor' 
    && document.getElementById('typePasswordX').value === 'comedor') {
        window.localStorage.setItem('user', 'comedor');
        window.location.pathname = '/index.html';
    } else {
        alert('Error en las credenciales');
    }
}