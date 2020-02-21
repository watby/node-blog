const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class PostRepository {
    filePath;
    fileEncoding;

    constructor(filePath, fileEncoding) {
        this.filePath = filePath;
        this.fileEncoding = fileEncoding;
    }

    async readPostsAsync() {
        const fileContent = await readFileAsync(this.filePath, this.fileEncoding);
        return JSON.parse(fileContent || '') || [];
    }

    async writePostsAsync(posts) {
        const fileContent = JSON.stringify(posts);
        await writeFileAsync(this.filePath, fileContent, this.fileEncoding);
    }
}

module.exports = new PostRepository('posts.json', 'utf8');
