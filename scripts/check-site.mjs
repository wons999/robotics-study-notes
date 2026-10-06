import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const out=process.env.QA_OUTPUT_DIR ?? '/tmp/robotics-notes-browser-qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox'],headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const origin=(process.env.CHECK_SITE_URL ?? 'http://127.0.0.1:4321').replace(/\/$/, '');
const expectedBase=new URL(origin).pathname.replace(/\/$/, '') + '/';
const failures=[];page.on('pageerror',e=>failures.push(e.message));
function assert(ok,message){if(!ok)failures.push(message);}
await page.goto(origin+'/paper-notes/catalog/');
const all=await page.locator('[data-entry]:visible').count();assert(all>=89,'catalog missing documents');
await page.locator('[data-query]').fill('Astra as Embodied Policies');assert(await page.locator('[data-entry]:visible').count()===1,'catalog title filter');
assert((await page.locator('[data-entry]:visible a.catalog-title').first().getAttribute('href')).startsWith(expectedBase), 'catalog base URL');
await page.screenshot({path:out+'/catalog.png'});
await page.locator('[data-query]').fill('');await page.locator('select[data-status]').selectOption('verified');assert(await page.locator('[data-entry]:visible').count()>=1,'status filter');
await page.goto(origin+'/topics/sensing/');assert(await page.locator('[data-entry]:visible').count()>8,'topic catalog');await page.screenshot({path:out+'/topic.png'});
await page.goto(origin+'/paper-notes/groot/');assert(await page.locator('.research-meta').count()===1,'overview metadata');
for(const [slug,count] of [['astra-embodied-policy-capabilities',59],['unexpected-robot-policy',18],['gpt-policy',15],['codeactionbench',29]]){
 await page.goto(origin+'/paper-notes/'+slug+'/');
 assert(await page.locator('.research-meta').count()===1,`${slug}: research metadata`);
 assert(await page.locator('.paper-figure').count()===count,`${slug}: paper inventory count`);
 for(const img of await page.locator('.paper-figure img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(async e=>{await e.decode();});assert(await img.evaluate(e=>e.naturalWidth>0),`${slug}: broken paper figure`);}
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:out+'/'+slug+'.png'});
}
for(const width of [1920,2560,3840]){
 const height=width*9/16;await page.setViewportSize({width,height});
 await page.goto(origin+'/seminars/t-rex/slides/?fullscreen=1&returnTo=../');
 const n=await page.locator('[data-slide]').count();assert(n>30,'deck missing slides');
 for(let i=0;i<n;i++){
  const slide=page.locator('[data-slide].is-active');
  const checks=await slide.evaluate(e=>{
   const r=e.getBoundingClientRect();return {active:e.dataset.slide,scrollX:e.scrollWidth>e.clientWidth+2,scrollY:e.scrollHeight>e.clientHeight+2,frame:r.width>0};
  });assert(checks.frame,`slide invisible ${width}/${i+1}`);
  if(checks.scrollX||checks.scrollY)failures.push(`slide overflow ${width}/${i+1}`);
  for(const img of await slide.locator('img').all()) await img.evaluate(e=>e.decode());
  await page.screenshot({path:`${out}/slide-${width}-${i+1}.png`});
  if(i<n-1)await page.keyboard.press('ArrowRight');
 }
 await page.keyboard.press('ArrowLeft');assert(await page.locator('[data-current]').textContent()===String(n-1),'previous slide keyboard');
 await page.goto(origin+'/seminars/t-rex/slides/?fullscreen=1&returnTo=../');
 await page.locator('.is-active .slide-visual img').first().click();assert(await page.locator('[data-image-lightbox]').isVisible(),'lightbox open');await page.keyboard.press('Escape');assert(!await page.locator('[data-image-lightbox]').isVisible(),'lightbox close');
 await page.locator('[data-fullscreen]').click();await page.waitForURL('**/seminars/t-rex/');
 assert(!await page.locator('[data-seminar-deck]').count(),'landing embedded deck');
}
await browser.close();await writeFile(out+'/results.json',JSON.stringify({all,failures},null,2));console.log(JSON.stringify({all,failures}));if(failures.length)process.exitCode=1;
