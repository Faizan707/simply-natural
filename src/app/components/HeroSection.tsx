import React from 'react'
import { Button } from '@/components/ui/button'
function HeroSection() {
  return (
<div className="bg-[url('https://websitedemos.net/plant-store-02/wp-content/uploads/sites/410/2020/07/hero-bg.jpg')] bg-cover bg-center w-full h-[600px] bg-green-200 border rounded-bl-[80px] rounded-br-[80px] ">
    <div className='p-[130px]'>
        <p className='text-[20px]'>Best Quality Plants</p>
        <div className='w-[500px] text-start text-[60px]'>
            <h2>Amazing Variety Of Plants Starting Just $6</h2>
        </div>
        <Button  variant="custom" className=' px-[60px] py-6 border rounded-[30px] mt-5 text-white' >Shop now</Button>
    </div>
</div>
  )
}

export default HeroSection