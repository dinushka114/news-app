import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/nav/Navbar";
import ReactHtmlParser from "react-html-parser";
import { API } from "../constants";

async function fetchArticles() {
  const response = await fetch(
    `${API}/api/user/articles`,
    {
      cache: 'no-cache',
    }
  );

  const newsArticles = await response.json();
  return newsArticles;
}

export default async function Home() {

  const newsArticles = await fetchArticles();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-xl font-bold mb-2">Latest news</h1>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            newsArticles.map((news, index) => {
              return (
                <Link href={`/news/${news._id}`}>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image className="w-full" src={`${API}/uploads/` + news.image} width={1920} height={1080} alt={news.image} />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{news.title}</div>
                      <p className="text-gray-700 text-base">
                        {ReactHtmlParser(news.content.substr(0, 30))} <Link href={`/news/${news._id}`} className="text-blue-500">[...]</Link>
                      </p>
                    </div>
                    <div className="px-6 py-4">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Comments - {news.comments.length}</span>
                    </div>
                  </div>
                </Link>
              )
            })
          }

        </div>
      </div>
    </>
  )
}
