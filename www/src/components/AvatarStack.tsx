import {getCoinByAddr } from "../util/acceptedCoins"

type AvatarStackProps = {
    coins: Array<string>
}

const AvatarStack = (props: AvatarStackProps) => {

    const displayCoins = () => {
      return props.coins.map((coin) => (
        <img
            alt=""
            src={getCoinByAddr(coin)?.img}
            className="inline-block h-6 w-6 rounded-full  ring-white"
          />
       )) 
    }

    return (
      <>
        <div className="flex -space-x-2">
          {displayCoins()}
        </div>
      </>
    )
  }
  
  export default AvatarStack