import type { CollectionConfig } from 'payload'

export const Categories:CollectionConfig={
    slug:'categories',
    // access:{
    //     create:({req})=>req.user.isAdmin,
    //     update:()=>false,
    // },
    fields:[
        {
            name:"name",
            type:"text",
            required:true
        }
    ]
}