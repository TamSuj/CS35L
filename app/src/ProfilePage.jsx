import React, {useState} from "react"
import headshot from './assets/notion-face.png'

const ProfilePage = () => {
    const [follower, setFollower] = useState(0)

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <div className="flex items-center space-x-6">
                    {/*<div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div>*/}
                    <img className="w-24 h-24 rounded-full " src={headshot} alt="Profile"/>
                    <div className="flex-1">
                        <div className="flex mb-2">
                            <h2 className="text-2xl font-semibold text-gray-800">Sarah Parker</h2>
                            <button className="bg-gray-700 text-white text-md px-3 py-1 ml-3 rounded-full"
                                    onClick={() => setFollower((follower) => follower + 1)}>+ Follow
                            </button>
                        </div>
                        <p className="text-gray-600">Computer Science Student @ UCLA</p>
                        <p className="text-gray-600">Specializing in AI/ML + Full Stack Development</p>
                        <div className="flex space-x-2 mt-2">
                            <span
                                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">Computer Science</span>
                            <span
                                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">Machine Learning</span>
                            <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">Python</span>
                            <span
                                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">Data Structures</span>
                        </div>

                    </div>
                    <div className="text-right">
                        <p className="text-gray-700"><strong>245</strong> Notes</p>
                        <p className="text-gray-700"><strong>{follower}</strong> Followers</p>
                        <p className="text-gray-700"><strong>890</strong> Following</p>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="flex space-x-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🏆 Top Contributor</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🔥 Study Streak: 30 days</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🤝 Community Moderator</div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-gray-800 text-2xl">📄</div>
                        <p className="mt-2 font-semibold text-gray-800">Advanced Algorithm Analysis</p>
                        <p className="text-gray-600 text-sm">March 15, 2025</p>
                        <div className="flex space-x-2 mt-2 text-gray-600 text-sm">
                            <span>❤️ 24</span>
                            <span>💬 8</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-gray-800 text-2xl">📄</div>
                        <p className="mt-2 font-semibold text-gray-800">Neural Networks Basics</p>
                        <p className="text-gray-600 text-sm">March 12, 2025</p>
                        <div className="flex space-x-2 mt-2 text-gray-600 text-sm">
                            <span>❤️ 56</span>
                            <span>💬 12</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-gray-800 text-2xl">📄</div>
                        <p className="mt-2 font-semibold text-gray-800">Database Systems Design</p>
                        <p className="text-gray-600 text-sm">March 10, 2025</p>
                        <div className="flex space-x-2 mt-2 text-gray-600 text-sm">
                            <span>❤️ 32</span>
                            <span>💬 5</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;