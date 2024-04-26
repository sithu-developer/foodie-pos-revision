// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/util/db';
import { Company } from '@prisma/client';
import { qrCodeUploadFunction, qrIamgeLink } from '@/util/fileUploadedFunction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "GET") {
      const email = session.user?.email as string;
      const exisedUser = await prisma.user.findFirst({where : { email }})
      if(!exisedUser) {
        const newUser = await prisma.user.create({ data : { email }});
        const defaultCompanyNames = {
          name : "Dragon Food",
          street : "3 * 73 street",
          township : "Aung Myae Thar Zan",
          city : "Mandalay"
        };
        const newCompany = await prisma.company.create({ data : { name : defaultCompanyNames.name , street : defaultCompanyNames.street , township : defaultCompanyNames.township , city : defaultCompanyNames.city , userId : newUser.id }});
        const defaultLocationNames = {
          name : "Ah Wa Sarr",
          street : "3 * 73 street",
          township : "Aung Myae Thar Zan",
          city : "Mandalay"
        };
        const newLocation = await prisma.location.create({ data : { name : defaultLocationNames.name , street : defaultLocationNames.street , township : defaultLocationNames.township , city : defaultLocationNames.city , companyId : newCompany.id }});
        const newMenuCategory = await prisma.menuCategory.create({ data : { name : "Default Menu Category" , companyId : newCompany.id }});
        const newMenu = await prisma.menu.create({ data : { name : "Default Menu" , detail : "menu details" }});
        const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({ data : { menuCategoryId : newMenuCategory.id , menuId : newMenu.id }});
        const newAddonCategory = await prisma.addonCategory.create({ data : { name : "Default Addon Category" , optional : false}});
        const newMenuAddonCategory = await prisma.menuAddonCategory.create({ data : { menuId : newMenu.id , addonCategoryId : newAddonCategory.id}})
        const addons = [
          {name : "Default Addon 1"},
          {name : "Default Addon 2"},
          {name : "Default Addon 3"},
        ];
        const newAddons = await prisma.$transaction( addons.map(item => prisma.addon.create({ data : { name : item.name , addonCategoryId : newAddonCategory.id}})))
        const newTable = await prisma.table.create({ data : {name : "01" , locationId : newLocation.id }})
        await qrCodeUploadFunction(newLocation.id , newTable.id );
        const assetUrl = qrIamgeLink(newLocation.id , newTable.id);
        const newUpdatedTable = await prisma.table.update({ where : { id : newTable.id} , data : { assetUrl }})
        return res.status(200).json({
          user : newUser,
          company : newCompany , 
          locations : [newLocation],
          disabledLocationMenuCategories : [],
          menuCategories : [newMenuCategory] ,
          menus : [newMenu],
          menuCategoryMenus : [newMenuCategoryMenu],
          addonCategories : [newAddonCategory],
          menuAddonCategories : [newMenuAddonCategory],
          addons : newAddons,
          tables : [newUpdatedTable]
        })
      } else {
        const company = await prisma.company.findFirst({ where : { userId : exisedUser.id  , isArchived : false }}) as Company;
        const locations = await prisma.location.findMany({ where : { companyId : company.id  }});
        const locationIds = locations.map(item => item.id);
        const disabledLocationMenuCategories = await prisma.disabledLocationMenuCategory.findMany({ where : { locationId : { in : locationIds } , isArchived : false }});
        const menuCategories = await prisma.menuCategory.findMany({ where : { companyId : company.id } , orderBy : { id : "asc"}});
        const menuCategoryIds = menuCategories.map(item => item.id);
        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({ where : { menuCategoryId : { in : menuCategoryIds }}})
        const menuIds = menuCategoryMenus.map(item => item.menuId);
        const menus = await prisma.menu.findMany({ where : { id : { in : menuIds } }})
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({ where : { menuId : { in : menuIds } }});
        const addonCategoryIds = menuAddonCategories.map(item => item.addonCategoryId);
        const addonCategories = await prisma.addonCategory.findMany({ where : { id : { in : addonCategoryIds } }});
        const addons = await prisma.addon.findMany({ where : { addonCategoryId : { in : addonCategoryIds } }});
        const tables = await prisma.table.findMany({ where : { locationId : { in : locationIds }}});
        return res.status(200).json({
          user : exisedUser ,
          company  , 
          locations ,
          disabledLocationMenuCategories ,
          menuCategories  ,
          menus ,
          menuCategoryMenus, 
          addonCategories,
          menuAddonCategories ,
          addons ,
          tables 
        })
      }

    }
  res.status(405).send("Method is not allowed")
}
