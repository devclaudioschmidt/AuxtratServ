// Função para carregar componentes externos (Header/Footer)
async function incluirComponentes() {
    const elementos = document.querySelectorAll('[data-include]');
    
    for (const el of elementos) {
        const ficheiro = el.getAttribute('data-include');
        try {
            const resposta = await fetch(ficheiro);
            if (resposta.ok) {
                el.innerHTML = await resposta.text();
            } else {
                console.error("Erro ao carregar componente:", ficheiro);
            }
        } catch (erro) {
            console.error("Erro de rede:", erro);
        }
    }
}

// Executa assim que a página estiver pronta
document.addEventListener("DOMContentLoaded", incluirComponentes);


// 1. Função principal que carrega os ficheiros HTML (Navbar e Footer)
async function incluirComponentes() {
    const elementos = document.querySelectorAll('[data-include]');
    
    for (const el of elementos) {
        const ficheiro = el.getAttribute('data-include');
        try {
            const resposta = await fetch(ficheiro);
            if (resposta.ok) {
                const conteudo = await resposta.text();
                el.innerHTML = conteudo;
                
                // 2. SE o componente carregado for a Navbar, ativamos o clique do hambúrguer
                if (ficheiro.includes('navbar.html')) {
                    ativarMenuMobile();
                }
            }
        } catch (erro) {
            console.error("Erro ao carregar o componente:", ficheiro, erro);
        }
    }
}

function ativarMenuMobile() {
    const botaoMenu = document.getElementById('mobile-menu');
    const listaLinks = document.getElementById('nav-list');
    const btnServicos = document.getElementById('btn-servicos');
    const dropdownServicos = document.getElementById('dropdown-servicos');

    // 1. Abrir/Fechar Menu Hambúrguer
    if (botaoMenu && listaLinks) {
        botaoMenu.onclick = function() {
            listaLinks.classList.toggle('active');
            botaoMenu.innerHTML = listaLinks.classList.contains('active') ? '&times;' : '&#9776;';
        };
    }

    // 2. Abrir/Fechar Submenu ao Clicar
    if (btnServicos && dropdownServicos) {
        btnServicos.onclick = function(e) {
            e.preventDefault(); // Impede o salto da página
            dropdownServicos.classList.toggle('show');
            btnServicos.classList.toggle('active'); // Para rodar a seta
        };
    }
}

// 3. Função específica para o Menu Hambúrguer
function ativarMenuMobile() {
    const botaoMenu = document.getElementById('mobile-menu');
    const listaLinks = document.getElementById('nav-list');

    // Verificamos se os elementos existem na página
    if (botaoMenu && listaLinks) {
        botaoMenu.addEventListener('click', function() {
            // Adiciona ou remove a classe 'active' que criámos no CSS
            listaLinks.classList.toggle('active');
            
            // Opcional: Muda o ícone de ☰ para X quando aberto
            if (listaLinks.classList.contains('active')) {
                botaoMenu.innerHTML = '&times;'; // Ícone de fechar (X)
            } else {
                botaoMenu.innerHTML = '&#9776;'; // Ícone de hambúrguer (☰)
            }
        });
    }
}

// Inicia o processo assim que o site abre
document.addEventListener("DOMContentLoaded", incluirComponentes);