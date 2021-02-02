const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    process.exit(0);
  }
  const key = args[0];

  try {
    const resourceLoader = new jsdom.ResourceLoader({
      strictSSL: false,
      userAgent:
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    });
    const options = {
      resources: resourceLoader,
      runScripts: 'dangerously',
      pretendToBeVisual: true,
      virtualConsole: new jsdom.VirtualConsole(),
      cookieJar: new jsdom.CookieJar(),
    };

    options.cookieJar.setCookie(
      'hasCookie=true',
      'https://codequiz.azurewebsites.net',
      (val) => {}
    );
    JSDOM.fromURL('https://codequiz.azurewebsites.net', options).then((dom) => {
      // dom.window.document.querySelector('input[type="button"]').value;
      // const nodeList = dom.window.document.querySelectorAll('tbody tr');
      // nodeList.forEach((htmlTableRowElement) => {
      //   const cells =  htmlTableRowElement.cells[0].innerText
      // });
      const arr = Array.from(nodeList);
      const rows = arr.filter((node) => {
        const cell = node.cells[0];
        return cell.innerHTML.trim() === key.trim();
      });
      if (rows.length > 0) {
        const value = rows[0].cells[1].innerHTML;
        console.log(value);
      } else console.log('Not found');
    });
  } catch (err) {
    console.log(err);
  }
})();
