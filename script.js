const nav=document.getElementById('nav'), topBtn=document.querySelector('.top-btn'), glow=document.querySelector('.cursor-glow');
const menuBtn=document.querySelector('.menu-toggle'), mobile=document.getElementById('mobileMenu');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>25);topBtn.classList.toggle('show',scrollY>600)},{passive:true});
if(!reduced && window.matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{glow.style.opacity='.7';glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});}
menuBtn?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);mobile.setAttribute('aria-hidden',!open);document.body.style.overflow=open?'hidden':''});
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');mobile.setAttribute('aria-hidden','true');document.body.style.overflow=''}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.magnetic').forEach(el=>{
  if(reduced)return;
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

const data={
 armaan:{industry:'01 / HEALTHCARE',title:'ARMAAN CARE CLINIC',description:'A healthcare portfolio concept focused on trust, clarity and easy patient contact.',objective:'Present clinic services and contact information in a calm, structured interface.',direction:'Clean medical UI with cool blue tones, generous spacing and human-centered hierarchy.',features:'Service overview, contact CTA, responsive layout, clear navigation.'},
 nox:{industry:'02 / FITNESS',title:'NOX FITNESS',description:'A bold fitness concept built around movement, strong typography and focused calls-to-action.',objective:'Create an energetic digital presence for a modern fitness brand.',direction:'Dark athletic interface with controlled crimson accents and oversized type.',features:'Program sections, membership CTA, responsive sections and strong visual hierarchy.'},
 noire:{industry:'03 / HOSPITALITY',title:'NOIRÉ',description:'A modern dining concept designed around atmosphere, menu discovery and reservations.',objective:'Make the restaurant feel distinctive while keeping key information easy to find.',direction:'Editorial dark luxury with restrained warm highlights and cinematic spacing.',features:'Menu presentation, story section, reservation CTA and responsive layout.'},
 coaching:{industry:'04 / EDUCATION',title:'INDIAN COACHING CENTER',description:'An education portfolio concept designed for clear course information and enquiry flow.',objective:'Help students and parents understand offerings and reach the institute quickly.',direction:'Structured educational UI with grid details, strong headings and clear CTAs.',features:'Course sections, enquiry CTA, information hierarchy and responsive layout.'}
};
const modal=document.getElementById('projectModal');
document.querySelectorAll('.project').forEach(card=>card.addEventListener('click',e=>{
  if(!e.target.closest('.view-project'))return;
  const d=data[card.dataset.project]; if(!d)return;
  document.getElementById('modalIndustry').textContent=d.industry;document.getElementById('modalTitle').textContent=d.title;
  document.getElementById('modalDescription').textContent=d.description;document.getElementById('modalObjective').textContent=d.objective;
  document.getElementById('modalDirection').textContent=d.direction;document.getElementById('modalFeatures').textContent=d.features;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('.modal-close').addEventListener('click',closeModal);document.querySelector('.modal-backdrop').addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const params=new URLSearchParams(location.search);
if(params.get('sent')==='1'){setTimeout(()=>alert('Enquiry sent successfully. Thank you!'),100);history.replaceState({},'',location.pathname+'#contact')}

document.querySelector('.contact-form')?.addEventListener('submit',e=>{
  const btn=e.currentTarget.querySelector('.submit-btn');btn.disabled=true;btn.innerHTML='SENDING… <span>↗</span>';
});
