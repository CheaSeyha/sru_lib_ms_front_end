import React, { useState } from "react";
import BtnGredient from "../../../ComponentLayer/Book/BtnGredient";
export default function BackupBook() {
    // Data of All Book
    const EntryTableData =[
        {"ID": 1001, "Name": "ក្បួនហេក", "Type": "Science and Technology"},
        {"ID": 1002, "Name": "Queen of the Code", "Type": "Computer Science"},
        {"ID": 1003, "Name": "Master of Algorithms", "Type": "Engineering"},
        {"ID": 1004, "Name": "Data Diva", "Type": "Data Science"},
        {"ID": 1005, "Name": "Cyber Sentinel", "Type": "Cybersecurity"},
        {"ID": 1006, "Name": "Tech Titan", "Type": "Information Technology"},
        {"ID": 1007, "Name": "AI Aficionado", "Type": "Artificial Intelligence"},
        {"ID": 1008, "Name": "Quantum Queen", "Type": "Quantum Computing"},
        {"ID": 1009, "Name": "Network Ninja", "Type": "Networking"},
        {"ID": 1010, "Name": "Cloud Conqueror", "Type": "Cloud Computing"},
        {"ID": 1011, "Name": "Code Connoisseur", "Type": "Software Development"},
        {"ID": 1012, "Name": "Web Wizard", "Type": "Web Development"},
        {"ID": 1013, "Name": "Mobile Maven", "Type": "Mobile Development"},
        {"ID": 1014, "Name": "UX Unicorn", "Type": "User Experience"},
        {"ID": 1015, "Name": "Design Dynamo", "Type": "Design"},
        {"ID": 1016, "Name": "Database Don", "Type": "Database Administration"},
        {"ID": 1017, "Name": "Security Sage", "Type": "Information Security"},
        {"ID": 1018, "Name": "Analytics Ace", "Type": "Data Analytics"},
        {"ID": 1019, "Name": "Machine Maestro", "Type": "Machine Learning"},
        {"ID": 1020, "Name": "Bioinformatics Buff", "Type": "Bioinformatics"},
        {"ID": 1021, "Name": "Gadget Guru", "Type": "Electronics"},
        {"ID": 1022, "Name": "Robotics Ruler", "Type": "Robotics"},
        {"ID": 1023, "Name": "DevOps Dynamo", "Type": "DevOps"},
        {"ID": 1024, "Name": "Agile Advocate", "Type": "Project Management"},
        {"ID": 1025, "Name": "SysAdmin Supreme", "Type": "System Administration"},
        {"ID": 1026, "Name": "Tech Tactician", "Type": "Technical Support"},
        {"ID": 1027, "Name": "Innovation Icon", "Type": "Research and Development"},
        {"ID": 1028, "Name": "Script Sorcerer", "Type": "Scripting"},
        {"ID": 1029, "Name": "Code Crafter", "Type": "Software Engineering"},
        {"ID": 1030, "Name": "Firmware Fanatic", "Type": "Embedded Systems"},
        {"ID": 1031, "Name": "Crypto Connoi", "Type": "Cryptography"},
        {"ID": 1032, "Name": "VR Virtuoso", "Type": "Virtual Reality"},
        {"ID": 1033, "Name": "AR Architect", "Type": "Augmented Reality"},
        {"ID": 1034, "Name": "Blockchain Baron", "Type": "Blockchain"},
        {"ID": 1035, "Name": "Tech Trailblazer", "Type": "Technology"},
        {"ID": 1036, "Name": "Quantum King", "Type": "Quantum Mechanics"},
        {"ID": 1037, "Name": "HCI Hero", "Type": "Human-Computer Interaction"},
        {"ID": 1038, "Name": "Big Data Boss", "Type": "Big Data"},
        {"ID": 1039, "Name": "SEO Specialist", "Type": "Search Engine Optimization"},
        {"ID": 1040, "Name": "Content Captain", "Type": "Content Management"},
        {"ID": 1041, "Name": "Marketing Maven", "Type": "Digital Marketing"},
        {"ID": 1042, "Name": "Tech Trainer", "Type": "Technical Training"},
        {"ID": 1043, "Name": "Support Superstar", "Type": "Customer Support"},
        {"ID": 1044, "Name": "Sales Sage", "Type": "Technical Sales"},
        {"ID": 1045, "Name": "Field Engineer", "Type": "Field Service"},
        {"ID": 1046, "Name": "Systems Scientist", "Type": "Systems Engineering"},
        {"ID": 1047, "Name": "Product Prodigy", "Type": "Product Management"},
        {"ID": 1048, "Name": "Solution Strategist", "Type": "Solution Architecture"},
        {"ID": 1049, "Name": "Tech Evangelist", "Type": "Technology Evangelism"},
        {"ID": 1050, "Name": "Innovation Innovator", "Type": "Innovation"},
        {"ID": 1051, "Name": "Tech Educator", "Type": "Education"},
        {"ID": 1052, "Name": "Data Defender", "Type": "Data Protection"},
        {"ID": 1053, "Name": "Cyber Crusader", "Type": "Cyber Defense"},
        {"ID": 1054, "Name": "E-commerce", "Type": "E-commerce"},
        {"ID": 1055, "Name": "IoT Investigator", "Type": "Internet of Things"},
        {"ID": 1056, "Name": "Digital Detective", "Type": "Digital Forensics"},
        {"ID": 1057, "Name": "IT Inspector", "Type": "IT Audit"},
        {"ID": 1058, "Name": "ERP Executive", "Type": "Enterprise Resource Planning"},
        {"ID": 1059, "Name": "Tech Tutor", "Type": "Tutoring"},
        {"ID": 1060, "Name": "VR Voyager", "Type": "Virtual Reality"},
        {"ID": 1061, "Name": "Automation Ace", "Type": "Automation"},
        {"ID": 1062, "Name": "Simulation Specialist", "Type": "Simulation"},
        {"ID": 1063, "Name": "Logistics Leader", "Type": "Logistics"},
        {"ID": 1064, "Name": "Supply Chain Sage", "Type": "Supply Chain Management"},
        {"ID": 1065, "Name": "Telecom Titan", "Type": "Telecommunications"},
        {"ID": 1066, "Name": "Broadcast Boss", "Type": "Broadcasting"},
        {"ID": 1067, "Name": "Streaming Star", "Type": "Streaming Media"},
        {"ID": 1068, "Name": "Game Guru", "Type": "Game Development"},
        {"ID": 1069, "Name": "EdTech Expert", "Type": "Educational Technology"},
        {"ID": 1070, "Name": "FinTech Fanatic", "Type": "Financial Technology"},
        {"ID": 1071, "Name": "InsurTech Innovator", "Type": "Insurance Technology"},
        {"ID": 1072, "Name": "HealthTech Hero", "Type": "Healthcare Technology"},
        {"ID": 1073, "Name": "Agritech Aficionado", "Type": "Agricultural Technology"},
        {"ID": 1074, "Name": "PropTech Pioneer", "Type": "Property Technology"},
        {"ID": 1075, "Name": "LegalTech Luminary", "Type": "Legal Technology"},
        {"ID": 1076, "Name": "EnergyTech Expert", "Type": "Energy Technology"},
        {"ID": 1077, "Name": "EnviroTech Enthusiast", "Type": "Environmental Technology"},
        {"ID": 1078, "Name": "TransportTech Titan", "Type": "Transport Technology"},
        {"ID": 1079, "Name": "RetailTech Ruler", "Type": "Retail Technology"},
        {"ID": 1080, "Name": "FashionTech Fanatic", "Type": "Fashion Technology"},
        {"ID": 1081, "Name": "FoodTech Fan", "Type": "Food Technology"},
        {"ID": 1082, "Name": "MarTech Master", "Type": "Marketing Technology"},
        {"ID": 1083, "Name": "AdTech Ace", "Type": "Advertising Technology"},
        {"ID": 1084, "Name": "HRTech Hero", "Type": "Human Resources Technology"},
        {"ID": 1085, "Name": "RegTech Ruler", "Type": "Regulatory Technology"},
        {"ID": 1086, "Name": "GovTech Guru", "Type": "Government Technology"},
        {"ID": 1087, "Name": "CivicTech Champion", "Type": "Civic Technology"}
    ]  
    return (
        <>
            <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
                <div className="variable-book  overflow-y-auto flex-1 w-full grid items-start">
                    <table className="table tectav min-w-full divide-y divide-gray-200">
                        {/* head */}
                        <thead className='text-accent'>
                        <tr>
                          <th className="sticky top-0 text-left text-xs font-bold bg-secondary">NO</th>
                          <th className="sticky top-0 text-left text-xs font-bold bg-secondary">ID</th>
                          <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Name</th>
                          <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Type</th>
                          <th className="sticky top-0 text-left text-xs font-bold bg-secondary"></th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {EntryTableData.map((entry, index) => (
                                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                                    <th>{index + 1}</th>
                                    <td>{entry.ID}</td>
                                    <td>{entry.Name}</td>
                                    <td>{entry.Type}</td>
                                    <td className='text-center hover:bg-secondary'>
                                        <button class="bg-base-100 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center">
                                            <svg className=" fill-accent p-0 w-4 h-4 mr-2" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>backup-restore-line</title> <rect class="clr-i-outline clr-i-outline-path-1" x="6" y="22" width="24" height="2"></rect><rect class="clr-i-outline clr-i-outline-path-2" x="26" y="26" width="4" height="2"></rect><path class="clr-i-outline clr-i-outline-path-3" d="M13,9.92,17,6V19a1,1,0,1,0,2,0V6l4,3.95A1,1,0,1,0,24.38,8.5L18,2.16,11.61,8.5A1,1,0,0,0,13,9.92Z"></path><path class="clr-i-outline clr-i-outline-path-4" d="M30.84,13.37A1.94,1.94,0,0,0,28.93,12H21v2h7.95C30,16.94,31.72,21.65,32,22.48V30H4V22.48C4.28,21.65,7.05,14,7.05,14H15V12H7.07a1.92,1.92,0,0,0-1.9,1.32C2,22,2,22.1,2,22.33V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V22.33C34,22.1,34,22,30.84,13.37Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
                                            <span>Restore</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                    </div>
            </div>
        </>
    )
}
