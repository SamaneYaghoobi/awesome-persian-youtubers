const json2md = require('json2md');
const source = require('./source.json');
const channel = require('../channel.json');
const lodash = require('lodash');

const tableIndex = 2;
const sourceJson = () => {
  let head = source[tableIndex].table.headers;
  let rows = lodash
    .chain(channel)
    .sortBy('channelName')
    .sortBy('about')
    .partition('about')
    .flatten()
    .value();

  for (let i = 0; i < rows.length; i++) {
    rows[i] = {
      [head.about]: rows[i].about,
      [head.channelName]: rows[i].channelName,
      [head.description]: rows[i].description,
      [head.website]: rows[i].website
        ? `[![WebSite]](${rows[i].website})`
        : '![Unknown]',
      [head.channel]: rows[i].channel
        ? `[![Channel]](${rows[i].channel})`
        : '![Unknown]'
    };
  }

  source[tableIndex].table.rows = rows;
  source[tableIndex].table.headers = [...Object.values(head)];

  return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(
  sourceJson(),
  null
)}\n</div>\n`;

process.stdout.write(outputData);
