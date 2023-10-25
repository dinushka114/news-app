import React from 'react'


const TableHeader = ({ title, content, image, isPublished, updateNews, deleteNews }) => {
    return (
        <thead>
            <tr>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white  text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-3xl"
                >
                    {title}
                </th>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    {content}
                </th>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white  text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    {image}
                </th>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white  text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    {isPublished}
                </th>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    {updateNews}
                </th>
                <th
                    className="px-5 py-5 text-center border-b-2 border-gray-200 bg-white text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-3xl"
                >
                    {deleteNews}
                </th>
            </tr>
        </thead>
    )
}

export default TableHeader