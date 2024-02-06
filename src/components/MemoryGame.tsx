'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
const genrateDeck = () => {
	const memoryCard = [
		'https://images.pexels.com/photos/19161136/pexels-photo-19161136/free-photo-of-petra-treasury.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/19800477/pexels-photo-19800477/free-photo-of-man-leading-a-saddled-white-horse-along-a-dirt-road.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/18049017/pexels-photo-18049017/free-photo-of-sunflowers-blooming-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/19983805/pexels-photo-19983805/free-photo-of-musical-prelude.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/20102617/pexels-photo-20102617/free-photo-of-venice.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/20001993/pexels-photo-20001993/free-photo-of-person-walking-on-the-tiger-and-turtle-magic-mountain-art-installation-in-duisburg-germany.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/5829951/pexels-photo-5829951.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
		'https://images.pexels.com/photos/20005477/pexels-photo-20005477/free-photo-of-light.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'
	]

	const deck = [...memoryCard, ...memoryCard]

	return deck.sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
	const [cards, setCards] = useState<string[]>(genrateDeck())

	const [flipped, setFlipped] = useState<number[]>([])

	const [solved, setSolved] = useState<number[]>([])
	useEffect(() => {
		const checkForMatch = () => {
			const [first, second] = flipped

			if (cards[first] === cards[second]) {
				setSolved([...solved, ...flipped])
			}
			setFlipped([])
		}

		if (flipped.length === 2) {
			setTimeout(() => {
				checkForMatch()
			}, 1000)
		}
	}, [cards, flipped, solved])

	const handleClick = (index: number) => {
		if (!flipped.includes(index) && flipped.length < 2) {
			setFlipped([...flipped, index])
		}
	}

	const gameOver = solved.length === cards.length

	const resetGame = () => {
		setSolved([])
		setFlipped([])
		setCards(genrateDeck())
	}

	return (
		<div className="text-center w-[35%] m-auto">
			<h1 className="p-5"> Memory Game </h1>
			{gameOver && <h2 className="p-5"> You Won! Congrats! </h2>}
			<div className="grid grid-cols-4 gap-4 ">
				{cards.map((card, index) => {
					return (
						<div
							onClick={() => {
								handleClick(index)
							}} 
							className={`flex justify-center items-center text-bold text-4xl rounded-md text-black bg-slate-200 w-28 h-28 transform cursor-pointer transition-transform duration-300  ${
								flipped.includes(index) ||
								solved.includes(index)
									? 'rotate-180'
									: ''
							}`}
							key={index}
						>
							{flipped.includes(index) ||
							solved.includes(index) ? (
								<img
									src={card}
									className=" w-28 h-28 rotate-180 rounded-md"
									key={index}
									alt="memorycard"
								/>
							) : (
								'?'
							)}
						</div>
					)
				})}
			</div>
			<button
				onClick={resetGame}
				className=" flex p-4 rounded-md bg-slate-500 mt-5"
			>
				Restart
			</button>
		</div>
	)
}
