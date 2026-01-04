import fs from "fs/promises";
import dom from "jsdom";
import crypto from "crypto";

let cookie_ongkaijin777 = "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6InZOVGFYbGcrdk93bUxSS2Flakg3REE9PSIsInZhbHVlIjoieW5Od29NVGtKNk8wWEh0OUlVeExOL3A5Q0ZabFMzOUJVdnNsQXBRUDd0MGUrMGZyNUx1dGVLUTYwa2k3U25NTEFjbHhwN0I2aE1vU2xoaVdxRG9BZ0NYYkwxbzIrdkJNZ2JHRnYrZllkZUQyWm01ekNLclpaczJHeC9VVzhaWDZ1K24yTEVnbTlNREpBcmlaZ0lxeE4wZzVqQzhmcEkrbVdES3RPYm9yeWJZN2JsWENWUDg4cVZMenFzL29meExBSVRxT1FDc1RNQVNRUnZRSzBhZmpqMk9vbS82dEYrU2k2UXAvZnA5a3I4dz0iLCJtYWMiOiJlZGUzZWQ0Nzg1NWZkM2JhZmIzNDcyMGVjNmUzMDVkMDc0YzZlNmU3ZjA1Y2Q1NGQ5ZjVkZWZjNWU0NDVmYTlkIiwidGFnIjoiIn0%3D";
let cookie_lilychu4566 = "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IjFjQlQ0NzNMdWdKUTFkMDlKODJuUWc9PSIsInZhbHVlIjoiVjlPNlIySURMbUlaYmVWWGJ1a2x3Y3hZdVU3OUNDbFlUQ3JpUU5zZmQrY0FiSXRCaDBsTTkvOFhWcXQvUmJEWDUzajJXTUsvblE4Vk5CMDdpVkNkNU5EOHYzYzdKNjBEd0FoVnc0Y2RpTnlEVjZEVnJEcEtZU0t5THIvS0xybmNwY241elN2YVhiZCtDNjNCcVVFTWR2Wmdldi91UnJTMDdoMmpZa1N3QkpRaWFjdTc2eEtzVXlqRExKYmxBOWpkMHpsOXAwWGtuQ09kWk1PVDQ2SitvbDViSmJGWjNsUEdybWRNRUR6VlNPWT0iLCJtYWMiOiJhZjhhOTg5NzI1OGI4MzZkYzFiM2YwYjRlYTkyOTBlOTQzNDFmNzA0NjA3MWZhMmY2ODhmMzI2NmZiN2I4ZGNhIiwidGFnIjoiIn0%3D";
let cookie_lilychu1779 = "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IjRublg3MW90dGVQN21qR015MlBzeVE9PSIsInZhbHVlIjoicW5Wa2RjeE9yakNNQ29SbW5lZ09rSUFsU2padUNyUnlMT2dUNXRKVE1yWjFmUFFQRGJqZHlJRVhpYXhwaWxNV01VbFc0RVJFbDNYSmRpT0d2MXZwNnFIRTUxeUVPdHJYdkt6TUVmRW5UR1Y5TVU5cUs4TkVRejhRNnIrN1FoM1VmQWxVbFpId1N6VTZkckhGblQ1b1NycnQwSGdDbk5BNUFWbnlQUmlJd3hVNmhjMVozb1RVc2NreDdCRTZmV2JObG9JWEFYS1k5SkxNZ3hOR2dObFVlM2kzbUJlRjgvNlk2VjlJUmFrbTBFaz0iLCJtYWMiOiIxYzU2NjNhNTdmZDU4N2FjMDQzNTRmM2IxNzgxZjIzMjMxYzExMWZlZDczZWIwMTEwNTJjZGJlNDdlYzJlNTFmIiwidGFnIjoiIn0%3D";

let nodes = JSON.parse(await fs.readFile('../getEpisodes 02-01-2026.json', 'utf-8'));
let priority = [12240, 11376, 11779, 10616, 11438, 12001, 12226, 12341, 12667, 11403, 11942, 12613, 10459, 11470, 10917, 11202, 11767, 12211];
let count = [];

async function queue (list) {
	count = [];
	for (let i of list.filter(i => i.episodes)) {
		for(let j of i.episodes) {
			delete j.title;
			count.push(j);
		}
	}
}

