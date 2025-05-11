const apiUrl = 'http://localhost:9090/api/utilisateurs';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Inscription
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const motDePasse = document.getElementById('motDePasse').value;

            try {
                const response = await fetch(`${apiUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nom, email, motDePasse })
                });

                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(error || 'Erreur lors de l’inscription');
                }

                document.getElementById('registerMessage').textContent = "✅ Inscription réussie !";
                registerForm.reset();
            } catch (error) {
                document.getElementById('registerMessage').textContent = "❌ " + error.message;
            }
        });
    }

    // Connexion
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const motDePasse = document.getElementById('loginPassword').value;

            try {
                const response = await fetch(`${apiUrl}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des utilisateurs");
                }

                const utilisateurs = await response.json();
                const utilisateur = utilisateurs.find(u =>
                    u.email === email && u.motDePasse === motDePasse
                );

                if (utilisateur) {
                    localStorage.setItem("nomUtilisateur", utilisateur.nom);
                    document.getElementById('loginMessage').textContent = "✅ Connexion réussie !";
                    setTimeout(() => {
                        window.location.href = "../accueil/accueil.html";
                    }, 1000);
                } else {
                    throw new Error("❌ Email ou mot de passe incorrect");
                }

            } catch (error) {
                document.getElementById('loginMessage').textContent = error.message;
            }
        });
    }
});


