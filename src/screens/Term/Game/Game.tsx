import { Button } from '@components';
import { IGame } from '@shared/types';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout';
import GameItem from './GameItem';
import Sidebar from './Sidebar';

interface Props {
   games: Array<IGame>;
   termId: string;
}

const Game = ({ games, termId }: Props) => {
   const [prev, setPrev] = useState<IGame | null>(null);
   const [gamesState, setGamesState] = useState<Array<IGame>>(games);
   const [isStopTimer, setIsStopTimer] = useState<boolean>(false);
   const [disabled, setDisabled] = useState<boolean>(false);
   const [isDone, setIsDone] = useState<boolean>(false);
   const [score, setScore] = useState<number>(0);
   const [bestScore, setBestScore] = useState<number>(0);
   const [isTryAgain, setIsTryAgain] = useState<boolean>(false);

   const check = useCallback(
      (currentGame: IGame) => {
         setDisabled(true);
         const indexPrev = gamesState.findIndex((game) => game.id === prev?.id);
         const indexCurrent = gamesState.findIndex(
            (game) => game.id == currentGame.id
         );
         const gamesStateClone = [...gamesState];
         if (prev?.flashcardId === currentGame.flashcardId) {
            gamesStateClone[indexPrev] = {
               ...gamesStateClone[indexPrev],
               stat: 'CORRECT',
            };
            gamesStateClone[indexCurrent] = {
               ...gamesStateClone[indexCurrent],
               stat: 'CORRECT',
            };
            setGamesState(gamesStateClone);
            setTimeout(() => {
               gamesStateClone[indexPrev] = {
                  ...gamesStateClone[indexPrev],
                  stat: 'DELETED',
               };
               gamesStateClone[indexCurrent] = {
                  ...gamesStateClone[indexCurrent],
                  stat: 'DELETED',
               };
               setPrev(null);
               setDisabled(false);
            }, 500);
         } else {
            gamesStateClone[indexPrev] = {
               ...gamesStateClone[indexPrev],
               stat: 'WRONG',
            };
            gamesStateClone[indexCurrent] = {
               ...gamesStateClone[indexCurrent],
               stat: 'WRONG',
            };
            setGamesState(gamesStateClone);
            setTimeout(() => {
               gamesStateClone[indexPrev] = {
                  ...gamesStateClone[indexPrev],
                  stat: '',
               };
               gamesStateClone[indexCurrent] = {
                  ...gamesStateClone[indexCurrent],
                  stat: '',
               };
               setPrev(null);
               setDisabled(false);
            }, 500);
         }
      },
      [gamesState, prev]
   );

   const handleClick = useCallback(
      (currentGame: IGame) => {
         if (prev === null) {
            setPrev(currentGame);
         } else {
            if (prev.id === currentGame.id) {
               setPrev(null);
            } else {
               check(currentGame);
            }
         }
      },
      [check, prev]
   );

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
      if (gamesState.every((game) => game.stat === 'DELETED')) {
         setIsStopTimer(true);
         setIsDone(true);
      }
   });

   useEffect(() => {
      setBestScore(JSON.parse(localStorage.getItem('best-score') as string));
   }, []);

   const handleTryAgain = () => {
      setGamesState((games) => {
         return games
            .sort(() => Math.random() - 0.5)
            .map((game) => {
               return {
                  ...game,
                  stat: '',
               };
            });
      });
      setScore(0);
      setIsDone(false);
      setIsTryAgain(true);
      setIsStopTimer(false);
   };

   useEffect(() => {
      let timer: NodeJS.Timer;
      if (isTryAgain) {
         timer = setTimeout(() => {
            setIsTryAgain(false);
         }, 500);
      }

      return () => {
         timer && clearTimeout(timer);
      };
   }, [isTryAgain]);

   useEffect(() => {
      if (isDone && score < bestScore) {
         setBestScore(score);
      }
   }, [isDone, score, bestScore]);

   return (
      <Layout
         icon={
            <svg
               fill="none"
               id="mode-gravity-sober"
               viewBox="0 0 32 32"
               xmlns="http://www.w3.org/2000/svg"
               className="w-8 h-8"
            >
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0337 23.7818C12.3731 23.2491 12.0619 22.3943 12.2256 21.5615L13.5132 15.0119C13.6676 14.2263 14.2219 13.5787 14.9742 13.3049L21.3775 10.9743C22.1298 10.7005 22.9706 10.8402 23.5939 11.3428L28.7903 15.5325C29.3993 16.0235 29.7149 16.7919 29.6268 17.5692L28.908 23.9119C28.8104 24.7735 28.2335 25.5058 27.4186 25.8024L20.4465 28.34C19.6942 28.6138 18.8534 28.474 18.2301 27.9715L13.0337 23.7818Z"
                  fill="#4257B2"
               ></path>
               <path
                  d="M2.52619 11.267C1.91446 10.6788 1.679 9.80004 1.91466 8.98475L2.84141 5.7785C3.06374 5.00934 3.6723 4.41258 4.44565 4.20536L7.73667 3.32354C8.51003 3.11631 9.33544 3.32884 9.91255 3.88379L12.3183 6.19711C12.8822 6.73936 13.1296 7.53233 12.9741 8.29902L12.3397 11.4269C12.1673 12.2768 11.5288 12.956 10.6912 13.1804L7.10779 14.1406C6.33443 14.3478 5.50903 14.1353 4.93191 13.5803L2.52619 11.267Z"
                  fill="#7B89C9"
               ></path>
            </svg>
         }
         name="Game"
         termId={termId}
      >
         <div className="flex gap-4 md:flex-row flex-col">
            <Sidebar
               isStop={isStopTimer}
               getScore={(value) => {
                  setScore(value);
               }}
               bestTime={bestScore}
               isTryAgain={isTryAgain}
            />
            <div className="flex-1 h-[calc(100vh_-_63px_-_80px)]">
               {isDone ? (
                  <div className="flex items-center justify-center h-full w-full flex-col">
                     <h3 className="text-3xl font-bold">
                        Congratulations. Your score of{' '}
                        {('0' + Math.floor((score / 60000) % 60)).slice(-2)}:
                        {('0' + Math.floor((score / 1000) % 60)).slice(-2)} 📣📣
                     </h3>
                     <Button
                        typeBtn="primary"
                        className="mt-6 !px-5 !py-3"
                        onClick={handleTryAgain}
                     >
                        Try again
                     </Button>
                  </div>
               ) : (
                  <div className="h-full w-full">
                     <ul className="grid grid-cols-3 gap-4">
                        {gamesState.map((game) => {
                           return (
                              <li key={game.id}>
                                 <GameItem
                                    game={game}
                                    onClick={handleClick}
                                    isChoose={prev?.id === game.id}
                                    disabled={disabled}
                                 />
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               )}
            </div>
         </div>
      </Layout>
   );
};

export default Game;
