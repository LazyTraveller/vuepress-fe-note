const fs = require('fs')
const path = require('path')
const process = require('process')

const ignoreList = ['.vuepress']
const workPath = path.join(process.cwd() + '/docs')

function buildChildren(path, parentName = '') {
  const files = fs.readdirSync(path)
  return files.map((file) => {
    if (ignoreList.includes(file)) return
    const current = { title: file }
    const subPath = `${path}/${file}`
    if (fs.statSync(subPath).isDirectory()) {
      current.children = buildChildren(subPath, `${parentName}/${file}`)
    } else {
      if (file === 'README.md') {
        current.path = `${parentName}/`
      } else {
        const suffixName = file.slice(-3)
        if (suffixName !== '.md') return
        current.path = `${parentName}/${file.slice(0, -3)}`
      }
    }
    return current
  }).filter((item) => item)
}


const sidebar = buildChildren(workPath)
const nav =  [
{ text: "主页", link: "/" },
{ text: "前端", link:"/web/css/" },
{ text: "node", link: "/node/" },
{ text: "面试问题", link: "/interview/" }
]
module.exports = {
  title: '前端杂货店',
  description: '前端系统知识笔记',
  themeConfig: {
    nav: [...nav, { text: 'GitHub', link: "https://github.com/LazyTraveller/vuepress-fe-note" }],
    sidebar,
  },
  dest: path.resolve(__dirname, '../', '../', 'dist'),
  base: '/vuepress-fe-note/',
  evergreen: true,
}