const loremIp = require("./loremIpsum");

module.exports = [
    {
        title: loremIp.lorem.generateSentences(2),
        author: loremIp.lorem.generateWords(2),
        content: loremIp.lorem.generateParagraphs(5),
        date: 101722,
    },
]