async function checkpoint (i) {
	await fs.writeFile("./checkpoint.txt", parseInt(i, 10).toString(), 'utf-8');
}

async function checkexist (path, filename) {
	try {
		let log = await fs.readFile("../fmfenxiang-log/" + path + "/" + filename + ".txt", 'utf-8');
		if (parseInt(log.split(" ")[1]) === 200) {
			if (log.split(" ")[4] == undefined) {
				console.log("Missing checksum: " + filename);
				return false;
			} else if (log.split(" ")[4] == crypto.createHash('sha1').update(await fs.readFile("../fmfenxiang/" + path + "/" + filename)).digest('hex')) {
				console.log("Skipping as file checksum matched with log: " + filename);
				return true;
			} else {
				return false;
			}
		}
	} catch (error) {
		return false;
	}
}

async function loop (start) {
	let i = start;
	while (i < count.length) {
		let page = await fetch("https://fmfenxiang.com/sound/" + count[i].id, {headers: {cookie: cookie_lilychu1779}});
		console.log("---" + (i + 1) + "/" + count.length + "---");
		console.log(page.status + " " + count[i].id);
		if (!page.status === 200) {
			setTimeout(() => {
				return loop(i);
			}, 20000);
		} else if (page.status === 429) {
			setTimeout(() => {
				return loop(i);
			}, 20000);
		} else if (page.status === 500) {
			await fs.mkdir ("../fmfenxiang-log/" + count[i].id, {recursive: true});
			await fs.writeFile("../fmfenxiang-log/" + count[i].id + "/" + count[i].id + ".txt", page.status + " " + " " + Date.now(), 'utf-8');
			await checkpoint(i);
			return loop(i + 1);
		} else {
			let doc = new dom.JSDOM(await page.text());
			let url = doc.window.document.querySelector("audio").src;
			let filename = decodeURIComponent(url).split('?')[0].split('/').reverse()[0];
			if (filename.includes("|") || filename.includes("<")) {
				filename = encodeURIComponent(filename);
			}
			if (await checkexist(count[i].id, filename)) {
				try {
					await fs.readFile("../fmfenxiang-log/" + count[i].id + "/" + "dir.txt", 'utf-8');
				} catch (error) {
					await fs.writeFile("../fmfenxiang-log/" + count[i].id + "/" + "dir.txt", filename, 'utf-8');
				}
				return loop(i + 1);
			}
			if (url.includes("sound-aka1")) {
				console.log("Skipping as url is sound-aka1");
				return loop(i + 1);
			}

			async function loop2 () {
				let resp = await fetch(url);
				console.log(resp.status + " " + filename);
				if (resp.status === 200) {
					return resp;
				} else if (resp.status === 429 || resp.status === 443) {
					setTimeout(() => {
						return loop2();
					}, 10000);
				}
			}

			try {
				let resp = await loop2();
				let resp2 = resp.clone();
				await fs.mkdir ("../fmfenxiang/" + count[i].id, {recursive: true});
				await fs.writeFile("../fmfenxiang/" + count[i].id + "/" + filename, await resp.body);
				await fs.mkdir ("../fmfenxiang-log/" + count[i].id, {recursive: true});
				await fs.writeFile("../fmfenxiang-log/" + count[i].id + "/" + "dir.txt", filename, 'utf-8');
				await fs.writeFile("../fmfenxiang-log/" + count[i].id + "/" + filename + ".txt", page.status + " " + resp.status + " " + Date.now() + " " + url + " " + new Uint8Array(await crypto.subtle.digest('SHA-1', await resp2.arrayBuffer())).toHex() + " " + "cookie_lilychu1779", 'utf-8');
				await checkpoint(i);
			} catch (error) {
				console.log(error);
				return loop(i + 1);
			}
			i++;
		}
	}
}

async function main () {
	let prioritynodes = nodes.filter(i => {
		for (let x of priority) {
			if (x === i.id) {
				return true;
			}
		}
	});

	await queue(prioritynodes);
	await loop(0);

	await checkpoint(0);
	await queue(nodes);
	loop(parseInt(await fs.readFile("checkpoint.txt", 'utf-8')));
}

main();
