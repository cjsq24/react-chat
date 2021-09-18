export function setParamsSearch(values) {
   for (let v in values) {
      values[v] = values[v] !== '' ? values[v] : undefined
   }
   return values
}