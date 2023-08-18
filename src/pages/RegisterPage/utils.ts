export function isSubmitBtnAvailable(values: any, errors: any){
 
 let errorsList: string[] = []
 let isEmptyValue = false

 for (const key in errors) {
   if (errors[key] !== undefined) {
    errorsList.push(errors[key])
   }
 }

 if (errorsList.length >= 1) {
  return true
 }
 for (const key in values) {
  if (!values[key]) {
   return isEmptyValue = true
  }
 }
 if (isEmptyValue) return true

 return false
}