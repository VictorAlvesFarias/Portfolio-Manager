
import Language from '@/entitites/Language';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import {uri} from '../../../env'

export async function POST(req: NextRequest) {
    
    await mongoose.connect(uri);

    const languages = await Language.find({})

    const { name, order, src } = await req.json();

    const similiarLanguage = languages.filter(x => x.order == order)
    
    const p = new Language({
        name: name,
        order: similiarLanguage.length > 0 ? similiarLanguage[0].order : order,
        src: src
    });

    if(similiarLanguage.length > 0) {
        similiarLanguage[0].order = languages.sort((a,b)=> a-b)[languages.length-1].order + 1
        await Language.updateOne(similiarLanguage[0])
    }

    const save = await p.save()
    
    return NextResponse.json(save);
}

export async function DELETE(req: NextRequest) {

    const id = new URL(req.url).searchParams.get("id")

    await mongoose.connect(uri);;

    const language = await Language.findById(id)

    const result = await Language.deleteOne(language)

    return NextResponse.json(result);
}

export async function GET() {

    await mongoose.connect(uri);

    const languages = await Language.find({})

    return NextResponse.json(languages);
}

