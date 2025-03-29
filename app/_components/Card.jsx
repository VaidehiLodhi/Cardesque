"use client"

import Image from "next/image"
import { forwardRef } from "react"

export const Card = forwardRef(({
    cardId, id, frontSrc, backSrc, frontAlt, backAlt 
}, ref)=> {
    return (
        <div className="card" ref={ref}>
            <div className="card-wrapper">
                {/*animations*/}
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <Image
                        priority
                        src={frontSrc}
                        alt={frontAlt}
                        width={500}
                        height={500}
                        />
                    </div>
                    <div className="flip-card-back">
                        <Image
                        priority
                        src={backSrc}
                        alt={backAlt}
                        width={500}
                        height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
});