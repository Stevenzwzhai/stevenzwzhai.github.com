'use strict';
const {resolve, isAbsolute, dirname}  = require('path')
module.exports = function(babel){
	let t = babel.types;
	let imports = {}
	let changeName=""

	return {
	    visitor: {


	   		VariableDeclarator(path, state) {
	   			if(path.node.id.name == 'a'){
	   				path.node.id.name == 'b'
	   				path.node.id = t.Identifier('b')
	   				
	   			}
	   			// console.log(path.node)
	   			
	   		},
	    
	    	VariableDeclaration(path, state) {
	    		if(path.node.kind == "var"){
	    			var info =  t.variableDeclaration('let', [t.variableDeclarator(t.identifier('info'), t.objectExpression([t.objectProperty(
			            t.identifier('name'),
			            t.stringLiteral('Steven'),
			            false,
			            false,
			            null
			        )]))])
	   				path.insertBefore(info)
	    		}
	    	},

	    	ImportDeclaration(path, state) {
					console.log(state)
						console.log(path.node.source.value)
						let imgUrl = '1231312'
						path.insertBefore(t.templateLiteral([t.templateElement({
							raw: 'VALUE',
							cooked: 'VALUE',
						}, false), t.templateElement('', false), t.templateElement({
							raw: 'VALUE',
							cooked: 'VALUE',
						}, false)], [t.callExpression(t.identifier('require'), [t.stringLiteral(imgUrl)])]))
				},
				// 	BinaryExpression(path, state) {
				// 		// console.log('1:', path.node)
				// 		if (path.node.operator !== "===") {
				// 	return;
				// }

			// path.node.left = t.identifier("fanerge1");
			// path.node.right = t.identifier("fanerge2");
	  //     },
		 //  FunctionDeclaration(path) {
		 //  	// console.log(path.node)
		 //  	let param = path.node.params[0];
		 //  	let paramName = param.name;
		 //  	param.name = 'x';
		 //  	path.traverse({
		 //  		Identifier(path) {
			// 	    // console.log('2:', path.node)
			// 	    if(path.node.name === this.paramName){
			// 	    	path.node.name = 'x'
			// 	    }
			// 	}
		 //  	}, {paramName})
		 //  },
		 //  Identifier(path, state) {
		 //  	// function resolveModulePath(filename) {
			//   //   const dir = dirname(filename)
			//   //   if (isAbsolute(dir)) return dir
			//   //   if (process.env.PWD) return resolve(process.env.PWD, dir)
			//   //   return resolve(dir)
			//   // }
			//   console.log(14141411124)
		 //  	console.log(path.resolve('../../'))
		 //  	if(path.node.name === 'a'){
		 //  		// console.log(path, path.node)
		 //  	}
		 //  },
		 //  MemberExpression(path, state) {

		 //  	// console.log('memberExpresion:', path.node.name, state)
		 //  }

	    }
	 };
}