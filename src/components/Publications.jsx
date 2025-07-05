import React from "react";


export default function Publications({posts}) {

    return (<>
        {posts.map((post, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-lg space-y-3 max-w-3xl mx-auto mb-6">
                <h3 className="font-bold text-lg text-gray-800">{post.utilisateur?.prenom}</h3>
                <p className="text-gray-700">{post.message}</p>

                {post.photo && (
                    <img src={post.photo} alt="photo" className="w-full rounded-lg"/>
                )}

                {post.video && (
                    <video controls className="w-full rounded-lg">
                        <source src={post.video}/>
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                )}

                <div className="flex justify-between text-gray-500 text-sm pt-2 border-t">
                    <button className="hover:text-pink-500">❤️ J’aime</button>
                    <button className="hover:text-green-600">💬 Commenter</button>
                    <button className="hover:text-purple-500">🔄 Partager</button>
                </div>
            </div>
        ))}
    </>)
}