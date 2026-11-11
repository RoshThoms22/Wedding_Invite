'use strict';
// Wedding date: midnight at the start of 2 January 2027 in India (IST, UTC+05:30).
// Change the time here once your ceremony time is confirmed.
const WEDDING_ISO = '2027-01-02T00:00:00+05:30';
const weddingDate = new Date(WEDDING_ISO);
const welcome = document.getElementById('welcome');
const openButton = document.getElementById('open-invite');
function openInvitation(){welcome.classList.add('dismissed');document.body.classList.remove('locked');sessionStorage.setItem('weddingInvitationOpened','yes');}
openButton.addEventListener('click',openInvitation);
if(sessionStorage.getItem('weddingInvitationOpened')==='yes')openInvitation();
function updateCountdown(){
  let remaining = weddingDate.getTime()-Date.now();
  if(remaining<=0){remaining=0;document.getElementById('countdown-message').textContent='Our wedding day has arrived! ♡';}
  const seconds=Math.floor(remaining/1000);
  const values={days:Math.floor(seconds/86400),hours:Math.floor(seconds%86400/3600),minutes:Math.floor(seconds%3600/60),seconds:seconds%60};
  Object.entries(values).forEach(([key,value])=>document.getElementById(key).textContent=String(value).padStart(2,'0'));
}
updateCountdown();setInterval(updateCountdown,1000);
const nav=document.getElementById('site-nav');const menuToggle=document.getElementById('menu-toggle');
menuToggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
const calendarTitle=encodeURIComponent('Wedding of Rosh & Jeni');
const calendarDetails=encodeURIComponent('Celebrate with Rosh & Jeni! Ceremony and reception venue/timing to be confirmed.');
document.getElementById('calendar-link').href=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=20270102/20270103&details=${calendarDetails}&ctz=Asia%2FKolkata`;
// Demo guestbook: localStorage is per-browser only, not a shared/public database.
const storageKey='rosh-jeni-wedding-wishes-v1';
function readWishes(){try{const data=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(data)?data:[]}catch{return []}}
function renderWishes(){const list=document.getElementById('wishes-list');list.replaceChildren();readWishes().slice().reverse().forEach(wish=>{const card=document.createElement('article');card.className='wish-item';const name=document.createElement('strong');name.textContent=wish.name;const message=document.createElement('p');message.textContent=wish.message;card.append(name,message);list.append(card);});}
document.getElementById('wish-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const name=form.elements.name.value.trim();const message=form.elements.message.value.trim();if(!name||!message)return;const wishes=readWishes();wishes.push({name:name.slice(0,60),message:message.slice(0,500)});try{localStorage.setItem(storageKey,JSON.stringify(wishes.slice(-100)));form.reset();renderWishes();}catch{alert('Your browser could not save this wish. Please enable local storage.');}});
renderWishes();
document.getElementById('share-button').addEventListener('click',async()=>{const data={title:'Rosh & Jeni Wedding',text:'Join us on 2 January 2027! ♡',url:window.location.href};try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);alert('Invitation link copied!')}else{prompt('Copy your invitation link:',data.url)}}catch(error){if(error.name!=='AbortError')alert('Could not share the invitation.');}});
