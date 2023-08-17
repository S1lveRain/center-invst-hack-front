export function isSubmitBtnAvailable(values: any, errors: any){
 let copyValues = {...values}
 delete copyValues.email
 delete copyValues.password

 let copyErrors = {...errors}
 delete copyErrors.email
 delete copyErrors.password

 let errorsList: string[] = []
 let isEmptyValue = false

 for (const key in copyErrors) {
   if (copyErrors[key] !== undefined) {
    errorsList.push(copyErrors[key])
   }
 }

 if (errorsList.length >= 1) {
  return true
 }
 for (const key in copyValues) {
  if (!copyValues[key]) {
   return isEmptyValue = true
  }
 }
 if (isEmptyValue) return true

 return false
}