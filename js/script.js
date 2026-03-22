async function carregarComponentes() {
    const elementos = document.querySelectorAll('[data-include]');
    
    for (const el of elementos) {
        const url = el.getAttribute('data-include');
        try {
            const resp = await fetch(url);
            if (resp.ok) {
                el.innerHTML = await resp.text();
                // Se for a navbar, configura os cliques
                if (url.includes('navbar')) {
                    configurarInteracaoMenu();
                }
            }
        } catch (err) {
            console.error("Erro ao carregar componente:", url, err);
        }
    }
}

function configurarInteracaoMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.onclick = () => links.classList.toggle('active');
    }
}

document.addEventListener("DOMContentLoaded", carregarComponentes);