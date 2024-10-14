'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function NotFound() {
    const router = useRouter()
  return (
  <div className=' h-screen flex flex-col justify-center items-center'>
    <title>Page Not Found</title>
    <meta name='description' content='Page is not found' />
      <h1 className=' macan font-[700] text-3xl'>Not found {`–`} 404!</h1>
      <Image src={'/noProducts.png'} alt='not found' width={350} height={200} />
      <button className=' w-[150px] pt-2 pb-2 flex justify-center items-center macan font-[500] border-[1px] border-transparent rounded-xl bg-[#013A12] text-white'  onClick={()=>{router.push('/Home')}}>Go Home</button>
  </div>)
}