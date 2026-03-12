const searchBtn = document.getElementById("searchBtn")
const animeSelect = document.getElementById("animeSelect")
const episodeSelect = document.getElementById("episodeSelect")
const playBtn = document.getElementById("playBtn")

searchBtn.onclick = searchAnime
animeSelect.onchange = loadEpisodes
playBtn.onclick = playAnime

async function searchAnime(){

const q=document.getElementById("search").value

const res=await fetch(
`https://api.jikan.moe/v4/anime?q=${q}&limit=10`
)

const data=await res.json()

animeSelect.innerHTML=""

data.data.forEach(a=>{

const opt=document.createElement("option")

opt.value=a.mal_id
opt.text=a.title

animeSelect.appendChild(opt)

})

loadEpisodes()

}

async function loadEpisodes(){

const id=animeSelect.value

const res=await fetch(
`https://api.jikan.moe/v4/anime/${id}`
)

const data=await res.json()

const count=data.data.episodes || 12

episodeSelect.innerHTML=""

for(let i=1;i<=count;i++){

const opt=document.createElement("option")

opt.value=i
opt.text="Episode "+i

episodeSelect.appendChild(opt)

}

}

function playAnime(){

const id=animeSelect.value
const ep=episodeSelect.value

const embed=`https://vidsrc.xyz/embed/anime/${id}/${ep}`

document.getElementById("player").src=embed

document.getElementById("embedURL").innerHTML=
`Embed URL: <a href="${embed}" target="_blank">${embed}</a>`

}
