async function fetchSettings() {
    const response = await fetch('./data/set.json');
    return response.json();
}

async function showAlert() {
    const settings = await fetchSettings();

    document.getElementById('page-title').innerText = settings.title;

    Swal.fire({
        title: settings.alertTitle,
        input: 'text',
        inputPlaceholder: settings.alertPlaceholder,
        confirmButtonText: settings.confirmButtonText,
        allowOutsideClick: false,
        html: `<div style="text-align: center;">
            <img src="${settings.alertImage}" alt="" style="display: block; margin: 0 auto; width: 150px; height: auto;">
        </div>`,
        preConfirm: (value) => {
            if (value) {
                return value;
            } else {
                Swal.showValidationMessage(settings.validationMessage);
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            handleInput(result.value);
        }
    });
}

async function handleInput(input) {
    const settings = await fetchSettings();
    const imgElement = document.getElementById('background-image');
    const audioElement = document.getElementById('audio-player');
    const scrollingTextContainer = document.getElementById('scrolling-text-container');
    const scrollingText = document.getElementById('scrolling-text');

    scrollingTextContainer.style.display = 'flex';

    if (input === settings.correctInput) {
        imgElement.src = settings.backgroundImage.win;
        audioElement.src = settings.audio.win;
        scrollingText.innerText = settings.scrollingText.win;
    } else {
        imgElement.src = settings.backgroundImage.fail;
        audioElement.src = settings.audio.fail;
        scrollingText.innerText = settings.scrollingText.fail;
    }
    
    audioElement.play();
}

window.onload = showAlert;
