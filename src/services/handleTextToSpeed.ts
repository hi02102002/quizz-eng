export const handleTextToSpeed = (text: string) => {
   const synth = window.speechSynthesis;
   synth.cancel();
   const utterance1 = new SpeechSynthesisUtterance(text);
   synth.speak(utterance1);
};
