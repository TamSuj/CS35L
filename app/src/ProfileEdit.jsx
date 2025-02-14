import React from "react";

const ProfileEdit = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">

                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium">Name</label>
                            <input type="text" id="name"
                                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="John Doe" required/>
                        </div>
                        <div>
                            <label htmlFor="school"
                                   className="block mb-2 text-sm font-medium">School</label>
                            <input type="text" id="school"
                                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="UCLA" required/>
                        </div>
                        <div>
                            <label htmlFor="major"
                                   className="block mb-2 text-sm font-medium">Major</label>
                            <input type="text" id="major"
                                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="Computer Science"/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium">Bio</label>
                        <input type="text" id="bio"
                               className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="Aspiring coffee-fueled scholar"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email
                            address</label>
                        <input type="email" id="email"
                               className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="john.doe@ucla.edu" required/>
                    </div>
                    {/*<div className="mb-6">*/}
                    {/*    <label htmlFor="password"*/}
                    {/*           className="block mb-2 text-sm font-medium">Password</label>*/}
                    {/*    <input type="password" id="password"*/}
                    {/*           className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"*/}
                    {/*           placeholder="•••••••••" required/>*/}
                    {/*</div>*/}
                    {/*<div className="mb-6">*/}
                    {/*    <label htmlFor="confirm_password"*/}
                    {/*           className="block mb-2 text-sm font-medium">Confirm*/}
                    {/*        password</label>*/}
                    {/*    <input type="password" id="confirm_password"*/}
                    {/*           className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"*/}
                    {/*           placeholder="•••••••••" required/>*/}
                    {/*</div>*/}
                    <button type="submit"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save
                    </button>
                </form>
            </section>
        </div>
    );
}

export default ProfileEdit;