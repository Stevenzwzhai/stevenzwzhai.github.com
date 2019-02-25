//js转换成AST模块
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const generator = require('babel-generator').default
const Types = require('babel-types')
const babel = require('babel-core')
/*
babel.transform(code, options) => {code, map, ast}

*/
function parseAst(code) {
	return babylon.parse(code, {
		sourceType: 'module',
		plugins: [
			'asyncFunction',
			'classConstructorCall',
			'jsx',
			'flow',
			'trailingFunctionCommas',
			'doExpressions',
			'objectRestSpread',
            'decorators',
            'classProperties',
            'exportExtensions',
            'exponentiationOperator',
            'asyncGenerators',
            'functionBind',
            'functionSent'
		]
	})
}

function getTemplateAst(tpl, opts = {}) {
	// console.log('get', babel.template(tpl)({}))
	let ast = babel.template(tpl, opts)//({});
	console.log(ast({}))
	if(Array.isArray(ast)){
		return ast;
	}else{
		return [ast]
	}
}

const checkParams = function(argv, newAst) {
	let params = [];
	// const vals = getAstVals(newAst);
	if(argv && argv.length !== 0){
		for(let i = 0; i< argv.length; i++){
			// if(vals.indexOf(argv[i]) === -1){
				params.push(Types.identifier(argv[i]))
			// }else{
			// 	throw TypeError('params' + argv[i]+'has exist')
			// }
		}
	}
	return params
}
const code = `
	class MyComponent extends React.Component{
		constructor(props, context){
			super(props, context)
		}
	}
`
const insert = [
	{
		name: 'render',
		body: `
			var a = 12;
		`,
		argv: null,
		isCover: true
	}
]
const ast = parseAst(code)

traverse(ast, {
	ClassBody(path){
		if(!Array.isArray(insert)){
			throw TypeError('插入字段必须为数组')
		}
		for(let key in insert){
			// console.log('key:', key)
			const methodObj = insert[key];

			const newAst = getTemplateAst(methodObj.body, {sourceType: 'script'})
			// console.log(newAst)
			const params = checkParams(methodObj.argv, newAst)
			// const property = Types.ClassMethod('method', Types.identifier(methodObj.name), [], Types.BlockStatement(newAst))
			// 转换出新的body插入就可以了
			path.node.body.push(newAst)
		}
	}
})

console.log(generator(ast).code)
// getTemplateAst(insert[0].body)
// console.log(insert[0].body)



