import configPromise from '@payload-config';
import { getPayload } from "payload";
 


import { Footer } from "./footer";
import { Navbar } from "./Navbar";
import SearchFilters from "./search-filters";
import { Category } from '@/payload-types';

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
     const payload=await getPayload({
        config:configPromise
      })
      const data=await payload.find({
        collection:"categories",
        pagination:false,
        depth:1,//populate subcategoires, SubCategories.[0] will be a type of "Catefory"
        where:{
          parent:{
            exists:false
          }
        }
      })

    //   
    const formattedData=data.docs.map((doc)=>({ 
        ...doc,
        subcategories:(doc.subcategories ?.docs ?? []).map((doc)=>({
        //  Because of 'depth :1' we are confident "doc" will be a type of Catefory  
            ...(doc as Category),
            subcategories:undefined
        }))
    }))

    // console.log(data," - ",formattedData)
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <SearchFilters data={formattedData}/>
           <div className="flex-1 bg-[#F4F4F4]">
           {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
