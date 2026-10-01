'use client';
import {useEffect,useRef,useState} from 'react';
import {Mic,Square} from 'lucide-react';
import {toast} from 'sonner';

type Recognition={lang:string;continuous:boolean;interimResults:boolean;start:()=>void;stop:()=>void;abort:()=>void;onresult:((event:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void)|null;onerror:((event:{error:string})=>void)|null;onend:(()=>void)|null};
type SpeechWindow=Window & {SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};

export function VoiceSearch({onTranscript,enabled=true,label='search'}:{onTranscript:(text:string)=>void;enabled?:boolean;label?:string}){
 const [listening,setListening]=useState(false);
 const recognition=useRef<Recognition|null>(null);
 const callback=useRef(onTranscript);callback.current=onTranscript;
 const cancel=()=>{const current=recognition.current;recognition.current=null;if(current){current.onresult=null;current.onerror=null;current.onend=null;current.abort()}};
 useEffect(()=>()=>cancel(),[]);
 useEffect(()=>{if(!enabled){cancel();setListening(false)}},[enabled]);
 const toggle=()=>{
  if(recognition.current){recognition.current.stop();return}
  const speech=window as SpeechWindow;const Constructor=speech.SpeechRecognition||speech.webkitSpeechRecognition;
  if(!Constructor){toast.error('Voice search is unavailable in this browser. You can still type your search.');return}
  const current=new Constructor();recognition.current=current;current.lang='en-IN';current.continuous=false;current.interimResults=false;
  current.onresult=event=>{const text=Array.from(event.results).map(result=>result[0]?.transcript||'').join(' ').trim();if(text)callback.current(text.slice(0,500))};
  current.onerror=event=>{setListening(false);toast.error(event.error==='not-allowed'||event.error==='service-not-allowed'?'Allow microphone access to use voice search.':event.error==='no-speech'?'No speech heard. Tap the microphone to try again.':event.error==='audio-capture'?'No microphone available. Check your device.':'Voice search could not connect. Try again or type your search.')};
  current.onend=()=>{if(recognition.current===current)recognition.current=null;setListening(false)};
  try{current.start();setListening(true)}catch{cancel();setListening(false);toast.error('Unable to start voice search. Please try again.')}
 };
 return <span className="voice-control"><button type="button" className={'voice-search-button '+(listening?'is-listening':'')} onClick={toggle} aria-label={listening?'Stop listening':`Use microphone for ${label}`} aria-pressed={listening} title={listening?'Stop listening':'Search by voice'}>{listening?<Square size={18} fill="currentColor"/>:<Mic size={20}/>}</button><span className={listening?'voice-status':'sr-only'} role="status">{listening?'Listening…':''}</span></span>
}
