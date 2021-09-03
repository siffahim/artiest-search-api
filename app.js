let load = document.querySelector('.loader-wrapper');
load.style.display = 'none';

//err message
const warning = document.getElementById('warning');
warning.style.display = 'none';

document.getElementById('search-btn').addEventListener('click', () => {
    const inputField = document.getElementById('inputField');
    const inputFieldText = inputField.value;
    load.style.display = 'block';

    if (inputFieldText === '') {
        alert('please somethin write here')
        load.style.display = 'none';
    }
    else {

        const url = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${inputFieldText}`;


         fetch(url)
            .then(res => res.json())
            .then(data => {
                load.style.display = 'none';
                displayAudio(data)
        })

    }
    inputField.value = '';
})

const displayAudio = audios => {
    const container = document.getElementById('wrapper');
    container.textContent = '';
    try {
        const audio = audios.artists[0];
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card text-center w-100 mx-auto">
                    <img src='${audio.strArtistBanner}' class='img-fluid'/>
                    <h2 class='text-muted my-4'>${audio.strArtist}</h2>
                    <img src="${audio.strArtistThumb}" width='300px' class='d-flex mx-auto' height='300px' alt="...">
                    <p class="card-text text-muted">${audio.strBiographyEN.substr(0, 300)}</p>
                    <h5 class='text-muted'>${audio.strStyle}</h5>
                    <div class="row mt-5 gy-3">
                        <div class="col-12 col-md-3">
                            <img src="${audio.strArtistFanart}" class="card-img-top" alt="...">
                        </div>
                        <div class="col-12 col-md-3">
                            <img src="${audio.strArtistFanart2}" class="card-img-top" alt="...">
                        </div>
                        <div class="col-12 col-md-3">
                            <img src="${audio.strArtistFanart3}" class="card-img-top" alt="...">
                        </div>
                        <div class="col-12 col-md-3">
                            <img src="${audio.strArtistFanart4}" class="card-img-top" alt="...">
                        </div>
                    </div>
                    <a href="${audio.strFacebook}" class="btn w-25 mx-auto my-4">Go somewhere</a>
            </div>
        `
        container.appendChild(div)
        warning.style.display = 'none';
    } catch (err) {
        warning.style.display = 'block';
    }
    
}