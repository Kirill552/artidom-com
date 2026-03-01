import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');

export async function GET() {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const articles = JSON.parse(fileData);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newArticle = await request.json();
    
    // Read existing
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const articles = JSON.parse(fileData);
    
    // Add new article at the beginning
    newArticle.date = new Date().toISOString();
    articles.unshift(newArticle);
    
    // Save
    await fs.writeFile(dataFilePath, JSON.stringify(articles, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, article: newArticle }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}
