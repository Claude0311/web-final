

export default (method) => {
	const output = []
	validationFields[method].forEach(element=>{
		output.push(require("./Name/"+element))
	})
	return output
}


