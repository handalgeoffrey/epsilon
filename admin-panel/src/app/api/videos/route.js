import { readData, writeData } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function GET() {
    const videos = readData('videos');
    return NextResponse.json(videos);
}

export async function POST(request) {
    const data = await request.json();
    const videos = readData('videos');

    if (data.action === 'create') {
        const newVideo = { ...data.video, id: Date.now().toString() };
        videos.unshift(newVideo); // Add to top
        writeData('videos', videos);
        return NextResponse.json({ success: true, video: newVideo });
    }

    if (data.action === 'delete') {
        const filtered = videos.filter(v => v.id !== data.id);
        writeData('videos', filtered);
        return NextResponse.json({ success: true });
    }

    // Bulk sync/replace
    if (data.action === 'sync') {
        // Assuming data.videos is the full list of synced videos
        writeData('videos', data.videos);
        return NextResponse.json({ success: true, videos: data.videos });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' });
}
