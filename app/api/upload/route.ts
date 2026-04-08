import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request){

  const data = await req.formData();
  const file = data.get("file") as File;

  if(!file){
    return Response.json({success:false});
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(),"public/uploads",file.name);

  await writeFile(filePath,buffer);

  return Response.json({
    success:true,
    path:`/uploads/${file.name}`
  });

}