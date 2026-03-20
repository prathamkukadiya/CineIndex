import React from 'react'

const ReleaseInfo = ({status, formattedDate}) => {
  return (
    <div className="py-4 border-y border-white/5 flex flex-wrap gap-x-12 gap-y-4">
      <div className="space-y-1">
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Status</p>
        <p className="text-lg font-bold text-white/90">{status}</p>
      </div>
      <div className="space-y-1">
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Release Date</p>
        <p className="text-lg font-bold text-white/90">{formattedDate}</p>
      </div>
    </div>
  )
}

export default ReleaseInfo;