export function hasLink(text:string){return /(?:https?:\/\/|www\.|\b(?:[a-z0-9-]+\.)+[a-z]{2,63}\b|\b[a-z]+:\/\/)/i.test(text.normalize('NFKC').replace(/@[a-zA-Z0-9._]+/g,''))}
export function postProblem(text:string){if(text.length>280)return 'Keep your review within 280 characters.';if(hasLink(text))return 'Links are not allowed. Use a brand name or plain Instagram handle.';return null}
