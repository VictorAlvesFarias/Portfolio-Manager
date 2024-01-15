export function TryParseToURL(s:string):string {
    try {
      if(new URL(s).toString()){
            return s;
          }
      else {
          return ""
      }
    }
    catch {
        return ""
    }
}