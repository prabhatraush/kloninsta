import React from 'react'

function SendIcon() {
    return (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="sendicon" clipPath="url(#clip0)">
        <g id="button" filter="url(#filter0_d)">
        <path d="M70 35.2572L5 5L18 35.2572H47.886L18 43L5 70L70 35.2572Z" fill="#006EFF"/>
        </g>
        </g>
        <defs>
        <filter id="filter0_d" x="-5" y="-1" width="85" height="85" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <clipPath id="clip0">
        <rect width="70" height="70" fill="white"/>
        </clipPath>
        </defs>
        </svg>

    )
}

export { SendIcon }
