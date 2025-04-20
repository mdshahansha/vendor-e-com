import configPromise from '@payload-config'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { getPayload } from "payload";
 

export default async function Home(){
  const payload=await getPayload({
    config:configPromise
  })

  const data=await payload.find({
    collection:"categories"
  })
  return(
    <div >
   {JSON.stringify(data,null,2)}
    </div>
  )
}