const KB=[
 {match:/laptop|computer|pc|phone|tablet|electronic|charger|keyboard|mouse/i,type:'electronics',action:'Repair or donate',why:'Electronics carry high embodied emissions. Extending device life usually beats replacing it, and working devices can be donated.',co2:35,divert:1,caution:'Remove personal data before donation. Use an authorized e-waste channel if the device is beyond repair.'},
 {match:/battery|batteries|power bank/i,type:'battery',action:'Special recycling',why:'Batteries contain recoverable materials and should stay out of household trash.',co2:1.4,divert:1,caution:'Do not place loose batteries in mixed recycling. Use a designated battery collection point.'},
 {match:/plastic|bottle|container|pet\b/i,type:'plastic packaging',action:'Reuse, then recycle',why:'Reusing a clean container avoids a new item; accepted rigid plastics can then return to a material stream.',co2:.32,divert:.9,caution:'Local recycling rules differ. Empty and clean containers before recycling.'},
 {match:/glass|jar/i,type:'glass',action:'Reuse, then recycle',why:'Glass containers can often be reused directly and are widely recyclable where collection exists.',co2:.25,divert:.95,caution:'Broken glass may require different handling from bottles and jars.'},
 {match:/cardboard|paper|box|newspaper/i,type:'paper & cardboard',action:'Reuse or recycle',why:'Keeping fiber in circulation reduces demand for virgin material and landfill volume.',co2:.55,divert:.95,caution:'Keep paper dry and free from heavy food contamination.'},
 {match:/shirt|jeans|clothes|clothing|cotton|textile|shoe/i,type:'textile',action:'Repair, repurpose, or donate',why:'Textiles have significant production impacts. Repairing or finding a second user preserves more value than disposal.',co2:6.5,divert:.9,caution:'Donate only clean, usable items; damaged textiles may need a specialist textile-recycling route.'},
 {match:/food|leftover|vegetable|fruit|coffee grounds|peel/i,type:'organic waste',action:'Prevent or compost',why:'Edible food should be prevented or shared first; unavoidable scraps can be composted instead of landfilled.',co2:.7,divert:.85,caution:'Use only compostable organics accepted by your local system.'},
 {match:/metal|can|aluminum|aluminium|steel/i,type:'metal',action:'Reuse or recycle',why:'Metals are valuable recyclable materials, and recycling can avoid energy-intensive virgin production.',co2:1.8,divert:.98,caution:'Clean packaging and follow local collection rules.'},
 {match:/furniture|chair|table|desk|cabinet/i,type:'furniture',action:'Repair, resell, or donate',why:'Furniture is material-intensive and often repairable. Keeping it in use avoids bulky waste and replacement demand.',co2:22,divert:.95,caution:'Check structural safety before reuse or donation.'}
];

function parseLine(line){
 const trimmed=line.trim();
 if(!trimmed)return null;
 const m=trimmed.match(/^(\d+)\s+(.+)$/);
 return {qty:m?Math.max(1,Number(m[1])):1,name:m?m[2]:trimmed};
}
function classify(item){
 const rule=KB.find(r=>r.match.test(item.name));
 return rule||{type:'mixed/unknown',action:'Inspect before disposal',why:'The material is not confidently recognized. Check whether the item is reusable, repairable, or accepted by a local recycling stream before trashing it.',co2:.15,divert:.35,caution:'Local rules are the source of truth for final disposal.'};
}
function analyze(){
 const lines=document.querySelector('#items').value.split('\n').map(parseLine).filter(Boolean);
 if(!lines.length)return;
 const recs=lines.map(item=>({...item,...classify(item)}));
 const totalQty=recs.reduce((s,r)=>s+r.qty,0);
 const weightedDiv=recs.reduce((s,r)=>s+r.divert*r.qty,0)/totalQty;
 const co2=recs.reduce((s,r)=>s+r.co2*r.qty,0);
 document.querySelector('#diversionScore').textContent=Math.round(weightedDiv*100)+'%';
 document.querySelector('#co2Score').textContent=(co2<10?co2.toFixed(1):Math.round(co2))+' kg';
 document.querySelector('#itemsScore').textContent=totalQty;
 const wrap=document.querySelector('#recommendations'); wrap.innerHTML='';
 recs.forEach((r,i)=>{
  const el=document.createElement('article'); el.className='recommendation';
  el.innerHTML=`<div class="rec-top"><div><div class="rec-title">${r.qty>1?r.qty+' × ':''}${escapeHtml(r.name)}</div><small>${r.type}</small></div><span class="action">${r.action}</span></div><p>${r.why}</p><div class="meta"><span>Priority #${i+1}</span><span>~${(r.co2*r.qty).toFixed(1)} kg CO₂e potential</span><span>Transparent rule match</span></div><p><strong>Check:</strong> ${r.caution}</p>`;
  wrap.appendChild(el);
 });
 document.querySelector('#emptyState').hidden=true; document.querySelector('#results').hidden=false;
}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
document.querySelector('#analyze').addEventListener('click',analyze);
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#items').value=b.dataset.example;analyze();}));
