import { writeFileSync } from "node:fs";

const posts = [];

for (let i = 1; i <= 1000; i++) {
	posts.push({
		id: i,
		title: `Post ${i}`,
		content: `Content of post ${i}`,
	});
}

const data = { posts };

writeFileSync("db.json", JSON.stringify(data, null, 2));
