const express = require('express')
const ReactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs')
const serverFavicon = require('serve-favicon')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(serverFavicon(path.join(__dirname, '../favicon.ico')))

if(!isDev){
    const serverEntry = require('../dist/server').default
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    
    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('*', function(req, res){
        const appString = ReactSSR.renderToString(serverEntry)
        //const tpl = template.replace('<!-- app -->', appString)
        console.log(appString)
        res.send(template.replace('<!-- app -->', appString))
    })
}else{
    const devStatic = require('./utils/dev')
    devStatic(app)
}

app.listen(3333, () => {
    console.log('server running at port 3333')
})