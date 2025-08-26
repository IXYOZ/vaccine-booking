'use client'

import { useEffect, useState } from "react"


export default function OTP({ onVerify }: {onVerify : (otp:string) => void}){
    const [otp, setOtp] = useState('')



    return (
        <div className="flex flex-col py-2 text-center justify-center ">
            <div>
            <input 
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-l px-0.5 py-2 text-center border border-white"
                required
            />
            </div>
            <div className="py-2">
            <button onClick={() => onVerify(otp)} className="bg-green-600 text-white px-2 py-1 rounded">Verify</button>
            </div>
        </div>
    )
}