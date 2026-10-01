'use client';
import {useEffect,useRef,useState} from 'react';
import {Mic,Square} from 'lucide-react';
import {toast} from 'sonner';
export function VoiceNote({onRecorded,enabled}:{onRecorded:(audio:string)=>void;enabled:boolean}){
 const [recording,setRecording]=useState(false);const recorder=useRef<MediaRecorder|null>(null);const stream=useRef<MediaStream|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const session=useRef(0);const alive=useRef(true);
 const release=()=>{stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;if(timer.current)clearTimeout(timer.current)};
 const cancel=()=>{session.current++;if(recorder.current&&recorder.current.state!=='inactive')recorder.current.stop();recorder.current=null;release()};
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;cancel()}},[]);
 useEffect(()=>{if(!enabled){cancel();setRecording(false)}},[enabled]);
 const start=async()=>{if(recording){recorder.current?.stop();return}if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){toast.error('Voice notes are unavailable in this browser.');return}const token=++session.current;try{const media=await navigator.mediaDevices.getUserMedia({audio:true});if(!alive.current||token!==session.current){media.getTracks().forEach(t=>t.stop());return}stream.current=media;const r=new MediaRecorder(media);recorder.current=r;const chunks:BlobPart[]=[];r.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};r.onstop=()=>{release();if(!alive.current||token!==session.current)return;setRecording(false);const blob=new Blob(chunks,{type:r.mimeType});if(!blob.size)return;const reader=new FileReader();reader.onload=()=>{if(alive.current&&token===session.current)onRecorded(String(reader.result))};reader.readAsDataURL(blob)};r.onerror=()=>{cancel();if(alive.current)setRecording(false);toast.error('Recording failed. Please try again.')};r.start();setRecording(true);timer.current=setTimeout(()=>{if(r.state==='recording')r.stop()},90000)}catch{release();if(alive.current)setRecording(false);toast.error('Allow microphone access to record a voice note.')}};
 return <button type="button" className="voice-note-record" onClick={start} aria-pressed={recording}>{recording?<Square size={18}/>:<Mic size={18}/>} {recording?'Stop recording':'Record voice note'}</button>
}
