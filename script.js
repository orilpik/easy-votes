document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survey-form');
    const totalVotesElement = document.getElementById('total-votes');
    const savingMessage = document.getElementById('saving-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const nameModal = document.getElementById('nameModal');
    const saveNameButton = document.getElementById('saveName');
    const userNameInput = document.getElementById('userName');
    const adminView = document.getElementById('admin-view');
    const votesList = document.getElementById('votes-list');
    const downloadExcelButton = document.getElementById('download-excel');
    const questionElement = document.getElementById('question');
    const optionElements = [
        document.getElementById('option1'),
        document.getElementById('option2'),
        document.getElementById('option3'),
        document.getElementById('option4')
    ];
    const saveChangesButton = document.getElementById('save-changes');
    const clearJsonButton = document.getElementById('clear-json');
    
    let userName = '';
    let selectedOption = '';

    // Verificar si estem en mode admin
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('mode') === 'admin';

    if (isAdmin) {
        adminView.classList.remove('hidden');
    }

    // Carregar la pregunta i opcions des del fitxer survey.json
    const loadSurvey = () => {
        fetch('survey.json')
            .then(response => response.json())
            .then(data => {
                const question = data.question || 'Quina és la teva pregunta?';
                const options = data.options || ['Opció 1', 'Opció 2', 'Opció 3', 'Opció 4'];

                document.querySelector('h1').textContent = question;
                form.innerHTML = '';
                options.forEach((option, index) => {
                    const label = document.createElement('label');
                    label.classList.add('block', 'mb-2');
                    label.innerHTML = `<input type="radio" name="option" value="${option.toLowerCase()}" class="mr-2"> ${option}`;
                    form.appendChild(label);
                });
                form.appendChild(submitButton);

                if (isAdmin) {
                    questionElement.value = question;
                    options.forEach((option, index) => {
                        optionElements[index].value = option;
                    });
                }
            })
            .catch(err => console.error('Error loading survey:', err));
    };

    const fetchResults = () => {
        fetch('votes.json')
            .then(response => response.json())
            .then(data => {
                // Si és admin, mostrar els vots detallats
                if (isAdmin) {
                    votesList.textContent = JSON.stringify(data, null, 2);
                }

                // Comptabilitzar vots per a cada opció
                const voteCounts = {};
                const options = [];
                fetch('survey.json')
                    .then(response => response.json())
                    .then(surveyData => {
                        surveyData.options.forEach(option => {
                            voteCounts[option.toLowerCase()] = 0;
                            options.push(option.toLowerCase());
                        });

                        data.forEach(vote => {
                            if (voteCounts[vote.option] !== undefined) {
                                voteCounts[vote.option]++;
                            }
                        });

                        const totalVotes = Object.values(voteCounts).reduce((sum, current) => sum + current, 0);
                        totalVotesElement.textContent = totalVotes;

                        const ctx = document.getElementById('results-chart').getContext('2d');
                        new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: options,
                                datasets: [{
                                    label: 'Votos',
                                    data: Object.values(voteCounts),
                                    backgroundColor: ['red', 'blue', 'green', 'yellow'],
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    }
                                },
                                plugins: {
                                    datalabels: {
                                        anchor: 'end',
                                        align: 'top',
                                        formatter: (value) => value,
                                    }
                                }
                            }
                        });
                    })
                    .catch(err => console.error('Error fetching survey for results:', err));
            })
            .catch(err => console.error('Error fetching results:', err));
    };

    const saveResults = (vote) => {
        fetch('votes.json')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    data = [];
                }
                data.push(vote);

                return fetch('save_vote.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            })
            .then(response => response.json())
            .then(() => {
                // Mostrar el missatge "Guardando..."
                savingMessage.style.display = 'block';
                
                // Esperar 2 segons i després recarregar la pàgina completament
                setTimeout(() => {
                    window.location.reload(true); // Força la recàrrega completa de la pàgina
                }, 2000);
            })
            .catch(err => console.error('Error saving results:', err));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        selectedOption = formData.get('option');

        if (selectedOption) {
            nameModal.style.display = 'flex'; // Mostrar modal per demanar el nom
        } else {
            alert('Selecciona una opció per votar.');
        }
    });

    // Guardar el nom i enviar el vot
    saveNameButton.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        if (userName && selectedOption) {
            nameModal.style.display = 'none'; // Amagar el modal
            submitButton.disabled = true; // Deshabilitar el botó de votar per evitar doble clic
            const vote = { name: userName, option: selectedOption };
            saveResults(vote);
        } else {
            alert('Si us plau, introdueix el teu nom.');
        }
    });

    // Funció per descarregar els resultats en format Excel
    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Vots");
        
        XLSX.writeFile(workbook, 'resultats.xlsx');
    };

    // Afegeix l'event listener per al botó de descàrrega d'Excel
    if (isAdmin && downloadExcelButton) {
        downloadExcelButton.addEventListener('click', () => {
            fetch('votes.json')
                .then(response => response.json())
                .then(data => {
                    downloadExcel(data);
                })
                .catch(err => console.error('Error fetching results for Excel:', err));
        });
    }

    // Guardar la pregunta i opcions editades en survey.json
    if (isAdmin && saveChangesButton) {
        saveChangesButton.addEventListener('click', () => {
            const newQuestion = questionElement.value.trim();
            const newOptions = optionElements.map(input => input.value.trim());

            if (newQuestion && newOptions.every(option => option)) {
                const surveyData = {
                    question: newQuestion,
                    options: newOptions
                };

                fetch('save_survey.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(surveyData),
                })
                .then(response => response.json())
                .then(() => {
                    alert('Pregunta i opcions actualitzades. Les dades s\'han buidat.');
                    clearJson();  // Buidar el JSON després de canviar les preguntes
                    loadSurvey();  // Recarregar la pàgina amb les noves preguntes
                })
                .catch(err => console.error('Error saving survey:', err));
            } else {
                alert('Totes les opcions i la pregunta han de tenir un valor.');
            }
        });
    }

    // Funció per buidar el JSON i reiniciar les opcions
    // Funció per buidar el JSON i reiniciar les opcions
const clearJson = () => {
    // Reinicialitzar el fitxer JSON amb un array buit
    fetch('save_vote.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),  // Buidar les dades enviant un array buit
    })
    .then(response => response.json())
    .then(() => {
        alert('Les dades s\'han buidat.');
        window.location.reload(true);  // Recàrrega completa de la pàgina
    })
    .catch(err => console.error('Error clearing data:', err));
};


    // Event listener per al botó de buidar JSON
    if (isAdmin && clearJsonButton) {
        clearJsonButton.addEventListener('click', () => {
            if (confirm('Estàs segur que vols buidar totes les dades (vots i opcions)? Aquesta acció és irreversible.')) {
                clearJson();
            }
        });
    }

    // Carregar la pregunta i opcions actuals i després els resultats
    loadSurvey();
    fetchResults();
});
