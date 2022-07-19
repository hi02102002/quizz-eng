const Header = () => {
   return (
      <div className="h-header ">
         <div className="flex items-center">
            <div>
               <svg
                  fill="none"
                  id="mode-flashcards-sober"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
               >
                  <path
                     d="M8.57178 13.2785C8.57178 11.9414 9.69104 10.8574 11.0717 10.8574H26.0718C27.4525 10.8574 28.5718 11.9414 28.5718 13.2785V23.8649C28.5718 25.2021 27.4525 26.286 26.0718 26.286H11.0717C9.69104 26.286 8.57178 25.2021 8.57178 23.8649V13.2785Z"
                     fill="#7B89C9"
                  ></path>
                  <path
                     d="M3.42871 8.13541C3.42871 6.7983 4.55438 5.71436 5.94296 5.71436H21.0288C22.4174 5.71436 23.5431 6.7983 23.5431 8.13541V18.7219C23.5431 20.059 22.4174 21.1429 21.0288 21.1429H5.94296C4.55438 21.1429 3.42871 20.059 3.42871 18.7219V8.13541Z"
                     fill="#4257B2"
                  ></path>
               </svg>
               <span>Flashcards</span>
            </div>
         </div>
      </div>
   );
};

export default Header;
