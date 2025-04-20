import configPromise from '@payload-config';
import { getPayload } from "payload";
 

export default async function Home(){
  const payload=await getPayload({
    config:configPromise
  })

  const data=await payload.find({
    collection:"categories",
    depth:1,//populate sub categoires
    where:{
      parent:{
        exists:false
      }
    }
  })
  console.log("data   ",data)
  return(
    <div >
   {/* {JSON.stringify(data,null,2)} */}
    </div>
  )
}