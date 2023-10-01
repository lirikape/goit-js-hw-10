const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = 'breeds';
// const PARAM = '';
const options = {
    method: 'GET',
    headers: {
        "x-api-key": 'live_C8LKoCZ3cREAQ4jVKteSZDLtan1pGG3buF049wRE01Ax3StoJx3lZkBkAMR6jkvB',
    },
};

export function fetchBreeds() {
return fetch(`${BASE_URL}/${END_POINT}`, options)
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
}


export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
    return fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
}