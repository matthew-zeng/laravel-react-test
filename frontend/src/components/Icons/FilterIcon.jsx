import React from 'react'

export default function FilterIcon({
  className = 'text-white',
  size = 22
}) {
  return (
    <svg className={className} width={size} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2804_1678)">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.3125 1.33377C21.3125 0.720123 20.7995 0.222656 20.1667 0.222656H1.83333C1.20049 0.222656 0.6875 0.720123 0.6875 1.33377C0.6875 1.94741 1.20049 2.44488 1.83333 2.44488H20.1667C20.7995 2.44488 21.3125 1.94741 21.3125 1.33377ZM21.3125 8.00044C21.3125 7.38677 20.7995 6.88932 20.1667 6.88932H8.70833C8.07549 6.88932 7.5625 7.38677 7.5625 8.00044C7.5625 8.6141 8.07549 9.11155 8.70833 9.11155H20.1667C20.7995 9.11155 21.3125 8.6141 21.3125 8.00044ZM21.3125 14.6671C21.3125 14.0534 20.7995 13.556 20.1667 13.556H14.4375C13.8047 13.556 13.2917 14.0534 13.2917 14.6671C13.2917 15.2808 13.8047 15.7782 14.4375 15.7782H20.1667C20.7995 15.7782 21.3125 15.2808 21.3125 14.6671Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_2804_1678">
          <rect width="22" height="16" fill="currentColor" transform="matrix(-1 0 0 1 22 0)"/>
        </clipPath>
      </defs>
    </svg>
  )
}
