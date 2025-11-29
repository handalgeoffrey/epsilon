import { readData, writeData } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function GET() {
    const courses = readData('courses');
    return NextResponse.json(courses);
}

export async function POST(request) {
    const data = await request.json();
    const courses = readData('courses');

    if (data.action === 'create') {
        const newCourse = { ...data.course, id: Date.now() };
        courses.push(newCourse);
        writeData('courses', courses);
        return NextResponse.json({ success: true, course: newCourse });
    }

    if (data.action === 'update') {
        const index = courses.findIndex(c => c.id === data.course.id);
        if (index !== -1) {
            courses[index] = data.course;
            writeData('courses', courses);
            return NextResponse.json({ success: true, course: courses[index] });
        }
    }

    if (data.action === 'delete') {
        const filtered = courses.filter(c => c.id !== data.id);
        writeData('courses', filtered);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' });
}
