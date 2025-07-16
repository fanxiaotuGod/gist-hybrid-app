"use client";
import dynamic from 'next/dynamic';

const NewsCard = dynamic(
    () => import('ui').then((mod) => mod.NewsCard),
    { ssr: false }
);

export default function Home() {
    return <NewsCard />;
}