import { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Searchbar = ({ searchTerm, setSearchTerm, placeholder }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // set searchTerm to transcript when listening stops and microphone was clicked
  useEffect(() => {
    if (transcript && listening) {
      setSearchTerm(transcript);
    }
  }, [transcript, listening, setSearchTerm]);

  //Cleanup when listening stoppt
  useEffect(() => {
    return () => {
      if (listening) {
        SpeechRecognition.stopListening();
      }
    };
  }, [listening]);

  // Check for browser support of speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="flex justify-center items-center  mx-auto my-4 ">
      <label className="input input-lg rounded-lg input-bordered ring-1 ring-gray-100 ring-inset glass hover:ring-2 hover:ring-gray-100  ">
        <svg
          className="h-[1em] opacity-50 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder={placeholder || "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {listening ?
          <FaMicrophoneSlash
            onClick={() => {
              SpeechRecognition.stopListening();
              resetTranscript();
            }}
            className="cursor-pointer text-secondary animate-pulse  text-xl"
            title="Click to stop listening"
          />
        : <FaMicrophone
            onClick={() => {
              resetTranscript();
              SpeechRecognition.startListening();
            }}
            className="cursor-pointer text-white text-xl"
            title="Click to start listening"
          />
        }
      </label>
    </div>
  );
};
export default Searchbar;
