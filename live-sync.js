/* NykirkeMesterskapet – valgfri Supabase-synk. Ingen passord lagres i kildekoden. */
(()=>{'use strict';
 const cfg=window.JUG_LIVE_CONFIG||{},active=!!(cfg.url&&cfg.anonKey),status=document.createElement('div');
 let client=null, auth=false, ready=false, rev=0, lastState='', inFlight=Promise.resolve(), initialLoaded=false;
 const box=document.createElement('div');box.id='jug-live-bar';
 const msg=(t,bad=false)=>{status.textContent=t;status.style.color=bad?'#ffaaa9':'#9deacb'};
 const getState=()=>window.JUG_LIVE_BRIDGE?.get();
 const setState=(s)=>window.JUG_LIVE_BRIDGE?.set(s);
 function ui(){box.innerHTML=`<span id="jug-live-status"></span>${active?'<button id="jug-live-login">Administrator: logg inn</button><button id="jug-live-logout" hidden>Logg ut</button><button id="jug-live-seed" hidden>Publiser lokale testdata</button>':''}`;box.prepend(status);box.querySelector('#jug-live-status')?.remove();document.body.appendChild(box)}
 const headers=()=>({'apikey':cfg.anonKey});
 async function read(){const {data,error}=await client.from('jug_event_state').select('revision,payload').eq('event_id',cfg.eventId).maybeSingle();if(error)throw error;return data}
 async function receive(){if(!active||!ready)return;try{const row=await read();if(!row){msg('Live-database er tom. Logg inn som administrator for å starte.');return}if(row.revision<rev)return;
 const raw=JSON.stringify(row.payload);if(row.revision===rev&&raw===lastState)return;
 rev=row.revision;lastState=raw;setState(row.payload);msg('● LIVE · Oppdatert fra felles database');}
 catch(e){msg('Synkronisering feilet: '+e.message,true)}}
 async function publish(snapshot){if(!active||!ready)return;inFlight=inFlight.then(async()=>{
  if(!auth){msg('Kun lokal endring – logg inn som administrator for å publisere',true);return}
  const {data,error}=await client.rpc('jug_save_event',{p_event_id:cfg.eventId,p_expected_revision:rev,p_payload:snapshot});
  if(error){msg('Ikke publisert: '+error.message+' · Kopier backup før ny handling',true);alert('Lagring til live-database feilet. Ikke fortsett før dette er avklart. '+error.message);return}
  rev=data;lastState=JSON.stringify(snapshot);msg('● LIVE · Resultat publisert');
 }).catch(e=>msg('Synkfeil: '+e.message,true));return inFlight}
 window.JUG_LIVE={enabled:active,isAdmin:()=>!active||auth,onLocalSave:s=>publish(JSON.parse(JSON.stringify(s)))};
 ui();if(!active){msg('● Lokal modus · Live-database ikke konfigurert');return}
 function setAuth(on){auth=on;box.querySelector('#jug-live-login').hidden=on;box.querySelector('#jug-live-logout').hidden=!on;box.querySelector('#jug-live-seed').hidden=!on;msg(on?'● LIVE · Administrator pålogget':'● LIVE · Kun lesetilgang')}
 box.querySelector('#jug-live-login').onclick=async()=>{const email=prompt('Administratorens e-postadresse:');if(!email)return;const password=prompt('Passord (brukes kun til innlogging):');if(!password)return;const {error}=await client.auth.signInWithPassword({email,password});if(error)alert('Innlogging feilet: '+error.message)};
 box.querySelector('#jug-live-logout').onclick=()=>client.auth.signOut();
 box.querySelector('#jug-live-seed').onclick=async()=>{if(!confirm('Publisere DENNE nettleserens lokale turnering til felles database? Dette må bare gjøres én gang, før andre bruker databasen.'))return;const {data,error}=await client.rpc('jug_create_event',{p_event_id:cfg.eventId,p_payload:getState()});if(error){alert('Kan ikke opprette live-turnering: '+error.message);return}await receive();msg('● LIVE · Turneringen er publisert')};
 async function start(){if(!window.supabase?.createClient){msg('Supabase-biblioteket ble ikke lastet. Kontroller internett.',true);return}
 client=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true}});
 client.auth.onAuthStateChange((_event,session)=>setAuth(!!session?.user));
 const {data}=await client.auth.getSession();setAuth(!!data.session?.user);ready=true;initialLoaded=true;
 await receive();client.channel('jug-event-'+cfg.eventId).on('postgres_changes',{event:'*',schema:'public',table:'jug_event_state',filter:'event_id=eq.'+cfg.eventId},()=>receive()).subscribe();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)receive()});setInterval(()=>{if(!document.hidden)receive()},5000);
 }
 // Starter etter at app.js har koblet til staten.
 window.addEventListener('load',start);
 // I live-modus skal kun pålogget administrator få endre turneringen.
 const mutating=new Set(['draw','place','tieChoice','tieChoice40','saveName','updatePlayers','reset','import']);
 document.addEventListener('click',e=>{if(!ready||auth)return;const b=e.target.closest('[data-action]');if(b&&mutating.has(b.dataset.action)){e.preventDefault();e.stopImmediatePropagation();alert('Live-turneringen er skrivebeskyttet. Logg inn som administrator for å endre resultater.')}},true);
 document.addEventListener('change',e=>{if(!ready||auth)return;if(e.target.dataset.action==='finalpos'||e.target.id==='importFile'){e.preventDefault();e.stopImmediatePropagation();alert('Logg inn som administrator for å endre resultater.')}},true);
})();
