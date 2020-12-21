class Template{
    constructor(param){
        this.param = param
        this.prefix = 'sample'
        this.postfix = 'description'
    }
    rule(){
        return (user,db)=>true
    }
    static description(param=' '){
        return `sample description`
    }
    save(){
        return {
            param:this.param,
            rule:this.rule,
            des:Template.description
        }
    }
}
export default Template