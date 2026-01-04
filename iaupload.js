import fs from "fs/promises";
import crypto from "crypto";
import {fileTypeFromFile} from "file-type";

let nodes = JSON.parse(await fs.readFile('../getEpisodes 02-01-2026.json', 'utf-8'));
let priority = [11525];
let prioritynodes = nodes.filter(i => {
	for (let x of priority) {
		if (x === i.id) {
			return true;
		}
	}
});
async function generate () {
	for (let i of prioritynodes.filter(i => i.episodes)) {
		let info = '';
		info += ' -m "title:' + i.title + '" ';
		info += '-m "mediatype:audio" ';
		info += '-m "collection:opensource_audio" ';
		for(let j of i.episodes) {
			let filename = await fs.readFile("../fmfenxiang-log/" + j.id + "/dir.txt", 'utf-8');
			let content = await fs.readFile("../fmfenxiang-log/" + j.id + "/" + filename + ".txt", 'utf-8');
			let checksum = content.split(" ")[4];
			let filetype = await fileTypeFromFile("../fmfenxiang/" + j.id + "/" + filename);
			let file = await fs.readFile("../fmfenxiang/" + j.id + "/" + filename);
			if (crypto.createHash('sha1').update(file).digest('hex') === checksum) {
				let mfilename = '';
				if (!filename.includes(filetype.ext)) {
					mfilename = ' --remote-name "' + filename.substring(0, filename.lastIndexOf(".") + 1) + filetype.ext + '"';
				}
				console.log('ia up fmfenxiang-' + i.id + ' "'+ j.id + "/" + filename + '"' + mfilename + info);
				info = '';
			}
		}
	}
}
generate();