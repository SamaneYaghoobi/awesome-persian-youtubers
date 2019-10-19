const { chain } = require('lodash');
const json2md = require('json2md');
const fs = require('fs');
const footer = require('./footer.json');
const header = require('./header.json');
const { SubjectsList } = require('../subjects');

const makeTable = (obj, head) => {
  var rows = chain(obj)
    .sortBy('channelName')
    .partition('channelName')
    .flatten()
    .value();

  for (let i = 0; i < rows.length; i++) {
    rows[i] = {
      [head.channelName]: rows[i].channelName ? `[${rows[i].channelName}](${rows[i].channel})` : '--',
      [head.description]: rows[i].description,
      [head.website]: rows[i].website ? `[وب‌سایت](${rows[i].website})` : '--'
    };
  }

  return {
    rows,
    head
  };
};

const sourceJson = (title, source) => {
  let TABLE = [
    {
      h2: title
    },
    {
      table: {
        headers: {
          channelName: 'نام کانال',
          description: 'توضیحات',
          website: 'آدرس وب سایت'
        },
        rows: []
      }
    }
  ];

  let result = makeTable(source, TABLE[1].table.headers);

  TABLE[1].table.rows = result.rows;
  TABLE[1].table.headers = [...Object.values(result.head)];

  return TABLE;
};

const outputData = `<div dir="rtl">\n\n${json2md(header, null)}\n`;

process.stdout.write(outputData);
SubjectsList.forEach(el => {
  fs.appendFileSync('README.md', json2md(sourceJson(el[0], el[1]), null));
});

fs.appendFileSync('README.md', `\n${json2md(footer, null)}</div>\n`);
