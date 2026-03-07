// 1. VARIABLE DE CONTROL
// 'actual' guarda el número de la imagen que se está viendo en este momento.
let actual = 0;

// 2. SELECCIÓN DE ELEMENTOS
// Busca en el HTML todos los elementos que tengan la clase '.desliz_carrusel'
// y los guarda en una lista para poder manipularlos uno por uno.
const deslices = document.querySelectorAll('.desliz_carrusel');


/*
	3. FUNCIÓN: MOSTRAR UN DESLIZE ESPECÍFICO (muestraDesliz)
	Esta es la función principal que decide qué se ve y qué no.
	- Primero le quita la clase activo a TODOS los deslices para que ninguno se vea.
	- Luego revisa si llegamos al final de la lista: 
	Si el índice es mayor al total, vuelve al inicio (0).
	Si el índice es menor a cero, salta al último elemento.
	- Finalmente a la imagen que corresponde (la actual), le pone la clase activo 
	para que el CSS se encargue de mostrarla.
*/
function muestraDesliz(indice) {
    deslices.forEach(desliz => desliz.classList.remove('activo'));
    if (indice >= deslices.length) actual = 0;
    if (indice < 0) actual = deslices.length - 1;
    deslices[actual].classList.add('activo');
}

/*
	4. FUNCIÓN: MOVER EL CARRUSEL (mueveDesliz)
	Esta función es un empujón. Recibe un número (salto), se lo suma 
	a la posición actual y llama a la función anterior para actualizar la vista.
*/
function mueveDesliz(salto) {
    actual += salto;
    muestraDesliz(actual);
}

/*
	5. TEMPORIZADOR AUTOMÁTICO (setInterval)
	se encarga de que Cada 5000 milisegundos (3 segundos)
	se ejecute la función mueveDesliz(1)".
	Esto hace que el carrusel avance solo, infinitamente.
*/
setInterval(() => {
    mueveDesliz(1);
}, 3000);

// --- CHATBOT ---
const GROQ_API_KEY = "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";

function toggleChat() {
    document.getElementById('ventana-chat').classList.toggle('chat-oculto');
}

function checkEnter(e) {
    if (e.key === 'Enter') enviarMensaje();
}

async function enviarMensaje() {
    const input = document.getElementById('input-chat');
    const cuerpoChat = document.getElementById('cuerpo-chat');
    const texto = input.value.trim();

    if (!texto) return;

    // Mensaje Usuario
    const uDiv = document.createElement('div');
    uDiv.className = 'msg-user';
    uDiv.textContent = texto;
    cuerpoChat.appendChild(uDiv);
    input.value = '';

    // Bot escribiendo
    const bDiv = document.createElement('div');
    bDiv.className = 'msg-bot';
    bDiv.textContent = "...";
    cuerpoChat.appendChild(bDiv);
    cuerpoChat.scrollTop = cuerpoChat.scrollHeight;

    try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "eres un empleado del cafetin de ciencias, tu funcion es responder amablemente a todo lo que se pregunte, justo aca te dare toda la informacion que necesitas saber: si preguntan horario le dices de 7am-6pm, si te preguntan a que taza reciben el dólar di que aceptan la taza del BCV, si quieren saber la localización responde que el cafetín de ciencias justo al frente de plaza la langosta, si te pregunta algo que no dije aca asi sea un precio de algo, puedes responder con un: (en este momento no dispongo de esa información ve en físico a preguntar ) y no inventes nada, absolutamente todo de forma amable" },
                    { role: "user", content: texto }
                ]
            })
        });
        const data = await resp.json();
        bDiv.textContent = data.choices[0].message.content;
    } catch (e) {
        bDiv.textContent = "Error de conexión.";
    }
    cuerpoChat.scrollTop = cuerpoChat.scrollHeight;
}