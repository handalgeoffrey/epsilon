import { readData, writeData } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function GET() {
    const videos = readData('course-videos');
    return NextResponse.json(videos);
}

export async function POST(request) {
    const data = await request.json();
    const videos = readData('course-videos');

    if (data.action === 'create') {
        // Here we expect just a simple add, similar to videos
        // But the user might want to SYNC for this too? 
        // For now, let's assume we reuse the manual add or we can also implement sync if needed.
        // Let's support simple manual add for now as it's separate from the 'YouTube Integration' page.

        const newVideo = { ...data.video, id: Date.now().toString() };
        videos.unshift(newVideo);
        writeData('course-videos', videos);
        return NextResponse.json({ success: true, video: newVideo });
    }

    if (data.action === 'delete') {
        const updatedVideos = videos.filter(video => video.id !== data.id);
        writeData('course-videos', updatedVideos);
        return NextResponse.json({ success: true });
    }

    // Reuse Sync Logic? The user said "controlled from the courses", so maybe they want to sync there too?
    // I'll add the sync logic just in case, reusing the same YouTube API params if they are global, 
    // or we might need separate config. For simplicity, let's assume they might stick to one channel.
    if (data.action === 'sync') {
        writeData('course-videos', data.videos);
        return NextResponse.json({ success: true, count: data.videos.length });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' });
}
