/* eslint-disable @next/next/no-img-element */
import { IGame } from '@shared/types';

interface Props {
   game: IGame;
   onClick: (game: IGame) => void;
   isChoose: boolean;
   disabled: boolean;
}

const GameItem = ({ game, onClick, isChoose, disabled }: Props) => {
   if (game.stat === 'DELETED') {
      return <div className="aspect-[2.5]"></div>;
   }

   return (
      <div
         className={`min-h-[120px] bg-white rounded flex items-center justify-center p-4 text-center h-full relative cursor-pointer transition-all shadow ${
            isChoose ? 'bg-[#ffcd1f3f] border-[2px] border-[#ffcd1f]' : ''
         } ${
            game.stat === 'WRONG'
               ? 'bg-red-400/40 border-[2px] border-red-400'
               : ''
         } ${
            game.stat === 'CORRECT'
               ? 'bg-green-400/40 border-[2px] border-green-400'
               : ''
         }`}
         onClick={() => {
            if (disabled) {
               return;
            }
            onClick(game);
         }}
      >
         <div>
            <span
               style={{
                  color: game.imgUrl ? 'white' : undefined,
               }}
               className="relative z-10"
            >
               {game.name}
            </span>
            {game.imgUrl && (
               <img
                  src={game.imgUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain opacity-70"
               />
            )}
         </div>
      </div>
   );
};

export default GameItem;
