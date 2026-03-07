// 1. EL LISTADO DE GENTE AUTORIZADA
// Esto es para crear una mini base de datos 
// el usuario, la clave, qué cargo tiene y a qué archivo HTML debe saltar al entrar.
const usuariosSimulados = [
    { 
        usuario: "ClienteUCV", 
        clave: "Central_123", 
        rol: "Clientela", 
        archivo: "cliente_panel.html" 
    },
    { 
        usuario: "caja_01", 
        clave: "Cajero#123", 
        rol: "Personal de Caja", 
        archivo: "caja_punto_venta.html" 
    },
    { 
        usuario: "adminRoot", 
        clave: "cafetinAdmin", 
        rol: "Personal de Administration", 
        archivo: "admin_gestion.html" 
    }
];

// 2. GESTIÓN DEL FORMULARIO
// actua cuando alguien le da al botón de "Ingresar".
document.getElementById('login_Formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Evito que la página se refresque a lo loco.

    // Agarra lo que el usuario escribió y le quita los espacios de sobra 
    // (me di cuenta que al copiar del pdf daba error y era por espacios en blanco)
    const userInput = document.getElementById('usuario').value.trim();
    const passInput = document.getElementById('clave').value.trim();
    const errorDiv = document.getElementById('error_mensaje');

    // Busca en nuestra lista si hay alguien que coincida con esos datos.
    const authSuccess = usuariosSimulados.find(u => u.usuario === userInput && u.clave === passInput);

    if (authSuccess) {
        errorDiv.style.display = 'none'; // Borro cualquier rastro de error previo.
        
        // Guarda quién entró en la memoria del navegador para luego.
        localStorage.setItem('usuarioActivo', JSON.stringify(authSuccess));

        // Lo manda directo a su panel (cliente, caja o admin).
        window.location.href = authSuccess.archivo;
        
    } else {
        // Pone el texto de error y haca que el cuadrito se sacuda (el 'shake').
        errorDiv.innerText = "Usuario o contraseña incorrectos.";
        errorDiv.style.display = 'block';
        
        const card = document.querySelector('.rejilla_login');
        card.style.animation = 'shake 0.3s';
        setTimeout(() => card.style.animation = '', 300); // Quita la animación para que pueda repetirse.
    }
});

// 3. Ahora para ganarle al sirce les enseño mi siguiente truco:
// Para que la gente no se equivoque escribiendo, este botón cambia 
// el tipo de campo de "password" a "text" para que se vean las letras.
document.getElementById('suicheClave').addEventListener('click', function () {
    const passwordInput = document.getElementById('clave');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    passwordInput.setAttribute('type', type);
    
    // Cambia el icono para que el usuario sepa si está oculto o no.
    this.textContent = type === 'password' ? '👁️' : '🙈';
});