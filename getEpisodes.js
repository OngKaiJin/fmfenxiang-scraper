site = "https://fmfenxiang.com"
nodes = [];
async function loop(start) {
	let i = start;
	while (i <= 13094) {
		await fetch(site + "/fm/" + i, {redirect: "manual"}).then(resp => {
			if (resp.status === 200) {
				return resp.text();
			} else if (resp.status === 429) {
				setTimeout(() => {
					return loop(i);
				}, 40000);
			} else {
				item = {};
				item.id = i;
				nodes.push(item);
				return loop(i + 1);
			}
		}).then(resp => {
			doc = (new DOMParser()).parseFromString(resp, "text/html");
			episodes = [];
			for (let i of doc.querySelectorAll("main > div:nth-child(2) a")) {
				episode = {};
				episode.id = i.href.replace(site + "/sound/","");
				episode.title = i.querySelector("p").innerHTML.trim();
				episodes.push(episode);
			}
			item = {};
			item.id = i;
			item.title = doc.querySelector("main > div:nth-child(1) h3").innerText;
			item.episodes = episodes;
			nodes.push(item);
		});
		i++;
	}
}
loop(10000);
