
import check from './controller'


/**
 * generate check fileds and send 404 if error 
 * @param  {String} url it'll map to the fields to check validaiton, tap F12 for more info in ./validField.js and /Name
 * @return {List}      callback functions to put in router
 */
export default (validator)=>{
    return [validator,check]
}