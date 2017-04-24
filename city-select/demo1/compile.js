const templateReg = /\${([^{}])+}/g;
class Compile{
		constructor(node,data){
			this.oldNode = this.oldNode?this.oldNode:node.cloneNode(true);
			this.node = node;
			this.data = data;
			
		}
		render () {
			this.compileNode(this.node);
			this.node.hasChildNodes() ? this.compileNodeList(this.node.childNodes) : null;
		}
		refresh (data) {
			let parentNode = this.node.parentNode;
			this.data = data;
			this.node.innerHTML = "";
			this.node.childNodes.forEach((item) => {

				this.node.removeChild(item);
			})
			this.oldNode.childNodes.forEach((item) => {
				this.node.appendChild(item.cloneNode(true));
			})
			// this.node.childNodes = this.oldNode.cloneNode(true).childNodes;
			this.compileNode(this.node);
			this.node.hasChildNodes() ? this.compileNodeList(this.node.childNodes) : null;
		}
		compileNodeList(nodeList){
			let childListFn, node;
			for(node of nodeList){
				if(node.nodeType == 1 && node.hasAttribute("z-repeat")){
					this.compileElement(node);
				}else{
					this.compileNode(node);
					node.hasChildNodes ? this.compileNodeList(node.childNodes) : null;
				}
			}
		}
		compileNode(node){
			if(node.nodeType == 1){
				this.compileElement(node);
			}else if(node.nodeType == 3){
				this.compileText(node, this.data);
			}
		}
		compileElement(node){
			//解析指令
			var dirs = node.attributes;
			if(node.hasAttribute("z-repeat")){
				this.dealDir("z-repeat",node,dirs);
			}

			if(node.getAttribute("z-show")){
				console.log(1);
				this.dealDir("z-show", node, dirs);
			}


		}
		compileText(node, data){
			//解析模板
			if(!node.data){
				return;
			}
			node.data = this.compileTemplate(node.data)(data);

		}
		compileTemplate(textFragment){
			let res = null;
			let keyArray = [];
			while(res = templateReg.exec(textFragment)){
				let key = res[0].slice(2,res[0].length-1);
				keyArray.push(key);
			}
			for(let item of keyArray){
				let nReg = new RegExp("\\${"+item+"}","g");
				let dataStr = this.dealText(item);
				dataStr = dataStr.replace(/\\/g, "");
				textFragment = textFragment.replace(/\\/g, "");
				textFragment = textFragment.replace(nReg, dataStr);
			}
			return new Function("data","return `"+textFragment+"`");
		}
		dealText(text){
			let dataStrStart = "${data.";
			let dataStrEnd = "}";
			if(!text){
				return "";
			}
			return dataStrStart+text+dataStrEnd;

		}
		createDocFragment(){
			let docFragment = null;
			return docFragment = document.createDocumentFragment();

		}
		dealDir(type,node,dirs){
			switch(type){
				case "z-repeat":((node,dirs)=>{
						let dirArr = node.getAttribute("z-repeat").split(" ");
						node.removeAttribute("z-repeat")
						let parentNode = node.parentNode;
						let docFragment = this.createDocFragment();
						let len = this.data[dirArr[2]].length;
						let i = 0;
						while(len){
							let cloneNode = node.cloneNode(true);
							cloneNode.setAttribute("index", i);
							cloneNode.setAttribute("value", i);
							let nodeText = cloneNode.childNodes[0].data;
							let res = null;
							let keyArray = [];
							while(res = templateReg.exec(nodeText)){
								let key = res[0].slice(3+dirArr[0].length,res[0].length-1);
								keyArray.push(key);
							}
							for(let item of keyArray){
								let nReg = new RegExp("\\${"+dirArr[0]+"."+item+"}","g");
								cloneNode.innerHTML = cloneNode.innerHTML.replace(nReg, "${"+dirArr[2]+"\\["+i+"\\]\\."+item+"}");
							}

							docFragment.appendChild(cloneNode);
							len--;
							i++;
						}
						parentNode.appendChild(docFragment);
						parentNode.removeChild(node);
					})(node,dirs);
					break;
				case "z-show":((node,dirs)=>{
						let flag = node.getAttribute("z-show");
						if(flag=="false"){
							node.style.display = "none";
						}
					})(node,dirs)

			}
		}
	}
