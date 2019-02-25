let code = "import a from './test.js';"
const path = require('path')
const babel = require('babel-core')
console.log(transformCode(code))
function transformCode(code) {
  	let ast = babel.transform(code).ast
	return babel.transformFromAst(ast, null, {babelrc: true, extends: path.resolve(__dirname, './.babelrc')}).code
}