
const API_VIDEOS = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=zF5Ddo9JdpY&part=id%2Csnippet&type=video&maxResults=9';
const LOL_API = 'https://league-of-legends-champions.p.rapidapi.com/champions/es-es?page=0&size=12';
// GLOBAL.document = new JSDOM(html).window.document;
const content =  document.getElementById('content');

const campeones_html =  document.getElementById('campeones');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3ef10ce9c3msh994e061179b539ep122d92jsn1500855f9cf0',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};



async function fetchData(urlApi,options) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

const data = async (url,options,type) => {
  try {
    if (type ==="video") {
      const videos = await fetchData(url,options);
      const videos_nulable = videos.items.filter(element => element.snippet != undefined);
      let view = `
      ${videos_nulable.map(video =>
        `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video?.snippet?.thumbnails?.high?.url}" alt="${video?.snippet?.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video?.snippet?.title}
            </h3>
  
          </div>
        </div>
      `).slice(0,8).join('')}
  
      `;
      content.innerHTML = view;
    }else{
      options.headers["X-RapidAPI-Host"] = "league-of-legends-champions.p.rapidapi.com";
      const campeones = await fetchData(url,options);
      let view = `
      ${campeones.champions.map(campeon =>
        `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${campeon?.node?.champion_splash}" alt="${campeon?.node?.champion_name}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${campeon?.node?.champion_name}
            </h3>
            <a href="https://www.leagueoflegends.com/es-es${campeon?.node?.url}" target="_blank">ver más</a>
          </div>
        </div>
      `).slice(0,8).join('')}
  
      `;
      console.log(campeones)
      campeones_html.innerHTML = view;
    }


  } catch(err) {
    console.log(err)
  }
};


data(API_VIDEOS,options,'video');
data(LOL_API,options,'others');
