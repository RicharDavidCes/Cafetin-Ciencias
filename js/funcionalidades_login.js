const usuariosSimulados = [
    { 
        user: "ClienteUCV", 
        pass: "Central_123", 
        rol: "Clientela", 
        archivo: "cliente_panel.html" 
    },
    { 
        user: "caja_01", 
        pass: "Cajero#123", 
        rol: "Personal de Caja", 
        archivo: "caja_punto_venta.html" 
    },
    { 
        user: "adminRoot", 
        pass: "cafetinAdmin", 
        rol: "Personal de Administración", 
        archivo: "admin_gestion.html" 
    }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // El .trim() elimina espacios en blanco al principio o al final por error
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('errorMessage');

    console.log("Validando usuario:", userInput); // Esto aparecerá en la consola (F12)

    // Validación exacta contra la tabla
    const authSuccess = usuariosSimulados.find(u => u.user === userInput && u.pass === passInput);

    if (authSuccess) {
        errorDiv.style.display = 'none';
        
        // Guardamos en el navegador quién entró
        localStorage.setItem('usuarioActivo', JSON.stringify(authSuccess));

        // Redirección según la tabla de roles
        window.location.href = authSuccess.archivo; 
        
    } else {
        errorDiv.innerText = "Usuario o contraseña incorrectos.";
        errorDiv.style.display = 'block';
        
        const card = document.querySelector('.login-card');
        card.style.animation = 'shake 0.3s';
        setTimeout(() => card.style.animation = '', 300);
    }
});

// Lógica para ver/ocultar contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Cambiamos el tipo de input
    passwordInput.setAttribute('type', type);
    
    // Cambiamos el emoji según el estado
    this.textContent = type === 'password' ? '👁️' : '🙈';
});