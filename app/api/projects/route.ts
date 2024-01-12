
import Project from '@/entitites/project';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const uri: any = process.env.MONGODB_URI ? process.env.MONGODB_URI :

export async function POST(req: NextRequest) {
    await mongoose.connect(uri);

    const projects = await Project.find({})

    const { name, order, description, img } = await req.json();

    const similiarproject = projects.filter(x => x.order == order)
    
    const p = new Project({
        name: name,
        order: similiarproject.length > 0 ? similiarproject[0].order : order,
        src: "ok",
        description: description
    });

    if(similiarproject.length > 0) {
        similiarproject[0].order = projects.sort((a,b)=> a-b)[projects.length-1].order + 1
        console.log(similiarproject[0] )
        await Project.updateOne(similiarproject[0])
    }

    const save = await p.save()

    return NextResponse.json(save);
}

export async function DELETE(req: NextRequest) {

    const id = new URL(req.url).searchParams.get("id")

    await mongoose.connect(uri);;

    const project = await Project.findById(id)

    const result = await project.deleteOne(project)

    return NextResponse.json(result);
}

export async function GET() {
    console.log(2)
    await mongoose.connect(uri);

    const projects = await Project.find({})

    return NextResponse.json(projects);
}

