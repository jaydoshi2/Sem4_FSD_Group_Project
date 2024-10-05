import React from "react";
import WP1 from '../assets/images/sampleprofile.png'
const TeamCards = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Kavya Trivedi",
            position: "Member 1",
            img: WP1, // Replace with your image source
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
            img: WP1, // Replace with your image source
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 3,
            name: "Jay Pandya",
            position: "Member 3",
            img: WP1, // Replace with your image source
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
        {
            id: 4,
            name: "Jay Doshi",
            position: "Member 4",
            img: WP1, // Replace with your image source
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
            img: WP1, // Replace with your image source
            socialLinks: {
                facebook: "#",
                twitter: "#",
                instagram: "#",
            },
        },
    ];

    return (
        <div className="flex justify-center space-x-4 mt-16 bg-[#adbbda] p-10">
            {teamMembers.map((member) => (
                <div key={member.id} className="bg-[#ede8f5] shadow-lg rounded-lg overflow-hidden transform transition-transform hover:translate-y-[-10px] relative group w-64">
                    <div className="relative w-full h-64 overflow-hidden bg-[#7091e6]">
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-[-50px] left-0 right-0 p-2 transition-all group-hover:bottom-2"> {/* Show on hover */}
                            <div className="flex justify-center space-x-4"> {/* Centered icons */}
                                <a href={member.socialLinks.facebook} className="h-10 w-10 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href={member.socialLinks.twitter} className="h-10 w-10 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href={member.socialLinks.instagram} className="h-10 w-10 flex items-center justify-center text-[#ede8f5] bg-[#7091e6] rounded-md hover:text-[#7091e6] hover:bg-[#ede8f5] transition">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl text-[#141414]">{member.name}</h3>
                        <span className="text-lg text-gray-600">{member.position}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamCards;
