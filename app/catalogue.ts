export const categories = ['Fashion', 'Accessories', 'Makeup', 'Shoes', 'Bags', 'Home decor', 'Nails', 'Healthy snacks'];
export type Product = {id:string; name:string; category:string; price:number; rating:number; reviews:number; image:string; seller:string; tags:string; description:string};
const originalProducts: Product[] = [
 {id:'earrings',name:'Golden hour earrings',category:'Accessories',price:1290,rating:4.8,reviews:128,image:'accessories',seller:'Studio Aara',tags:'gold jewellery jewelry earrings wedding festive statement',description:'A statement pair for dinners, celebrations, and everything in between.'},
 {id:'bag',name:'The everyday shoulder bag',category:'Bags',price:2490,rating:4.7,reviews:86,image:'bag',seller:'The Carry Edit',tags:'black handbag shoulder everyday minimal work office',description:'A compact black shoulder bag with room for your everyday essentials.'},
 {id:'lip',name:'The red lip edit',category:'Makeup',price:690,rating:4.6,reviews:204,image:'makeup',seller:'Bare Colour',tags:'red lipstick lip beauty evening wedding',description:'A bold red lip to finish your favourite evening look.'},
 {id:'vase',name:'Lavender ceramic pitcher',category:'Home decor',price:890,rating:4.9,reviews:42,image:'decor',seller:'Clay & Co.',tags:'white ceramic vase pitcher minimal flowers home decor gift',description:'A small ceramic pitcher for a shelf, bedside table, or freshly cut stems.'},
 {id:'sneakers',name:'Off-duty black sneakers',category:'Shoes',price:2990,rating:4.7,reviews:93,image:'shoes',seller:'Sunday Sole',tags:'black sneakers trainers running casual shoes comfortable',description:'An easygoing sneaker look for weekends and everyday outfits.'},
 {id:'nails',name:'The manicure moodboard',category:'Nails',price:650,rating:4.8,reviews:67,image:'nails',seller:'Nail Story',tags:'manicure nail art polish statement beauty',description:'A nail-art inspiration set. Final fit and design are confirmed with the seller.'},
 {id:'almonds',name:'Everyday almond snack pack',category:'Healthy snacks',price:390,rating:4.8,reviews:156,image:'snacks',seller:'Good Little Bites',tags:'almond nuts snack healthy food crunchy',description:'A simple almond snack pack for your desk or your everyday bag.'},
 {id:'dress',name:'The occasion dress',category:'Fashion',price:4990,rating:4.9,reviews:31,image:'fashion',seller:'The Drape Studio',tags:'dress gown occasion wedding party evening',description:'An occasionwear-inspired look for your next celebration.'},
 {id:'earrings2',name:'Celebration jewellery edit',category:'Accessories',price:1890,rating:4.7,reviews:74,image:'accessories',seller:'Studio Aara',tags:'gold earrings jewellery jewelry festive wedding gift',description:'A festive jewellery edit that brings a little shine to your look.'},
 {id:'vase2',name:'A little shelf refresh',category:'Home decor',price:1190,rating:4.6,reviews:58,image:'decor',seller:'Clay & Co.',tags:'white vase flowers ceramic minimal home decor gift shelf',description:'A vase-and-stems styling concept for a quieter corner of your home.'},
 {id:'bag2',name:'Black bag, weekend edition',category:'Bags',price:1790,rating:4.8,reviews:113,image:'bag',seller:'The Carry Edit',tags:'black handbag small shoulder minimal casual bag',description:'A small shoulder-bag edit for coffee runs and weekend plans.'},
 {id:'snack2',name:'Almonds for your desk drawer',category:'Healthy snacks',price:290,rating:4.5,reviews:82,image:'snacks',seller:'Good Little Bites',tags:'almond nuts snack healthy food office',description:'A smaller almond snack pack for a quick afternoon break.'},
 {id:'nails2',name:'Weekend nail-art edit',category:'Nails',price:990,rating:4.7,reviews:39,image:'nails',seller:'Nail Story',tags:'nail art manicure polish party beauty',description:'A weekend manicure inspiration edit to discuss with your nail artist.'},
 {id:'lip2',name:'Evening beauty edit',category:'Makeup',price:1290,rating:4.8,reviews:61,image:'makeup',seller:'Bare Colour',tags:'red lipstick lip makeup beauty evening party',description:'A red-lip beauty inspiration edit for evenings out.'},
];
// Additional fictional listings reuse the prototype's inspiration photography.
const edits=['Everyday','Weekend','Celebration','Minimal','Signature','Studio','After-hours','Gift','Seasonal','Essential'];
export const products:Product[]=[...originalProducts,...Array.from({length:40},(_,edition)=>categories.map((category,index)=>{
 const options=originalProducts.filter(p=>p.category===category);const base=options[edition%options.length];
 return {...base,id:`demo-${index}-${edition}`,name:`${edits[edition%edits.length]} ${base.name.toLowerCase()} · ${Math.floor(edition/edits.length)+1}`,price:Math.max(190,base.price+(edition%9-4)*100),rating:Number((4.2+(edition%8)*.1).toFixed(1)),reviews:18+(edition*29+index*17)%380,description:base.description+' Part of a fictional sample collection; photography is for inspiration.'};
})).flat()];
const aliases: Record<string,string[]> = {'Fashion':['fashion','dress','gown','clothes','clothing','outfit'], 'Accessories':['accessories','accessory','jewelry','jewellery','earrings','necklace'], 'Makeup':['makeup','lipstick','beauty','lip'], 'Shoes':['shoes','shoe','sneaker','sneakers','footwear','trainers'], 'Bags':['bag','bags','handbag','handbags'], 'Home decor':['decor','vase','pitcher','ceramic','home'], 'Nails':['nails','nail','manicure'], 'Healthy snacks':['snacks','snack','almonds','almond','nuts','food']};
export function searchProducts(query:string, category='All') {
 const q=query.toLowerCase().replace(/,/g,'');
 const budget=q.match(/(?:under|below|less than|up to|upto|max|budget(?: of)?)\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(k)?/);
 const max=budget?Number(budget[1])*(budget[2]?1000:1):Infinity;
 const tokens: string[]=q.match(/[a-z]+/g) || [];
 const detected=Object.entries(aliases).filter(([,words])=>words.some(w=>tokens.includes(w))).map(([cat])=>cat);
 const meaningful=tokens.filter(t=>!['a','an','the','for','and','with','me','find','looking','want','i','something','some','under','below','less','than','up','to','budget','of','rs','inr','k','show','all','products','browse'].includes(t));
 return products.filter(p=>p.price<=max && (category==='All'||p.category===category) && (!detected.length||detected.includes(p.category)))
 .map(p=>({p,score:meaningful.filter(t=>(p.name+' '+p.tags+' '+p.category).toLowerCase().includes(t)).length}))
 .filter(({score})=>!meaningful.length||score>0).sort((a,b)=>b.score-a.score||b.p.rating-a.p.rating).map(({p})=>p);
}
export const money=(n:number)=>'₹'+n.toLocaleString('en-IN');
