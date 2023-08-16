export function isNextStepAvailable(errors:any[]){
 let flag = false
 errors.forEach(error => {
    if (error) {
      flag = true
      return
    }
 });
 return flag
}