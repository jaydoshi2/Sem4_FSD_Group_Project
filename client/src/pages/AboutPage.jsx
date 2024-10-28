import React from "react";
import WP1 from '../assets/images/sampleprofile.png';

const TeamCards = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Jay Doshi",
            position: "Member 1",
            img: WP1,
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 2,
            name: "Archan Patel",
            position: "Member 2",
            img: WP1,
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 3,
            name: "JAY PANDYA",
            position: "Member 3",
            img: WP1,
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 4,
            name: "Kavya Trivedi",
            position: "Member 4",
            img: WP1,
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 5,
            name: "Kirtan Patel",
            position: "Member 5",
            img: WP1,
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
    ];

    return (
        <div className="bg-indigo-200 flex flex-col items-center mt-0">
            {/* Section Title */}
            <div className="w-full text-center py-8 bg-indigo-200 mt-20">
                <h1 className="text-indigo-800 text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
                    Team Section
                    <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                </h1>
            </div>

            {/* Team Members Grid */}
            <div className="flex-grow flex items-center justify-center w-full mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="bg-[#ede8f5] shadow-lg rounded-lg overflow-hidden transform transition-transform hover:translate-y-[-10px] relative group w-[250px] mx-auto">
                            <div className="relative w-full h-56 overflow-hidden bg-[#7091e6]">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-[-40px] left-0 right-0 p-2 transition-all group-hover:bottom-2">
                                    <div className="flex justify-center space-x-4">
                                        <a href={member.socialLinks.facebook} className="h-8 w-8 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href={member.socialLinks.twitter} className="h-8 w-8 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href={member.socialLinks.instagram} className="h-8 w-8 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 text-center">
                                <h3 className="text-lg text-[#141414]">{member.name}</h3>
                                <span className="text-sm text-gray-600">{member.position}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


};

export default TeamCards;