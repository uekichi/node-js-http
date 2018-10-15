'use strict';
const http = require('http');
const pug = require('pug');
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    switch (req.method) {
        case 'GET':
            if (req.url === '/enquetes/gokuu-gohan') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: '悟空',
                    secondItem: '悟飯'
                }));
            } else if (req.url === '/enquetes/kuririn-yamucha') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: 'クリリン',
                    secondItem: 'ヤムチャ'
                }));
            } else if (req.url === '/enquetes/wooron-pooaru') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: 'ウーロン',
                    secondItem: 'プーアル'
                }));
            }
            res.end();
            break;
        case 'POST':
            res.write('POST ' + req.url);
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                const decoded = decodeURIComponent(body);
                console.info('[' + now + '] 投稿: ' + decoded);
                res.write('<!DOCTYPE html><html lang="ja"><body><h1>' + 
                    decoded + 'が投稿されました</h1></body></html>');
                res.end();
            });
            break;
        case 'DELETE':
            res.write('DELETE ' + req.rul);
            break;
        default:
            break;
    }
}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});
const port = 8000;
server.listen(port, () => {
    console.info('[' + new Date() + ']  Listening on ' + port);
});