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
        rol: "Personal de Administración", 
        archivo: "admin_gestion.html" 
    }
];

document.getElementById('login_Formulario').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const userInput = document.getElementById('usuario').value.trim();
    const passInput = document.getElementById('clave').value.trim();
    const errorDiv = document.getElementById('error_mensaje');

    const authSuccess = usuariosSimulados.find(u => u.usuario === userInput && u.clave === passInput);

    if (authSuccess) {
        errorDiv.style.display = 'none';
        
        localStorage.setItem('usuarioActivo', JSON.stringify(authSuccess));

        window.location.href = authSuccess.archivo; 
        
    } else {
        errorDiv.innerText = "Usuario o contraseña incorrectos.";
        errorDiv.style.display = 'block';
        
        const card = document.querySelector('.rejilla_login');
        card.style.animation = 'shake 0.3s';
        setTimeout(() => card.style.animation = '', 300);
    }
});

// Lógica para ver/ocultar contraseña
document.getElementById('suicheClave').addEventListener('click', function () {
    const passwordInput = document.getElementById('clave');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Cambiamos el tipo de input
    passwordInput.setAttribute('type', type);
    
    // Cambiamos el emoji según el estado
    this.textContent = type === 'password' ? '👁️' : '🙈';
});